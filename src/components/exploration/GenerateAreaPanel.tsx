import { useState } from 'react';
import {
  PREFERENCE_OPTIONS,
  generateDemoArea,
} from '../../data/exploration';
import type { Area } from '../../types/exploration';

interface GenerateAreaPanelProps {
  onClose: () => void;
  onGenerate: (area: Area) => void;
}

export default function GenerateAreaPanel({
  onClose,
  onGenerate,
}: GenerateAreaPanelProps) {
  const [selectedPreference, setSelectedPreference] = useState<string | null>(null);
  const [customPreference, setCustomPreference] = useState('');
  const [prompt, setPrompt] = useState('');

  const preference = customPreference.trim() || selectedPreference;

  const submit = () => {
    if (!preference) return;
    onGenerate(generateDemoArea(preference, prompt.trim()));
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
            <h3 className="text-base font-semibold">Generar nueva área</h3>
            <p className="mt-1 text-xs text-white/50">
              Elige una preferencia o escribe una nueva (demo).
            </p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            ✕
          </button>
        </div>

        <p className="mt-4 text-xs font-medium text-white/60">
          Preferencias identificadas
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PREFERENCE_OPTIONS.map((option) => {
            const active = selectedPreference === option.label;
            return (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedPreference(active ? null : option.label);
                  setCustomPreference('');
                }}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  active
                    ? 'border-primary bg-primary/20 text-white'
                    : 'border-white/10 text-white/60 hover:border-primary/40'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <input
          value={customPreference}
          onChange={(event) => {
            setCustomPreference(event.target.value);
            setSelectedPreference(null);
          }}
          placeholder="O escribe una nueva preferencia..."
          className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30"
        />

        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Describe qué tipo de área deseas explorar..."
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
            disabled={!preference}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            Generar área
          </button>
        </div>
      </div>
    </div>
  );
}
