import GraphPanel from './components/GraphPanel';
import { BrainLogo } from './components/Logo';
import MainPanel from './components/MainPanel';
import Sidebar from './components/Sidebar';
import { usePreferenceGraph } from './hooks/usePreferenceGraph';

export default function App() {
  const graph = usePreferenceGraph();

  return (
    <div className="flex min-h-screen w-full bg-ink text-white lg:h-screen lg:overflow-hidden">
      <div className="fixed inset-x-0 top-0 z-20 flex items-center gap-2.5 border-b border-primary/20 bg-[#1a0b2e] px-4 py-3 lg:hidden">
        <BrainLogo className="h-6 w-6" />
        <span className="text-sm font-medium">IA de Investigación</span>
      </div>

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col pt-14 lg:flex-row lg:pt-0">
        <div className="flex w-full flex-col lg:h-screen lg:w-[62.2%] lg:overflow-y-auto">
          <MainPanel onSend={graph.simulate} />
        </div>

        <div className="flex w-full flex-col border-primary/40 lg:h-screen lg:w-[37.8%] lg:overflow-y-auto lg:border-l">
          <GraphPanel
            nodes={graph.nodes}
            edges={graph.edges}
            onNodesChange={graph.onNodesChange}
            onSimulate={graph.simulate}
          />
        </div>
      </div>
    </div>
  );
}
