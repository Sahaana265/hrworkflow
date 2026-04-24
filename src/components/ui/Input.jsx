import React from 'react';
import { cn } from '../../utils/cn';

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "flex h-[36px] w-full rounded border border-border-color bg-background px-[10px] py-[8px] text-[13px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-textMuted focus-visible:outline-none focus-visible:border-blue focus-visible:ring-1 focus-visible:ring-blue focus-visible:shadow-[0_0_8px_rgba(59,139,212,0.3)] disabled:cursor-not-allowed disabled:opacity-50 text-textMain",
        className
      )}
      {...props}
    />
  );
}
