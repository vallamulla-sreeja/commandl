'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Nunito } from 'next/font/google';
import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '800'],
  variable: '--font-nunito',
});

// Client-side wrapper component
function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div suppressHydrationWarning>
      {isMounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className={`font-sans antialiased bg-white text-slate-900 ${inter.className}`} suppressHydrationWarning>
        <UserProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
