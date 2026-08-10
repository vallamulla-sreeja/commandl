import React from 'react';
import { BarChart2 } from 'lucide-react';
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
    <div className="flex flex-col items-stretch justify-between gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100 h-full w-full">
      <div className="w-full">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-700 font-medium">Project Progress</span>
          <span className="text-sm text-gray-700 font-medium">{progress}%</span>
        </div>
        <div className="relative w-full bg-gray-200 rounded-full h-3">
          <div 
            className="absolute top-0 left-0 bg-[#58cc02] h-3 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">Completion</span>
          <span className="text-xs text-gray-500">{completedDays.length}/{totalDays} days</span>
        </div>
      </div>
      <button
        onClick={handleViewProgress}
        className="w-full px-3 py-2.5 bg-[#58cc02] text-white font-medium rounded-md hover:bg-[#46a600] flex items-center justify-center transition-colors mt-auto"
      >
        <BarChart2 className="w-5 h-5 mr-2" />
        View Project Roadmap
      </button>
    </div>
  );
};

export default ProgressIndicator; 