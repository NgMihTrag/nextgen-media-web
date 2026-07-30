import { NextRequest, NextResponse } from 'next/server'

const protectedPaths = ['/admin', '/admin/projects']
const authPublicPaths = ['/admin/login', '/api/auth']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const host = request.headers.get('host') || ''

  // Always allow auth API routes - Better Auth needs these to function
  const isAuthRoute = authPublicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  )
  
  if (isAuthRoute) {
    return NextResponse.next()
  }

  // Check if the path is a protected admin route
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  )

  // Domain-based access control
  // Block admin routes on production domains
  const isProductionDomain = 
    host === 'www.nexttgenmedia.com' || 
    host === 'nexttgenmedia.com'

  // Allowed preview domains (v0 and Vercel preview)
  const isPreviewDomain = 
    host.includes('vusercontent.net') ||
    host.includes('vercel.app') ||
    host.includes('v0.dev') ||
    host.includes('v0.app') ||
    host === 'localhost:3000' ||
    host.startsWith('localhost:')

  // Block admin access on production domain
  if (isProductionDomain && isProtectedPath) {
    // Redirect admin routes to home page on production domain
    return NextResponse.redirect(new URL('/', request.url))
  }

  // For preview/dev domains with protected paths:
  // Check if the session cookie exists (Better Auth sets 'better-auth.session_token')
  if (isPreviewDomain && isProtectedPath && pathname !== '/admin/login') {
    const sessionToken = request.cookies.get('better-auth.session_token')?.value
    
    // If no session token exists, redirect to login (but allow /admin/login itself)
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/auth/:path*'],
}
