import React from 'react';

interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex justify-end items-center mb-8">
      <span className="mr-4 text-lg font-medium text-gray-700">Time Left</span>
      <div className="font-mono text-lg text-[#274c77] tracking-wider">
        {String(days).padStart(2, '0')}:
        {String(hours).padStart(2, '0')}:
        {String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
};

export default CountdownTimer;