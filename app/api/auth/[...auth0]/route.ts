import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
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
    })
});
