'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { user as userTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

async function getAdminId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  
  // Only allow the admin user
  if (session.user.email !== 'nextgenmedia868@gmail.com') {
    throw new Error('Only admin user can access this')
  }
  
  return session.user.id
}

// Verify if admin user exists
export async function checkAdminExists() {
  try {
    const adminUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, 'nextgenmedia868@gmail.com'))
      .limit(1)
    
    return adminUser.length > 0
  } catch (error) {
    console.error('Error checking admin user:', error)
    return false
  }
}

// Get current user info
export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    return session?.user || null
  } catch (error) {
    return null
  }
}
