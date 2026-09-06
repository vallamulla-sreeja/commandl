'use client';

import React, { useEffect, useState, useRef } from 'react';
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
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Enhanced background decoration with moving gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Existing static gradients */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gradient-to-r from-purple-100/50 to-green-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-gradient-to-r from-green-100/50 to-blue-100/50 rounded-full blur-3xl"></div>
        
        {/* New moving gradient orbs */}
        <div className="absolute top-16 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/5 w-64 h-64 bg-gradient-to-r from-green-200/40 to-teal-200/40 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/6 w-72 h-72 bg-gradient-to-r from-blue-200/40 to-indigo-200/40 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-16 right-1/3 w-56 h-56 bg-gradient-to-r from-yellow-200/30 to-orange-200/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ animationDelay: '6s' }}></div>
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-300/50 to-green-300/50 rounded-full animate-bounce opacity-30"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl space-y-16 md:space-y-24 lg:space-y-32 relative z-10">
        {steps.map((step, index) => (
          <StepSection key={index} step={step} index={index} />        
        ))}
      </div>
    </section>
  );
}

function StepSection({ step, index }: { step: Step; index: number }) {
  const { title, description, image } = step;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={ref}
      className={`flex flex-col items-center text-center space-y-6 md:space-y-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <h3 
        className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#58cc02] to-[#4CAF02] bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default"
      >
        {title}
      </h3>
      <p className="text-xl md:text-2xl text-[#4b4b4b] max-w-3xl mx-auto leading-relaxed">
        {description}
      </p>
      <div className="relative w-full max-w-[900px] group">
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-200/50 via-green-200/50 to-blue-200/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Main container */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Loading placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
          
          <Image
            src={image}
            alt={title}
            width={900}
            height={562}
            className="w-full h-auto object-contain relative z-20 transition-transform duration-700 group-hover:scale-105"
            priority={index === 0}
            unoptimized
            onLoad={(e) => {
              // Hide loading placeholder
              const placeholder = e.currentTarget.previousElementSibling as HTMLElement;
              if (placeholder) {
                placeholder.style.display = 'none';
              }
            }}
          />
          
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-[-200%] transition-all duration-1000 ease-in-out z-30"></div>
        </div>

        {/* Floating decoration elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-green-400 rounded-full opacity-70 animate-bounce"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}
