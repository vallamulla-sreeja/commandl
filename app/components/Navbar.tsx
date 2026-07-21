'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative flex items-center gap-4 py-3 px-4 md:px-8 border-b border-gray-200 bg-white max-w-7xl mx-auto">
      <Link href="/" className="flex items-center">
        <Image
          src="/images/logo.png"
          alt="CommandL Logo"
          width={48}
          height={48}
          priority
          className="w-12 h-12 md:w-16 md:h-16"
        />
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/updates" className="text-sm text-gray-600 hover:text-[#0066b8] transition-colors">Updates</Link>
        <Link href="/blog" className="text-sm text-gray-600 hover:text-[#0066b8] transition-colors">Blogs</Link>
        <Link href="/faq" className="text-sm text-gray-600 hover:text-[#0066b8] transition-colors">FAQ</Link>
      </div>
      
      {/* Desktop Download Button */}
      <div className="hidden md:flex ml-auto">
        <Link href="/download" className="buttonPrimary">Download</Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="ml-auto md:hidden p-2"
        aria-label="Toggle menu"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden">
          <div className="flex flex-col p-4 gap-4">
            <Link href="/updates" className="text-sm text-gray-600 hover:text-[#0066b8] transition-colors">Updates</Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-[#0066b8] transition-colors">Blogs</Link>
            <Link href="/faq" className="text-sm text-gray-600 hover:text-[#0066b8] transition-colors">FAQ</Link>
            <Link href="/download" className="buttonPrimary text-center">Download</Link>
          </div>
        </div>
      )}
    </nav>
  );
} 