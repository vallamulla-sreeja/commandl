import './globals.css';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Footer from './components/Footer';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '800'],
  variable: '--font-nunito',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'CommandL - Your Code Editor Redefined with AI',
  description: 'Experience CommandL: a blazing fast code editor with AI superpowers. The perfect tool for students to learn programming effectively.',
  metadataBase: new URL('https://www.commandl.com'),
  alternates: {
    canonical: '/',
  },
  keywords: 'code editor, AI programming, learn to code, programming education, coding tasks, interactive learning',
  authors: [{ name: 'CommandL Team' }],
  creator: 'CommandL',
  publisher: 'CommandL',
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/favicon.ico',
  },
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
    creator: '@CommandL',
    site: '@CommandL',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
        <Footer />
      </body>
    </html>
  );
}