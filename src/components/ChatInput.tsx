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
    <form
      onSubmit={handleSubmit}
      className="glow-card flex items-center gap-2.5 rounded-full px-3.5 py-2.5"
    >
      <AIIcon className="h-5 w-5 shrink-0 text-primary" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
      />
      <button
        type="button"
        onClick={onToggleListening}
        aria-label="Activar micrófono"
        title="Activar micrófono"
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
  );
}
