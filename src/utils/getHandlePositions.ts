import type { Node } from 'reactflow';
import type { ComponentType, NodeData } from '../types/diagram';
import { NODE_WIDTHS, NODE_HEIGHTS } from '../constants/grid';

export interface HandleDef {
  id: string;
  offsetX: number; // fraction of node width
  offsetY: number; // fraction of node height
}

export interface AbsoluteHandle extends HandleDef {
  x: number;
  y: number;
}

const HANDLE_OFFSETS: Record<ComponentType, HandleDef[]> = {
  transformer: [
    { id: 'top',    offsetX: 0.5, offsetY: 0 },
    { id: 'bottom', offsetX: 0.5, offsetY: 1 },
  ],
  circuitBreaker: [
    { id: 'top',    offsetX: 0.5, offsetY: 0 },
    { id: 'bottom', offsetX: 0.5, offsetY: 1 },
  ],
  disconnectSwitch: [
    { id: 'top',    offsetX: 0.5, offsetY: 0 },
    { id: 'bottom', offsetX: 0.5, offsetY: 1 },
  ],
  busBar: [
    { id: 'left',  offsetX: 0,    offsetY: 0.5 },
    { id: 'right', offsetX: 1,    offsetY: 0.5 },
    { id: 'tap-1', offsetX: 0.25, offsetY: 0 },
    { id: 'tap-2', offsetX: 0.5,  offsetY: 0 },
    { id: 'tap-3', offsetX: 0.75, offsetY: 0 },
  ],
  utilitySource: [
    { id: 'out', offsetX: 0.5, offsetY: 1 },
  ],
  load: [
    { id: 'in', offsetX: 0.5, offsetY: 0 },
  ],
};

export function getAbsoluteHandlePositions(node: Node<NodeData>): AbsoluteHandle[] {
  const type = node.data.componentType;
  const defs = HANDLE_OFFSETS[type];
  const w = NODE_WIDTHS[type];
  const h = NODE_HEIGHTS[type];
  return defs.map((def) => ({
    ...def,
    x: node.position.x + def.offsetX * w,
    y: node.position.y + def.offsetY * h,
  }));
}
