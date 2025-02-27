'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
// import { ArrowDownCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
// Commented out unused components
// import ResumeUpload from '../components/dashboard/ResumeUpload';
import ProjectSelection from '../components/dashboard/ProjectSelection';
// import AboutSection from '../components/dashboard/AboutSection';
import GoalsSection from '../components/dashboard/GoalsSection';
import EnrollmentSummary from '../components/dashboard/EnrollmentSummary';
import { checkUserStatusAPI } from '../services/api';
import { fetchAccessToken } from '../services/api';
import { handleLogout } from '../services/api';
import { BASE_URL } from '../services/api';
import { toast } from 'react-hot-toast';

type UserStatus = {
  isPaid: boolean;
};

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
};

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Virtual chatbot',
    description: 'Build a virtual chatbot that can answer questions and help users with their queries.',
    image: '/images/frontend_development.png',
    color: 'bg-[#ffffff]'
  },
  {
    id: '2',
    title: 'Flashcard Study Tool',
    description: 'Create a flashcard study tool that can help users study for their exams.',
    image: '/images/backend_development.png',
    color: 'bg-[#ffffff]'
  },
  {
    id: '3',
    title: 'Blog Manager',
    description: 'Develop a blog manager that can help users manage their blog posts.',
    image: '/images/software_development.png',
    color: 'bg-[#ffffff]'
  }
];

export default function Dashboard() {
  const { user, isLoading: isUserLoading, error } = useUser();
  const router = useRouter();
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [selectedProject, setSelectedProject] = useState<string>('');
  
  // These state variables are kept for future use and compatibility with the EnrollmentSummary component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [about, setAbout] = useState('');
  
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  // Start with GoalsSection (step 3) instead of ResumeUpload (step 1)
  const [currentStep, setCurrentStep] = useState(3);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [isProjectEnrolled, setIsProjectEnrolled] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    let isMounted = true;

    const checkUserStatus = async () => {
      if (!user) return;

      try {
        // First check if user profile exists
        try {
          const response = await fetch(`${BASE_URL}/profile`, {
            headers: {
              'Authorization': `Bearer ${await fetchAccessToken()}`
            }
          });
          
          if (response.status === 401) {
            // Token expired or invalid, redirect to logout
            await handleLogout();
            return;
          }
          
          if (response.status === 404 || response.status === 400) {
            // User not found, redirect to registration
            if (isMounted) {
              setIsProjectEnrolled(false);
              router.replace('/registration');
            }
            return;
          }
        } catch (error) {
          console.error('Error checking user profile:', error);
          if (error instanceof Error && error.message === 'Unauthorized') {
            await handleLogout();
            return;
          }
        }

        const response = await checkUserStatusAPI();
        if (!isMounted) return;

        const isPaid = response.extra === 'paid';
        setUserStatus({ isPaid });
        
        // Check if user is enrolled in a project
        const isEnrolled = response.project_enrolled === 'yes';
        setIsProjectEnrolled(isEnrolled);
        
        // Redirect both paid and unpaid users to project-task-board
        // This ensures unpaid users also see the project board with premium content
        if (isEnrolled) {
          router.replace('/project-task-board');
        } else if (!isPaid) {
          // For unpaid users who aren't enrolled yet, also redirect to project-task-board
          // They will see the premium content UI there
          router.replace('/project-task-board');
        }
      } catch (error) {
        console.error('Error checking user status:', error);
        if (error instanceof Error && error.message === 'Unauthorized') {
          await handleLogout();
          return;
        }
        if (isMounted) {
          setUserStatus({ isPaid: false });
          setIsProjectEnrolled(false);
          // Redirect unpaid users to project-task-board even if there was an error
          router.replace('/project-task-board');
        }
      } finally {
        if (isMounted) {
          setIsCheckingStatus(false);
        }
      }
    };

    if (user) {
      checkUserStatus();
    } else if (!isUserLoading) {
      setIsCheckingStatus(false);
      setIsProjectEnrolled(false);
    }

    return () => {
      isMounted = false;
    };
  }, [user, isUserLoading, router]);

  // Commented out as it's no longer needed
  /*
  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };
  */

  const handleProjectSelection = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goalId)) {
        return prev.filter(id => id !== goalId);
      }
      return [...prev, goalId];
    });
  };

  const handleSubmit = async () => {
    if (isEnrolling) return; // Prevent multiple submissions
    setIsEnrolling(true);
    
    try {
      // Get the selected project details
      const project = PROJECTS.find(p => p.id === selectedProject);
      if (!project) throw new Error('Project not found');
      
      // Now make the API call to generate project tasks with the resume URL
      const accessToken = await fetchAccessToken();
      const response = await fetch(`${BASE_URL}/generate-14-day-project-tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          project_name: project.title.toLowerCase().replace(/\s+/g, '_'),
          project_description: project.description,
          goals: selectedGoals
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate project tasks');
      }

      const data = await response.json();
      if (data.message === 'Tasks and subtasks stored successfully') {
        // First set enrollment success
        setEnrollmentSuccess(true);
        // Then reset loading state
        setIsEnrolling(false);
        // Finally redirect after a short delay
        setTimeout(() => {
          router.push('/project-task-board');
        }, 1500);
      } else {
        throw new Error('Failed to generate project tasks');
      }
    } catch (error) {
      console.error('Error during project enrollment:', error);
      toast.error('Failed to enroll in project. Please try again.');
      setIsEnrolling(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 3:
        return (
          <GoalsSection
            selectedGoals={selectedGoals}
            onGoalToggle={handleGoalToggle}
            onContinue={() => selectedGoals.length >= 3 && setCurrentStep(4)}
            onBack={() => {}}
          />
        );
      case 4:
        return (
          <ProjectSelection
            projects={PROJECTS}
            selectedProject={selectedProject}
            onProjectSelect={handleProjectSelection}
            onContinue={() => selectedProject && setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        );
      case 5:
        const project = PROJECTS.find(p => p.id === selectedProject);
        if (!project) return null;
        return (
          <EnrollmentSummary
            resumeFile={resumeFile}
            about={about}
            selectedGoals={selectedGoals}
            selectedProject={project}
            onBack={() => setCurrentStep(4)}
            onEnroll={handleSubmit}
            isEnrolling={isEnrolling}
          />
        );
      default:
        return null;
    }
  };

  if (isUserLoading || isCheckingStatus || isProjectEnrolled === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-[#58cc02]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error.message}</div>;
  }

  if (!user) {
    return null;
  }

  // Only render the main content when we're sure about the user's status
  if (!userStatus) {
    return null;
  }

  // Only render the dashboard content if we're sure the user is not enrolled in a project
  if (isProjectEnrolled) {
    return null; // The router.replace will handle the navigation
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 lg:ml-72 transition-all duration-300">
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {isCheckingStatus ? (
              <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#58cc02]"></div>
              </div>
            ) : enrollmentSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-center max-w-2xl mx-auto shadow-sm"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#58CC02] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#58CC02]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Welcome Aboard!</h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                  You&apos;ve successfully enrolled in the project. Get ready to start your development journey!
                </p>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {renderStep()}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 