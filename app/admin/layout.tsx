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
  // Server-side session validation
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Redirect to login if no session
  if (!session) {
    redirect('/admin/login')
  }

  return <>{children}</>
}
