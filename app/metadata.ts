import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CommandL - Best Code Editor for Students | Learn Programming with AI',
  description: 'CommandL (Command L) is the best code editor designed specifically for students. Experience a blazing fast, AI-powered IDE that makes learning to code fun and effective. Perfect for beginners and students learning programming.',
  metadataBase: new URL('https://www.commandl.com'),
  alternates: {
    canonical: '/',
  },
  keywords: 'CommandL, Command L, CommandL website, best code editor for students, student code editor, AI programming, learn to code, programming education, coding tasks, interactive learning, beginner friendly IDE',
  authors: [{ name: 'CommandL Team' }],
  creator: 'CommandL',
  publisher: 'CommandL',
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/favicon.ico',
  },
  openGraph: {
    title: 'CommandL - Best Code Editor for Students | Learn Programming with AI',
    description: 'CommandL (Command L) is the best code editor designed specifically for students. Experience a blazing fast, AI-powered IDE that makes learning to code fun and effective.',
    type: 'website',
    url: 'https://www.commandl.com',
    siteName: 'CommandL',
    locale: 'en_US',
    images: [
      {
        url: '/images/editor-screenshot.png',
        width: 1000,
        height: 625,
        alt: 'CommandL Code Editor Interface - The Best IDE for Students',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CommandL - Best Code Editor for Students',
    description: 'Experience CommandL (Command L): The best code editor designed for students learning to program. Built-in AI assistance and interactive learning.',
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}; 