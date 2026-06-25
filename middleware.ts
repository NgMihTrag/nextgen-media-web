import { NextRequest, NextResponse } from 'next/server'

const protectedPaths = ['/admin', '/admin/projects']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const host = request.headers.get('host') || ''

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

  // Allow preview domains to access admin (keep existing behavior)
  if (isPreviewDomain) {
    // Allow login page to be accessed without authentication on preview
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    // TODO: Re-enable admin authentication before production launch
    // Currently disabled for development - all /admin routes are accessible without login

    // TEMPORARILY DISABLED - Authentication protection bypassed for development
    // if (isProtectedPath) {
    //   // Check for Better Auth session cookie in multiple formats
    //   // Better Auth may use different cookie names based on environment:
    //   // - better-auth.session_token (development)
    //   // - __Secure-better-auth.session_token (production with secure flag)
    //   // - __Host-better-auth.session_token (production with strict security)
    //   const sessionToken = 
    //     request.cookies.get('better-auth.session_token')?.value ||
    //     request.cookies.get('__Secure-better-auth.session_token')?.value ||
    //     request.cookies.get('__Host-better-auth.session_token')?.value ||
    //     request.cookies.get('auth_token')?.value

    //   if (!sessionToken) {
    //     // Redirect to login if no session
    //     return NextResponse.redirect(new URL('/admin/login', request.url))
    //   }
    // }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
