import { Handle, Position, type NodeProps } from 'reactflow';
import type { NodeData } from '../../types/diagram';
import './nodes.css';

// ANSI/IEEE Std 315: utility source / electric supply — circle with three horizontal lines
// representing the utility grid (mains supply symbol)
export function UtilitySourceNode({ data, selected }: NodeProps<NodeData>) {
  return (
    <div className={`node-shell${selected ? ' selected' : ''}`} style={{ width: 70, height: 70 }}>
      <svg viewBox="0 0 70 70" width={70} height={70}>
        {/* Outer circle */}
        <circle cx="35" cy="32" r="24" stroke="currentColor" strokeWidth="2" fill="none" />
        {/* Three horizontal lines representing utility supply phases */}
        <line x1="19" y1="24" x2="51" y2="24" stroke="currentColor" strokeWidth="1.5" />
        <line x1="19" y1="32" x2="51" y2="32" stroke="currentColor" strokeWidth="1.5" />
        <line x1="19" y1="40" x2="51" y2="40" stroke="currentColor" strokeWidth="1.5" />
        {/* Bottom terminal */}
        <line x1="35" y1="56" x2="35" y2="70" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div className="node-label">{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="out" className="node-handle" />
    </div>
  );
}
