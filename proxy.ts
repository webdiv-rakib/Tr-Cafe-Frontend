import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type UserRole = 'CUSTOMER' | 'STAFF' | 'RIDER' | 'ADMIN';

const AUTH_ROUTES = ['/login', '/register'];

const ROLE_HOME_MAP: Record<UserRole, string> = {
    ADMIN: '/admin',
    STAFF: '/staff',
    RIDER: '/rider',
    CUSTOMER: '/customer-dashboard',
};

/**
 * Safely decodes the JWT payload in Edge runtime without needing external libraries.
 * Also checks token expiration (`exp`) so expired cookies don't grant access.
 */
function decodeJwtPayload(token: string): { role?: UserRole; exp?: number } | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        // Convert Base64URL to standard Base64
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
        const jsonPayload = atob(padded);
        const parsed = JSON.parse(jsonPayload);

        // Reject expired tokens
        if (parsed.exp && Date.now() >= parsed.exp * 1000) {
            return null;
        }

        return {
            role: parsed.role?.toUpperCase() as UserRole | undefined,
            exp: parsed.exp,
        };
    } catch {
        return null;
    }
}

export function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    const accessToken = request.cookies.get('accessToken')?.value;
    const decoded = accessToken ? decodeJwtPayload(accessToken) : null;
    const isAuthenticated = Boolean(decoded?.role);
    const role = decoded?.role;

    // 1. If already logged in, redirect away from /login or /register to their own dashboard
    if (isAuthenticated && role && AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL(ROLE_HOME_MAP[role], request.url));
    }

    // 2. Protected routes requiring login (ordering, checkout, orders, payment, profile, and all dashboards)
    const isProtectedRoute =
        pathname.startsWith('/admin') ||
        pathname.startsWith('/staff') ||
        pathname.startsWith('/rider') ||
        pathname.startsWith('/customer-dashboard') ||
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/checkout') ||
        pathname.startsWith('/orders') ||
        pathname.startsWith('/payment') ||
        pathname.startsWith('/profile');

    if (!isAuthenticated) {
        if (isProtectedRoute) {
            const loginUrl = new URL('/login', request.url);
            // Preserve intended destination (e.g., /checkout) so login can redirect back
            loginUrl.searchParams.set('redirect', `${pathname}${search}`);
            const response = NextResponse.redirect(loginUrl);

            // Clear stale/expired cookie if present
            if (accessToken) {
                response.cookies.delete('accessToken');
            }
            return response;
        }

        return NextResponse.next();
    }

    // 3. Generic /dashboard shortcut -> forward user to their role-specific dashboard
    if (pathname === '/dashboard' && role) {
        return NextResponse.redirect(new URL(ROLE_HOME_MAP[role], request.url));
    }

    // 4. Strict Role-Based Access Control (RBAC) across dashboards
    if (role) {
        // /admin -> ADMIN only
        if (pathname.startsWith('/admin') && role !== 'ADMIN') {
            return NextResponse.redirect(new URL(ROLE_HOME_MAP[role], request.url));
        }

        // /staff (Kitchen Queue) -> STAFF and ADMIN (so AdminSubNav's Kitchen Queue tab works)
        if (pathname.startsWith('/staff') && role !== 'STAFF' && role !== 'ADMIN') {
            return NextResponse.redirect(new URL(ROLE_HOME_MAP[role], request.url));
        }

        // /rider -> RIDER and ADMIN
        if (pathname.startsWith('/rider') && role !== 'RIDER' && role !== 'ADMIN') {
            return NextResponse.redirect(new URL(ROLE_HOME_MAP[role], request.url));
        }

        // /customer-dashboard -> CUSTOMER only
        if (pathname.startsWith('/customer-dashboard') && role !== 'CUSTOMER') {
            return NextResponse.redirect(new URL(ROLE_HOME_MAP[role], request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/staff/:path*',
        '/rider/:path*',
        '/customer-dashboard/:path*',
        '/dashboard/:path*',
        '/checkout/:path*',
        '/orders/:path*',
        '/payment/:path*',
        '/profile/:path*',
        '/login',
        '/register',
    ],
};