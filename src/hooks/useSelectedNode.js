import { useStore } from '../store/workflowStore';

export function useSelectedNode() {
  const selectedNodeId = useStore((state) => state.selectedNodeId);
  const selectedNode = useStore((state) => 
    state.nodes.find((n) => n.id === selectedNodeId)
  );

  return selectedNode || null;
}
