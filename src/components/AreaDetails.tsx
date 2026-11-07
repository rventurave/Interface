import { CAREER, CAREER_DESCRIPTION } from '../data/exploration';
import {
  FEEDBACK_META,
  type Area,
  type Feedback,
} from '../types/exploration';

interface AreaDetailsProps {
  selectedArea: Area | null;
  selectedId: string | null;
  onFeedback: (id: string, feedback: Feedback) => void;
}

const FEEDBACK_OPTIONS: Array<Exclude<Feedback, null>> = [
  'interested',
  'unsure',
  'not-interested',
];

export default function AreaDetails({
  selectedArea,
  selectedId,
  onFeedback,
}: AreaDetailsProps) {
  if (selectedArea) {
    return (
      <div className="glow-card p-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-bold leading-tight">{selectedArea.name}</h2>
          {selectedArea.feedback && (
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-xs"
              style={{
                color: FEEDBACK_META[selectedArea.feedback].color,
                border: `1px solid ${FEEDBACK_META[selectedArea.feedback].color}`,
              }}
            >
              {FEEDBACK_META[selectedArea.feedback].label}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-white/65">{selectedArea.description}</p>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Afinidad calculada
          </p>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-1.5 flex-1 rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${selectedArea.affinity}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-white">
              {selectedArea.affinity}%
            </span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-wider text-white/40">Tu feedback</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {FEEDBACK_OPTIONS.map((value) => {
              const meta = FEEDBACK_META[value];
              const active = selectedArea.feedback === value;
              return (
                <button
                  key={value}
                  onClick={() =>
                    onFeedback(selectedArea.id, active ? null : value)
                  }
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    active ? 'text-white' : 'text-white/60 hover:border-white/30'
                  }`}
                  style={{
                    borderColor: meta.color,
                    background: active ? `${meta.color}22` : 'transparent',
                  }}
                >
                  {meta.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Por qué fue recomendada
          </p>
          <p className="mt-1.5 text-sm text-white/70">{selectedArea.justification}</p>
        </div>

        {selectedArea.preferences.length > 0 && (
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wider text-white/40">
              Preferencias relacionadas
            </p>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {selectedArea.preferences.map((preference) => (
                <span
                  key={preference}
                  className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70"
                >
                  {preference}
                </span>
              ))}
            </div>
          </div>
        )}

        {selectedArea.knowledge.length > 0 && (
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wider text-white/40">
              Conocimientos relacionados
            </p>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {selectedArea.knowledge.map((knowledge) => (
                <span
                  key={knowledge}
                  className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70"
                >
                  {knowledge}
                </span>
              ))}
            </div>
          </div>
        )}

        {selectedArea.researchLines.length > 0 && (
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wider text-white/40">
              Posibles líneas de investigación
            </p>
            <ul className="mt-1.5 list-disc pl-5 text-sm text-white/70">
              {selectedArea.researchLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (selectedId === 'career') {
    return (
      <div className="glow-card p-5">
        <h2 className="text-lg font-bold">{CAREER}</h2>
        <p className="mt-2 text-sm text-white/65">{CAREER_DESCRIPTION}</p>
      </div>
    );
  }

  return (
    <div className="glow-card p-5 text-sm text-white/50">
      Selecciona un área del grafo para ver su descripción, afinidad y justificación.
    </div>
  );
}
