import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useStore } from '../../store/workflowStore';
import { deleteNode } from '../../utils/workflowUtils';
import { cn } from '../../utils/cn';

export function NodeCard({ id, title, subtitle, icon: Icon, children, isSelected, accentColor = 'bg-border-color' }) {
  const selectedNodeId = useStore((state) => state.selectedNodeId);
  const isActuallySelected = isSelected || selectedNodeId === id;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const deleteTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (deleteTimeoutRef.current) clearTimeout(deleteTimeoutRef.current);
    };
  }, []);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (confirmDelete) {
      deleteNode(id);
    } else {
      setConfirmDelete(true);
      deleteTimeoutRef.current = setTimeout(() => {
        setConfirmDelete(false);
      }, 2000);
    }
  };

  return (
    <div className={cn(
      "group relative min-w-[240px] rounded bg-card border border-border-color shadow-sm transition-all text-left",
      isActuallySelected ? "border-primary shadow-[0_0_12px_rgba(29,184,122,0.2)]" : ""
    )}>
      {/* Delete Button */}
      <button 
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-coral text-white text-xs border-2 border-background cursor-pointer hidden group-hover:flex items-center justify-center z-10 hover:scale-110 transition-transform"
        onClick={handleDeleteClick}
        title={confirmDelete ? "Click again to delete" : "Delete node"}
      >
        <span className="leading-none mt-[-2px]">{confirmDelete ? "!" : "×"}</span>
      </button>

      {/* Accent Top Bar */}
      <div className={cn("h-1 w-full rounded-t", accentColor)} />
      
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          {Icon && <Icon className="w-4 h-4 text-textMuted" />}
          <div>
            <div className="text-sm font-semibold text-textMain">{title}</div>
            {subtitle && <div className="text-[11px] text-textMuted font-mono uppercase tracking-wider mt-0.5">{subtitle}</div>}
          </div>
        </div>
        
        {children && (
          <div className="mt-3 text-xs text-textMuted">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
