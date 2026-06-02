import { useCallback } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
} from 'reactflow';
import type { NodeData } from '../types/diagram';

export function useDiagramState() {
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const addNode = useCallback(
    (node: Node<NodeData>) => {
      setNodes((nds) => [...nds, node]);
    },
    [setNodes],
  );

  const updateNode = useCallback(
    (id: string, partialData: Partial<NodeData>) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, ...partialData } } : n,
        ),
      );
    },
    [setNodes],
  );

  const addEdgeToState = useCallback(
    (edge: Edge) => {
      setEdges((eds) => [...eds, edge]);
    },
    [setEdges],
  );

  const removeNode = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    },
    [setNodes, setEdges],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge({ ...params, type: 'step' }, eds),
      );
    },
    [setEdges],
  );

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    addNode,
    updateNode,
    addEdgeToState,
    removeNode,
    onConnect,
  };
}
