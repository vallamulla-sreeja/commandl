import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';
import { type NextRequest } from 'next/server';

const handler = handleAuth({
    login: handleLogin({
        returnTo: '/dashboard',
        authorizationParams: {
            audience: process.env.AUTH0_API_IDENTIFIER,
            scope: 'openid profile email email_verified'
        }
    }),
    signup: handleLogin({
        returnTo: '/dashboard',
        authorizationParams: {
            audience: process.env.AUTH0_API_IDENTIFIER,
            scope: 'openid profile email email_verified',
            screen_hint: 'signup'
        }
    }),
    logout: handleLogout({
        returnTo: process.env.AUTH0_BASE_URL || 'http://localhost:3000'
    })
});

// Using the correct type for Next.js App Router
export const GET = handler;
