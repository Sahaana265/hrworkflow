import { useState, useEffect } from 'react';
import { useStore } from '../store/workflowStore';

export function useNodeForm(nodeId) {
  const node = useStore((state) => state.nodes.find((n) => n.id === nodeId));
  const updateNodeData = useStore((state) => state.updateNodeData);

  const [formData, setFormData] = useState(node ? node.data : {});

  // Sync state if node identity changes or external updates occur
  useEffect(() => {
    if (node) {
      setFormData(node.data);
    }
  }, [node]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const save = () => {
    if (nodeId) {
      updateNodeData(nodeId, formData);
    }
  };

  const reset = () => {
    if (node) {
      setFormData(node.data);
    }
  };

  return {
    formData,
    setFormData, // Expose for complex forms (like arrays)
    handleChange,
    save,
    reset
  };
}
