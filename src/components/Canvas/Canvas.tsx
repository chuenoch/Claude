import { useRef, useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ConnectionMode,
  useReactFlow,
  type Node,
  type Edge,
  type NodeMouseHandler,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from 'reactflow';
import 'reactflow/dist/style.css';

import type { NodeData, ComponentType } from '../../types/diagram';
import { TransformerNode } from '../nodes/TransformerNode';
import { CircuitBreakerNode } from '../nodes/CircuitBreakerNode';
import { DisconnectSwitchNode } from '../nodes/DisconnectSwitchNode';
import { BusBarNode } from '../nodes/BusBarNode';
import { UtilitySourceNode } from '../nodes/UtilitySourceNode';
import { LoadNode } from '../nodes/LoadNode';
import { snapToGrid } from '../../utils/snapToGrid';
import { DEFAULT_LABELS } from '../../constants/grid';
import './Canvas.css';

const nodeTypes = {
  transformer: TransformerNode,
  circuitBreaker: CircuitBreakerNode,
  disconnectSwitch: DisconnectSwitchNode,
  busBar: BusBarNode,
  utilitySource: UtilitySourceNode,
  load: LoadNode,
};

interface Props {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onNodeDragStop: (event: React.MouseEvent, node: Node<NodeData>) => void;
  addNode: (node: Node<NodeData>) => void;
  onNodeClick: NodeMouseHandler;
  onPaneClick: () => void;
  pendingType: ComponentType | null;
  onPendingPlaced: () => void;
}

const COMPONENT_NAMES: Record<ComponentType, string> = {
  transformer: 'Transformer',
  circuitBreaker: 'Circuit Breaker',
  disconnectSwitch: 'Disconnect Switch',
  busBar: 'Bus Bar',
  utilitySource: 'Utility Source',
  load: 'Load',
};

export function Canvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeDragStop,
  addNode,
  onNodeClick,
  onPaneClick,
  pendingType,
  onPendingPlaced,
}: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const type = e.dataTransfer.getData(
        'application/reactflow-type',
      ) as ComponentType;
      if (!type) return;

      const bounds = canvasRef.current!.getBoundingClientRect();
      const rawPosition = project({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });
      const position = snapToGrid(rawPosition);

      addNode({
        id: crypto.randomUUID(),
        type,
        position,
        data: {
          componentType: type,
          label: DEFAULT_LABELS[type],
          voltage: undefined,
          ampacity: undefined,
        },
      });
    },
    [project, addNode],
  );

  const handlePaneClick = useCallback(
    (event: React.MouseEvent) => {
      if (pendingType) {
        const bounds = canvasRef.current!.getBoundingClientRect();
        const rawPosition = project({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });
        const position = snapToGrid(rawPosition);
        addNode({
          id: crypto.randomUUID(),
          type: pendingType,
          position,
          data: {
            componentType: pendingType,
            label: DEFAULT_LABELS[pendingType],
            voltage: undefined,
            ampacity: undefined,
          },
        });
        onPendingPlaced();
      } else {
        onPaneClick();
      }
    },
    [pendingType, project, addNode, onPendingPlaced, onPaneClick],
  );

  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <div ref={canvasRef} className={`canvas-wrapper${pendingType ? ' placing' : ''}`}>
      {pendingType && (
        <div className="pending-hint">
          Tap canvas to place <strong>{COMPONENT_NAMES[pendingType]}</strong>
          <button
            className="pending-cancel"
            onClick={onPendingPlaced}
            aria-label="Cancel placement"
          >
            ✕
          </button>
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        onPaneClick={handlePaneClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={memoizedNodeTypes}
        connectionMode={ConnectionMode.Loose}
        snapToGrid
        snapGrid={[20, 20]}
        defaultEdgeOptions={{
          type: 'step',
          style: { stroke: '#888', strokeWidth: 2 },
        }}
        fitView
        style={{ background: '#1a1a1a' }}
        deleteKeyCode="Delete"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#2a2a2a"
        />
        <Controls
          style={{
            background: '#242424',
            border: '1px solid #333',
            borderRadius: 3,
          }}
        />
        <MiniMap
          nodeColor="#4a9eff"
          maskColor="rgba(26,26,26,0.85)"
          style={{
            background: '#242424',
            border: '1px solid #333',
            borderRadius: 3,
          }}
        />
      </ReactFlow>
    </div>
  );
}
