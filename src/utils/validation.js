/**
 * @typedef {Object} ValidationError
 * @property {'error'|'warning'} type
 * @property {string} message
 */

/**
 * Validates the workflow graph
 * @param {import('@xyflow/react').Node[]} nodes
 * @param {import('@xyflow/react').Edge[]} edges
 * @returns {ValidationError[]}
 */
export function validateWorkflow(nodes, edges) {
  const errors = [];

  const startNodes = nodes.filter(n => n.type === 'start');
  const endNodes = nodes.filter(n => n.type === 'end');

  if (startNodes.length === 0) {
    errors.push({ type: 'error', message: 'Workflow must have a Start node.' });
  } else if (startNodes.length > 1) {
    errors.push({ type: 'error', message: 'Workflow cannot have more than one Start node.' });
  }

  if (endNodes.length === 0) {
    errors.push({ type: 'error', message: 'Workflow must have at least one End node.' });
  }

  // Detect disconnected nodes
  const connectedNodeIds = new Set();
  edges.forEach(edge => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  const disconnectedNodes = nodes.filter(n => !connectedNodeIds.has(n.id) && nodes.length > 1);
  if (disconnectedNodes.length > 0) {
    errors.push({ 
      type: 'warning', 
      message: `There are ${disconnectedNodes.length} disconnected node(s).` 
    });
  }

  // Cycle detection using adjacency list and DFS
  const adjList = new Map();
  nodes.forEach(n => adjList.set(n.id, []));
  edges.forEach(e => {
    if (adjList.has(e.source)) {
      adjList.get(e.source).push(e.target);
    }
  });

  const visited = new Set();
  const recursionStack = new Set();
  let cycleDetected = false;

  function dfs(nodeId) {
    if (recursionStack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    recursionStack.add(nodeId);

    const neighbors = adjList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (dfs(neighbor)) {
        return true;
      }
    }

    recursionStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) {
        cycleDetected = true;
        break;
      }
    }
  }

  if (cycleDetected) {
    errors.push({ type: 'error', message: 'Workflow contains a cycle. Direct cycles are not allowed.' });
  }

  return errors;
}

export function topologicalSort(nodes, edges) {
  // Kahn's algorithm or DFS topological sort.
  const inDegree = new Map();
  const adjList = new Map();
  
  nodes.forEach(n => {
    inDegree.set(n.id, 0);
    adjList.set(n.id, []);
  });

  edges.forEach(e => {
    if (adjList.has(e.source)) {
      adjList.get(e.source).push(e.target);
    }
    if (inDegree.has(e.target)) {
      inDegree.set(e.target, inDegree.get(e.target) + 1);
    }
  });

  const queue = [];
  inDegree.forEach((degree, id) => {
    if (degree === 0) queue.push(id);
  });

  const sortedIds = [];
  while (queue.length > 0) {
    const u = queue.shift();
    sortedIds.push(u);
    const neighbors = adjList.get(u) || [];
    for (const v of neighbors) {
      inDegree.set(v, inDegree.get(v) - 1);
      if (inDegree.get(v) === 0) {
        queue.push(v);
      }
    }
  }

  return sortedIds.map(id => nodes.find(n => n.id === id)).filter(Boolean);
}
