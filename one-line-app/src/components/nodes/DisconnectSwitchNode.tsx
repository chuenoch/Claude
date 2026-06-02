import { Handle, Position, type NodeProps } from 'reactflow';
import type { NodeData } from '../../types/diagram';
import './nodes.css';

// ANSI/IEEE Std 315: disconnect switch — open knife-blade switch (blade angled ~45° in open position)
export function DisconnectSwitchNode({ data, selected }: NodeProps<NodeData>) {
  return (
    <div className={`node-shell${selected ? ' selected' : ''}`} style={{ width: 60, height: 80 }}>
      <Handle type="source" position={Position.Top} id="top" className="node-handle" />
      <svg viewBox="0 0 60 80" width={60} height={80}>
        {/* Top terminal line */}
        <line x1="30" y1="0" x2="30" y2="22" stroke="currentColor" strokeWidth="2" />
        {/* Top contact jaw */}
        <line x1="22" y1="22" x2="38" y2="22" stroke="currentColor" strokeWidth="2.5" />
        {/* Pivot point */}
        <circle cx="30" cy="55" r="2.5" fill="currentColor" />
        {/* Blade angled open ~45° upper-right */}
        <line x1="30" y1="55" x2="50" y2="30" stroke="currentColor" strokeWidth="2" />
        {/* Bottom terminal line */}
        <line x1="30" y1="57" x2="30" y2="80" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div className="node-label">{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="bottom" className="node-handle" />
    </div>
  );
}
