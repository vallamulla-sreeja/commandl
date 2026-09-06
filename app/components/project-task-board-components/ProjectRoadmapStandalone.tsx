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
      <div className="px-8 py-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-b border-emerald-100">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Project Roadmap
            </h2>
            <div className="flex items-center space-x-4 mt-2">
              <p className="text-lg text-gray-600 font-medium">
                {completedStages} of {totalStages} phases completed
              </p>
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                {progressPercentage}% Complete
              </div>
              {currentStageId && (
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Day {currentDayNumber} in progress
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Desktop Timeline (md and up) */}
      <div className="hidden md:block p-8 pb-16">
        <div className="relative mb-24">
          {/* Enhanced Progress bar */}
          <div className="absolute top-10 left-0 right-0 h-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full z-0 shadow-inner"></div>
          <div 
            className="absolute top-10 left-0 h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 z-10 transition-all duration-1000 ease-out rounded-full shadow-lg"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full animate-pulse"></div>
          </div>

          <div className="flex">
            {roadmapStages.map((stage, index) => (
              <div 
                key={stage.id} 
                className={`relative flex-1 ${index === 0 ? 'pl-0' : ''} ${index === roadmapStages.length - 1 ? 'pr-0' : ''}`}
              >
                                    {/* Enhanced Connector to next stage */}
                    {index < roadmapStages.length - 1 && (
                      <div 
                        className={`absolute top-10 right-0 w-1/2 h-2 rounded-full ${
                          stage.isCompleted && roadmapStages[index + 1].isCompleted
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md' 
                            : stage.isCompleted && roadmapStages[index + 1].isInProgress
                              ? 'bg-gradient-to-r from-emerald-500 to-blue-500 shadow-md'
                              : 'bg-transparent'
                        } z-20 transition-all duration-500`}
                      ></div>
                    )}

                <div className="flex flex-col items-center">
                  {/* Current indicator */}
                  {/* {stage.isInProgress && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                      In Progress
                    </div>
                  )} */}

                                        {/* Enhanced Stage marker */}
                      <div 
                        className={`
                          w-20 h-20 rounded-2xl flex items-center justify-center mb-4 z-20 relative
                          shadow-lg border-3 transition-all duration-300 cursor-pointer group
                          ${stage.isCompleted 
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-400 hover:from-emerald-600 hover:to-teal-700 hover:scale-110' 
                            : stage.isInProgress
                              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-400 hover:from-blue-600 hover:to-indigo-700 hover:scale-110'
                              : 'bg-gradient-to-br from-white to-gray-50 text-gray-500 border-gray-200 hover:border-gray-300 hover:shadow-xl hover:scale-105'}
                          ${stage.isInProgress ? 'ring-4 ring-blue-200 animate-pulse' : ''}
                        `}
                        onClick={() => toggleStage(stage.id)}
                      >
                        {/* Glow effect for completed stages */}
                        {stage.isCompleted && (
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-ping"></div>
                        )}
                        
                        <div className="relative z-10">
                          {stage.isCompleted ? <CheckCircle className="w-8 h-8" /> : stage.icon}
                        </div>
                        
                        {/* Hover tooltip */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="bg-gray-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                            Click to view details
                          </div>
                        </div>
                      </div>

                  {/* Day range */}
                  {/* <div className="text-xs font-medium text-gray-500 mb-1">
                    {stage.daysRange[0] === stage.daysRange[1]
                      ? `Day ${stage.daysRange[0]}`
                      : `Days ${stage.daysRange[0]}-${stage.daysRange[1]}`
                    }
                  </div> */}

                                        {/* Enhanced Title with status */}
                      <div className="text-center max-w-24">
                        <div className={`
                          font-bold text-base transition-all duration-300 leading-tight
                          ${stage.isCompleted 
                            ? 'text-emerald-600 drop-shadow-sm' 
                            : stage.isInProgress 
                              ? 'text-blue-600 font-extrabold animate-pulse' 
                              : 'text-gray-700 hover:text-gray-800'}
                        `}>
                          {stage.title}
                        </div>
                        {/* Status indicator */}
                        <div className="mt-1">
                          {stage.isCompleted && (
                            <div className="text-xs text-emerald-500 font-medium">✓ Complete</div>
                          )}
                          {stage.isInProgress && (
                            <div className="text-xs text-blue-500 font-medium animate-pulse">● In Progress</div>
                          )}
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

      {/* Enhanced Mobile Timeline (sm and below) */}
      <div className="md:hidden p-6">
        <div className="relative pb-6">
          {/* Enhanced Vertical timeline line */}
          <div className="absolute top-0 bottom-0 left-8 w-1 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full shadow-inner"></div>
          <div 
            className="absolute top-0 left-8 w-1 bg-gradient-to-b from-emerald-400 via-teal-500 to-emerald-600 transition-all duration-1000 ease-out rounded-full shadow-lg"
            style={{ height: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full animate-pulse"></div>
          </div>

          {/* Timeline stages */}
                      {roadmapStages.map((stage) => (
              <div key={stage.id} className={`
                mb-10 relative transition-all duration-300
                ${stage.isInProgress ? 'bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 -ml-4 border-l-4 border-blue-500 shadow-md' : ''}
              `}>
                <div className="flex items-start">
                  {/* Enhanced Stage marker */}
                  <div 
                    className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center mr-5 z-10 relative
                      shadow-lg border-3 transition-all duration-300 group
                      ${stage.isCompleted 
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-400 hover:scale-110' 
                        : stage.isInProgress 
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-400 hover:scale-110 animate-pulse' 
                          : 'bg-gradient-to-br from-white to-gray-50 text-gray-500 border-gray-200 hover:shadow-xl'}
                      ${stage.isInProgress ? 'ring-3 ring-blue-200' : ''}
                    `}
                  >
                    {/* Glow effect for completed stages */}
                    {stage.isCompleted && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-ping"></div>
                    )}
                    
                    <div className="relative z-10">
                      {stage.isCompleted ? <CheckCircle className="w-7 h-7" /> : stage.icon}
                    </div>
                  </div>

                <div className="flex-1">
                                      <div className="flex items-center justify-between">
                      {/* Enhanced Title and current indicator */}
                      <div>
                        <h3 className={`
                          font-bold text-lg transition-all duration-300
                          ${stage.isCompleted 
                            ? 'text-emerald-600 drop-shadow-sm' 
                            : stage.isInProgress 
                              ? 'text-blue-700 font-extrabold' 
                              : 'text-gray-700'}
                        `}>
                          {stage.title}
                          {stage.isInProgress && (
                            <span className="ml-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm px-3 py-1 rounded-full shadow-md animate-pulse">
                              ● Current Phase
                            </span>
                          )}
                          {stage.isCompleted && (
                            <span className="ml-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
                              ✓ Completed
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
                  
                                        {/* Enhanced Day range and status tag */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="px-2 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg">
                          {stage.daysRange[0] === stage.daysRange[1]
                            ? `Day ${stage.daysRange[0]}`
                            : `Days ${stage.daysRange[0]}-${stage.daysRange[1]}`
                          }
                        </div>
                        {stage.isInProgress && (
                          <div className="px-2 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-lg">
                            Day {currentDayNumber} Active
                          </div>
                        )}
                      </div>
                      
                      {/* Enhanced Expanded content */}
                      {activeStage === stage.id && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 border border-gray-200 rounded-xl shadow-sm animate-in slide-in-from-top-2 duration-300">
                          <p className="text-gray-700 leading-relaxed font-medium">{stage.description}</p>
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