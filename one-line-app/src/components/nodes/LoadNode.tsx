import { Handle, Position, type NodeProps } from 'reactflow';
import type { NodeData } from '../../types/diagram';
import './nodes.css';

// ANSI/IEEE Std 315: load — downward-pointing triangle representing a generic power consuming load
export function LoadNode({ data, selected }: NodeProps<NodeData>) {
  return (
    <div className={`node-shell${selected ? ' selected' : ''}`} style={{ width: 60, height: 70 }}>
      <Handle type="source" position={Position.Top} id="in" className="node-handle" />
      <svg viewBox="0 0 60 70" width={60} height={70}>
        {/* Top terminal */}
        <line x1="30" y1="0" x2="30" y2="16" stroke="currentColor" strokeWidth="2" />
        {/* Downward-pointing triangle — load symbol */}
        <polygon
          points="8,16 52,16 30,54"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <div className="node-label">{data.label}</div>
    </div>
  );
}
