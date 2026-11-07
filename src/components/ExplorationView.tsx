import ExplorationGraph from './exploration/ExplorationGraph';
import ExplorerPanel from './ExplorerPanel';
import { useExplorationGraph } from '../hooks/useExplorationGraph';
import type { Area, Feedback } from '../types/exploration';

interface ExplorationViewProps {
  onBack: () => void;
  onAreaFeedback: (area: Area, feedback: Feedback) => void;
  onChatConcept: (label: string, tag?: string) => void;
}

export default function ExplorationView({
  onBack,
  onAreaFeedback,
  onChatConcept,
}: ExplorationViewProps) {
  const graph = useExplorationGraph();

  const handleFeedback = (id: string, feedback: Feedback) => {
    graph.setFeedback(id, feedback);
    const area = graph.areas.find((item) => item.id === id);
    if (area) onAreaFeedback(area, feedback);
  };

  const handleChatSend = (text: string) => {
    onChatConcept(text, graph.selectedArea?.name);
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col pt-14 lg:flex-row lg:pt-0">
      <div className="flex w-full flex-col lg:h-screen lg:w-[30%] lg:overflow-hidden lg:border-r lg:border-primary/20">
        <ExplorerPanel
          selectedArea={graph.selectedArea}
          selectedId={graph.selectedId}
          onSelect={graph.selectNode}
          onFeedback={handleFeedback}
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
          onFeedback={handleFeedback}
          onDelete={graph.deleteArea}
          onAddArea={graph.addArea}
        />
      </div>
    </div>
  );
}
