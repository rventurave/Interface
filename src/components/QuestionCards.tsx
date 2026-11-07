import { ReloadIcon } from './icons/Icons';
import type { Question } from '../data/questions';

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
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-white/30">
          Preguntas guiadas
        </span>
        <button
          type="button"
          onClick={onReload}
          title="Cambiar preguntas"
          aria-label="Cambiar preguntas"
          className="flex h-6 w-6 items-center justify-center rounded-md text-white/35 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ReloadIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {questions.map((question) => {
          const isSelected = question.id === selectedId;
          const isLeaving = question.id === leavingId;

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onSelect(question.id)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all duration-300 ${
                isSelected
                  ? 'border-primary/70 bg-primary/15 text-white'
                  : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-primary/40 hover:text-white'
              } ${isLeaving ? 'pointer-events-none scale-95 opacity-0' : ''}`}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  isSelected ? 'bg-primary' : 'bg-white/30'
                }`}
              />
              <span className="truncate">{question.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
