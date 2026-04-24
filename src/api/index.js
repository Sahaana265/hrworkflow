import { topologicalSort } from '../utils/validation';

export function getAutomations() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "send_email", label: "Send Email", params: ["to", "subject", "body"] },
        { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
        { id: "notify_slack", label: "Notify Slack", params: ["channel", "message"] },
        { id: "create_ticket", label: "Create Ticket", params: ["title", "priority"] }
      ]);
    }, 500);
  });
}

/**
 * @param {{nodes: import('@xyflow/react').Node[], edges: import('@xyflow/react').Edge[]}} payload 
 * @returns {Promise<import('../constants/nodeDefaults').SimulationResult>}
 */
export function simulateWorkflow({ nodes, edges }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedNodes = topologicalSort(nodes, edges);
      const steps = [];
      let overallStatus = 'success';
      
      let errorOccurred = false;

      for (const node of sortedNodes) {
        if (errorOccurred) {
          steps.push({
            nodeId: node.id,
            nodeTitle: node.data?.title || 'Unknown',
            nodeType: node.type,
            status: 'skipped',
            message: 'Skipped due to previous error'
          });
          continue;
        }

        const isStructuralNode = ['start', 'end'].includes(node.type);
        const fails = !isStructuralNode && Math.random() < 0.15;

        if (fails) {
          steps.push({
            nodeId: node.id,
            nodeTitle: node.data?.title || 'Unknown',
            nodeType: node.type,
            status: 'error',
            message: 'An unexpected error occurred during execution.'
          });
          errorOccurred = true;
          overallStatus = 'error';
        } else {
          steps.push({
            nodeId: node.id,
            nodeTitle: node.data?.title || 'Unknown',
            nodeType: node.type,
            status: 'success',
            message: 'Executed successfully.'
          });
        }
      }

      resolve({
        status: overallStatus,
        steps
      });
    }, 1500);
  });
}
