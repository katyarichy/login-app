import * as React from 'react';
import { cn } from '@/lib/utils';

interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  error?: string;
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ children, error, className, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', className)} ref={ref} {...props}>
        {children}
        {error && <p className='text-red-600 text-sm'>{error}</p>}
      </div>
    );
  }
);
FormControl.displayName = 'FormControl';

export { FormControl };
