import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. Always allow auth API routes - Better Auth needs these to function
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // 2. Always allow login page
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // 3. Protect /admin/* routes using Better Auth session validation
  if (pathname.startsWith('/admin')) {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      // No valid session - redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/auth/:path*'],
}
