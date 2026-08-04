import { db } from '@/lib/db'
import { portfolioProjects, portfolioImages } from '@/lib/db/schema'
import { eq, isNotNull } from 'drizzle-orm'

/**
 * One-time migration script to convert flat image_url to normalized portfolio_images table
 * 
 * For every existing project with image_url:
 * 1. Create one record in portfolio_images
 * 2. Set cover_image to the first (and only) image URL
 * 3. Preserve all data - NO data is deleted
 */
async function migratePortfolioImages() {
  try {
    console.log('[Migration] Starting portfolio images normalization...')

    // Step 1: Get all projects with existing imageUrl
    const projectsWithImages = await db
      .select()
      .from(portfolioProjects)
      .where(isNotNull(portfolioProjects.imageUrl))

    console.log(`[Migration] Found ${projectsWithImages.length} projects with image_url`)

    let migratedCount = 0
    let skippedCount = 0

    // Step 2: For each project, create portfolio_images record
    for (const project of projectsWithImages) {
      try {
        // Check if already migrated (to allow re-running safely)
        const existing = await db
          .select()
          .from(portfolioImages)
          .where(eq(portfolioImages.projectId, project.id))

        if (existing.length > 0) {
          console.log(`[Migration] ✓ Skipped ${project.id} - already migrated (${existing.length} images)`)
          skippedCount++
          continue
        }

        // Create portfolio_images record from legacy imageUrl
        await db.insert(portfolioImages).values({
          projectId: project.id,
          imageUrl: project.imageUrl!,
          alt: project.imageAlt || project.title,
          sortOrder: 1,
        })

        // Update cover_image
        await db
          .update(portfolioProjects)
          .set({ coverImage: project.imageUrl })
          .where(eq(portfolioProjects.id, project.id))

        migratedCount++
        console.log(`[Migration] ✓ Migrated ${project.id}: "${project.title}"`)
      } catch (error) {
        console.error(`[Migration] ✗ Failed to migrate ${project.id}:`, error)
        throw error
      }
    }

    console.log(`
[Migration] Complete!
  ✓ Successfully migrated: ${migratedCount} projects
  ✓ Already migrated: ${skippedCount} projects
  ✓ Total images created: ${migratedCount}
  
All existing data has been preserved.
Legacy imageUrl fields remain unchanged for safety.
`)

    return { success: true, migrated: migratedCount, skipped: skippedCount }
  } catch (error) {
    console.error('[Migration] Failed:', error)
    throw error
  }
}

// Run migration
migratePortfolioImages().catch(console.error)
