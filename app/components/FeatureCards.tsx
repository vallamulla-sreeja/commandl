'use client';

import React from 'react';
import Image from 'next/image';
import Section from './ui/Section';
import Container from './ui/container';

interface Step {
  number: string;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Start with real projects, not tutorials',
    description:
      'Jump straight into building complete applications with our guided project paths. No more endless tutorials—learn by doing from day one.',
    image: '/gifs/Structured_path.gif',
  },
  {
    number: '02',
    title: 'Get instant AI feedback & earn rewards',
    description:
      'Our AI mentor reviews your code in real-time, suggests improvements, and rewards your progress with points and achievements.',
    image: '/gifs/rewards.gif',
  },
  {
    number: '03',
    title: 'Ship to production like a pro',
    description:
      'Experience real development workflows with task boards, version control, and deployment—all simplified for beginners.',
    image: '/gifs/task_dashboard.gif',
  },
];

export default function HowItWorksSection() {
  return (
    <Section size="lg" className="bg-surface-50 dark:bg-surface-900">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-50 mb-4">
            How it works
          </h2>
          <p className="text-lg md:text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Three simple steps to go from beginner to shipping real applications
          </p>
        </div>
        
        <div className="space-y-20 md:space-y-28">
          {steps.map((step, index) => (
            <StepSection key={index} step={step} index={index} />        
          ))}
        </div>
      </Container>
    </Section>
  );
}

function StepSection({ step, index }: { step: Step; index: number }) {
  const { number, title, description, image } = step;
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
      <div className="flex-1 text-center lg:text-left">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-2xl mb-6">
          {number}
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-surface-50 mb-4">
          {title}
        </h3>
        <p className="text-lg md:text-xl text-surface-600 dark:text-surface-400 max-w-xl">
          {description}
        </p>
      </div>
      
      <div className="flex-1 relative">
        <div className="relative rounded-xl overflow-hidden shadow-xl bg-white dark:bg-surface-800">
          <Image
            src={image}
            alt={title}
            width={900}
            height={562}
            className="w-full h-auto object-contain"
            priority={index === 0}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
