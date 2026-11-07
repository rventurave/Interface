import GraphPanel from './GraphPanel';
import MainPanel from './MainPanel';
import type { usePreferenceGraph } from '../hooks/usePreferenceGraph';

type PreferenceGraph = ReturnType<typeof usePreferenceGraph>;

interface MainViewProps {
  graph: PreferenceGraph;
  onOpenExploration: () => void;
}

export default function MainView({ graph, onOpenExploration }: MainViewProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col pt-14 lg:flex-row lg:pt-0">
      <div className="flex w-full flex-col lg:h-screen lg:w-[62.2%] lg:overflow-y-auto">
        <MainPanel onSend={graph.simulate} onOpenExploration={onOpenExploration} />
      </div>

      <div className="flex w-full flex-col border-primary/40 lg:h-screen lg:w-[37.8%] lg:overflow-y-auto lg:border-l">
        <GraphPanel
          nodes={graph.nodes}
          edges={graph.edges}
          onNodesChange={graph.onNodesChange}
          onNodeDragStart={graph.onNodeDragStart}
          onNodeDrag={graph.onNodeDrag}
          onNodeDragStop={graph.onNodeDragStop}
          onSimulate={graph.simulate}
          onToggleImportant={graph.toggleImportant}
          onDeleteNode={graph.deleteNode}
        />
      </div>
    </div>
  );
}
