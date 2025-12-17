import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware Configuration
 * 
 * This middleware handles:
 * - i18n routing (next-intl)
 * - Security headers
 * - CORS for API routes
 * - Request logging
 * 
 * @see https://next-intl.dev/docs/getting-started/app-router
 */

// Create the i18n middleware
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // === Request Logging ===
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${request.method} ${pathname}`);

  // Skip i18n for API routes and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.')
  ) {
    const response = NextResponse.next();
    
    // Add security headers for API routes
    if (pathname.startsWith('/api/')) {
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
    
    return response;
  }

  // Handle i18n routing for all other paths
  const response = intlMiddleware(request);
  
  // === Add Security Headers ===
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - ... if they start with `/_next`, `/api/`, `/_vercel`
    // - ... if they contain a dot (static files)
    '/((?!_next|api|_vercel|.*\\..*).*)',
    // However, match all pathnames within `/api` for CORS
    '/api/:path*',
  ],
};
