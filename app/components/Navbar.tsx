'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isLoading } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuth = () => {
    if (user) {
      window.location.href = '/api/auth/logout';
    } else {
      window.location.href = '/api/auth/login';
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center gap-4 py-3 px-4 md:px-8 border-b transition-all duration-300 ${
      isScrolled 
        ? 'border-gray-200/80 bg-white/80 backdrop-blur-md shadow-lg' 
        : 'border-gray-200 bg-white'
    }`}>
      <div className="max-w-7xl w-full mx-auto flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/images/commandl_logo.png"
              alt="CommandL Icon"
              width={35}
              height={35}
              priority
            />
          </div>
          <div className="transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="CommandL Logo"
              width={140}
              height={140}
              priority
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Navigation items can be added here */}
        </div>
        
        {/* Desktop Right Side Navigation */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <Link href="/projects" className="text-base font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 relative group">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-green-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/updates" className="text-base font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 relative group">
            Updates
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-green-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/faq" className="text-base font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 relative group">
            FAQ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-green-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <button 
            onClick={handleAuth}
            className="buttonPrimary transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {isLoading ? 'Loading...' : user ? 'Logout' : 'Login'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-auto md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
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
        <div className={`absolute top-full left-0 right-0 md:hidden transition-all duration-300 ${
          isMenuOpen 
            ? 'opacity-100 visible bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg' 
            : 'opacity-0 invisible'
        }`}>
          <div className="flex flex-col p-6 gap-6">
            <Link href="/projects" className="text-base font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2">
              Projects
            </Link>
            <Link href="/updates" className="text-base font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2">
              Updates
            </Link>
            <Link href="/faq" className="text-base font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2">
              FAQ
            </Link>
            <button 
              onClick={handleAuth}
              className="buttonPrimary transition-all duration-300 hover:scale-105"
            >
              {isLoading ? 'Loading...' : user ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 