import { getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);
  const isHomePage = req.nextUrl.pathname === '/';

  if (isHomePage && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/']
}; 