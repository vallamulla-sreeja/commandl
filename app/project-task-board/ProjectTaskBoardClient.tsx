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
// import ProjectRoadmap from '../components/project-task-board-components/ProjectRoadmap';
import { DropResult } from 'react-beautiful-dnd';
import { debounce } from 'lodash';
import { Slide } from 'react-toastify';
import { Crown, CheckCircle2, X, Sparkles, TrendingUp } from 'lucide-react';
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
    color: #1a56db;
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  a:hover {
    color: #1e40af;
    text-shadow: 0 0 8px rgba(26, 86, 219, 0.2);
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
  
  // Initialize to day 1, but we'll update this immediately once we have task data
  const [selectedDay, setSelectedDay] = useState<number>(1);
  
  const [lockedMessageDay, setLockedMessageDay] = useState<number | null>(null);
  const [maxUnlockedDay, setMaxUnlockedDay] = useState<number>(1);
  const [urlInputs, setUrlInputs] = useState<{ [key: string]: string }>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(true);
  const [currentUnlockedTaskId, setCurrentUnlockedTaskId] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [dbTables, setDbTables] = useState<{ [key: string]: string[] }>({});
  const [codeFeedback, setCodeFeedback] = useState<{ 
    [key: string]: { 
      message: string, 
      feedback: string,
      results?: Record<string, unknown>[],
      ran_user_code?: boolean,
      code_to_execute?: string | null
    } 
  }>({});

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  useEffect(() => {
    const fetchData = async () => {
      if (fetchRef.current) return;
      fetchRef.current = true;
      
      // Clear any stored day preference from previous sessions
      // This ensures we always start with the in-progress day when the page first loads
      sessionStorage.removeItem('selectedDayManuallyChanged');
      
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
    if (tasks.length === 0) return;
    
    // Update maxUnlockedDay
    let maxDay = 1;
    for (let day = 1; day <= 14; day++) {
      const dayTasks = tasks.filter(task => task.day_assigned === day);
      const allDayTasksCompleted = dayTasks.length > 0 && dayTasks.every(task => task.status === 'Done');

      if (allDayTasksCompleted) {
        maxDay = day + 1;
      } else {
        break;
      }
    }
    setMaxUnlockedDay(Math.min(maxDay, 14));

    // Determine the current day for the user
    let currentDay = maxDay; // Default to the first unlocked day that isn't completed
    
    // If all days are completed, show the last day
    if (maxDay > 14) {
      currentDay = 14;
    }
    
    // Always set to the current in-progress day when the component first loads
    // or when tasks change, unless the user has manually selected a day in this session
    setSelectedDay(prevDay => {
      // If the user has manually changed the day in this session, respect their choice
      if (sessionStorage.getItem('selectedDayManuallyChanged')) {
        return prevDay;
      }
      // Otherwise, always set to the current in-progress day
      return currentDay;
    });

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

  const getVerificationKey = (subtaskId: string, value: string) => `${subtaskId}:${value}`;

  const debouncedSaveProgress = useMemo(() => 
    debounce(async (updatedTasks: Task[]) => {
      const savingToastId = toast.info('Saving changes...', {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        className: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-lg'
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
                input: st.more_info?.data?.verify_field ? urlInputs[st.id] || '' : undefined,
                db_tables: st.more_info?.data?.verify_field?.type === 'db_connection_string' ? dbTables[urlInputs[st.id] || ''] || [] : undefined,
                feedback: st.more_info?.data?.verify_field?.type === 'code_verify' && urlInputs[st.id] ? 
                  (codeFeedback[getVerificationKey(st.id, urlInputs[st.id])] || codeFeedback[urlInputs[st.id]]) : undefined
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
          className: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
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
          className: 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg'
        });
      }
    }, 1000),
    [urlInputs, dbTables, codeFeedback]
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
        className: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
      });
      
      // Show a toast with an upgrade button
      toast.info(
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <p className="font-medium">Upgrade to premium to access all features</p>
          </div>
          <button
            className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-200 transform hover:scale-105 shadow-md"
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
          className: 'bg-white shadow-xl border border-amber-200'
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
          className: 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg'
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
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-300" />
          <span>This task will be completed on CommandL. Please open CommandL. See task details for more info.</span>
        </div>,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          className: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
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
        className: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
      });
      
      // Show a toast with an upgrade button
      toast.info(
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <p className="font-medium">Upgrade to premium to access all features</p>
          </div>
          <button
            className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-200 transform hover:scale-105 shadow-md"
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
          className: 'bg-white shadow-xl border border-amber-200'
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
        className: 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 shadow-lg'
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

  const handleDaySelect = (day: number) => {
    if (day > maxUnlockedDay) {
      setLockedMessageDay(day);
      setTimeout(() => setLockedMessageDay(null), 2000);
    } else {
      setSelectedDay(day);
      // Mark that the user has manually changed the day in this session
      sessionStorage.setItem('selectedDayManuallyChanged', 'true');
    }
  };

  const closeTaskDetails = () => {
    setSelectedTaskId(null);
  };

  const filteredTasks = tasks.filter(task => task.day_assigned === selectedDay);

  const completedDaysMap = useMemo(() => {
    const map = new Map<number, boolean>();
    for (let day = 1; day <= 14; day++) {
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
  
  // Enhanced Premium Features Modal Component
  const PremiumFeaturesModal = () => {
    if (!showPremiumModal) return null;
    
    const features = [
      {
        title: "1 Year Full Access to CommandL",
        description: "Complete access to our powerful development environment with built-in AI assistance",
        icon: <TrendingUp className="w-6 h-6" />
      },
      {
        title: "3 Months Unlimited AI Resume Generator",
        description: "Position yourself in the top 1% of job candidates with our advanced resume tool",
        icon: <Sparkles className="w-6 h-6" />
      },
      {
        title: "14 Days Daily Mentorship",
        description: "Get direct guidance from our founders and domain experts",
        icon: <CheckCircle2 className="w-6 h-6" />
      },
      {
        title: "Advanced Projects Access",
        description: "Access to advanced projects as long as you have access to CommandL",
        icon: <Crown className="w-6 h-6" />
      },
      {
        title: "Full Stack Completion Certification",
        description: "Earn an official CommandL project completion certificate",
        icon: <CheckCircle2 className="w-6 h-6" />
      },
      {
        title: "Weekly New Projects",
        description: "We're constantly adding new projects including AI/ML and App Development",
        icon: <Sparkles className="w-6 h-6" />
      }
    ];
    
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
        onClick={handleClosePremiumModal}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
        >
          {/* Enhanced Header with gradient background */}
          <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <button
              onClick={handleClosePremiumModal}
              className="absolute right-4 top-4 text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-yellow-400/20 rounded-full mr-4">
                  <Crown className="w-8 h-8 text-yellow-300" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Unlock Premium Features</h2>
                  <p className="text-emerald-100 text-lg">
                    Take your career to the next level with our comprehensive program
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Features Grid */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-emerald-50/50 hover:to-teal-50/50"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 group-hover:bg-emerald-200 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-bold text-lg mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced Pricing and CTA */}
          <div className="p-8 bg-gradient-to-r from-gray-50 to-emerald-50/30 border-t border-gray-100">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-2xl font-bold text-gray-400 line-through">$250</span>
                <div className="flex items-center">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    $200
                  </span>
                  <div className="ml-2 px-2 py-1 bg-red-500 text-white text-sm font-bold rounded-full animate-pulse">
                    SAVE $50
                  </div>
                </div>
              </div>
              <p className="text-red-600 font-bold text-lg mb-2">One-time payment • 100% Money-Back Guarantee</p>
              <p className="text-gray-600">Join 500+ students who&apos;ve transformed their careers</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <a
                href="https://buy.stripe.com/eVa9DB3fr9og0RqeUZ"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 text-xl text-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🚀 Unlock All Features Now
              </a>
              <p className="text-center text-sm text-gray-500 mt-3">
                Start building your portfolio in minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const completedDaysArray = useMemo(() => {
    const completedDays: number[] = [];
    for (let day = 1; day <= 14; day++) {
      if (isDayCompleted(day)) {
        completedDays.push(day);
      }
    }
    return completedDays;
  }, [isDayCompleted]);

  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your project dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600 mb-2">Error Loading Project</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-2">No Project Found</p>
          <p className="text-gray-600">Please enroll in a project first to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 ${nunito.className}`}>
      <div className="container mx-auto px-4 py-8">
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
          toastClassName="rounded-xl shadow-lg"
        />

        {/* Enhanced Premium banner for unpaid users */}
        {!isPremiumUser && (
          <div className="relative overflow-hidden bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white p-6 mb-8 rounded-2xl shadow-xl mx-4 md:mx-6 lg:mx-8 animate-in slide-in-from-top duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-start">
                  <div className="p-3 bg-white/20 rounded-full mr-4 flex-shrink-0">
                    <Crown className="w-6 h-6 text-yellow-200" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Unlock All Tasks & Premium Features</h3>
                    <p className="text-amber-100 font-medium text-lg leading-relaxed">
                      Start your first project and get full access to CommandL IDE
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    className="px-6 py-3 bg-white text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap"
                    onClick={handleOpenPremiumModal}
                  >
                    View Features
                  </button>
                  <a
                    href="https://buy.stripe.com/eVa9DB3fr9og0RqeUZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:scale-105 shadow-lg text-center"
                  >
                    Upgrade Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <DaySelector
          selectedDay={selectedDay}
          lockedMessageDay={lockedMessageDay}
          onDaySelect={handleDaySelect}
          maxUnlockedDay={maxUnlockedDay}
          isDayCompleted={isDayCompleted}
          completedDays={completedDaysArray}
        />

        <AssignmentHeader
          title={assignment.title}
          description={assignment.description}
        />

        {allTasksCompleted && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-xl shadow-sm animate-in slide-in-from-left duration-500">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <p className="font-semibold text-lg">
                🎉 Congratulations! All tasks for Day {selectedDay} are completed.
              </p>
            </div>
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
          dbTables={dbTables}
          setDbTables={setDbTables}
          codeFeedback={codeFeedback}
          setCodeFeedback={setCodeFeedback}
        />

        {selectedDay > maxUnlockedDay && (
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 text-yellow-800 rounded-xl shadow-sm animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <p className="font-semibold">
                This day is currently locked. Please complete Day {maxUnlockedDay - 1} to unlock Day {selectedDay}.
              </p>
            </div>
          </div>
        )}

        {showPremiumModal && <PremiumFeaturesModal />}
      </div>
    </div>
  );
};

export default AssignmentPage;