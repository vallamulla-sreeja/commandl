'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
// import { ArrowDownCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import ResumeUpload from '../components/dashboard/ResumeUpload';
import ProjectSelection from '../components/dashboard/ProjectSelection';
import AboutSection from '../components/dashboard/AboutSection';
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
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [about, setAbout] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

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
      
      // First upload the resume and get the URL
      let resumeUrl = null;
      if (resumeFile) {
        const formData = new FormData();
        formData.append('file', resumeFile);
        
        const resumeResponse = await fetch('/api/upload-resume', {
          method: 'POST',
          body: formData,
        });

        if (!resumeResponse.ok) {
          throw new Error('Failed to upload resume');
        }

        const resumeData = await resumeResponse.json();
        resumeUrl = resumeData.url;
      }

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
          resume_url: resumeUrl,
          about: about,
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
      case 1:
        return (
          <ResumeUpload
            resumeFile={resumeFile}
            onFileChange={handleResumeUpload}
            onContinue={() => resumeFile && setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <AboutSection
            about={about}
            onAboutChange={setAbout}
            onContinue={() => about.trim() && setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <GoalsSection
            selectedGoals={selectedGoals}
            onGoalToggle={handleGoalToggle}
            onContinue={() => selectedGoals.length >= 3 && setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
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
        if (!project || !resumeFile) return null;
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
            {!userStatus.isPaid ? (
              <div className="text-center p-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="text-center">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4b4b4b] mb-6 sm:mb-8">
                    Welcome to CommandL
                  </h1>
                  <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
                    {/* <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                      We&apos;re excited to have you on board.
                    </p> */}
                    <div className="inline-flex items-center justify-center space-x-2 bg-[#58CC02]/10 text-[#58CC02] font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>You&apos;re on our waitlist</span>
                    </div>
                  </div>
                </div>
              </div>
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
              <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    <span className="bg-[#efccff] text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-md inline-block">
                      Project Enrollment
                    </span>
                  </h1>
                </div>
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base ${
                            step === currentStep
                              ? 'bg-[#58CC02] text-white'
                              : step < currentStep
                              ? 'bg-[#58CC02]/20 text-[#58CC02]'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {step}
                        </div>
                        {step < 5 && (
                          <div
                            className={`w-8 sm:w-16 h-0.5 ${
                              step < currentStep ? 'bg-[#58CC02]' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-4 sm:px-6 lg:px-8">
                  {renderStep()}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 