import React from 'react';
import { Lock } from 'lucide-react';

interface DaySelectorProps {
  days: number[];
  selectedDay: number;
  lockedMessageDay: number | null;
  onDaySelect: (day: number, isLocked: boolean) => void;
  maxUnlockedDay: number;
  isDayCompleted: (day: number) => boolean;
}

const DaySelector: React.FC<DaySelectorProps> = ({ 
  days, 
  selectedDay, 
  lockedMessageDay, 
  onDaySelect,
  maxUnlockedDay,
  isDayCompleted 
}) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3 max-w-7xl mx-auto px-4">
        {days.map((day) => {
          const isLocked = day > maxUnlockedDay;
          const isSelected = selectedDay === day;
          const isCompleted = isDayCompleted(day);

          return (
            <div
              key={day}
              onClick={() => onDaySelect(day, isLocked)}
              className={`
                relative flex flex-col items-center justify-center p-4
                rounded-xl backdrop-blur-sm transition-all duration-300 ease-in-out
                ${isSelected 
                  ? 'border-2 border-[#274c77] bg-white shadow-lg scale-105' 
                  : isCompleted
                    ? 'border-2 border-[#58cc02] bg-white hover:border-[#58cc02]'
                    : 'border border-gray-200 bg-white/80 hover:border-gray-300'
                }
                ${isLocked 
                  ? 'cursor-not-allowed' 
                  : 'cursor-pointer hover:shadow-md hover:scale-102'
                }
                group min-h-[100px]
              `}
            >
              {isLocked && (
                <div className="absolute inset-0 bg-gray-50/90 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-gray-500" />
                </div>
              )}
              <div className="flex flex-col items-center space-y-2">
                <h3 className={`text-lg font-bold ${
                  isSelected 
                    ? 'text-[#274c77]' 
                    : isCompleted
                      ? 'text-[#58cc02]'
                      : 'text-gray-700'
                }`}>
                  Day {day}
                </h3>
              </div>
              {lockedMessageDay === day && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 
                  px-4 py-2 bg-red-100 text-red-600 text-xs font-medium
                  rounded-lg shadow-sm whitespace-nowrap z-10
                  animate-fade-in-up">
                  Complete Day {maxUnlockedDay} to unlock
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaySelector;