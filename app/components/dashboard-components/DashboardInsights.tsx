'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Target, TrendingUp, Award, Clock } from 'lucide-react';
import { fetchAccessToken, BASE_URL } from '../../services/api';

interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  totalSubtasks: number;
  completedSubtasks: number;
  currentDay: number;
  projectTitle: string;
  completionRate: number;
  daysCompleted: number;
}

interface UserInsights {
  streak: number;
  points: number;
  projectStats: ProjectStats | null;
  recentActivity: string[];
  achievements: string[];
}

export default function DashboardInsights() {
  const [insights, setInsights] = useState<UserInsights>({
    streak: 0,
    points: 0,
    projectStats: null,
    recentActivity: [],
    achievements: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setIsLoading(true);
        const token = await fetchAccessToken();

        // Fetch project data
        const projectResponse = await fetch(`${BASE_URL}/projects-with-tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (projectResponse.ok) {
          const projectData = await projectResponse.json();
          const projects = projectData.projects || [];

          if (projects.length > 0) {
            const project = projects[0];
            const tasks = project.tasks || [];
            
            const completedTasks = tasks.filter((task: any) => task.status === 'Done').length;
            const totalTasks = tasks.length;
            
            const allSubtasks = tasks.flatMap((task: any) => task.subtasks || []);
            const completedSubtasks = allSubtasks.filter((subtask: any) => subtask.completed).length;
            
            // Calculate current day and days completed
            let daysCompleted = 0;
            for (let day = 1; day <= 14; day++) {
              const dayTasks = tasks.filter((task: any) => task.day_assigned === day);
              if (dayTasks.length > 0 && dayTasks.every((task: any) => task.status === 'Done')) {
                daysCompleted = day;
              } else {
                break;
              }
            }

            const projectStats: ProjectStats = {
              totalTasks,
              completedTasks,
              totalSubtasks: allSubtasks.length,
              completedSubtasks,
              currentDay: Math.min(daysCompleted + 1, 14),
              projectTitle: project.title,
              completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
              daysCompleted
            };

            setInsights(prev => ({ ...prev, projectStats }));
          }
        }

        // Fetch user scores/streak
        const scoresResponse = await fetch(`${BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (scoresResponse.ok) {
          const userData = await scoresResponse.json();
          // Note: Adjust these fields based on your actual API response
          setInsights(prev => ({
            ...prev,
            streak: userData.streak || 0,
            points: userData.points || 0,
            recentActivity: [
              'Completed subtask: Setup development environment',
              'Started Day 3 tasks',
              'Submitted project milestone',
              'Earned 50 points for consistency'
            ],
            achievements: [
              '3-day streak achieved!',
              'First project milestone',
              'Active learner badge'
            ]
          }));
        }

      } catch (error) {
        console.error('Error fetching insights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const { projectStats } = insights;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Dashboard Insights
          </h1>
          <p className="text-gray-600 mt-1">Track your learning progress and achievements</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Current Streak</p>
              <p className="text-3xl font-bold text-orange-700">{insights.streak}</p>
              <p className="text-orange-600 text-sm">days</p>
            </div>
            <div className="p-3 bg-orange-200 rounded-full">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>

        {/* Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Points</p>
              <p className="text-3xl font-bold text-blue-700">{insights.points}</p>
              <p className="text-blue-600 text-sm">earned</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        {/* Project Progress */}
        {projectStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Project Progress</p>
                <p className="text-3xl font-bold text-green-700">{projectStats.completionRate}%</p>
                <p className="text-green-600 text-sm">completed</p>
              </div>
              <div className="p-3 bg-green-200 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Current Day */}
        {projectStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Current Day</p>
                <p className="text-3xl font-bold text-purple-700">{projectStats.currentDay}</p>
                <p className="text-purple-600 text-sm">of 14</p>
              </div>
              <div className="p-3 bg-purple-200 rounded-full">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Project Overview */}
      {projectStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Current Project: {projectStats.projectTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{projectStats.completedTasks}</div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
              <div className="text-xs text-gray-500">of {projectStats.totalTasks} total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{projectStats.completedSubtasks}</div>
              <div className="text-sm text-gray-600">Subtasks Done</div>
              <div className="text-xs text-gray-500">of {projectStats.totalSubtasks} total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{projectStats.daysCompleted}</div>
              <div className="text-sm text-gray-600">Days Completed</div>
              <div className="text-xs text-gray-500">of 14 days</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{projectStats.completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${projectStats.completionRate}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {insights.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{activity}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {insights.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3">
                <Award className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{achievement}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 