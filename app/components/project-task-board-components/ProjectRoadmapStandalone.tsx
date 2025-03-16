import React, { useState, useEffect } from 'react';
import { CheckCircle, Code, Database, Server, Layers, Zap, BookOpen, Award, ChevronDown, ChevronUp } from 'lucide-react';

interface RoadmapStage {
  id: number;
  title: string;
  daysRange: [number, number];
  isCompleted: boolean;
  icon: React.ReactNode;
  description: string;
  isInProgress: boolean;
}

interface ProjectRoadmapStandaloneProps {
  completedDays: number[];
}

const ProjectRoadmapStandalone: React.FC<ProjectRoadmapStandaloneProps> = ({ completedDays }) => {
  // Function to determine current day in progress
  const determineCurrentStage = (stages: RoadmapStage[]): number | null => {
    // Find first incomplete stage
    const currentStage = stages.find(stage => !stage.isCompleted);
    return currentStage ? currentStage.id : null;
  };

  const roadmapStages: RoadmapStage[] = [
    {
      id: 1,
      title: "Basics",
      daysRange: [1, 2],
      isCompleted: completedDays.includes(1) && completedDays.includes(2),
      icon: <BookOpen className="w-5 h-5" />,
      description: "Set up your development environment and learn fundamental concepts.",
      isInProgress: false
    },
    {
      id: 2,
      title: "Frontend",
      daysRange: [3, 6],
      isCompleted: [3, 4, 5, 6].every(day => completedDays.includes(day)),
      icon: <Code className="w-5 h-5" />,
      description: "Build the user interface using modern web technologies.",
      isInProgress: false
    },
    {
      id: 3,
      title: "Backend",
      daysRange: [7, 8],
      isCompleted: [7, 8].every(day => completedDays.includes(day)),
      icon: <Server className="w-5 h-5" />,
      description: "Create a robust server-side application for business logic.",
      isInProgress: false
    },
    {
      id: 4,
      title: "Integration",
      daysRange: [9, 9],
      isCompleted: completedDays.includes(9),
      icon: <Layers className="w-5 h-5" />,
      description: "Connect frontend with backend components.",
      isInProgress: false
    },
    {
      id: 5,
      title: "Database",
      daysRange: [10, 10],
      isCompleted: completedDays.includes(10),
      icon: <Database className="w-5 h-5" />,
      description: "Add persistent data storage to your application.",
      isInProgress: false
    },
    {
      id: 6,
      title: "Full Stack",
      daysRange: [11, 13],
      isCompleted: [11, 12, 13].every(day => completedDays.includes(day)),
      icon: <Zap className="w-5 h-5" />,
      description: "Integrate all components including AI capabilities.",
      isInProgress: false
    },
    {
      id: 7,
      title: "Project Completion",
      daysRange: [14, 14],
      isCompleted: completedDays.includes(14),
      icon: <Award className="w-5 h-5" />,
      description: "Polish your application and prepare for deployment.",
      isInProgress: false
    }
  ];

  // Calculate current day/stage
  const currentDayNumber = completedDays.length + 1;
  
  // Mark the stage that contains the current day as "in progress"
  roadmapStages.forEach(stage => {
    const [start, end] = stage.daysRange;
    if (currentDayNumber >= start && currentDayNumber <= end && !stage.isCompleted) {
      stage.isInProgress = true;
    }
  });

  // Determine current stage
  const currentStageId = determineCurrentStage(roadmapStages);

  // State for expanded stage, initialize with current stage
  const [activeStage, setActiveStage] = useState<number | null>(null);

  // Set the active stage to current stage on initial load
  useEffect(() => {
    if (currentStageId) {
      setActiveStage(currentStageId);
    }
  }, [currentStageId]);

  const toggleStage = (id: number) => {
    setActiveStage(activeStage === id ? null : id);
  };

  // Calculate progress percentage
  const totalStages = roadmapStages.length;
  const completedStages = roadmapStages.filter(stage => stage.isCompleted).length;
  const progressPercentage = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;

  return (
    <>
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800">Project Roadmap</h2>
        <p className="text-sm text-gray-500 mt-1">
          {completedStages} of {totalStages} phases completed ({progressPercentage}%)
          {currentStageId && <span className="ml-2 text-blue-600">• Day {currentDayNumber} in progress</span>}
        </p>
      </div>

      {/* Desktop Timeline (md and up) */}
      <div className="hidden md:block p-6 pb-12">
        <div className="relative mb-20">
          {/* Progress bar */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 z-0"></div>
          <div 
            className="absolute top-8 left-0 h-1 bg-gradient-to-r from-green-500 to-[#58cc02] z-10 transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          ></div>

          <div className="flex">
            {roadmapStages.map((stage, index) => (
              <div 
                key={stage.id} 
                className={`relative flex-1 ${index === 0 ? 'pl-0' : ''} ${index === roadmapStages.length - 1 ? 'pr-0' : ''}`}
              >
                {/* Connector to next stage */}
                {index < roadmapStages.length - 1 && (
                  <div 
                    className={`absolute top-8 right-0 w-1/2 h-1 ${
                      stage.isCompleted && roadmapStages[index + 1].isCompleted
                        ? 'bg-[#58cc02]' 
                        : stage.isCompleted && roadmapStages[index + 1].isInProgress
                          ? 'bg-gradient-to-r from-[#58cc02] to-blue-500'
                          : 'bg-transparent'
                    } z-20`}
                  ></div>
                )}

                <div className="flex flex-col items-center">
                  {/* Current indicator */}
                  {/* {stage.isInProgress && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                      In Progress
                    </div>
                  )} */}

                  {/* Stage marker */}
                  <div 
                    className={`
                      w-16 h-16 rounded-full flex items-center justify-center mb-3 z-20
                      shadow-sm border-2 transition-all duration-300 cursor-pointer
                      ${stage.isCompleted 
                        ? 'bg-[#58cc02] text-white border-[#58cc02] hover:bg-green-600' 
                        : stage.isInProgress
                          ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}
                      ${stage.isInProgress ? 'ring-4 ring-blue-200' : ''}
                    `}
                    onClick={() => toggleStage(stage.id)}
                  >
                    {stage.isCompleted ? <CheckCircle className="w-7 h-7" /> : stage.icon}
                  </div>

                  {/* Day range */}
                  {/* <div className="text-xs font-medium text-gray-500 mb-1">
                    {stage.daysRange[0] === stage.daysRange[1]
                      ? `Day ${stage.daysRange[0]}`
                      : `Days ${stage.daysRange[0]}-${stage.daysRange[1]}`
                    }
                  </div> */}

                  {/* Title with status */}
                  <div className="text-center">
                    <div className={`
                      font-medium text-sm transition-colors duration-300
                      ${stage.isCompleted 
                        ? 'text-[#58cc02]' 
                        : stage.isInProgress 
                          ? 'text-blue-600 font-semibold' 
                          : 'text-gray-700'}
                    `}>
                      {stage.title}
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {/* {activeStage === stage.id && (
                  <div className="absolute mt-3 top-full left-1/2 transform -translate-x-1/2 w-56 bg-white shadow-lg rounded-lg p-3 border border-gray-100 z-30">
                    <div className="text-sm text-gray-600">{stage.description}</div>
                    <div className={`
                      mt-2 text-xs font-medium px-2 py-1 rounded-full text-center
                      ${stage.isCompleted 
                        ? 'bg-green-100 text-green-800' 
                        : stage.isInProgress 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-600'}
                    `}>
                      {stage.isCompleted 
                        ? 'Completed' 
                        : stage.isInProgress 
                          ? `In Progress (Day ${currentDayNumber})` 
                          : 'Not started yet'}
                    </div>
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Timeline (sm and below) */}
      <div className="md:hidden p-4">
        <div className="relative pb-4">
          {/* Vertical timeline line */}
          <div className="absolute top-0 bottom-0 left-7 w-0.5 bg-gray-200"></div>
          <div 
            className="absolute top-0 left-7 w-0.5 bg-[#58cc02] transition-all duration-700"
            style={{ height: `${progressPercentage}%` }}
          ></div>

          {/* Timeline stages */}
          {roadmapStages.map((stage) => (
            <div key={stage.id} className={`
              mb-8 relative
              ${stage.isInProgress ? 'bg-blue-50 rounded-lg p-2 -ml-2 border-l-4 border-blue-500' : ''}
            `}>
              <div className="flex items-start">
                {/* Stage marker */}
                <div 
                  className={`
                    w-14 h-14 rounded-full flex items-center justify-center mr-4 z-10
                    shadow-sm border-2 transition-all duration-300
                    ${stage.isCompleted 
                      ? 'bg-[#58cc02] text-white border-[#58cc02]' 
                      : stage.isInProgress 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'bg-white text-gray-500 border-gray-200'}
                    ${stage.isInProgress ? 'ring-2 ring-blue-300' : ''}
                  `}
                >
                  {stage.isCompleted ? <CheckCircle className="w-6 h-6" /> : stage.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    {/* Title and current indicator */}
                    <div>
                      <h3 className={`
                        font-medium transition-colors duration-300
                        ${stage.isCompleted 
                          ? 'text-[#58cc02]' 
                          : stage.isInProgress 
                            ? 'text-blue-700' 
                            : 'text-gray-700'}
                      `}>
                        {stage.title}
                        {stage.isInProgress && (
                          <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                            Current Day
                          </span>
                        )}
                      </h3>
                    </div>
                    
                    {/* Toggle button */}
                    <button 
                      onClick={() => toggleStage(stage.id)}
                      className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {activeStage === stage.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                  
                  {/* Day range and status tag */}
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500">
                      {stage.daysRange[0] === stage.daysRange[1]
                        ? `Day ${stage.daysRange[0]}`
                        : `Days ${stage.daysRange[0]}-${stage.daysRange[1]}`
                      }
                    </div>
                  </div>
                  
                  {/* Expanded content */}
                  {activeStage === stage.id && (
                    <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {stage.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectRoadmapStandalone; 