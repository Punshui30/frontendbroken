
import { Node, Edge } from 'reactflow';

export interface WorkflowEdit {
  type: 'add' | 'remove' | 'modify' | 'insert';
  description: string;
  changes: {
    nodes?: Node[];
    edges?: Edge[];
    removeNodes?: string[];
    removeEdges?: string[];
    updateNodes?: Array<{ id: string; updates: Partial<Node> }>;
  };
}

export interface WorkflowContext {
  nodes: Node[];
  edges: Edge[];
  activeNodeId?: string;
}

export async function parseWorkflowEdit(
  instruction: string,
  context: WorkflowContext
): Promise<WorkflowEdit> {
  const addMatch = instruction.match(/add (an?|the) ([^ ]+)/i);
  const removeMatch = instruction.match(/remove|delete (the )?([^ ]+)/i);
  const swapMatch = instruction.match(/swap|replace ([^ ]+) (with|for) ([^ ]+)/i);
  const modifyMatch = instruction.match(/modify|update|change (the )?([^ ]+)/i);
  const retryMatch = instruction.match(/retry ([0-9]+) times? every ([0-9]+) seconds?/i);
  const fallbackMatch = instruction.match(/fallback to ([^ ]+)/i);
  const rescueMatch = instruction.match(/rescue with ([^ ]+)/i);

  const position = { x: 200, y: 200 };

  if (addMatch) {
    const nodeType = addMatch[2].toLowerCase();
    const newNode: Node = {
      id: `${Date.now()}`,
      type: nodeType,
      position,
      data: { label: `New ${nodeType}` }
    };

    return {
      type: 'add',
      description: `Add a ${nodeType} node`,
      changes: { nodes: [newNode] }
    };
  }

  if (removeMatch) {
    const target = removeMatch[2].toLowerCase();
    const nodeToRemove = context.nodes.find(n =>
      n.data?.label?.toLowerCase().includes(target)
    );

    return {
      type: 'remove',
      description: `Remove node ${target}`,
      changes: {
        removeNodes: nodeToRemove ? [nodeToRemove.id] : []
      }
    };
  }

  if (swapMatch) {
    const from = swapMatch[1].toLowerCase();
    const to = swapMatch[3].toLowerCase();

    return {
      type: 'modify',
      description: `Swap ${from} for ${to}`,
      changes: {
        updateNodes: context.nodes
          .filter(n => n.data?.label?.toLowerCase().includes(from))
          .map(n => ({
            id: n.id,
            updates: { data: { ...n.data, label: to } }
          }))
      }
    };
  }

  if (modifyMatch) {
    const target = modifyMatch[2].toLowerCase();
    return {
      type: 'modify',
      description: `Modify ${target}`,
      changes: {} // Placeholder
    };
  }

  if (retryMatch || fallbackMatch || rescueMatch) {
    const nodeType = retryMatch ? 'retry' : fallbackMatch ? 'fallback' : 'rescue';
    const newNode: Node = {
      id: `${Date.now()}`,
      type: nodeType,
      position,
      data: {
        label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node`
      }
    };

    return {
      type: 'add',
      description: `Insert ${nodeType} node`,
      changes: { nodes: [newNode] }
    };
  }

  return {
    type: 'modify',
    description: 'Unrecognized instruction',
    changes: {}
  };
}
