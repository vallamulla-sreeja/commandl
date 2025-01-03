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
  description: 'Experience CommandL: a blazing fast code editor with AI superpowers.',
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
