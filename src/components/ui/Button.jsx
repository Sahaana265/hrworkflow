import React from 'react';
import { cn } from '../../utils/cn';

export function Button({ children, variant = 'primary', className, ...props }) {
  const baseClasses = 'h-[36px] px-4 font-sans font-semibold rounded text-[13px] transition-all outline-none focus:ring-2 focus:ring-blue flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-background hover:bg-[#159a63] border border-transparent shadow-[0_0_12px_rgba(29,184,122,0.2)]',
    secondary: 'bg-transparent text-textMain border border-border-color hover:border-textMuted',
    danger: 'bg-coral text-[#690005] hover:bg-[#ff897d] font-bold border border-transparent',
    ghost: 'bg-transparent text-textMain hover:bg-[#2A2A30] border border-transparent'
  };

  return (
    <button className={cn(baseClasses, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
