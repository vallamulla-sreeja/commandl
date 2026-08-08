'use client';

import { Nunito } from 'next/font/google';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { fetchAccessToken } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../services/api';
// import CountdownTimer from '../components/project-task-board-components/CountdownTimer';
import DaySelector from '../components/project-task-board-components/DaySelector';
import AssignmentHeader from '../components/project-task-board-components/AssignmentHeader';
import TaskBoard from '../components/project-task-board-components/TaskBoard';
import TaskDetails from '../components/project-task-board-components/TaskDetails';
import { DropResult } from 'react-beautiful-dnd';
import { debounce } from 'lodash';
import { Slide } from 'react-toastify';
import { Crown, CheckCircle2, X } from 'lucide-react';
// import ApplyFor10DayProgram from '../components/project-task-board-components/applyFor10DayProgram';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

interface MoreInfo {
  data: {
    verify_field: {
      type: string;
    };
  };
}

interface ApiSubtask {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  spark_studio?: boolean;
  more_info?: MoreInfo | null;
}

interface ApiTask {
  id: string;
  title: string;
  description?: string;
  subtasks?: ApiSubtask[];
  status?: 'To Do' | 'In Progress' | 'Done';
  day_assigned: number;
}

interface Subtask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  spark_studio?: boolean;
  more_info?: MoreInfo | null;
}

interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
  status: 'To Do' | 'In Progress' | 'Done';
  completed?: boolean;
  day_assigned: number;
  hasLimitedDetails?: boolean;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
}

interface AssignmentPageProps {
  params: {
    id: string;
    sectionId: string;
    assignmentId: string;
  };
}

const markdownLinkStyles = `
  a {
    color: #274c77;
    text-decoration: underline;
    font-weight: 500;
    transition: color 0.2s ease;
  }
  a:hover {
    color: #1e3a5f;
  }
`;

