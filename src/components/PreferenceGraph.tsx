import { useEffect, useRef } from 'react';
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
  type NodeTypes,
  type OnNodeDrag,
  type OnNodesChange,
  type ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ProfileNode from './ProfileNode';
import { KIND_COLORS, type ProfileNodeData } from '../types/graph';

const nodeTypes = { profile: ProfileNode } satisfies NodeTypes;

interface PreferenceGraphProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onNodeDragStart: OnNodeDrag;
  onNodeDrag: OnNodeDrag;
  onNodeDragStop: OnNodeDrag;
  onSelectNode: (id: string | null) => void;
}

export default function PreferenceGraph({
  nodes,
  edges,
  onNodesChange,
  onNodeDragStart,
  onNodeDrag,
  onNodeDragStop,
  onSelectNode,
}: PreferenceGraphProps) {
  const instanceRef = useRef<ReactFlowInstance | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      instanceRef.current?.fitView({ padding: 0.2 });
    }, 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="glow-card h-[420px] w-full overflow-hidden lg:h-[440px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={(_event, node) => onSelectNode(node.id)}
        onPaneClick={() => onSelectNode(null)}
        onInit={(instance) => {
          instanceRef.current = instance;
        }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#3b2a63" gap={24} size={1} />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(node) => KIND_COLORS[(node.data as unknown as ProfileNodeData).kind]}
          maskColor="rgba(5,5,5,0.85)"
          pannable
          zoomable
          style={{ width: 120, height: 80, background: '#050505' }}
        />
      </ReactFlow>
    </div>
  );
}
