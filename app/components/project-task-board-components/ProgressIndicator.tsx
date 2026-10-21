import React from 'react';
import { BarChart2, TrendingUp, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProgressIndicatorProps {
  completedDays: number[];
  totalDays: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  completedDays, 
  totalDays
}) => {
  const router = useRouter();
  const progress = Math.round((completedDays.length / totalDays) * 100);
  
  const handleViewProgress = () => {
    // Convert the completedDays array to a comma-separated string for the URL
    const completedDaysParam = completedDays.join(',');
    router.push(`/project-progress?data=${completedDaysParam}`);
  };

  return (
    <div className="flex flex-col items-stretch justify-between gap-6 bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl border border-gray-200 h-full w-full shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">Your Progress</h3>
          <p className="text-sm text-gray-600">Project completion status</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-gray-800">Overall Progress</span>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {progress}%
            </span>
            {progress === 100 && (
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            )}
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="relative w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-4 shadow-inner overflow-hidden">
          <div 
            className="absolute top-0 left-0 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg" 
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full animate-pulse"></div>
          </div>
          
          {/* Progress glow effect */}
          {progress > 0 && (
            <div 
              className="absolute top-0 left-0 h-4 rounded-full bg-gradient-to-r from-emerald-300/50 to-teal-300/50 blur-sm transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-600 font-medium">Completion Status</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-emerald-600">{completedDays.length}</span>
            <span className="text-sm text-gray-500">of</span>
            <span className="text-sm font-bold text-gray-700">{totalDays}</span>
            <span className="text-sm text-gray-500">days</span>
          </div>
        </div>

        {/* Milestone indicators */}
        {progress > 0 && (
          <div className="mt-4 p-3 bg-white/60 rounded-xl border border-emerald-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {progress < 50 ? '🚀 Getting started!' : 
                 progress < 80 ? '⚡ Making great progress!' : 
                 progress < 100 ? '🎯 Almost there!' : 
                 '🎉 Project completed!'}
              </span>
              <span className="text-emerald-600 font-semibold">
                {completedDays.length > 0 && `Day ${Math.max(...completedDays)} completed`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Action Button */}
      <button
        onClick={handleViewProgress}
        className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-700 flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-auto group"
      >
        <BarChart2 className="w-5 h-5 mr-2 group-hover:animate-pulse" />
        View Detailed Roadmap
      </button>
    </div>
  );
};

export default ProgressIndicator; 