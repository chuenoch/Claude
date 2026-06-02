import { Handle, Position, type NodeProps } from 'reactflow';
import type { NodeData } from '../../types/diagram';
import './nodes.css';

// ANSI/IEEE Std 315: circuit breaker — square with diagonal (or X) indicating interrupting device
export function CircuitBreakerNode({ data, selected }: NodeProps<NodeData>) {
  return (
    <div className={`node-shell${selected ? ' selected' : ''}`} style={{ width: 60, height: 80 }}>
      <Handle type="source" position={Position.Top} id="top" className="node-handle" />
      <svg viewBox="0 0 60 80" width={60} height={80}>
        {/* Top terminal */}
        <line x1="30" y1="0" x2="30" y2="20" stroke="currentColor" strokeWidth="2" />
        {/* Bounding square */}
        <rect x="10" y="20" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none" />
        {/* Diagonal cross — ANSI CB symbol */}
        <line x1="10" y1="20" x2="50" y2="60" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="20" x2="10" y2="60" stroke="currentColor" strokeWidth="2" />
        {/* Bottom terminal */}
        <line x1="30" y1="60" x2="30" y2="80" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div className="node-label">{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="bottom" className="node-handle" />
    </div>
  );
}
