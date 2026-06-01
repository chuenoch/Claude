export type ComponentType =
  | 'transformer'
  | 'circuitBreaker'
  | 'disconnectSwitch'
  | 'busBar'
  | 'utilitySource'
  | 'load';

export interface NodeData {
  componentType: ComponentType;
  label: string;
  voltage?: number;
  ampacity?: number;
}
