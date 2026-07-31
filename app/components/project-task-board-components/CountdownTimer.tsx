import React from 'react';
import { Timer } from 'lucide-react';

interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
    <span className="text-2xl font-mono font-bold text-[#274c77]">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-xs text-gray-500 font-medium mt-1">{label}</span>
  </div>
);

const CountdownTimer: React.FC<CountdownTimerProps> = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mb-8 px-4">
      <div className="flex items-center gap-2 text-gray-700">
        <Timer className="w-5 h-5" />
        <span className="font-medium">Time Remaining</span>
      </div>
      <div className="flex gap-3">
        <TimeUnit value={days} label="DAYS" />
        <TimeUnit value={hours} label="HOURS" />
        <TimeUnit value={minutes} label="MINS" />
        <TimeUnit value={seconds} label="SECS" />
      </div>
    </div>
  );
};

export default CountdownTimer;