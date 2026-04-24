import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { defaultNodeData } from '../constants/nodeDefaults';
import { validateWorkflow } from '../utils/validation';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  validationErrors: [],
  
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
    get().triggerValidation();
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
    get().triggerValidation();
  },
  onConnect: (connection) => {
    // Auto-label ApprovalNode edges based on sourceHandle
    const sourceNode = get().nodes.find(n => n.id === connection.source);
    let edgeData = {};
    if (sourceNode && sourceNode.type === 'approval') {
      if (connection.sourceHandle === 'approved') {
        edgeData = { label: 'Approved' };
      } else if (connection.sourceHandle === 'rejected') {
        edgeData = { label: 'Rejected' };
      }
    }

    const newEdge = { ...connection, type: 'custom', data: edgeData };

    set({
      edges: addEdge(newEdge, get().edges),
    });
    get().triggerValidation();
  },

  updateEdgeData: (id, newFormData) => {
    set({
      edges: get().edges.map((edge) => {
        if (edge.id === id) {
          return { ...edge, data: { ...edge.data, ...newFormData } };
        }
        return edge;
      }),
    });
    get().triggerValidation();
  },

  addNode: (type, position) => {
    const newNodeId = `${type}-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type,
      position,
      data: JSON.parse(JSON.stringify(defaultNodeData[type])), // Deep copy default
    };
    set({ nodes: [...get().nodes, newNode] });
    get().triggerValidation();
    return newNodeId;
  },

  updateNodeData: (id, newFormData) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...newFormData } };
        }
        return node;
      }),
    });
    get().triggerValidation();
  },

  setSelectedNode: (id) => {
    set({ selectedNodeId: id });
  },

  triggerValidation: () => {
    const { nodes, edges } = get();
    const errors = validateWorkflow(nodes, edges);
    set({ validationErrors: errors });
  }
}));
