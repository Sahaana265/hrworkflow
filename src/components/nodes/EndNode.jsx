import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Flag } from 'lucide-react';
import { NodeCard } from './NodeCard';

export function EndNode({ id, data, selected }) {
  return (
    <>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-border-color border-2 border-background" />
      <NodeCard 
        id={id} 
        title={data?.title || 'End'} 
        subtitle="Completion" 
        icon={Flag} 
        isSelected={selected}
        accentColor="bg-[#494551]"
      >
        {data?.endMessage && <div className="truncate italic text-xs">"{data.endMessage}"</div>}
      </NodeCard>
    </>
  );
}
