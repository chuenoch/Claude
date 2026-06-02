import { useEffect } from 'react';
import type { Node, Edge } from 'reactflow';
import type { NodeData } from '../types/diagram';

const STORAGE_KEY = 'eld-diagram-v1';

interface SerializedDiagram {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

export function usePersistence(
  nodes: Node<NodeData>[],
  edges: Edge[],
  setNodes: (nodes: Node<NodeData>[]) => void,
  setEdges: (edges: Edge[]) => void,
) {
  // Load once on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const { nodes: savedNodes, edges: savedEdges }: SerializedDiagram =
        JSON.parse(raw);
      setNodes(savedNodes ?? []);
      setEdges(savedEdges ?? []);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced save on every change
  useEffect(() => {
    const timer = setTimeout(() => {
      const cleanNodes = nodes.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ positionAbsolute, width, height, dragging, selected, ...rest }) =>
          rest,
      );
      const payload: SerializedDiagram = { nodes: cleanNodes, edges };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }, 300);
    return () => clearTimeout(timer);
  }, [nodes, edges]);
}
