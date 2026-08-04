'use server'

import { db } from '@/lib/db'
import { portfolioProjects, portfolioImages, testimonials, teamMembers, siteStats } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// Public access - no authentication required for admin functions
async function getUserId() {
  return 'dev-admin'
}

// Helper to get project with all images
async function getProjectWithImages(projectId: string) {
  const [project] = await db
    .select()
    .from(portfolioProjects)
    .where(eq(portfolioProjects.id, projectId))

  if (!project) return null

  const images = await db
    .select()
    .from(portfolioImages)
    .where(eq(portfolioImages.projectId, projectId))
    .orderBy(desc(portfolioImages.sortOrder))

  return {
    ...project,
    galleryImages: images.map((img) => img.imageUrl),
  }
}

// Public portfolio projects (all projects for portfolio page) - includes gallery
export async function getAllPublicPortfolioProjects() {
  const projects = await db
    .select()
    .from(portfolioProjects)
    .orderBy(desc(portfolioProjects.createdAt))

  const projectsWithImages = await Promise.all(
    projects.map(async (project) => {
      const images = await db
        .select()
        .from(portfolioImages)
        .where(eq(portfolioImages.projectId, project.id))
        .orderBy(desc(portfolioImages.sortOrder))

      return {
        ...project,
        galleryImages: images.map((img) => img.imageUrl),
      }
    })
  )

  return projectsWithImages
}

// Public portfolio projects (featured only, limit 4, newest first) - includes gallery
export async function getPublicPortfolioProjects() {
  const projects = await db
    .select()
    .from(portfolioProjects)
    .where(eq(portfolioProjects.featured, true))
    .orderBy(desc(portfolioProjects.createdAt))
    .limit(4)

  const projectsWithImages = await Promise.all(
    projects.map(async (project) => {
      const images = await db
        .select()
        .from(portfolioImages)
        .where(eq(portfolioImages.projectId, project.id))
        .orderBy(desc(portfolioImages.sortOrder))

      return {
        ...project,
        galleryImages: images.map((img) => img.imageUrl),
      }
    })
  )

  return projectsWithImages
}

// Portfolio Projects (Admin) - includes gallery images
export async function getPortfolioProjects() {
  const userId = await getUserId()
  const projects = await db
    .select()
    .from(portfolioProjects)
    .where(eq(portfolioProjects.userId, userId))
    .orderBy(desc(portfolioProjects.orderIndex))

  // Attach images for each project
  const projectsWithImages = await Promise.all(
    projects.map(async (project) => {
      const images = await db
        .select()
        .from(portfolioImages)
        .where(eq(portfolioImages.projectId, project.id))
        .orderBy(desc(portfolioImages.sortOrder))

      return {
        ...project,
        galleryImages: images.map((img) => img.imageUrl),
      }
    })
  )

  return projectsWithImages
}

export async function createPortfolioProject(data: {
  title: string
  description: string
  category: string
  imageUrl?: string
  imageAlt?: string
  galleryImages?: string[]
  link?: string
  techStack?: string[]
  featured?: boolean
}) {
  try {
    // Validate required fields
    if (!data.title || !data.description || !data.category) {
      throw new Error('Missing required fields: title, description, category')
    }

    // Get gallery images
    const galleryImages = data.galleryImages || []
    if (galleryImages.length === 0) {
      throw new Error('Please upload at least one image')
    }
    if (galleryImages.length > 5) {
      throw new Error('You can upload a maximum of 5 images')
    }

    const userId = await getUserId()

    console.log('[Portfolio] Creating project:', {
      userId,
      title: data.title,
      category: data.category,
      imageCount: galleryImages.length,
    })

    // Create project with cover image
    const [project] = await db
      .insert(portfolioProjects)
      .values({
        userId,
        title: data.title,
        description: data.description,
        category: data.category,
        coverImage: galleryImages[0], // First image is cover
        imageUrl: galleryImages[0], // Legacy field for backward compat
        imageAlt: data.imageAlt || data.title,
        link: data.link || null,
        techStack: data.techStack || [],
        featured: data.featured || false,
      })
      .returning()

    // Create gallery images
    for (let i = 0; i < galleryImages.length; i++) {
      await db.insert(portfolioImages).values({
        projectId: project.id,
        imageUrl: galleryImages[i],
        alt: `${data.title} - Image ${i + 1}`,
        sortOrder: i + 1,
      })
    }

    console.log('[Portfolio] Project created successfully with', galleryImages.length, 'images')

    revalidatePath('/portfolio')
    revalidatePath('/admin')

    return { success: true }
  } catch (error) {
    console.error('PROJECT SAVE ERROR:', error instanceof Error ? error.message : String(error))
    throw error
  }
}

