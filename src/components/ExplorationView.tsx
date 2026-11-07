import ArticlesView from './ArticlesView';
import HierarchyGraph from './exploration/HierarchyGraph';
import ExplorerPanel from './ExplorerPanel';
import { useHierarchyGraph } from '../hooks/useHierarchyGraph';

interface ExplorationViewProps {
  onBack: () => void;
}

export default function ExplorationView({ onBack }: ExplorationViewProps) {
  const graph = useHierarchyGraph();

  if (graph.articlesTopic) {
    return (
      <ArticlesView
        topic={graph.articlesTopic}
        onBack={graph.closeArticles}
      />
    );
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col pt-14 lg:flex-row lg:pt-0">
      <div className="flex w-full flex-col lg:h-screen lg:w-[30%] lg:overflow-hidden lg:border-r lg:border-primary/20">
        <ExplorerPanel
          selectedNode={graph.selectedNode}
          breadcrumb={graph.breadcrumb}
          onSelect={graph.selectNode}
          onBack={onBack}
        />
      </div>

      <div className="h-[72vh] w-full lg:h-screen lg:w-[70%]">
        <HierarchyGraph
          nodes={graph.flowNodes}
          edges={graph.flowEdges}
          nodeById={graph.nodeById}
          expanded={graph.expanded}
          onSelect={graph.selectNode}
          onExpand={graph.expandNode}
          onOpenArticles={graph.openArticles}
          onAddCustom={graph.addCustomNode}
          onCollapse={graph.collapseNode}
          onDelete={graph.deleteNode}
          onToggleImportant={graph.toggleImportant}
        />
      </div>
    </div>
  );
}
