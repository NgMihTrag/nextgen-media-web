'use client'

import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient()

// Export individual functions for easier use
export const { signIn, signUp, signOut, useSession, getSession } = authClient
