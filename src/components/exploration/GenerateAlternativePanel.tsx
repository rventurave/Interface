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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-primary/30 bg-[#14101f] p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold">Crear alternativa personalizada</h3>
            <p className="mt-1 text-xs text-white/50">
              Describe qué deseas explorar. La IA lo interpretará según el contexto (demo).
            </p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            ✕
          </button>
        </div>

        <p className="mt-4 text-xs font-medium text-white/60">
          Nodo padre: <span className="text-white/90">{parentLabel}</span>
        </p>

        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ej.: quiero explorar aplicaciones de IA en educación..."
          className="mt-3 h-24 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/60 hover:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={submit}
            disabled={!prompt.trim()}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            Generar alternativa
          </button>
        </div>
      </div>
    </div>
  );
}
