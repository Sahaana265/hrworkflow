import React from 'react';
import { cn } from '../../utils/cn';

export function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        "text-[13px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-textMain",
        className
      )}
      {...props}
    />
  );
}
