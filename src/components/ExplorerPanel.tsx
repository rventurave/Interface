import AreaDetails from './AreaDetails';
import ExplorerChat from './ExplorerChat';
import { BrainLogo } from './Logo';
import { CAREER } from '../data/exploration';
import type { Area, Feedback } from '../types/exploration';

interface ExplorerPanelProps {
  selectedArea: Area | null;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onFeedback: (id: string, feedback: Feedback) => void;
  onSend: (text: string) => void;
  onBack: () => void;
}

export default function ExplorerPanel({
  selectedArea,
  selectedId,
  onSelect,
  onFeedback,
  onSend,
  onBack,
}: ExplorerPanelProps) {
  const contextLabel = selectedArea
    ? selectedArea.name
    : selectedId === 'career'
      ? CAREER
      : null;

  return (
    <section className="flex flex-col px-5 py-6 lg:h-full lg:px-6 lg:py-8">
      <header className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-white/60 transition-colors hover:text-white"
        >
          ← Volver
        </button>
        <BrainLogo className="h-6 w-6" />
        <span className="text-sm font-medium text-white/70">Explorador de Áreas</span>
      </header>

      <div className="mt-6 lg:flex-1 lg:overflow-y-auto">
        <AreaDetails
          selectedArea={selectedArea}
          selectedId={selectedId}
          onFeedback={onFeedback}
        />
      </div>

      <div className="mt-4">
        <ExplorerChat
          onSend={onSend}
          contextLabel={contextLabel}
          onClearContext={() => onSelect(null)}
        />
      </div>
    </section>
  );
}
