import React from 'react'

export const metadata = {
  title: 'Admin Dashboard - NextGen Media',
  description: 'NextGen Media admin dashboard',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
