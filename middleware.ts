import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. Always allow auth API routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // 2. Always allow login page and session check endpoint
  if (pathname === '/admin/login' || pathname === '/api/auth/session') {
    return NextResponse.next()
  }

  // 3. Protect /admin/* routes using session cookie check (Edge-safe)
  if (pathname.startsWith('/admin')) {
    // Check if session cookie exists (set by Better Auth)
    // This is a lightweight Edge-safe check - full validation happens in Route Handler
    const sessionCookie = request.cookies.get('better-auth.session_token')

    if (!sessionCookie) {
      // No session cookie - redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/auth/:path*'],
}
