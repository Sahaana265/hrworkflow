import React from 'react';
import { useWorkflow } from '../../hooks/useWorkflow';
import { useSimulation } from '../../hooks/useSimulation';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { X, PlayCircle, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { validateWorkflow } from '../../utils/validation';

export function WorkflowSandboxPanel({ onClose }) {
  const { nodes, edges } = useWorkflow();
  const { isRunning, result, runSimulation, clearSimulation } = useSimulation();

  const handleRun = () => {
    runSimulation();
  };

  const validationErrors = validateWorkflow(nodes, edges);
  const startBlocked = validationErrors.some(e => e.type === 'error');

  const getStatusIcon = (status) => {
    if (status === 'success') return <CheckCircle className="w-5 h-5 text-primary" />;
    if (status === 'error') return <AlertTriangle className="w-5 h-5 text-coral" />;
    if (status === 'skipped') return <Clock className="w-5 h-5 text-textMuted" />;
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-[600px] max-h-[85vh] bg-card border border-border-color rounded shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border-color bg-[#15151A] rounded-t">
          <div>
            <h2 className="text-lg font-semibold text-textMain">Test Workflow</h2>
            <p className="text-sm text-textMuted mt-1">Simulate the logic flow of your graph</p>
          </div>
          <Button variant="ghost" onClick={onClose} className="p-2 h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar text-left relative">
          {(!result && !isRunning) ? (
            <div className="space-y-4">
              {validationErrors.length > 0 && (
                <div className="p-4 bg-[#1e1c22] rounded border border-border-color space-y-2">
                  <h3 className="text-sm font-semibold text-textMain mb-2">Pre-flight Validation</h3>
                  {validationErrors.map((err, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {err.type === 'error' ? 
                        <AlertTriangle className="w-4 h-4 text-coral shrink-0 mt-0.5" /> : 
                        <AlertTriangle className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                      }
                      <span className={`text-sm ${err.type === 'error' ? 'text-coral' : 'text-amber'}`}>{err.message}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="text-center py-8">
                <p className="text-textMuted text-sm mb-4 bg-[#2A2A30] inline-block px-4 py-2 rounded">
                  Simulation traverses nodes topologically.<br/>
                  There is a ~15% chance of step failure to demonstrate errors.
                </p>
              </div>
            </div>
          ) : isRunning ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-10 h-10 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-textMain font-medium animate-pulse">Running Simulation...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-mono tracking-wide text-textMain uppercase">Result:</h3>
                {result.status === 'success' ? (
                   <Badge variant="success" className="text-sm px-3 py-1">Success</Badge>
                ) : (
                   <Badge variant="error" className="text-sm px-3 py-1">Failed</Badge>
                )}
              </div>

              <div className="relative border-l-2 border-[#2A2A30] ml-4 space-y-6 pl-6 pt-2">
                {result.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[35px] bg-card rounded-full p-0.5 border border-border-color z-10 scale-110">
                      {getStatusIcon(step.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-textMain">{step.nodeTitle}</span>
                        <Badge>{step.nodeType}</Badge>
                      </div>
                      <p className={`text-sm ${step.status === 'error' ? 'text-coral' : 'text-textMuted'}`}>
                        {step.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border-color flex justify-end gap-3 bg-[#15151A] rounded-b">
          {result && !isRunning ? (
            <>
              <Button variant="secondary" onClick={() => {
                const data = JSON.stringify({ nodes, edges }, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'workflow.json';
                a.click();
              }}>Export JSON</Button>
              <Button variant="primary" onClick={handleRun}>Run Again</Button>
            </>
          ) : (
             <Button variant="primary" onClick={handleRun} disabled={startBlocked || isRunning}>
               <PlayCircle className="w-4 h-4" /> Start Simulation
             </Button>
          )}
        </div>
      </div>
    </div>
  );
}
