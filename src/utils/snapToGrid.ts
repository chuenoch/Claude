import { GRID_SIZE } from '../constants/grid';

export function snapToGrid({ x, y }: { x: number; y: number }) {
  return {
    x: Math.round(x / GRID_SIZE) * GRID_SIZE,
    y: Math.round(y / GRID_SIZE) * GRID_SIZE,
  };
}
