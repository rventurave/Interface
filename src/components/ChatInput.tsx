import type { FormEvent } from 'react';
import { AIIcon, MicIcon, SendIcon } from './icons/Icons';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
  listening: boolean;
  onToggleListening: () => void;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  listening,
  onToggleListening,
}: ChatInputProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="chat-field-group">
      <form
        onSubmit={handleSubmit}
        className="glow-card input-feedback flex items-center gap-2.5 rounded-full px-3.5 py-2.5"
      >
        <AIIcon className="h-5 w-5 shrink-0 text-violet-300" />
        <input
          aria-label="Intereses o respuesta a la pregunta elegida"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/75"
        />
        <button
          type="button"
          onClick={onToggleListening}
          aria-label={listening ? 'Desactivar micrófono (demo)' : 'Activar micrófono (demo)'}
          aria-pressed={listening}
          title={listening ? 'Desactivar micrófono (demo)' : 'Activar micrófono (demo)'}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
            listening
              ? 'border-danger/60 bg-danger/15 text-danger'
              : 'border-white/10 bg-white/5 text-white/70 hover:text-white'
          }`}
        >
          <MicIcon className="h-4 w-4" />
        </button>
        <button
          type="submit"
          aria-label="Enviar"
          title="Enviar"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_16px_rgba(139,92,246,0.5)] transition-colors hover:bg-primary/90"
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </form>
      {listening && (
        <p className="mic-feedback mt-2 rounded-lg border border-amber-300/30 bg-amber-300/5 px-3 py-2 text-sm text-amber-200">
          ℹ Micrófono en demo: no se graba audio.
        </p>
      )}
    </div>
  );
}
