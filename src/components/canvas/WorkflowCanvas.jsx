import React, { useCallback, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useWorkflow } from '../../hooks/useWorkflow';
import { deleteNode, deleteEdge } from '../../utils/workflowUtils';
import { ContextMenu } from './ContextMenu';
import { StartNode } from '../nodes/StartNode';
import { TaskNode } from '../nodes/TaskNode';
import { ApprovalNode } from '../nodes/ApprovalNode';
import { AutomatedStepNode } from '../nodes/AutomatedStepNode';
import { EndNode } from '../nodes/EndNode';
import { CustomEdge } from './CustomEdge';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedStepNode,
  end: EndNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

function FlowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNode
  } = useWorkflow();
  
  const { screenToFlowPosition } = useReactFlow();
  const reactFlowWrapper = useRef(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNodeId = addNode(type, position);
      setSelectedNode(newNodeId);
    },
    [screenToFlowPosition, addNode, setSelectedNode]
  );

  const onSelectionChange = useCallback(({ nodes }) => {
    if (nodes.length === 1) {
      setSelectedNode(nodes[0].id);
    } else {
      setSelectedNode(null);
    }
  }, [setSelectedNode]);

  const onNodesDelete = useCallback((deleted) => {
    deleted.forEach(node => deleteNode(node.id));
  }, []);

  const onEdgesDelete = useCallback((deleted) => {
    deleted.forEach(edge => deleteEdge(edge.id));
  }, []);

  const [menuState, setMenuState] = React.useState(null);

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      setMenuState({
        nodeId: node.id,
        top: event.clientY,
        left: event.clientX,
      });
    },
    [setMenuState]
  );

  return (
    <div className="flex-1 min-w-0 h-full w-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: 'custom' }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onSelectionChange={onSelectionChange}
        onNodeContextMenu={onNodeContextMenu}
        deleteKeyCode={['Delete', 'Backspace']}
        fitView
        className="bg-background"
        colorMode="dark"
      >
        <Background gap={24} size={1} color="#2A2A30" />
        <Controls className="fill-textMain bg-[#1A1A1E] border-border-color border rounded" />
        <MiniMap 
          nodeColor="#2A2A30" 
          maskColor="rgba(14, 14, 16, 0.7)" 
          style={{ backgroundColor: '#1A1A1E' }} 
        />
      </ReactFlow>
      {menuState && (
        <ContextMenu
          nodeId={menuState.nodeId}
          top={menuState.top}
          left={menuState.left}
          onClose={() => setMenuState(null)}
        />
      )}
    </div>
  );
}

export function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}
