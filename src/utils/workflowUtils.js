import { useStore } from '../store/workflowStore';

export function deleteNode(nodeId) {
  const store = useStore.getState();
  
  // Clean up selected node if it's the one being deleted
  if (store.selectedNodeId === nodeId) {
    store.setSelectedNode(null);
  }

  // Remove node
  const newNodes = store.nodes.filter(n => n.id !== nodeId);
  
  // Remove connected edges
  const newEdges = store.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
  
  useStore.setState({ nodes: newNodes, edges: newEdges });
  store.triggerValidation();
}

export function deleteEdge(edgeId) {
  const store = useStore.getState();
  const newEdges = store.edges.filter(e => e.id !== edgeId);
  useStore.setState({ edges: newEdges });
  store.triggerValidation();
}

export function duplicateNode(nodeId) {
  const store = useStore.getState();
  const nodeToCopy = store.nodes.find(n => n.id === nodeId);
  
  if (!nodeToCopy) return;

  const newNodeId = `${nodeToCopy.type}-${Date.now()}`;
  const newNode = {
    ...nodeToCopy,
    id: newNodeId,
    position: {
      x: nodeToCopy.position.x + 30,
      y: nodeToCopy.position.y + 30,
    },
    data: JSON.parse(JSON.stringify(nodeToCopy.data)),
  };

  useStore.setState({ nodes: [...store.nodes, newNode] });
  store.triggerValidation();
}
