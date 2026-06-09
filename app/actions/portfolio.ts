'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { portfolioProjects, testimonials, teamMembers, siteStats } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  
  // Only allow the admin user
  if (session.user.email !== 'nextgenmedia868@gmail.com') {
    throw new Error('Only admin user can manage portfolio')
  }
  
  return session.user.id
}

// Public portfolio projects (for public display)
export async function getPublicPortfolioProjects() {
  // Get all featured projects first, then all others
  return db
    .select()
    .from(portfolioProjects)
    .orderBy(desc(portfolioProjects.featured), desc(portfolioProjects.orderIndex))
}

// Portfolio Projects (Admin)
export async function getPortfolioProjects() {
  const userId = await getUserId()
  return db
    .select()
    .from(portfolioProjects)
    .where(eq(portfolioProjects.userId, userId))
    .orderBy(desc(portfolioProjects.orderIndex))
}

export async function createPortfolioProject(data: {
  title: string
  description: string
  category: string
  imageUrl?: string
  imageAlt?: string
  link?: string
  techStack?: string[]
  featured?: boolean
}) {
  try {
    // Validate required fields
    if (!data.title || !data.description || !data.category) {
      throw new Error('Missing required fields: title, description, category')
    }

    const userId = await getUserId()
    
    console.log('[Portfolio] Creating project:', {
      userId,
      title: data.title,
      category: data.category,
    })

    const result = await db.insert(portfolioProjects).values({
      userId,
      title: data.title,
      description: data.description,
      category: data.category,
      imageUrl: data.imageUrl || null,
      imageAlt: data.imageAlt || null,
      link: data.link || null,
      techStack: data.techStack || [],
      featured: data.featured || false,
    })

    console.log('[Portfolio] Project created successfully')
    
    revalidatePath('/portfolio')
    revalidatePath('/admin')
    
    return { success: true }
  } catch (error) {
    console.error('PROJECT SAVE ERROR:', error instanceof Error ? error.message : String(error))
    console.error('Full error:', error)
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
    link?: string
    techStack?: string[]
    featured?: boolean
    orderIndex?: number
  }
) {
  try {
    const userId = await getUserId()
    
    console.log('[Portfolio] Updating project:', { id, userId })

    await db
      .update(portfolioProjects)
      .set({ ...data, updatedAt: new Date() })
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

    await db
      .delete(portfolioProjects)
      .where(and(eq(portfolioProjects.id, id), eq(portfolioProjects.userId, userId)))

    console.log('[Portfolio] Project deleted successfully')
    
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
