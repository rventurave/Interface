import ExplorationGraph from './exploration/ExplorationGraph';
import ExplorerPanel from './ExplorerPanel';
import { useExplorationGraph } from '../hooks/useExplorationGraph';

interface ExplorationViewProps {
  onBack: () => void;
}

export default function ExplorationView({ onBack }: ExplorationViewProps) {
  const graph = useExplorationGraph();

  const handleChatSend = (_text: string) => {
    // Demo: aquí se conectaría la IA para actualizar el grafo de preferencias.
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col pt-14 lg:flex-row lg:pt-0">
      <div className="flex w-full flex-col lg:h-screen lg:w-[30%] lg:overflow-hidden lg:border-r lg:border-primary/20">
        <ExplorerPanel
          selectedArea={graph.selectedArea}
          selectedId={graph.selectedId}
          onSelect={graph.selectNode}
          onFeedback={graph.setFeedback}
          onSend={handleChatSend}
          onBack={onBack}
        />
      </div>

      <div className="h-[72vh] w-full lg:h-screen lg:w-[70%]">
        <ExplorationGraph
          nodes={graph.nodes}
          edges={graph.edges}
          areas={graph.areas}
          selectedId={graph.selectedId}
          onSelect={graph.selectNode}
          onFeedback={graph.setFeedback}
          onDelete={graph.deleteArea}
          onAddArea={graph.addArea}
        />
      </div>
    </div>
  );
}
