import { Handle, Position, type NodeProps } from 'reactflow';
import type { NodeData } from '../../types/diagram';
import './nodes.css';

// ANSI/IEEE Std 315: bus — bold horizontal line representing a common connection point (busbar)
export function BusBarNode({ data, selected }: NodeProps<NodeData>) {
  return (
    <div className={`node-shell${selected ? ' selected' : ''}`} style={{ width: 160, height: 30 }}>
      <Handle type="source" position={Position.Left} id="left" className="node-handle" />
      <Handle type="source" position={Position.Right} id="right" className="node-handle" />
      {/* Top tap handles at 25%, 50%, 75% */}
      <Handle
        type="source"
        position={Position.Top}
        id="tap-1"
        className="node-handle"
        style={{ left: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="tap-2"
        className="node-handle"
        style={{ left: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="tap-3"
        className="node-handle"
        style={{ left: '75%' }}
      />
      <svg viewBox="0 0 160 30" width={160} height={30}>
        {/* Main bus bar — bold horizontal line */}
        <line x1="0" y1="15" x2="160" y2="15" stroke="currentColor" strokeWidth="5" />
      </svg>
      <div className="node-label">{data.label}</div>
    </div>
  );
}
