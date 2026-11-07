import { useState } from 'react';
import ExplorationView from './components/ExplorationView';
import MainView from './components/MainView';
import Sidebar from './components/Sidebar';
import { BrainLogo } from './components/Logo';
import { usePreferenceGraph } from './hooks/usePreferenceGraph';

export default function App() {
  const [view, setView] = useState<'main' | 'exploration'>('main');
  const preferenceGraph = usePreferenceGraph();

  return (
    <div className="flex min-h-screen w-full bg-ink text-white lg:h-screen lg:overflow-hidden">
      <div className="fixed inset-x-0 top-0 z-20 flex items-center gap-2.5 border-b border-primary/20 bg-[#1a0b2e] px-4 py-3 lg:hidden">
        <BrainLogo className="h-6 w-6" />
        <span className="text-sm font-medium">InvestiGraph</span>
      </div>

      <Sidebar />

      {view === 'main' ? (
        <MainView
          graph={preferenceGraph}
          onOpenExploration={() => setView('exploration')}
        />
      ) : (
        <ExplorationView
          onBack={() => setView('main')}
          onAreaFeedback={preferenceGraph.addFromArea}
          onChatConcept={preferenceGraph.addConcept}
        />
      )}
    </div>
  );
}
