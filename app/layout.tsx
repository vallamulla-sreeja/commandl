import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import './globals.css';
import { metadata, viewport } from './metadata';
import ClientLayout from './ClientLayout';

// Export the metadata for Next.js to use
export { metadata, viewport };

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className={`font-sans antialiased bg-white text-slate-900 ${inter.className}`} suppressHydrationWarning>
        <UserProvider>
          <ClientLayout>
            {children}
            <SpeedInsights />
            <Analytics />
          </ClientLayout>
        </UserProvider>
      </body>
    </html>
  );
}
