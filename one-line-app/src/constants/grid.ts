import type { ComponentType } from '../types/diagram';

export const GRID_SIZE = 20;
export const SNAP_THRESHOLD = 30;

export const NODE_WIDTHS: Record<ComponentType, number> = {
  transformer: 80,
  circuitBreaker: 60,
  disconnectSwitch: 60,
  busBar: 160,
  utilitySource: 70,
  load: 60,
};

export const NODE_HEIGHTS: Record<ComponentType, number> = {
  transformer: 80,
  circuitBreaker: 80,
  disconnectSwitch: 80,
  busBar: 30,
  utilitySource: 70,
  load: 70,
};

export const DEFAULT_LABELS: Record<ComponentType, string> = {
  transformer: 'XFMR',
  circuitBreaker: 'CB',
  disconnectSwitch: 'DS',
  busBar: 'BUS',
  utilitySource: 'UTIL',
  load: 'LOAD',
};
