'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { profileApi } from './services/api';
import RegistrationForm from './components/registration/RegistrationForm';
import { AxiosError } from 'axios';
import { CircularProgress } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { handleLogout } from './services/api';

interface ErrorResponse {
  message: string;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const { user, isLoading: authLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user || authLoading) {
        setLoading(false);
        return;
      }
      
      try {
        await profileApi.getProfile();
        setIsOnboarded(true);
      } catch (error) {
        // Check for unauthorized error which could indicate token expiration
        if (error instanceof Error && error.message === 'Unauthorized') {
          console.log('Unauthorized error in ClientLayout, logging out');
          await handleLogout();
          return;
        }
        
        if ((error as AxiosError<ErrorResponse>)?.response?.status === 404) {
          setIsOnboarded(false);
          if (pathname !== '/dashboard') {
            router.replace('/dashboard', { scroll: false });
          }
          return;
        }
        
        // Check for 401 status which indicates unauthorized/expired token
        if ((error as AxiosError<ErrorResponse>)?.response?.status === 401) {
          console.log('401 error in ClientLayout, logging out');
          await handleLogout();
          return;
        }
        
        console.error('Unexpected error checking onboarding status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user, authLoading, router, pathname]);

  if (!isMounted || authLoading || loading || (user && isOnboarded === null)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (isOnboarded === false && user) {
    return <RegistrationForm />;
  }

  return <>{children}</>;
} 