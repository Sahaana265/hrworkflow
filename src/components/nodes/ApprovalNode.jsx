import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { CheckCircle } from 'lucide-react';
import { NodeCard } from './NodeCard';

export function ApprovalNode({ id, data, selected }) {
  return (
    <>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-border-color border-2 border-background" />
      <NodeCard 
        id={id} 
        title={data?.title || 'Approval'} 
        subtitle="Decision" 
        icon={CheckCircle} 
        isSelected={selected}
        accentColor="bg-amber"
      >
        {data?.approverRole && <div className="truncate text-xs">Role: <span className="text-textMain">{data.approverRole}</span></div>}
      </NodeCard>
      <Handle type="source" position={Position.Right} id="approved" style={{ top: '30%' }} className="w-3 h-3 bg-primary border-2 border-background" />
      <Handle type="source" position={Position.Right} id="rejected" style={{ top: '70%' }} className="w-3 h-3 bg-coral border-2 border-background" />
    </>
  );
}
