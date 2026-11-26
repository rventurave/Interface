import GraphPanel from './GraphPanel';
import MainPanel from './MainPanel';
import ChatScrollArea from './ChatScrollArea';
import type { usePreferenceGraph } from '../hooks/usePreferenceGraph';

type PreferenceGraph = ReturnType<typeof usePreferenceGraph>;

interface MainViewProps {
  graph: PreferenceGraph;
  onOpenExploration: () => void;
}

export default function MainView({ graph, onOpenExploration }: MainViewProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3 px-2 pb-3 pt-[4.25rem] lg:h-full lg:flex-row lg:p-3">
      <ChatScrollArea className="flex min-w-0 w-full flex-col rounded-2xl border-[3px] border-orange-400 bg-[#090709] [&>section]:px-3 lg:h-full lg:w-[62.2%] lg:overflow-y-auto lg:[&>section]:px-8">
        <MainPanel onSend={graph.simulate} onOpenExploration={onOpenExploration} />
      </ChatScrollArea>

      <div className="flex min-w-0 w-full flex-col rounded-2xl border-[3px] border-orange-400 bg-[#090709] [&>section]:px-3 lg:h-full lg:w-[37.8%] lg:overflow-y-auto lg:[&>section]:px-8">
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
