import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware Example
 * 
 * This middleware demonstrates common patterns:
 * - Request logging
 * - Authentication checks
 * - Redirect handling
 * - Rate limiting headers
 * - CORS headers
 * 
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // === Request Logging ===
  // Log all requests with timestamp (useful for debugging)
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${request.method} ${pathname}`);

  // === Add Security Headers ===
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  // === CORS Headers (for API routes) ===
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // === Protected Routes Example ===
  // Uncomment and modify for authentication-protected routes
  /*
  const protectedPaths = ['/dashboard', '/settings', '/admin'];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  if (isProtectedPath) {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      // Redirect to login if no token
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  */

  // === Rate Limiting Headers Example ===
  // Add rate limit info to response headers
  response.headers.set('X-RateLimit-Limit', '100');
  response.headers.set('X-RateLimit-Remaining', '99');

  // === Locale Detection Example ===
  // Uncomment for automatic locale redirect
  /*
  const locale = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || 'en';
  if (pathname === '/' && !pathname.startsWith(`/${locale}`)) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
  */

  // === Maintenance Mode Example ===
  // Uncomment to enable maintenance mode
  /*
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  if (isMaintenanceMode && !pathname.startsWith('/maintenance')) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }
  */

  return response;
}
