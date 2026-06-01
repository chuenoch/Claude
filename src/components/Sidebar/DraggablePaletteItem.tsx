import type { ComponentType } from '../../types/diagram';
import { TransformerSymbol } from './symbols/TransformerSymbol';
import { CircuitBreakerSymbol } from './symbols/CircuitBreakerSymbol';
import { DisconnectSwitchSymbol } from './symbols/DisconnectSwitchSymbol';
import { BusBarSymbol } from './symbols/BusBarSymbol';
import { UtilitySourceSymbol } from './symbols/UtilitySourceSymbol';
import { LoadSymbol } from './symbols/LoadSymbol';
import './Sidebar.css';

const SYMBOLS: Record<ComponentType, React.FC> = {
  transformer: TransformerSymbol,
  circuitBreaker: CircuitBreakerSymbol,
  disconnectSwitch: DisconnectSwitchSymbol,
  busBar: BusBarSymbol,
  utilitySource: UtilitySourceSymbol,
  load: LoadSymbol,
};

interface Props {
  type: ComponentType;
  label: string;
}

export function DraggablePaletteItem({ type, label }: Props) {
  const Symbol = SYMBOLS[type];

  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/reactflow-type', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div draggable onDragStart={onDragStart} className="palette-item">
      <div className="palette-symbol">
        <Symbol />
      </div>
      <span className="palette-label">{label}</span>
    </div>
  );
}
