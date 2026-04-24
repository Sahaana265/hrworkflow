/**
 * @typedef {'start'|'task'|'approval'|'automated'|'end'} NodeType
 */

/**
 * @typedef {Object} StartNodeData
 * @property {'start'} nodeType
 * @property {string} title
 * @property {{key: string, value: string}[]} metadata
 */

/**
 * @typedef {Object} TaskNodeData
 * @property {'task'} nodeType
 * @property {string} title
 * @property {string} description
 * @property {string} assignee
 * @property {string} dueDate
 * @property {{key: string, value: string}[]} customFields
 */

/**
 * @typedef {Object} ApprovalNodeData
 * @property {'approval'} nodeType
 * @property {string} title
 * @property {string} approverRole
 * @property {number} autoApproveThreshold
 */

/**
 * @typedef {Object} AutomatedStepNodeData
 * @property {'automated'} nodeType
 * @property {string} title
 * @property {string} actionId
 * @property {Object.<string, string>} actionParams
 */

/**
 * @typedef {Object} EndNodeData
 * @property {'end'} nodeType
 * @property {string} endMessage
 * @property {boolean} summaryFlag
 */

export const NODE_TYPES = {
  START: 'start',
  TASK: 'task',
  APPROVAL: 'approval',
  AUTOMATED: 'automated',
  END: 'end'
};

export const defaultNodeData = {
  [NODE_TYPES.START]: {
    nodeType: NODE_TYPES.START,
    title: 'Start Event',
    metadata: []
  },
  [NODE_TYPES.TASK]: {
    nodeType: NODE_TYPES.TASK,
    title: 'Human Task',
    description: '',
    assignee: '',
    dueDate: '',
    customFields: []
  },
  [NODE_TYPES.APPROVAL]: {
    nodeType: NODE_TYPES.APPROVAL,
    title: 'Approval Step',
    approverRole: '',
    autoApproveThreshold: 0
  },
  [NODE_TYPES.AUTOMATED]: {
    nodeType: NODE_TYPES.AUTOMATED,
    title: 'Automated Action',
    actionId: '',
    actionParams: {}
  },
  [NODE_TYPES.END]: {
    nodeType: NODE_TYPES.END,
    title: 'End Event',
    endMessage: '',
    summaryFlag: false
  }
};
