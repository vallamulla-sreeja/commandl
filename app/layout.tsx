import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Nunito } from 'next/font/google';
import { Inter } from 'next/font/google';
import './globals.css';
import { metadata, viewport } from './metadata';
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ['latin'] });

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '800'],
  variable: '--font-nunito',
});

export { metadata, viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body className={`font-sans antialiased bg-white text-slate-900 ${inter.className}`} suppressHydrationWarning>
        <UserProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </UserProvider>
      </body>
    </html>
  );
}
