import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', children, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',    // 768px
      md: 'max-w-5xl',    // 1024px
      lg: 'max-w-6xl',    // 1152px
      xl: 'max-w-7xl',    // 1280px
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full',
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container; 