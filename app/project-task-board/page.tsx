'use client';

import { Nunito } from 'next/font/google';
import ProjectTaskBoardClient from './ProjectTaskBoardClient';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

interface PageProps {
  params: Promise<{
    id: string;
    sectionId: string;
    assignmentId: string;
  }>;
}

export default function ProjectTaskBoard({ params }: PageProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar isCollapsedCallback={setIsSidebarCollapsed} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'} ${nunito.className}`}>
        <ProjectTaskBoardClient params={params} />
      </div>
    </div>
  );
}