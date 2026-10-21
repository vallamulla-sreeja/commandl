import React from 'react';
import { CalendarDays, CheckCircle } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';

interface DaySelectorProps {
  selectedDay: number;
  lockedMessageDay: number | null;
  onDaySelect: (day: number) => void;
  maxUnlockedDay: number;
  isDayCompleted: (day: number) => boolean;
  completedDays: number[];
}

const DaySelector: React.FC<DaySelectorProps> = ({ 
  selectedDay, 
  lockedMessageDay, 
  onDaySelect,
  maxUnlockedDay,
  isDayCompleted,
  completedDays
}) => {
  const daysArray = Array.from({ length: 14 }, (_, i) => i + 1);

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 mx-auto mb-8 overflow-hidden">
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-[65%]">
          <div className="p-6 pb-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Day {selectedDay} of 14</h2>
                <p className="text-emerald-600 font-medium">Your learning journey progress</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-7 gap-3">
              {daysArray.map((day) => {
                const isLocked = day > maxUnlockedDay;
                const isSelected = selectedDay === day;
                const isCompleted = isDayCompleted(day);

                return (
                  <div key={day} className="relative group">
                    <button
                      onClick={() => onDaySelect(day)}
                      disabled={isLocked}
                      className={`
                        w-full h-16 rounded-xl transition-all duration-300 ease-out
                        flex flex-col items-center justify-center
                        border-2 relative overflow-hidden
                        ${isSelected 
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-400 transform scale-105 shadow-lg shadow-emerald-200' 
                          : isCompleted
                            ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200 hover:border-emerald-300 hover:shadow-md'
                            : isLocked
                              ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
                              : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-700 border-blue-200 hover:border-blue-300 hover:shadow-md hover:from-blue-100 hover:to-indigo-100'
                        }
                        ${!isLocked && !isSelected ? 'hover:scale-102 hover:-translate-y-0.5' : ''}
                      `}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                      )}
                      
                      <div className="relative z-10 flex flex-col items-center">
                        <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                          Day
                        </span>
                        <div className="flex items-center space-x-1">
                          <span className="text-lg font-bold">{day}</span>
                          {isCompleted && (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                      </div>

                      {isSelected && !isCompleted && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/40 rounded-full">
                          <div className="h-full bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </button>

                    {lockedMessageDay === day && (
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-medium rounded-lg shadow-lg whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span>Complete Day {maxUnlockedDay - 1} first</span>
                          </div>
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rotate-45"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-600 font-medium">
                    {completedDays.length} of 14 days completed
                  </span>
                </div>
                <div className="text-emerald-600 font-bold">
                  {Math.round((completedDays.length / 14) * 100)}% Complete
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700 ease-out"
                  style={{ width: `${(completedDays.length / 14) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[35%] border-t md:border-t-0 md:border-l border-gray-100 bg-gradient-to-br from-slate-50 to-blue-50/50">
          <div className="p-6 h-full flex flex-col">
            <ProgressIndicator 
              completedDays={completedDays}
              totalDays={14}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaySelector;