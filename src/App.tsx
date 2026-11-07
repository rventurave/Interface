import { useState } from 'react';
import ExplorationView from './components/ExplorationView';
import MainView from './components/MainView';
import { BrainLogo } from './components/Logo';
import { AccountIcon } from './components/icons/Icons';
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

      <button
        type="button"
        aria-label="Cuenta"
        title="Cuenta"
        className="fixed bottom-4 left-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 shadow-lg transition-colors hover:text-white"
      >
        <AccountIcon className="h-6 w-6" />
      </button>

      {view === 'main' ? (
        <MainView
          graph={preferenceGraph}
          onOpenExploration={() => setView('exploration')}
        />
      ) : (
        <ExplorationView onBack={() => setView('main')} />
      )}
    </div>
  );
}
