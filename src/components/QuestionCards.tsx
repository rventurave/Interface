import { AIIcon, BrainIcon, GraphIcon, ReloadIcon } from './icons/Icons';
import type { Question } from '../data/questions';

const ICONS = [BrainIcon, GraphIcon, AIIcon];

interface QuestionCardsProps {
  questions: Question[];
  selectedId: string | null;
  leavingId: string | null;
  onSelect: (id: string) => void;
  onReload: () => void;
}

export default function QuestionCards({
  questions,
  selectedId,
  leavingId,
  onSelect,
  onReload,
}: QuestionCardsProps) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-white/35">
          Preguntas guiadas
        </span>
        <button
          type="button"
          onClick={onReload}
          title="Cambiar preguntas"
          aria-label="Cambiar preguntas"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ReloadIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {questions.map((question, index) => {
          const Icon = ICONS[index % ICONS.length];
          const isSelected = question.id === selectedId;
          const isLeaving = question.id === leavingId;

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onSelect(question.id)}
              className={`glow-card group flex flex-col items-start gap-3 p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] ${
                isSelected
                  ? 'border-primary/70 bg-primary/[0.06] ring-1 ring-primary/60 shadow-[0_0_30px_rgba(139,92,246,0.3)]'
                  : ''
              } ${isLeaving ? 'pointer-events-none scale-95 opacity-0' : ''}`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  isSelected ? 'bg-primary/25 text-white' : 'bg-primary/15 text-primary'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold leading-snug">{question.title}</span>
              <span className="text-xs text-white/50">{question.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
