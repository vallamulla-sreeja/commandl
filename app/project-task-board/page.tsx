'use client';

import { Nunito } from 'next/font/google';
import ProjectTaskBoardClient from './ProjectTaskBoardClient';
import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';

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
  const [resolvedParams, setResolvedParams] = useState<{
    id: string;
    sectionId: string;
    assignmentId: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Resolve the promise
  useEffect(() => {
    async function resolveParams() {
      try {
        const result = await params;
        setResolvedParams(result);
      } catch (error) {
        console.error("Failed to resolve params:", error);
      } finally {
        setIsLoading(false);
      }
    }

    resolveParams();
  }, [params]);
  
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar isCollapsedCallback={setIsSidebarCollapsed} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'} ${nunito.className}`}>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
          </div>
        ) : resolvedParams ? (
          <ProjectTaskBoardClient params={resolvedParams} />
        ) : (
          <div className="flex justify-center items-center h-screen">
            <p>Error loading project data</p>
          </div>
        )}
      </div>
    </div>
  );
}