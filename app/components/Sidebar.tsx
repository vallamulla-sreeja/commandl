'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiHome, FiSettings, FiLogOut, FiMenu, FiChevronLeft, FiUser } from 'react-icons/fi';
// import { FiFolder } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const clearAllCache = async () => {
  if (typeof caches !== 'undefined') {
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys.map(key => caches.delete(key)));
  }
  localStorage.clear();
  sessionStorage.clear();
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleLogout = () => {
    clearAllCache();
    setIsMobileMenuOpen(false);
    window.location.href = '/api/auth/logout';
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    // { name: 'Projects', path: '/project-dashboard', icon: FiFolder },
    { name: 'Profile', path: '/profile', icon: FiUser },
    { name: 'Settings', icon: FiSettings },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-gray-100 bg-white"
        aria-label="Toggle menu"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out z-40
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
          ${isCollapsed ? 'w-20' : 'w-72'} 
          lg:z-30`}
      >
        <div className="flex flex-col h-full relative">
          <div className={`py-5 ${isCollapsed ? 'px-4' : 'px-6'}`}>
            <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/images/commandl_logo.png"
                alt="CommandL Icon"
                width={38}
                height={38}
                priority
                className="min-w-[38px]"
              />
              {!isCollapsed && (
                <Image
                  src="/images/logo.png"
                  alt="CommandL Logo"
                  width={150}
                  height={150}
                  priority
                  className="h-8 w-auto"
                />
              )}
            </Link>
          </div>

          {/* Stats Section */}
          <div className={`${isCollapsed ? 'px-2' : 'px-6'} pb-4`}>
            <div className={`flex ${isCollapsed ? 'flex-col' : 'flex-row'} items-center gap-2 w-full`}>
              <div className={`flex items-center ${isCollapsed ? 'flex-col' : 'flex-row'} gap-2 px-3 py-2 rounded-lg`}>
                <span className={`text-2xl ${isCollapsed ? 'text-xl' : 'text-2xl'}`}>🔥</span>
                <span className="text-black font-bold text-lg">5</span>
              </div>
              <div className={`flex items-center ${isCollapsed ? 'flex-col' : 'flex-row'} gap-2 px-3 py-2 rounded-lg`}>
                <span className={`text-2xl ${isCollapsed ? 'text-xl' : 'text-2xl'}`}>⭐</span>
                <span className="text-black font-bold text-lg">1235</span>
              </div>
            </div>
          </div>

          <nav className={`flex-1 py-8 ${isCollapsed ? 'px-3' : 'px-6'}`}>
            <ul className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path || item.name} 
                      className="relative"
                      onMouseEnter={() => item.name === 'Settings' && setShowLogout(true)}
                      onMouseLeave={() => item.name === 'Settings' && setShowLogout(false)}
                  >
                    {item.name === 'Settings' ? (
                      <button
                        onClick={() => setShowLogout(!showLogout)}
                        className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} gap-4 px-5 py-3.5 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-[#58cc02]`}
                      >
                        <FiSettings className="w-5 h-5" />
                        {!isCollapsed && (
                          <span className="font-medium text-[15px]">
                            Settings
                          </span>
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.path!}
                        className={`flex items-center ${isCollapsed ? 'justify-center' : ''} gap-4 px-5 py-3.5 rounded-lg transition-all duration-200 ${
                          isActive(item.path!)
                            ? 'bg-[#58cc02] text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-[#58cc02]'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        {!isCollapsed && (
                          <span className="font-medium text-[15px]">
                            {item.name}
                          </span>
                        )}
                      </Link>
                    )}
                    {isMounted && item.name === 'Settings' && showLogout && (
                      <button
                        onClick={handleLogout}
                        className={`absolute top-full left-0 w-full flex items-center ${isCollapsed ? 'justify-center' : ''} gap-4 px-5 py-3.5 text-gray-700 hover:bg-gray-50 hover:text-[#58cc02] rounded-lg transition-all duration-200 bg-white shadow-md z-10`}
                      >
                        <FiLogOut className="w-5 h-5" />
                        {!isCollapsed && (
                          <span className="font-medium text-[15px]">Logout</span>
                        )}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className={`relative ${isCollapsed ? 'px-3' : 'px-6'} pb-8`}>
            {/* Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3 -top-10 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50 transition-colors lg:flex hidden shadow-sm"
            >
              <FiChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
} 