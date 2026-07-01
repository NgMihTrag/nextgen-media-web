import React from 'react'

export const metadata = {
  title: 'Admin Login - NextGen Media',
  description: 'NextGen Media admin login',
  robots: 'noindex, nofollow',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Login page is public - no authentication check needed
  return <>{children}</>
}
