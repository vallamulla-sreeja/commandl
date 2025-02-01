'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { ArrowDownCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import ResumeUpload from '../components/dashboard/ResumeUpload';
import ProjectSelection from '../components/dashboard/ProjectSelection';
import Enrollment from '../components/dashboard/Enrollment';
import { checkUserStatusAPI } from '../services/api';

type UserStatus = {
  isPaid: boolean;
};

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  techStack: string[];
};

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Task Management System',
    description: 'Build a smart task management system with AI-driven task prioritization and time estimation.',
    image: '/images/frontend_development.png',
    color: 'bg-[#ffffff]',
    techStack: ['React', 'Node.js', 'OpenAI API', 'MongoDB']
  },
  {
    id: '2',
    title: 'Real-time Collaboration Platform',
    description: 'Create a collaborative workspace with real-time document editing and team communication.',
    image: '/images/backend_development.png',
    color: 'bg-[#ffffff]',
    techStack: ['Next.js', 'Socket.io', 'PostgreSQL', 'Redis']
  },
  {
    id: '3',
    title: 'E-learning Management System',
    description: 'Develop a comprehensive e-learning platform with interactive courses and progress tracking.',
    image: '/images/software_development.png',
    color: 'bg-[#ffffff]',
    techStack: ['React', 'Django', 'AWS', 'PostgreSQL']
  }
];

export default function Dashboard() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await checkUserStatusAPI();
        const isPaid = response.extra === 'paid';
        setUserStatus({ isPaid });
      } catch (error) {
        console.error('Error checking user status:', error);
        setUserStatus({ isPaid: false });
      }
    };

    if (user) {
      checkUserStatus();
    }
  }, [user]);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleProjectSelection = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleProjectEnrollment = async () => {
    if (!selectedProject || !resumeFile) return;

    setIsEnrolling(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEnrollmentSuccess(true);
    } catch (error) {
      console.error('Error enrolling in project:', error);
    } finally {
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
          <ProjectSelection
            projects={PROJECTS}
            selectedProject={selectedProject}
            onProjectSelect={handleProjectSelection}
            onContinue={() => selectedProject && setCurrentStep(3)}
          />
        );
      case 3:
        return (
          <Enrollment
            projects={PROJECTS}
            selectedProject={selectedProject}
            isEnrolling={isEnrolling}
            onEnroll={handleProjectEnrollment}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error.message}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 lg:ml-72 transition-all duration-300 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {userStatus?.isPaid ? (
            <>
              {!enrollmentSuccess ? (
                <div className="space-y-8">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      <span className="bg-[#efccff] text-black px-4 py-2 rounded-md">
                        Project Enrollment
                      </span>
                    </h1>
                  </div>
                  <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-4">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step === currentStep
                                ? 'bg-[#58CC02] text-white'
                                : step < currentStep
                                ? 'bg-[#58CC02]/20 text-[#58CC02]'
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            {step}
                          </div>
                          {step < 3 && (
                            <div
                              className={`w-16 h-0.5 ${
                                step < currentStep ? 'bg-[#58CC02]' : 'bg-gray-200'
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {renderStep()}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-12 text-center max-w-2xl mx-auto shadow-sm"
                >
                  <div className="w-20 h-20 bg-[#58CC02] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-[#58CC02]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome Aboard!</h2>
                  <p className="text-xl text-gray-600 mb-8">
                    You&apos;ve successfully enrolled in the project. Get ready to start your development journey!
                  </p>
                  <div className="flex justify-center">
                    <button className="px-8 py-3 bg-[#58CC02] text-white rounded-xl font-semibold hover:bg-[#58CC02]/90 transition-colors">
                      Go to Project Dashboard
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <>
              <div className="text-center mb-6 lg:mb-8">
                <div className="flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-[#58CC02] bg-opacity-10 rounded-2xl mx-auto mb-4 lg:mb-6">
                  <ArrowDownCircleIcon className="w-6 h-6 lg:w-8 lg:h-8 text-[#58CC02]" />
                </div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">
                  Download CommandL Code Editor
                </h1>
                <p className="text-gray-600 text-base lg:text-lg mb-6 lg:mb-8 max-w-xl mx-auto">
                  To get started with CommandL, download our code editor and sign in with the email address you used to create your account.
                </p>
                <button className="buttonPrimary mb-6 lg:mb-8">
                  Download CommandL
                </button>
              </div>

              <div className="border-t border-gray-100 pt-6 lg:pt-8">
                <div className="flex items-start space-x-3 lg:space-x-4 max-w-xl mx-auto">
                  <div className="flex-shrink-0 mt-1">
                    <EnvelopeIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#1CB0F6]" />
                  </div>
                  <div>
                    <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                      Your Registered Email
                    </h2>
                    <p className="text-sm lg:text-base text-gray-600 mb-2">
                      Use this email address to sign in to the desktop application:
                    </p>
                    <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
                      <p className="font-medium text-sm lg:text-base text-gray-900">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
} 