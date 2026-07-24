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

export async function GET(
    request: NextRequest,
    ctx: { params: { auth0: string[] } }
): Promise<Response> {
    try {
        const resolvedCtx = {
            params: await Promise.resolve(ctx.params)
        };
        return await handler(request, resolvedCtx);
    } catch (error) {
        console.error('Auth error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
