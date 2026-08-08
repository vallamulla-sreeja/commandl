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
import { toast, Toaster } from 'react-hot-toast';
import { profileApi, Profile } from '../services/api';
import { CheckCircle2, X, Crown } from 'lucide-react';

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
  const [userStatus, setUserStatus] = useState<UserStatus>({ isPaid: false });
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  
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
  // Add state for sidebar collapsed status
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Show toast notifications after a short delay
  useEffect(() => {
    if (userProfile && !isCheckingStatus && !isProjectEnrolled) {
      // Add a small delay before showing first toast
      const timeout1 = setTimeout(() => {
        toast.custom(
          (t) => (
            <div className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-opacity-5 border-l-4 border-[#58CC02]`}>
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#58CC02]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Did you know?
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      You&apos;ll get 1 year of free access to Code editor with this program!
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#58CC02] hover:text-[#58CC02]/80 focus:outline-none"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ),
          { duration: 5000 }
        );
      }, 3000);
      
      // Show second toast with a longer delay to ensure they don't overlap
      const timeout2 = setTimeout(() => {
        toast.custom(
          (t) => (
            <div className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-opacity-5 border-l-4 border-[#58CC02]`}>
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#58CC02]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Did you know?
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Personalizing your resume increases interview call chances by 3x. With this program, you&apos;ll have 3 months of unlimited access to this tool!
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#58CC02] hover:text-[#58CC02]/80 focus:outline-none"
                >
                  Great!
                </button>
              </div>
            </div>
          ),
          { duration: 5000 }
        );
      }, 12000); // Increased delay to ensure first toast is dismissed

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, [userProfile, isCheckingStatus, isProjectEnrolled]);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    let isMounted = true;

    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        const profile = await profileApi.getProfile();
        if (isMounted) {
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        if (error instanceof Error && error.message === 'Unauthorized') {
          await handleLogout();
          return;
        }
      }
    };

    const checkUserStatus = async () => {
      if (!user) return;

      try {
        // First check if user profile exists
        try {
          // Try to fetch the access token first to check if it's valid
          try {
            await fetchAccessToken();
          } catch (error) {
            console.error('Token fetch error:', error);
            // If token fetch fails, immediately logout
            await handleLogout();
            return;
          }
          
          const response = await fetch(`${BASE_URL}/profile`, {
            headers: {
              'Authorization': `Bearer ${await fetchAccessToken()}`
            }
          });
          
          if (response.status === 401) {
            // Token expired or invalid, redirect to logout
            console.log('Unauthorized response, logging out');
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
          
          // If profile exists, fetch it
          await fetchUserProfile();
          
        } catch (error) {
          console.error('Error checking user profile:', error);
          if (error instanceof Error && error.message === 'Unauthorized') {
            console.log('Unauthorized error, logging out');
            await handleLogout();
            return;
          }
          // For any other error, we should also consider logging out the user
          // as it might be related to token issues
          await handleLogout();
          return;
        }

        const response = await checkUserStatusAPI();
        if (!isMounted) return;

        const isPaid = response.extra === 'paid';
        setUserStatus({ isPaid });
        
        // Check if user is enrolled in a project
        const isEnrolled = response.project_enrolled === 'yes';
        setIsProjectEnrolled(isEnrolled);
        
        // Only redirect to project-task-board if the user is already enrolled in a project
        // This ensures both paid and unpaid users go through the enrollment process first
        if (isEnrolled) {
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
          // Remove the automatic redirect for unpaid users on error
          // Let them go through the enrollment process
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

  // Helper function to get the appropriate greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Function to handle opening the premium modal
  const handleOpenPremiumModal = () => {
    setShowPremiumModal(true);
  };
  
  // Function to handle closing the premium modal
  const handleClosePremiumModal = () => {
    setShowPremiumModal(false);
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

  // Premium Features Modal Component
  const PremiumFeaturesModal = () => {
    if (!showPremiumModal) return null;
    
    const features = [
      {
        title: "1 Year Full Access to CommandL",
        description: "Complete access to our powerful development environment with built-in AI assistance"
      },
      {
        title: "3 Months Unlimited AI Resume Generator",
        description: "Position yourself in the top 1% of job candidates with our advanced resume tool"
      },
      {
        title: "14 Days Daily Mentorship",
        description: "Get direct guidance from our founders and domain experts"
      },
      {
        title: "Advanced Projects Access",
        description: "Access to advanced projects as long as you have access to CommandL"
      },
      {
        title: "Full Stack Completion Certification",
        description: "Earn an official CommandL project completion certificate"
      },
      {
        title: "Weekly New Projects",
        description: "We&apos;re constantly adding new projects including AI/ML and App Development"
      }
    ];
    
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
        onClick={handleClosePremiumModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-[#58CC02] to-[#1cb0f6] p-4 sm:p-6 relative">
            <button
              onClick={handleClosePremiumModal}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex items-center mb-2">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 mr-2 sm:mr-3 flex-shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Unlock Premium Features</h2>
            </div>
            <p className="text-white/90 text-base sm:text-lg">
              Take your career to the next level with our comprehensive program
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-[#58CC02] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-[#4b4b4b] font-bold text-base sm:text-lg">{feature.title}</h4>
                  <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pricing and CTA */}
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col items-center mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <span className="text-xl sm:text-2xl font-bold text-gray-400 line-through">$250</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#4b4b4b]">$200</span>
              </div>
              <p className="text-[#FF4B4B] font-bold text-sm sm:text-base">One-time payment • 100% Money-Back Guarantee</p>
            </div>
            
            <div className="flex justify-center">
              <a
                href="https://buy.stripe.com/eVa9DB3fr9og0RqeUZ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-[#58CC02] text-white rounded-xl font-extrabold hover:bg-[#58CC02]/90 transition-colors text-lg sm:text-xl text-center"
              >
                Unlock All Features
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Toaster position="bottom-right" />
      <Sidebar isCollapsedCallback={setIsSidebarCollapsed} />
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
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
                <div className="flex justify-center">
                  <button 
                    onClick={() => router.push('/project-task-board')}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-[#58CC02] text-white rounded-lg sm:rounded-xl font-semibold hover:bg-[#58CC02]/90 transition-colors text-sm sm:text-base"
                  >
                    Go to Project Dashboard
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {!userStatus.isPaid && (
                  <div className="text-center p-4 mb-8">
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center">
                        {userProfile?.name ? (
                          <div className="bg-gradient-to-r from-[#e9f7e5] to-[#e5f5fc] p-6 rounded-xl shadow-sm mb-6">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#4b4b4b]">
                              <span className="text-[#58CC02]">{getGreeting()}</span>{' '}
                              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#58CC02] to-[#1cb0f6]">
                                {userProfile.name.split(' ')[0]}
                              </span>
                            </h1>
                            <p className="text-lg text-gray-700 mt-3">
                              Let&apos;s get started with the 14-day program!
                            </p>
                            <button
                              onClick={handleOpenPremiumModal}
                              className="mt-3 sm:mt-4 flex items-center mx-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-colors text-sm sm:text-base"
                            >
                              <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                              Unlock All Tasks & Features
                            </button>
                          </div>
                        ) : (
                          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#4b4b4b] mb-6">
                            Welcome to CommandL
                          </h1>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {renderStep()}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Render the Premium Features Modal */}
      <PremiumFeaturesModal />
    </div>
  );
} 