import './globals.css';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '800'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'CommandL - Your Code Editor Redefined with AI',
  description: 'Experience CommandL: a blazing fast code editor with AI superpowers. The perfect tool for students to learn programming effectively.',
  openGraph: {
    title: 'CommandL - Your Code Editor Redefined with AI',
    description: 'Experience CommandL: a blazing fast code editor with AI superpowers. The perfect tool for students to learn programming effectively.',
    type: 'website',
    url: 'https://www.commandl.com',
    siteName: 'CommandL',
    locale: 'en_US',
    images: [
      {
        url: '/images/editor-screenshot.png',
        width: 1000,
        height: 625,
        alt: 'CommandL Code Editor Interface',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CommandL - Your Code Editor Redefined with AI',
    description: 'Experience CommandL: a blazing fast code editor with AI superpowers.',
    images: ['/images/editor-screenshot.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
