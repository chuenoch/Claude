import type { Edge } from 'reactflow';

export function euclidean(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function isDuplicateEdge(
  edges: Edge[],
  source: string,
  sourceHandle: string,
  target: string,
  targetHandle: string,
): boolean {
  return edges.some(
    (e) =>
      e.source === source &&
      e.sourceHandle === sourceHandle &&
      e.target === target &&
      e.targetHandle === targetHandle,
  );
}
