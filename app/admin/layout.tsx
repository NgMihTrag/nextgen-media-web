import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata = {
  title: 'Admin Dashboard - NextGen Media',
  description: 'NextGen Media admin dashboard',
  robots: 'noindex, nofollow',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Validate session using Better Auth server-side API
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    // If no session, redirect to login
    if (!session) {
      return redirect('/admin/login')
    }
  } catch (error) {
    // If there's an error validating session, redirect to login
    return redirect('/admin/login')
  }

  return <>{children}</>
}
