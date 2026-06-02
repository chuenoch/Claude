import { useState, useCallback } from 'react';
import { ReactFlowProvider, type Node, type NodeMouseHandler } from 'reactflow';

import { Canvas } from './components/Canvas/Canvas';
import { Sidebar } from './components/Sidebar/Sidebar';
import { PropertiesPanel } from './components/PropertiesPanel/PropertiesPanel';
import { useDiagramState } from './hooks/useDiagramState';
import { useAutoConnect } from './hooks/useAutoConnect';
import { usePersistence } from './hooks/usePersistence';
import type { NodeData, ComponentType } from './types/diagram';
import './App.css';

function DiagramApp() {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    addNode,
    updateNode,
    addEdgeToState,
    onConnect,
  } = useDiagramState();

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [pendingType, setPendingType] = useState<ComponentType | null>(null);

  const { onNodeDragStop } = useAutoConnect(nodes, edges, addEdgeToState);

  usePersistence(nodes, edges, setNodes, setEdges);

  const selectedNode =
    (nodes.find((n) => n.id === selectedNodeId) as Node<NodeData>) ?? null;

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setPendingType(null);
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const onPendingPlaced = useCallback(() => {
    setPendingType(null);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar
        pendingType={pendingType}
        onSelect={setPendingType}
      />
      <main className="app-canvas">
        <Canvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          addNode={addNode}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          pendingType={pendingType}
          onPendingPlaced={onPendingPlaced}
        />
      </main>
      <PropertiesPanel node={selectedNode} onUpdate={updateNode} />
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <DiagramApp />
    </ReactFlowProvider>
  );
}
