import React from 'react';
import { Play, User, CheckCircle, Zap, Flag } from 'lucide-react';

const NODE_TYPES = [
  { type: 'start', label: 'Start Event', icon: Play, color: 'text-primary' },
  { type: 'task', label: 'Human Task', icon: User, color: 'text-blue' },
  { type: 'approval', label: 'Approval Step', icon: CheckCircle, color: 'text-amber' },
  { type: 'automated', label: 'Automated Action', icon: Zap, color: 'text-purple' },
  { type: 'end', label: 'End Event', icon: Flag, color: 'text-textMuted' },
];

export function NodeSidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-[220px] shrink-0 border-r border-border-color bg-card flex flex-col">
      <div className="px-4 pt-4 pb-2 border-b border-border-color">
        <h2 className="text-[11px] font-semibold font-mono uppercase tracking-[0.08em] text-textMuted mb-[10px]">Tools</h2>
      </div>
      <div className="p-4 flex flex-col gap-[6px]">
        {NODE_TYPES.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.type}
              className="flex items-center gap-[10px] px-3 py-2 h-[44px] rounded bg-background border border-border-color cursor-grab hover:border-textMuted transition-colors"
              onDragStart={(event) => onDragStart(event, node.type)}
              draggable
            >
              <Icon className={`w-[18px] h-[18px] ${node.color}`} />
              <span className="text-[13px] font-medium text-textMain">{node.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
