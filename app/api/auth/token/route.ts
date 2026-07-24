// app/api/auth/token/route.ts
import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return handleTokenRequest(req);
}

export async function POST(req: NextRequest) {
  return handleTokenRequest(req);
}

async function handleTokenRequest(req: NextRequest) {
  try {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res, {
      authorizationParams: {
        scope: 'openid profile email email_verified',
        audience: process.env.AUTH0_API_IDENTIFIER
      }
    });

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}