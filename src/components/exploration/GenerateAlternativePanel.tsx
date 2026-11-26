import { useState } from 'react';

interface GenerateAlternativePanelProps {
  parentLabel: string;
  onClose: () => void;
  onGenerate: (prompt: string) => void;
}

export default function GenerateAlternativePanel({
  parentLabel,
  onClose,
  onGenerate,
}: GenerateAlternativePanelProps) {
  const [prompt, setPrompt] = useState('');

  const submit = () => {
    const clean = prompt.trim();
    if (!clean) return;
    onGenerate(clean);
  };

  return (
    <div
      className="alternative-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-primary/30 bg-[#14101f] p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">Crear alternativa</h3>
            <p className="mt-1 text-sm text-white/75">
              Describe qué quieres investigar. <strong className="font-semibold text-violet-200">La creación es simulada.</strong>
            </p>
          </div>
          <button aria-label="Cerrar alternativa" title="Cerrar alternativa" onClick={onClose} className="shrink-0 text-white/75 hover:text-white">
            ✕
          </button>
        </div>

        <p className="mt-4 text-sm font-medium text-white/75">
          Tema de referencia: <span className="font-semibold text-white/90">{parentLabel}</span>
        </p>

        <textarea
          aria-label="Idea de investigación"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ej.: IA en educación"
          className="mt-3 h-28 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-base text-white outline-none placeholder:text-white/75"
        />

        <div className="mt-4 flex flex-wrap justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/75 hover:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={submit}
            disabled={!prompt.trim()}
            className="rounded-xl bg-violet-700 hover:bg-violet-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            Crear alternativa
          </button>
        </div>
      </div>
    </div>
  );
}
