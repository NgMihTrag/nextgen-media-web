import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow auth API routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Allow login page
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Protect /admin/* - check for session cookie
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('better-auth.session_token')

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/auth/:path*'],
}
