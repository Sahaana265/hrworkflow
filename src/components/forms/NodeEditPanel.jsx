import React from 'react';
import { useSelectedNode } from '../../hooks/useSelectedNode';
import { StartNodeForm } from './StartNodeForm';
import { TaskNodeForm } from './TaskNodeForm';
import { ApprovalNodeForm } from './ApprovalNodeForm';
import { AutomatedStepNodeForm } from './AutomatedStepNodeForm';
import { EndNodeForm } from './EndNodeForm';

const FORM_COMPONENTS = {
  start: StartNodeForm,
  task: TaskNodeForm,
  approval: ApprovalNodeForm,
  automated: AutomatedStepNodeForm,
  end: EndNodeForm,
};

export function NodeEditPanel() {
  const selectedNode = useSelectedNode();

  if (!selectedNode) {
    return (
      <div className="w-[280px] shrink-0 border-l border-border-color bg-card p-4 hidden lg:flex flex-col items-center justify-center text-center h-full">
        <div className="w-12 h-12 rounded-full border border-dashed border-textMuted flex items-center justify-center mb-4">
          <span className="text-textMuted font-mono">?</span>
        </div>
        <p className="text-textMuted text-sm">No node selected</p>
        <p className="text-xs text-[#494551] mt-2">Click on a node in the canvas to edit.</p>
      </div>
    );
  }

  const FormComponent = FORM_COMPONENTS[selectedNode.type];

  return (
    <div className="w-[280px] shrink-0 border-l border-border-color bg-card hidden lg:flex flex-col h-full relative z-10">
      <div className="p-4 border-b border-border-color">
        <h2 className="text-[11px] font-semibold font-mono uppercase tracking-[0.08em] text-textMuted">Properties</h2>
        <p className="text-[13px] text-textMain mt-1">Configuring: {selectedNode.data?.title || selectedNode.type}</p>
      </div>
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
        {FormComponent ? <FormComponent nodeId={selectedNode.id} /> : <p>Unknown node type</p>}
      </div>
    </div>
  );
}
