import React from 'react';
import { LayoutGrid, Settings, GitBranch } from 'lucide-react';

export function AppSidebar() {
  return (
    <div className="w-16 border-r border-border-color bg-[#15151A] flex flex-col items-center py-4 gap-4 shrink-0 z-10 shadow-lg">
      <button className="w-10 h-10 rounded text-textMuted hover:text-textMain hover:bg-[#2A2A30] flex items-center justify-center transition-colors">
        <LayoutGrid className="w-5 h-5" />
      </button>
      <button className="w-10 h-10 rounded text-primary bg-primary/10 flex items-center justify-center transition-colors shadow-[0_0_12px_rgba(29,184,122,0.1)] border border-primary/20">
        <GitBranch className="w-5 h-5" />
      </button>
      <button className="w-10 h-10 rounded text-textMuted hover:text-textMain hover:bg-[#2A2A30] flex items-center justify-center transition-colors mt-auto">
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
}
