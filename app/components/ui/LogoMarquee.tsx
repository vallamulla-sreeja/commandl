'use client';

import Image from 'next/image';
import { cn } from '@/app/lib/utils';

interface Logo {
  name: string;
  src: string;
  width: number;
  height: number;
}

interface LogoMarqueeProps {
  logos: Logo[];
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export default function LogoMarquee({ logos, className, speed = 'normal' }: LogoMarqueeProps) {
  const speeds = {
    slow: 'animate-scroll',
    normal: 'animate-[scroll_20s_linear_infinite]',
    fast: 'animate-[scroll_10s_linear_infinite]',
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-surface-900 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-surface-900 to-transparent z-10" />
      
      <div className="flex">
        <div className={cn('flex items-center gap-12 pr-12', speeds[speed])}>
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center justify-center min-w-fit"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
        <div className={cn('flex items-center gap-12 pr-12', speeds[speed])} aria-hidden="true">
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-duplicate-${index}`}
              className="flex items-center justify-center min-w-fit"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 