import { useState } from 'react';
import { simulateWorkflow } from '../api';
import { useStore } from '../store/workflowStore';

export function useSimulation() {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);

  const runSimulation = async () => {
    setIsRunning(true);
    setResult(null);
    try {
      const simResult = await simulateWorkflow({ nodes, edges });
      setResult(simResult);
    } catch (error) {
      setResult({ status: 'error', steps: [], error: String(error) });
    } finally {
      setIsRunning(false);
    }
  };

  const clearSimulation = () => setResult(null);

  return {
    isRunning,
    result,
    runSimulation,
    clearSimulation
  };
}
