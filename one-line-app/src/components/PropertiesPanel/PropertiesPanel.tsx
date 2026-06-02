import type { Node } from 'reactflow';
import type { NodeData } from '../../types/diagram';
import './PropertiesPanel.css';

interface Props {
  node: Node<NodeData> | null;
  onUpdate: (id: string, data: Partial<NodeData>) => void;
  onDelete: (id: string) => void;
}

export function PropertiesPanel({ node, onUpdate, onDelete }: Props) {
  const isOpen = !!node;

  return (
    <aside className={`properties-panel${isOpen ? ' panel-open' : ''}`}>
      <div className="panel-drag-handle" aria-hidden="true" />
      <div className="panel-header">PROPERTIES</div>

      {!node ? (
        <div className="panel-empty">Select a component</div>
      ) : (
        <>
          <div className="panel-type">{node.data.componentType.toUpperCase()}</div>

          <div className="panel-field">
            <label htmlFor="prop-label">Label</label>
            <input
              id="prop-label"
              type="text"
              value={node.data.label}
              onChange={(e) => onUpdate(node.id, { label: e.target.value })}
            />
          </div>

          <div className="panel-field">
            <label htmlFor="prop-voltage">Voltage (kV)</label>
            <input
              id="prop-voltage"
              type="number"
              min={0}
              step={0.1}
              value={node.data.voltage ?? ''}
              onChange={(e) =>
                onUpdate(node.id, {
                  voltage:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
            />
          </div>

          <div className="panel-field">
            <label htmlFor="prop-ampacity">Ampacity (A)</label>
            <input
              id="prop-ampacity"
              type="number"
              min={0}
              step={1}
              value={node.data.ampacity ?? ''}
              onChange={(e) =>
                onUpdate(node.id, {
                  ampacity:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
            />
          </div>

          <div className="panel-delete">
            <button
              className="delete-btn"
              onClick={() => onDelete(node.id)}
            >
              Remove Component
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
