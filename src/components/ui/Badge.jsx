import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({ children, variant = 'default', className, ...props }) {
  const variants = {
    default: 'bg-[#2A2A30] text-textMain',
    success: 'bg-[rgba(29,184,122,0.2)] text-primary border border-[rgba(29,184,122,0.3)]',
    error: 'bg-[rgba(255,180,171,0.2)] text-coral border border-[rgba(255,180,171,0.3)]',
    warning: 'bg-[rgba(231,195,101,0.2)] text-amber border border-[rgba(231,195,101,0.3)]',
    info: 'bg-[rgba(59,139,212,0.2)] text-blue border border-[rgba(59,139,212,0.3)]',
  };

  return (
    <span 
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-widest", variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
