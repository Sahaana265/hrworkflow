import React, { useState, useEffect, useRef } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';
import { useWorkflow } from '../../hooks/useWorkflow';
import { deleteEdge } from '../../utils/workflowUtils';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { updateEdgeData } = useWorkflow();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(data?.label || '');
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);

  const [showLabelMenu, setShowLabelMenu] = useState(false);

  // Sync input value with external data changes
  useEffect(() => {
    if (!isEditing) {
      setInputValue(data?.label || '');
    }
  }, [data?.label, isEditing]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Close context menu on global click
  useEffect(() => {
    const closeMenu = () => setShowLabelMenu(false);
    if (showLabelMenu) {
      window.addEventListener('click', closeMenu);
    }
    return () => window.removeEventListener('click', closeMenu);
  }, [showLabelMenu]);

  const onEdgeDoubleClick = (evt) => {
    evt.stopPropagation();
    setIsEditing(true);
    setShowLabelMenu(false);
  };

  const handleLabelContextMenu = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    setShowLabelMenu(true);
  };

  const handleInputKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      updateEdgeData(id, { label: inputValue });
      setIsEditing(false);
    } else if (evt.key === 'Escape') {
      setInputValue(data?.label || '');
      setIsEditing(false);
    }
  };

  const handleInputBlur = () => {
    updateEdgeData(id, { label: inputValue });
    setIsEditing(false);
  };

  const handleDelete = (evt) => {
    evt.stopPropagation();
    deleteEdge(id);
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: isHovered ? 3 : 2,
        }}
      />
      {/* Invisible thicker path for easier hovering and double-clicking */}
      <path
        d={edgePath}
        fill="none"
        strokeOpacity={0}
        strokeWidth={20}
        className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDoubleClick={onEdgeDoubleClick}
      />
      
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan flex items-center justify-center group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              className="bg-[#1A1A1E] border border-primary rounded px-2 py-0.5 text-[11px] text-[#C0BEB6] outline-none shadow-lg w-24 text-center"
            />
          ) : data?.label ? (
            <div className="relative">
              <div
                className="bg-[#1A1A1E] border border-[#2A2A30] rounded-full px-2.5 py-0.5 text-[11px] text-[#C0BEB6] cursor-pointer"
                onDoubleClick={onEdgeDoubleClick}
                onContextMenu={handleLabelContextMenu}
              >
                {data.label}
              </div>
              
              {showLabelMenu && (
                <div 
                  className="absolute top-full mt-1 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1E] border border-[#2A2A30] rounded p-1 text-[11px] shadow-lg flex flex-col w-28"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="text-left px-2 py-1 hover:bg-[#2A2A30] rounded text-[#C0BEB6] transition-colors"
                    onClick={() => {
                      setIsEditing(true);
                      setShowLabelMenu(false);
                    }}
                  >
                    Edit label
                  </button>
                  <button 
                    className="text-left px-2 py-1 hover:bg-[#2A2A30] rounded text-[#E24B4A] transition-colors mt-0.5"
                    onClick={() => {
                      updateEdgeData(id, { label: '' });
                      setShowLabelMenu(false);
                    }}
                  >
                    Remove label
                  </button>
                </div>
              )}
            </div>
          ) : null}

          {/* Hover Delete Button */}
          {isHovered && !isEditing && (
            <button
              className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-coral text-white text-[10px] flex items-center justify-center cursor-pointer border border-background hover:scale-110 transition-transform shadow-sm"
              onClick={handleDelete}
              title="Delete edge"
            >
              <span className="leading-none mt-[-1px]">×</span>
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
