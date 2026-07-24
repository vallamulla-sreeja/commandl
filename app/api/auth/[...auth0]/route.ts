import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';
import { IncomingMessage } from 'http';

export async function GET(req: NextRequest, context: { params: { auth0: string[] } }) {
    // Await the params before using them
    const params = await Promise.resolve(context.params);
    
    const auth = handleAuth({
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
    
    return auth(req as unknown as IncomingMessage, { params });
}
