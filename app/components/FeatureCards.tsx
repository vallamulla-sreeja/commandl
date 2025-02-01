'use client';

import React from 'react';
import Image from 'next/image';

interface Step {
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    title: 'Beginners way to build real projects',
    description:
      'A beginner-friendly code editor that guides you through building complete projects from start to finish, with everything you need in one place.',
    image: '/gifs/Structured_path.gif',
  },
  {
    title: 'Rewards & Feedback',
    description:
      'Earn points, badges, and instant feedback on every task to keep you motivated and accelerate your growth.',
    image: '/gifs/rewards.gif',
  },
  {
    title: 'Mimic Real-World Task Management',
    description:
      'Practice real dev workflows by moving tasks across boards, just like in professional environments, simplified for learning.',
    image: '/gifs/task_dashboard.gif',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl space-y-16 md:space-y-24 lg:space-y-32">
        {steps.map((step, index) => (
          <StepSection key={index} step={step} />        
        ))}
      </div>
    </section>
  );
}

function StepSection({ step }: { step: Step }) {
  const { title, description, image } = step;
  return (
    <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#58cc02' }}>
        {title}
      </h3>
      <p className="text-xl md:text-2xl text-[#4b4b4b] max-w-3xl mx-auto">
        {description}
      </p>
      <div className="relative w-full max-w-[900px] rounded-lg overflow-hidden shadow-lg">
        <Image
          src={image}
          alt={title}
          width={900}
          height={562}
          className="w-full h-auto object-contain"
          priority
          unoptimized
        />
        </div>
    </div>
  );
}
