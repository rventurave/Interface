import { useState, type FormEvent } from 'react';
import { AIIcon, MicIcon, SendIcon } from './icons/Icons';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

interface ExplorerChatProps {
  onSend: (text: string) => void;
  contextLabel: string | null;
  onClearContext: () => void;
}

export default function ExplorerChat({
  onSend,
  contextLabel,
  onClearContext,
}: ExplorerChatProps) {
  const [value, setValue] = useState('');
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    const text = value.trim();
    if (!text) return;

    const aiReply = contextLabel
      ? `Puedo ayudarte con «${contextLabel}». ¿Qué quieres saber?`
      : 'Actualicé tu grafo de preferencias con esa información.';

    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text },
      { id: `a-${Date.now()}`, role: 'ai', text: aiReply },
    ]);
    setValue('');
    onSend(text);
  };

  return (
    <div className="flex w-full flex-col">
      {contextLabel && (
        <div className="mb-3 flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-primary">
          <span className="truncate">[Área seleccionada: {contextLabel}]</span>
          <button
            type="button"
            onClick={onClearContext}
            className="ml-2 shrink-0 text-white/50 hover:text-white"
            title="Quitar referencia"
            aria-label="Quitar referencia"
          >
            ✕
          </button>
        </div>
      )}

      {messages.length > 0 && (
        <div className="mb-3 flex max-h-40 flex-col gap-2 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                message.role === 'user'
                  ? 'self-end bg-primary/20 text-white'
                  : 'self-start border border-white/10 bg-white/5 text-white/75'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="glow-card flex items-center gap-2 rounded-full px-3 py-2.5"
      >
        <AIIcon className="h-5 w-5 shrink-0 text-primary" />
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={
            contextLabel
              ? `Pregunta sobre ${contextLabel}...`
              : 'Pregunta lo que quieras investigar...'
          }
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
        />
        <button
          type="button"
          onClick={() => setListening((prev) => !prev)}
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
    </div>
  );
}