export async function updatePortfolioProject(
  id: string,
  data: {
    title?: string
    description?: string
    category?: string
    imageUrl?: string
    imageAlt?: string
    galleryImages?: string[]
    link?: string
    techStack?: string[]
    featured?: boolean
    orderIndex?: number
  }
) {
  try {
    const userId = await getUserId()

    // Validate gallery images if provided
    if (data.galleryImages !== undefined) {
      if (data.galleryImages.length === 0) {
        throw new Error('Please upload at least one image')
      }
      if (data.galleryImages.length > 5) {
        throw new Error('You can upload a maximum of 5 images')
      }
    }

    console.log('[Portfolio] Updating project:', { id, userId, imageCount: data.galleryImages?.length })

    // Update project record
    const updateData: any = { updatedAt: new Date() }
    if (data.title) updateData.title = data.title
    if (data.description) updateData.description = data.description
    if (data.category) updateData.category = data.category
    if (data.link !== undefined) updateData.link = data.link
    if (data.techStack !== undefined) updateData.techStack = data.techStack
    if (data.featured !== undefined) updateData.featured = data.featured
    if (data.orderIndex !== undefined) updateData.orderIndex = data.orderIndex

    // Handle gallery images update
    if (data.galleryImages !== undefined) {
      // Delete existing images
      await db.delete(portfolioImages).where(eq(portfolioImages.projectId, id))

      // Create new images
      for (let i = 0; i < data.galleryImages.length; i++) {
        await db.insert(portfolioImages).values({
          projectId: id,
          imageUrl: data.galleryImages[i],
          alt: `Image ${i + 1}`,
          sortOrder: i + 1,
        })
      }

      // Update cover image and legacy imageUrl
      updateData.coverImage = data.galleryImages[0]
      updateData.imageUrl = data.galleryImages[0]
      updateData.imageAlt = data.imageAlt || `Cover image`
    }

    await db
      .update(portfolioProjects)
      .set(updateData)
      .where(and(eq(portfolioProjects.id, id), eq(portfolioProjects.userId, userId)))

    console.log('[Portfolio] Project updated successfully')

    revalidatePath('/portfolio')
    revalidatePath('/admin')

    return { success: true }
  } catch (error) {
    console.error('PROJECT UPDATE ERROR:', error instanceof Error ? error.message : String(error))
    throw error
  }
}

export async function deletePortfolioProject(id: string) {
  try {
    const userId = await getUserId()

    console.log('[Portfolio] Deleting project:', { id, userId })

    // Delete project (images cascade delete via foreign key)
    await db
      .delete(portfolioProjects)
      .where(and(eq(portfolioProjects.id, id), eq(portfolioProjects.userId, userId)))

    console.log('[Portfolio] Project and all images deleted successfully')

    revalidatePath('/portfolio')
    revalidatePath('/admin')

    return { success: true }
  } catch (error) {
    console.error('PROJECT DELETE ERROR:', error instanceof Error ? error.message : String(error))
    throw error
  }
}

// Testimonials (Admin)
export async function getTestimonials() {
  const userId = await getUserId()
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.userId, userId))
    .orderBy(desc(testimonials.orderIndex))
}

// Public testimonials (for public display)
export async function getPublicTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.featured, true))
    .orderBy(desc(testimonials.orderIndex))
}

export async function createTestimonial(data: {
  clientName: string
  company?: string
  quote: string
  avatarUrl?: string
  rating?: number
  featured?: boolean
}) {
  const userId = await getUserId()
  await db.insert(testimonials).values({
    userId,
    ...data,
  })
  revalidatePath('/admin/testimonials')
}

export async function updateTestimonial(
  id: string,
  data: {
    clientName?: string
    company?: string
    quote?: string
    avatarUrl?: string
    rating?: number
    featured?: boolean
    orderIndex?: number
  }
) {
  const userId = await getUserId()
  await db
    .update(testimonials)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(testimonials.id, id), eq(testimonials.userId, userId)))
  revalidatePath('/admin/testimonials')
}

export async function deleteTestimonial(id: string) {
  const userId = await getUserId()
  await db
    .delete(testimonials)
    .where(and(eq(testimonials.id, id), eq(testimonials.userId, userId)))
  revalidatePath('/admin/testimonials')
}

// Team Members (Admin)
export async function getTeamMembers() {
  const userId = await getUserId()
  return db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.userId, userId))
    .orderBy(desc(teamMembers.orderIndex))
}

export async function createTeamMember(data: {
  name: string
  role: string
  bio?: string
  avatarUrl?: string
  skills?: string[]
  socialLinks?: Record<string, string>
}) {
  const userId = await getUserId()
  await db.insert(teamMembers).values({
    userId,
    ...data,
    skills: data.skills || [],
    socialLinks: data.socialLinks || {},
  })
  revalidatePath('/admin/team')
}

export async function updateTeamMember(
  id: string,
  data: {
    name?: string
    role?: string
    bio?: string
    avatarUrl?: string
    skills?: string[]
    socialLinks?: Record<string, string>
    orderIndex?: number
  }
) {
  const userId = await getUserId()
  await db
    .update(teamMembers)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(teamMembers.id, id), eq(teamMembers.userId, userId)))
  revalidatePath('/admin/team')
}

export async function deleteTeamMember(id: string) {
  const userId = await getUserId()
  await db
    .delete(teamMembers)
    .where(and(eq(teamMembers.id, id), eq(teamMembers.userId, userId)))
  revalidatePath('/admin/team')
}

// Site Stats (Admin)
export async function getSiteStats() {
  const userId = await getUserId()
  return db
    .select()
    .from(siteStats)
    .where(eq(siteStats.userId, userId))
}

export async function updateSiteStats(
  statKey: string,
  data: {
    statValue?: number
    statLabel?: string
    iconName?: string
  }
) {
  const userId = await getUserId()
  const existing = await db
    .select()
    .from(siteStats)
    .where(and(eq(siteStats.statKey, statKey), eq(siteStats.userId, userId)))
    .limit(1)

  if (existing.length > 0) {
    await db
      .update(siteStats)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(siteStats.statKey, statKey), eq(siteStats.userId, userId)))
  } else {
    await db.insert(siteStats).values({
      userId,
      statKey,
      ...data,
    })
  }
  revalidatePath('/admin/stats')
}
