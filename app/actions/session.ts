'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

/**
 * Server action to validate session.
 * Used by admin page to verify authentication.
 * Runs in Node.js runtime, not Edge Runtime.
 */
export async function getValidSession() {
  try {
    const headersList = await headers()
    const session = await auth.api.getSession({ headers: headersList })
    return session
  } catch (error) {
    console.error('[v0] Session validation error:', error)
    return null
  }
}
