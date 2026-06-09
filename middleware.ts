import { NextRequest, NextResponse } from 'next/server'

const protectedPaths = ['/admin', '/admin/projects']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the path is a protected admin route
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  )

  // Allow login page to be accessed without authentication
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  if (isProtectedPath) {
    // Check for session cookie
    const sessionToken = request.cookies.get('auth_token')?.value ||
                         request.cookies.get('better-auth.session_token')?.value

    if (!sessionToken) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
