import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { User } from 'lucide-react';
import { NodeCard } from './NodeCard';

export function TaskNode({ id, data, selected }) {
  return (
    <>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-border-color border-2 border-background" />
      <NodeCard 
        id={id} 
        title={data?.title || 'Task'} 
        subtitle="Human Action" 
        icon={User} 
        isSelected={selected}
        accentColor="bg-blue"
      >
        {data?.assignee && <div className="truncate text-xs">Assignee: <span className="text-textMain">{data.assignee}</span></div>}
        {data?.dueDate && <div className="truncate text-xs">Due: <span className="text-textMain">{data.dueDate}</span></div>}
      </NodeCard>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-border-color border-2 border-background" />
    </>
  );
}
