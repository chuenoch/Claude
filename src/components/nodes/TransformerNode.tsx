import { Handle, Position, type NodeProps } from 'reactflow';
import type { NodeData } from '../../types/diagram';
import './nodes.css';

// ANSI/IEEE Std 315: power transformer — two tangent circles representing primary/secondary windings
export function TransformerNode({ data, selected }: NodeProps<NodeData>) {
  return (
    <div className={`node-shell${selected ? ' selected' : ''}`} style={{ width: 80, height: 80 }}>
      <Handle type="source" position={Position.Top} id="top" className="node-handle" />
      <svg viewBox="0 0 80 80" width={80} height={80}>
        {/* Primary winding */}
        <circle cx="40" cy="26" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
        {/* Secondary winding, tangent below primary */}
        <circle cx="40" cy="54" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
        {/* Top terminal line to node edge */}
        <line x1="40" y1="0" x2="40" y2="12" stroke="currentColor" strokeWidth="2" />
        {/* Bottom terminal line to node edge */}
        <line x1="40" y1="68" x2="40" y2="80" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div className="node-label">{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="bottom" className="node-handle" />
    </div>
  );
}
