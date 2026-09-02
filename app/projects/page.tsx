'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkUserStatusAPI } from '../services/api';
import Sidebar from '../components/Sidebar';
import ProjectTaskManager from '../components/projects/ProjectTaskManager';

export default function Projects() {
  const { user, isLoading: isUserLoading } = useUser();
  const router = useRouter();
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [isProjectEnrolled, setIsProjectEnrolled] = useState<boolean | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!user) return;

      try {
        const response = await checkUserStatusAPI();
        const isEnrolled = response.project_enrolled === 'yes';
        setIsProjectEnrolled(isEnrolled);
        
        // If user is not enrolled, redirect to dashboard to complete enrollment
        if (!isEnrolled) {
          router.replace('/dashboard');
        }
      } catch (error) {
        console.error('Error checking user status:', error);
        setIsProjectEnrolled(false);
        router.replace('/dashboard');
      } finally {
        setIsCheckingStatus(false);
      }
    };

    if (user) {
      checkUserStatus();
    } else if (!isUserLoading) {
      setIsCheckingStatus(false);
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || isCheckingStatus || isProjectEnrolled === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-[#58cc02]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Only render if user is enrolled in a project
  if (!isProjectEnrolled) {
    return null; // The router.replace will handle the navigation
  }

  return (
    <>
      <Sidebar isCollapsedCallback={setIsSidebarCollapsed} />
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        <ProjectTaskManager />
      </div>
    </>
  );
} 