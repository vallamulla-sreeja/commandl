'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center gap-4 py-3 px-4 md:px-8 border-b border-gray-200 bg-white">
      <div className="max-w-7xl w-full mx-auto flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/commandl_logo.png"
            alt="CommandL Icon"
            width={35}
            height={35}
            priority
          />
          <Image
            src="/images/logo.png"
            alt="CommandL Logo"
            width={140}
            height={140}
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Navigation items can be added here */}
        </div>
        
        {/* Desktop Right Side Navigation */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <Link href="/updates" className="text-base font-medium text-gray-800 hover:text-[#0066b8] transition-colors">Updates</Link>
          <Link href="/faq" className="text-base font-medium text-gray-800 hover:text-[#0066b8] transition-colors">FAQ</Link>
          <Link href="https://forms.gle/Hxukr6goWjztYtyW8" target="_blank" rel="noopener noreferrer" className="buttonPrimary">Join Waitlist</Link>
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
              <Link href="/faq" className="text-sm text-gray-600 hover:text-[#0066b8] transition-colors">FAQ</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 