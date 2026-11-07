import { useState } from 'react';
import type { Edge, Node, OnNodeDrag, OnNodesChange } from '@xyflow/react';
import Legend from './Legend';
import NodeDetail from './NodeDetail';
import PreferenceGraph from './PreferenceGraph';
import ProfileEvolution from './ProfileEvolution';

interface GraphPanelProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onNodeDragStart: OnNodeDrag;
  onNodeDrag: OnNodeDrag;
  onNodeDragStop: OnNodeDrag;
  onSimulate: () => void;
  onToggleImportant: (id: string) => void;
  onDeleteNode: (id: string) => void;
}

export default function GraphPanel({
  nodes,
  edges,
  onNodesChange,
  onNodeDragStart,
  onNodeDrag,
  onNodeDragStop,
  onSimulate,
  onToggleImportant,
  onDeleteNode,
}: GraphPanelProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;

  return (
    <section className="flex min-h-screen flex-col px-6 py-6 lg:min-h-0 lg:px-8 lg:py-10">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">Este eres tú</h2>
          <p className="mt-1 max-w-xs text-sm text-white/55">
            Se actualiza automáticamente con tus conversaciones sobre investigación.
          </p>
        </div>
        <button
          type="button"
          onClick={onSimulate}
          className="shrink-0 rounded-xl border border-primary/40 bg-primary/15 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/25"
        >
          Simular
        </button>
      </header>

      <div className="mt-6">
        <PreferenceGraph
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeDragStart={onNodeDragStart}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          onSelectNode={setSelectedNodeId}
          onToggleImportant={onToggleImportant}
          onDeleteNode={(id) => {
            onDeleteNode(id);
            if (selectedNodeId === id) setSelectedNodeId(null);
          }}
        />
      </div>

      <div className="mt-6">
        {selectedNode ? (
          <NodeDetail
            node={selectedNode}
            onClose={() => setSelectedNodeId(null)}
          />
        ) : (
          <ProfileEvolution nodes={nodes} />
        )}
      </div>

      <div className="mt-6">
        <Legend />
      </div>
    </section>
  );
}
