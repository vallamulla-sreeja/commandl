'use client'
import React from 'react';
import Link from 'next/link';
import Button from './ui/Button';
import Section from './ui/Section';
import Container from './ui/container';

const WaveBackground = () => (
  <svg 
    className="absolute bottom-0 left-0 right-0 w-full h-64 opacity-5"
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
  >
    <path 
      fill="currentColor" 
      d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    />
  </svg>
);

const CallToAction = () => {
  return (
    <Section size="lg" className="relative bg-gradient-to-br from-accent-100 to-primary-100 dark:from-surface-900 dark:to-surface-800 overflow-hidden">
      <Container className="relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-surface-50 mb-8 animate-fade-up">
            Ready to start building?
          </h2>
          <p className="text-lg md:text-xl text-surface-700 dark:text-surface-300 mb-12 max-w-2xl mx-auto animate-fade-up animation-delay-100">
            Join thousands of students who are shipping real applications with CommandL
          </p>
          
          <Link href="/api/auth/login" className="inline-block animate-fade-up animation-delay-200">
            <Button size="lg" variant="primary" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </Container>

      <WaveBackground />
    </Section>
  );
};

export default CallToAction; 