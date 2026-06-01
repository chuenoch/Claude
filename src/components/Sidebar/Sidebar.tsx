import { DraggablePaletteItem } from './DraggablePaletteItem';
import type { ComponentType } from '../../types/diagram';
import './Sidebar.css';

const PALETTE: { type: ComponentType; label: string }[] = [
  { type: 'utilitySource',   label: 'Utility Source' },
  { type: 'transformer',     label: 'Transformer' },
  { type: 'circuitBreaker',  label: 'Circuit Breaker' },
  { type: 'disconnectSwitch',label: 'Disconnect Sw.' },
  { type: 'busBar',          label: 'Bus Bar' },
  { type: 'load',            label: 'Load' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">COMPONENTS</div>
      {PALETTE.map((item) => (
        <DraggablePaletteItem key={item.type} type={item.type} label={item.label} />
      ))}
    </aside>
  );
}
