'use client';

import Image from 'next/image';
import { Stream } from "@cloudflare/stream-react";
import { Suspense, useState } from 'react';
import Link from 'next/link';
import Button from './ui/Button';
import Container from './ui/container';
import Section from './ui/Section';
import LogoMarquee from './ui/LogoMarquee';

const VideoPlayer = ({ muted = true }) => {
  return (
    <div className="relative w-full">
      <div className="aspect-video">
        <Stream
          controls
          src="aafc2832a7f9e35f7c4f9df27bc34e0c"
          height="100%"
          width="100%"
          responsive={true}
          className="rounded-lg md:rounded-xl shadow-2xl"
          autoplay={true}
          muted={muted}
          preload="auto"
          primaryColor="#58CC02"
        />
      </div>
    </div>
  );
};

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <Section size="lg" className="relative overflow-hidden bg-gradient-hero">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />
      
      <Container size="lg" className="relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Text Content */}
          <div className="flex flex-col items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-surface-900 tracking-tight max-w-4xl leading-tight animate-fade-up">
              Ship your first real-world app in 
              <span className="relative inline-block ml-2">
                <span className="relative z-10 text-primary">weeks, not months</span>
                <span className="absolute inset-x-[-0.5rem] inset-y-[-0.25rem] bg-accent/30 -rotate-1 rounded-lg -z-0"></span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-surface-700 font-medium mt-2 max-w-2xl animate-fade-up animation-delay-100">
              Project-based AI IDE with gamified feedback loops. Learn by building real products, not toy examples.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 justify-center w-full sm:w-auto flex-col sm:flex-row mt-8 animate-fade-up animation-delay-200">
              <Link href="/api/auth/login">
                <Button size="lg" variant="primary" className="w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowVideo(true)}
                className="w-full sm:w-auto bg-white/80 backdrop-blur-sm"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Social Proof */}
          <div className="w-full max-w-3xl mx-auto mb-8 animate-fade-up animation-delay-300">
            <p className="text-sm text-surface-600 dark:text-surface-400 text-center mb-4">Trusted by students and backed by</p>
            <LogoMarquee
              logos={[
                { name: 'Microsoft for Startups', src: '/images/microsoft-logo.png', width: 120, height: 30 },
                { name: 'YC Finalist', src: '/images/microsoft-logo.png', width: 100, height: 30 },
                { name: 'Product Hunt', src: '/images/microsoft-logo.png', width: 110, height: 30 },
              ]}
              speed="slow"
              className="py-4"
            />
          </div>

          {/* Screenshot or Video */}
          <div className="w-full max-w-5xl mx-auto animate-fade-up animation-delay-400">
            {showVideo ? (
              <Suspense fallback={
                <div className="w-full aspect-video bg-surface-100 animate-pulse rounded-lg md:rounded-xl flex items-center justify-center">
                  <p className="text-surface-500">Loading video...</p>
                </div>
              }>
                <VideoPlayer muted={false} />
              </Suspense>
            ) : (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg md:rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <Image
                  src="/images/hero_image.png"
                  alt="CommandL IDE in action"
                  width={1200}
                  height={750}
                  priority
                  quality={90}
                  className="relative w-full h-auto rounded-lg md:rounded-xl shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}