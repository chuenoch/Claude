import { useCallback } from 'react';
import type { Node, Edge } from 'reactflow';
import type { NodeData } from '../types/diagram';
import { getAbsoluteHandlePositions } from '../utils/getHandlePositions';
import { euclidean, isDuplicateEdge } from '../utils/autoConnectUtils';
import { SNAP_THRESHOLD } from '../constants/grid';

export function useAutoConnect(
  nodes: Node<NodeData>[],
  edges: Edge[],
  addEdgeToState: (edge: Edge) => void,
) {
  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent, draggedNode: Node<NodeData>) => {
      const draggedHandles = getAbsoluteHandlePositions(draggedNode);

      let best: {
        distance: number;
        sourceId: string;
        sourceHandle: string;
        targetId: string;
        targetHandle: string;
      } | null = null;

      for (const otherNode of nodes) {
        if (otherNode.id === draggedNode.id) continue;
        const otherHandles = getAbsoluteHandlePositions(otherNode);

        for (const dh of draggedHandles) {
          for (const oh of otherHandles) {
            const dist = euclidean(dh.x, dh.y, oh.x, oh.y);
            if (dist <= SNAP_THRESHOLD) {
              if (!best || dist < best.distance) {
                best = {
                  distance: dist,
                  sourceId: draggedNode.id,
                  sourceHandle: dh.id,
                  targetId: otherNode.id,
                  targetHandle: oh.id,
                };
              }
            }
          }
        }
      }

      if (!best) return;

      if (
        isDuplicateEdge(
          edges,
          best.sourceId,
          best.sourceHandle,
          best.targetId,
          best.targetHandle,
        )
      ) {
        return;
      }

      addEdgeToState({
        id: `${best.sourceId}-${best.sourceHandle}-${best.targetId}-${best.targetHandle}`,
        source: best.sourceId,
        sourceHandle: best.sourceHandle,
        target: best.targetId,
        targetHandle: best.targetHandle,
        type: 'step',
        style: { stroke: '#888', strokeWidth: 2 },
      });
    },
    [nodes, edges, addEdgeToState],
  );

  return { onNodeDragStop };
}
