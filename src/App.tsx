import { useState, useCallback } from 'react';
import { ReactFlowProvider, type Node, type NodeMouseHandler } from 'reactflow';

import { Canvas } from './components/Canvas/Canvas';
import { Sidebar } from './components/Sidebar/Sidebar';
import { PropertiesPanel } from './components/PropertiesPanel/PropertiesPanel';
import { useDiagramState } from './hooks/useDiagramState';
import { useAutoConnect } from './hooks/useAutoConnect';
import { usePersistence } from './hooks/usePersistence';
import type { NodeData } from './types/diagram';
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

  const { onNodeDragStop } = useAutoConnect(nodes, edges, addEdgeToState);

  usePersistence(nodes, edges, setNodes, setEdges);

  const selectedNode =
    (nodes.find((n) => n.id === selectedNodeId) as Node<NodeData>) ?? null;

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
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