const AssignmentPage: React.FC<AssignmentPageProps> = () => {
  const fetchRef = useRef(false);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [expandedSubtasks, setExpandedSubtasks] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allTasksCompleted, setAllTasksCompleted] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [lockedMessageDay, setLockedMessageDay] = useState<number | null>(null);
  const [maxUnlockedDay, setMaxUnlockedDay] = useState<number>(1);
  const [urlInputs, setUrlInputs] = useState<{ [key: string]: string }>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(true);
  const [currentUnlockedTaskId, setCurrentUnlockedTaskId] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  useEffect(() => {
    const fetchData = async () => {
      if (fetchRef.current) return;
      fetchRef.current = true;
      
      setIsLoading(true);
      
      try {
        const token = await fetchAccessToken();
        const response = await fetch(`${BASE_URL}/projects-with-tasks`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }

        const data = await response.json();
        const projects = data.projects || [];
        const isPaid = data.isPaid !== false;

        if (projects.length === 0) {
          setAssignment(null);
          setTasks([]);
          setIsInitialized(true);
          setIsLoading(false);
          return;
        }

        const project = projects[0];

        const newAssignment: Assignment = {
          id: project.project_id.toString(),
          title: project.title,
          description: project.description || 'No description provided.'
        };

        const newTasks: Task[] = (project.tasks as ApiTask[] || []).map((task: ApiTask) => {
          // Check if this task has limited details (minimal subtasks data)
          const hasLimitedDetails = task.subtasks?.some(st => 
            !st.description || st.description.trim() === ''
          ) || false;

          const subtasks = (task.subtasks || [])
            .map((st: ApiSubtask) => ({
              id: st.id,
              title: st.title,
              description: st.description || '',
              completed: st.completed || false,
              spark_studio: st.spark_studio || false,
              more_info: st.more_info || null,
            }))
            .sort((a: { id: string; }, b: { id: string; }) => parseInt(a.id) - parseInt(b.id));

          return {
            id: task.id,
            title: task.title,
            description: task.description || '',
            status: task.status || 'To Do',
            subtasks: subtasks,
            day_assigned: task.day_assigned,
            hasLimitedDetails: hasLimitedDetails
          };
        });

        setAssignment(newAssignment);
        setTasks(newTasks);
        setIsPremiumUser(isPaid);
        setIsInitialized(true);
        setIsLoading(false);

      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        setIsInitialized(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array, fetch only runs once

  // Combine tasks-dependent effects
  useEffect(() => {
    // Update maxUnlockedDay
    let maxDay = 1;
    for (let day = 1; day <= 10; day++) {
      const dayTasks = tasks.filter(task => task.day_assigned === day);
      const allDayTasksCompleted = dayTasks.length > 0 && dayTasks.every(task => task.status === 'Done');

      if (allDayTasksCompleted) {
        maxDay = day + 1;
      } else {
        break;
      }
    }
    setMaxUnlockedDay(Math.min(maxDay, 10));

    // Update allTasksCompleted
    const allDone = tasks.every((task) => task.status === 'Done');
    setAllTasksCompleted(allDone);
    
    // Update currentUnlockedTaskId
    if (tasks.length === 0) {
      setCurrentUnlockedTaskId(null);
      return;
    }

    let unlockedTaskId = tasks[0].id;
    for (let i = 0; i < tasks.length; i++) {
      if (i === 0 || tasks[i - 1].subtasks.every(st => st.completed)) {
        unlockedTaskId = tasks[i].id;
      } else {
        break;
      }
    }
    setCurrentUnlockedTaskId(unlockedTaskId);
  }, [tasks]);

  // useEffect(() => {
  //   const startDate = new Date('2024-12-28T00:00:00.000Z');
  //   const endDate = new Date(startDate);
  //   endDate.setDate(endDate.getDate() + 6);

  //   const timer = setInterval(() => {
  //     const now = new Date();
  //     const diff = endDate.getTime() - now.getTime();

  //     if (diff <= 0) {
  //       setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  //       clearInterval(timer);
  //       return;
  //     }

  //     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  //     setTimeRemaining({ days, hours, minutes, seconds });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  const getTaskProgress = (task: Task) => {
    const completed = task.subtasks.filter((st) => st.completed).length;
    const total = task.subtasks.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const isTaskLocked = (task: Task): boolean => {
    // For unpaid users with limited details tasks
    if (!isPremiumUser && task.hasLimitedDetails) {
      return true;
    }
    
    // For paid users, use the original locking logic
    if (!currentUnlockedTaskId) return task.id !== tasks[0]?.id;
     
    const taskIndex = tasks.findIndex(t => t.id === task.id);
    if (taskIndex === 0) return false;
     
    const previousTask = tasks[taskIndex - 1];
    return !previousTask.subtasks.every(st => st.completed);
  };

  const debouncedSaveProgress = useMemo(() => 
    debounce(async (updatedTasks: Task[]) => {
      const savingToastId = toast.info('Saving changes...', {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        className: 'bg-blue-500 text-white font-medium'
      });

      try {
        const token = await fetchAccessToken();
        const response = await fetch(`${BASE_URL}/save-progress-project-building`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tasks: updatedTasks.map((task) => ({
              id: task.id,
              status: task.status,
              subtasks: task.subtasks.map((st) => ({
                id: st.id,
                completed: st.completed,
                input: st.more_info?.data?.verify_field ? urlInputs[st.id] || '' : undefined
              }))
            })),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save progress');
        }

        toast.dismiss(savingToastId);
        toast.success('Progress saved!', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      } catch (error) {
        console.error('Error saving progress:', error);
        toast.dismiss(savingToastId);
        toast.error('Failed to save progress. Please try again.', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    }, 1000),
    [urlInputs]
  );

  const handleSaveProgress = useCallback((updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    debouncedSaveProgress(updatedTasks);
  }, [debouncedSaveProgress]);

  const taskHasSparkStudio = (task: Task) => {
    return task.subtasks.some((st) => st.spark_studio === true);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const task = tasks.find((t) => t.id === draggableId);
    if (!task || task.day_assigned > maxUnlockedDay) return;

    // For unpaid users, only block premium task movements
    if (!isPremiumUser && task.hasLimitedDetails) {
      toast.error('Upgrade to premium to move this task', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      
      // Show a toast with an upgrade button
      toast.info(
        <div className="flex flex-col items-center">
          <p className="mb-2">Upgrade to premium to access all features</p>
          <button
            className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
            onClick={() => {
              window.open('https://buy.stripe.com/eVa9DB3fr9og0RqeUZ', '_blank');
            }}
          >
            Upgrade Now
          </button>
        </div>,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        }
      );
      
      return;
    }

    const sourceStatus = source.droppableId as Task['status'];
    const destStatus = destination.droppableId as Task['status'];

    if (sourceStatus === destStatus) return;

    if (destStatus === 'Done') {
      const allSubtasksCompleted = task.subtasks.every((subtask) => subtask.completed);
      if (!allSubtasksCompleted) {
        toast.error('Complete all subtasks before moving to Done', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        return;
      }
    }

    const movingToInProgressFromDifferentStatus =
      destStatus === 'In Progress' && sourceStatus !== 'In Progress';

    const updatedTasks = tasks.map((t) =>
      t.id === draggableId ? { ...t, status: destStatus } : t
    );

    handleSaveProgress(updatedTasks);

    if (movingToInProgressFromDifferentStatus && taskHasSparkStudio(task)) {
      toast.info(
        "This task will be completed on CommandL. Please open CommandL. See task details for more info.",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        }
      );
    }
  };

  const handleSubtaskToggle = (taskId: string, subtaskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.day_assigned > maxUnlockedDay) {
      return;
    }

    // For unpaid users, only block premium tasks
    if (!isPremiumUser && task.hasLimitedDetails) {
      toast.error('Upgrade to premium to complete this task', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      
      // Show a toast with an upgrade button
      toast.info(
        <div className="flex flex-col items-center">
          <p className="mb-2">Upgrade to premium to access all features</p>
          <button
            className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
            onClick={() => {
              window.open('https://buy.stripe.com/eVa9DB3fr9og0RqeUZ', '_blank');
            }}
          >
            Upgrade Now
          </button>
        </div>,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        }
      );
      
      return;
    }
    
    // For paid users, follow the normal logic
    const updatedTasks = tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          subtasks: t.subtasks.map(st => 
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          )
        };
      }
      return t;
    });

    handleSaveProgress(updatedTasks);
  };

  const handleTaskClick = (task: Task) => {
    // For unpaid users with limited details tasks
    if (!isPremiumUser && task.hasLimitedDetails) {
      setSelectedTaskId(task.id);
      return;
    }
    
    // For paid users, follow the normal locking logic
    if (isTaskLocked(task)) {
      toast.warning('Please complete the previous task before proceeding to this one.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      return;
    }
    setSelectedTaskId(task.id);
  };

  const toggleSubtaskDescription = (subtaskId: string) => {
    setExpandedSubtasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subtaskId)) {
        newSet.delete(subtaskId);
      } else {
        newSet.add(subtaskId);
      }
      return newSet;
    });
  };

  // const handleDaySelect = (day: number, isLocked: boolean) => {
  const handleDaySelect = (day: number) => {
    if (day > maxUnlockedDay) {
      setLockedMessageDay(day);
      setTimeout(() => setLockedMessageDay(null), 2000);
    } else {
      setSelectedDay(day);
    }
  };

  const closeTaskDetails = () => {
    setSelectedTaskId(null);
  };

  const filteredTasks = tasks.filter(task => task.day_assigned === selectedDay);

  const completedDaysMap = useMemo(() => {
    const map = new Map<number, boolean>();
    for (let day = 1; day <= 10; day++) {
      const dayTasks = tasks.filter(task => task.day_assigned === day);
      const completed = dayTasks.length > 0 && dayTasks.every(task => task.status === 'Done');
      map.set(day, completed);
    }
    return map;
  }, [tasks]);

  const isDayCompleted = useCallback((day: number) => {
    return completedDaysMap.get(day) || false;
  }, [completedDaysMap]);

  const handleUrlChange = (subtaskId: string, value: string) => {
    setUrlInputs(prev => ({
      ...prev,
      [subtaskId]: value
    }));
  };

  // Function to handle opening the premium modal
  const handleOpenPremiumModal = () => {
    setShowPremiumModal(true);
  };
  
  // Function to handle closing the premium modal
  const handleClosePremiumModal = () => {
    setShowPremiumModal(false);
  };
  
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
        description: "We're constantly adding new projects including AI/ML and App Development"
      }
    ];
    
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
        onClick={handleClosePremiumModal}
      >
        <div
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
        </div>
      </div>
    );
  };

  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-[#58cc02]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <div className="text-center">
          <p className="text-xl font-semibold mb-2">Error Loading Project</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold mb-2">No Project Found</p>
          <p className="text-gray-600">Please enroll in a project first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 min-h-screen relative ${nunito.className}`}>
      <ToastContainer 
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        limit={2}
        transition={Slide}
      />

      {/* Premium banner for unpaid users */}
      {!isPremiumUser && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 sm:p-4 mb-4 sm:mb-6 rounded-lg shadow-md mx-3 sm:mx-4 md:mx-6 lg:mx-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div className="flex items-start sm:items-center">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-base sm:text-lg">Unlock All Tasks & Features</h3>
                <p className="text-amber-100 font-bold text-sm sm:text-base">Start your first project and get full access to AI resume tool and CommandL</p>
              </div>
            </div>
            <button 
              className="px-4 py-2 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors text-sm sm:text-base whitespace-nowrap"
              onClick={handleOpenPremiumModal}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* <CountdownTimer
        days={timeRemaining.days}
        hours={timeRemaining.hours}
        minutes={timeRemaining.minutes}
        seconds={timeRemaining.seconds}
      /> */}

      <DaySelector
        selectedDay={selectedDay}
        lockedMessageDay={lockedMessageDay}
        onDaySelect={handleDaySelect}
        maxUnlockedDay={maxUnlockedDay}
        isDayCompleted={isDayCompleted}
      />

      <AssignmentHeader
        title={assignment.title}
        description={assignment.description}
      />

      {allTasksCompleted && (
        <div className="mb-8 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 text-sm sm:text-base">
          <p>Congratulations! All the tasks for Day {selectedDay} are done.</p>
        </div>
      )}

      <TaskBoard
        tasks={filteredTasks}
        onDragEnd={onDragEnd}
        handleTaskClick={handleTaskClick}
        getTaskProgress={getTaskProgress}
        isTaskLocked={isTaskLocked}
      />

      <TaskDetails
        selectedTask={selectedTask || null}
        expandedSubtasks={expandedSubtasks}
        toggleSubtaskDescription={toggleSubtaskDescription}
        handleSubtaskToggle={handleSubtaskToggle}
        markdownLinkStyles={markdownLinkStyles}
        selectedDay={selectedDay}
        maxUnlockedDay={maxUnlockedDay}
        onClose={closeTaskDetails}
        urlInputs={urlInputs}
        handleUrlChange={handleUrlChange}
      />

      {selectedDay > maxUnlockedDay && (
        <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 text-sm sm:text-base">
          <p>This day is currently locked. Please complete Day {maxUnlockedDay - 1} to unlock Day {selectedDay}.</p>
        </div>
      )}

      {/* Render the Premium Features Modal */}
      <PremiumFeaturesModal />
    </div>
  );
};

export default AssignmentPage;