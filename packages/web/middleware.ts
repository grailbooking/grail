import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Authentication stub - in production, verify Firebase auth token
  const authToken = request.cookies.get('auth-token');

  // Protected routes
  const protectedRoutes = ['/today', '/calendar', '/clients', '/pos', '/dashboard', '/settings', '/reports'];
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !authToken) {
    // In production, redirect to login
    // For now, just continue (stub authentication)
    console.warn('Auth stub: Protected route accessed without authentication');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
