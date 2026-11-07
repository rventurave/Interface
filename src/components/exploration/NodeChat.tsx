import { useState, type FormEvent } from 'react';
import { AIIcon, MicIcon, SendIcon } from '../icons/Icons';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

interface NodeChatProps {
  nodeId: string | null;
  nodeLabel: string | null;
}

export default function NodeChat({ nodeId, nodeLabel }: NodeChatProps) {
  const [history, setHistory] = useState<Record<string, Message[]>>({});
  const [value, setValue] = useState('');
  const [listening, setListening] = useState(false);

  const messages = nodeId ? (history[nodeId] ?? []) : [];

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    const text = value.trim();
    if (!text || !nodeId) return;

    const aiReply = nodeLabel
      ? `Sobre «${nodeLabel}»: esta es una respuesta simulada a tu pregunta (demo).`
      : 'Registré tu consulta (demo).';

    setHistory((prev) => ({
      ...prev,
      [nodeId]: [
        ...(prev[nodeId] ?? []),
        { id: `u-${Date.now()}`, role: 'user', text },
        { id: `a-${Date.now() + 1}`, role: 'ai', text: aiReply },
      ],
    }));
    setValue('');
  };

  return (
    <div className="flex w-full flex-col">
      {nodeLabel && (
        <div className="mb-3 flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-primary">
          <span className="truncate">[Preguntando sobre: {nodeLabel}]</span>
        </div>
      )}

      {messages.length > 0 && (
        <div className="mb-3 flex max-h-52 flex-col gap-2 overflow-y-auto">
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
            nodeLabel
              ? `Pregunta sobre ${nodeLabel}...`
              : 'Selecciona un nodo para preguntar...'
          }
          disabled={!nodeId}
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35 disabled:opacity-50"
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
          disabled={!nodeId || !value.trim()}
          aria-label="Enviar"
          title="Enviar"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_16px_rgba(139,92,246,0.5)] transition-colors hover:bg-primary/90 disabled:opacity-40"
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
