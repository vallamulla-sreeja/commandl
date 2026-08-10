'use client';

import { Nunito } from 'next/font/google';
import { useState } from 'react';
import ProjectProgressClient from './ProjectProgressClient';
import Sidebar from '../components/Sidebar';

// Metadata should be defined in a separate layout.tsx file, but for now we'll continue with the client component

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

export default function ProjectProgressPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar isCollapsedCallback={setIsSidebarCollapsed} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'} ${nunito.className}`}>
        <ProjectProgressClient />
      </div>
    </div>
  );
} 