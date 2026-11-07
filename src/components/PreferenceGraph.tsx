import { useEffect, useRef } from 'react';
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type EdgeTypes,
  type Node,
  type NodeTypes,
  type OnNodesChange,
  type ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FloatingEdge from './FloatingEdge';
import GroupNode from './GroupNode';
import ProfileNode from './ProfileNode';
import { KIND_COLORS, type ProfileNodeData } from '../types/graph';

const nodeTypes = { profile: ProfileNode, group: GroupNode } satisfies NodeTypes;
const edgeTypes = { floating: FloatingEdge } satisfies EdgeTypes;

interface PreferenceGraphProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
}

export default function PreferenceGraph({
  nodes,
  edges,
  onNodesChange,
}: PreferenceGraphProps) {
  const instanceRef = useRef<ReactFlowInstance | null>(null);

  useEffect(() => {
    instanceRef.current?.fitView({ padding: 0.2 });
  }, [nodes.length]);

  return (
    <div className="glow-card h-[420px] w-full overflow-hidden lg:h-[440px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
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
          nodeColor={(node) => {
            if (node.type === 'group') return '#241245';
            return KIND_COLORS[(node.data as unknown as ProfileNodeData).kind];
          }}
          maskColor="rgba(5,5,5,0.85)"
          style={{ background: '#050505' }}
        />
      </ReactFlow>
    </div>
  );
}
