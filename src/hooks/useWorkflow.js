import { useStore } from '../store/workflowStore';

export function useWorkflow() {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);
  const addNode = useStore((state) => state.addNode);
  const updateNodeData = useStore((state) => state.updateNodeData);
  const updateEdgeData = useStore((state) => state.updateEdgeData);
  const setSelectedNode = useStore((state) => state.setSelectedNode);
  const validationErrors = useStore((state) => state.validationErrors);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
    updateEdgeData,
    setSelectedNode,
    validationErrors
  };
}
