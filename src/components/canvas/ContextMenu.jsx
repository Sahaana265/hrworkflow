import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { deleteNode, duplicateNode } from '../../utils/workflowUtils';
import { useStore } from '../../store/workflowStore';

export function ContextMenu({ nodeId, top, left, onClose }) {
  const setSelectedNode = useStore((state) => state.setSelectedNode);

  useEffect(() => {
    const handleGlobalClick = () => onClose();
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    const timer = setTimeout(() => {
      window.addEventListener('click', handleGlobalClick);
      window.addEventListener('keydown', handleGlobalKeyDown);
      window.addEventListener('contextmenu', handleGlobalClick);
    }, 10);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('contextmenu', handleGlobalClick);
    };
  }, [onClose]);

  const handleEdit = (e) => {
    e.stopPropagation();
    setSelectedNode(nodeId);
    onClose();
  };

  const handleDuplicate = (e) => {
    e.stopPropagation();
    duplicateNode(nodeId);
    onClose();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(nodeId);
    onClose();
  };

  return createPortal(
    <div 
      className="fixed z-50 bg-[#1A1A1E] border border-[#2A2A30] rounded-lg p-1 text-[13px] shadow-lg flex flex-col w-36"
      style={{ top, left }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button 
        className="text-left px-3 py-2 hover:bg-[#2A2A30] rounded-md text-[#C0BEB6] transition-colors"
        onClick={handleEdit}
      >
        Edit node
      </button>
      <button 
        className="text-left px-3 py-2 hover:bg-[#2A2A30] rounded-md text-[#C0BEB6] transition-colors"
        onClick={handleDuplicate}
      >
        Duplicate node
      </button>
      <div className="h-px bg-[#2A2A30] my-1 mx-2" />
      <button 
        className="text-left px-3 py-2 hover:bg-[#2A2A30] rounded-md text-[#C0BEB6] hover:text-[#E24B4A] transition-colors"
        onClick={handleDelete}
      >
        Delete node
      </button>
    </div>,
    document.body
  );
}
