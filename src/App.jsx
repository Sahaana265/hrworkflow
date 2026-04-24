import React, { useState } from 'react';
import { AppSidebar } from './components/layout/AppSidebar';
import { TopBar } from './components/layout/TopBar';
import { NodeSidebar } from './components/canvas/NodeSidebar';
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas';
import { NodeEditPanel } from './components/forms/NodeEditPanel';
import { WorkflowSandboxPanel } from './components/sandbox/WorkflowSandboxPanel';

function App() {
  const [sandboxOpen, setSandboxOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-background overflow-hidden text-textMain font-sans">
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar onTestClick={() => setSandboxOpen(true)} />
        <div className="flex flex-1 overflow-hidden">
          <NodeSidebar />
          <WorkflowCanvas />
          <NodeEditPanel />
        </div>
      </div>
      
      {sandboxOpen && (
        <WorkflowSandboxPanel onClose={() => setSandboxOpen(false)} />
      )}
    </div>
  );
}

export default App;
