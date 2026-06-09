/**
 * Seed Admin User Script
 * 
 * This script creates the admin account in the database.
 * Run with: node --env-file-if-exists=/vercel/share/.env.project scripts/seed-admin.ts
 */

import { db, pool } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const ADMIN_EMAIL = 'nextgenmedia868@gmail.com'

export async function seedAdminUser() {
  try {
    // Check if admin user already exists
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, ADMIN_EMAIL))
      .limit(1)

    if (existingUser.length > 0) {
      console.log('✓ Admin user already exists')
      return
    }

    // Create the admin user without a password (will be set via Better Auth)
    // Better Auth handles password creation through the sign-in flow
    const newUser = await db.insert(user).values({
      id: `admin_${Date.now()}`,
      name: 'Admin',
      email: ADMIN_EMAIL,
      emailVerified: true,
      image: null,
    })

    console.log('✓ Admin user created successfully')
    console.log(`Email: ${ADMIN_EMAIL}`)
    console.log('\nNext steps:')
    console.log('1. Sign in at /admin/login with the email above')
    console.log('2. Better Auth will create the account and password on first sign-in')

    await pool.end()
  } catch (error) {
    console.error('✗ Failed to seed admin user:', error)
    await pool.end()
    process.exit(1)
  }
}

seedAdminUser()

