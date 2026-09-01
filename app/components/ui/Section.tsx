import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div';
  size?: 'sm' | 'md' | 'lg';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Component = 'section', size = 'md', children, ...props }, ref) => {
    const sizes = {
      sm: 'py-8 md:py-12 lg:py-16',
      md: 'py-12 md:py-16 lg:py-24',
      lg: 'py-16 md:py-24 lg:py-32',
    };
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          'px-4 md:px-6 lg:px-8',
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';

export default Section; 