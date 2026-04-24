import React from 'react';
import { cn } from '../../utils/cn';

export function Toggle({ checked, onChange, className, ...props }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        checked ? "bg-primary shadow-[0_0_8px_rgba(29,184,122,0.5)]" : "bg-[#2A2A30]",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-3 w-3 rounded-full bg-textMain shadow-lg ring-0 transition-transform",
          checked ? "translate-x-3" : "translate-x-0"
        )}
      />
    </button>
  );
}
