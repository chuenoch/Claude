import { DraggablePaletteItem } from './DraggablePaletteItem';
import type { ComponentType } from '../../types/diagram';
import './Sidebar.css';

const PALETTE: { type: ComponentType; label: string }[] = [
  { type: 'utilitySource',    label: 'Utility' },
  { type: 'transformer',      label: 'XFMR' },
  { type: 'circuitBreaker',   label: 'CB' },
  { type: 'disconnectSwitch', label: 'DS' },
  { type: 'busBar',           label: 'Bus' },
  { type: 'load',             label: 'Load' },
];

interface Props {
  pendingType: ComponentType | null;
  onSelect: (type: ComponentType) => void;
}

export function Sidebar({ pendingType, onSelect }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">COMPONENTS</div>
      {PALETTE.map((item) => (
        <DraggablePaletteItem
          key={item.type}
          type={item.type}
          label={item.label}
          pending={pendingType === item.type}
          onSelect={onSelect}
        />
      ))}
    </aside>
  );
}
