import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Zap } from 'lucide-react';
import { NodeCard } from './NodeCard';

export function AutomatedStepNode({ id, data, selected }) {
  return (
    <>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-border-color border-2 border-background" />
      <NodeCard 
        id={id} 
        title={data?.title || 'Automated Action'} 
        subtitle="System" 
        icon={Zap} 
        isSelected={selected}
        accentColor="bg-purple"
      >
        {data?.actionId && <div className="truncate font-mono bg-[#2A2A30] px-1 py-0.5 rounded text-[10px] inline-block text-textMain mt-1">{data.actionId}</div>}
      </NodeCard>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-border-color border-2 border-background" />
    </>
  );
}
