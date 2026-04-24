import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Play } from 'lucide-react';
import { NodeCard } from './NodeCard';

export function StartNode({ id, data, selected }) {
  return (
    <>
      <NodeCard 
        id={id} 
        title={data?.title || 'Start'} 
        subtitle="Trigger" 
        icon={Play} 
        isSelected={selected}
        accentColor="bg-primary"
      >
        {data.metadata?.length > 0 && (
          <div className="flex flex-col gap-1 mt-2">
            {data.metadata.slice(0, 2).map((m, i) => (
              <div key={i} className="flex justify-between truncate text-xs">
                <span className="text-textMuted">{m.key}:</span>
                <span className="text-textMain">{m.value}</span>
              </div>
            ))}
            {data.metadata.length > 2 && <span className="text-[10px] text-textMuted mt-1">+{data.metadata.length - 2} more</span>}
          </div>
        )}
      </NodeCard>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-primary border-2 border-background" />
    </>
  );
}
