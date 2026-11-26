import { useState, type FormEvent } from 'react';
import { AIIcon, MicIcon, SendIcon } from '../icons/Icons';
import ChatScrollArea from '../ChatScrollArea';

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
        <div className="mb-3 flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-violet-300">
          <span className="break-words">Tema: <strong>{nodeLabel}</strong></span>
        </div>
      )}

      {messages.length > 0 && (
        <ChatScrollArea
          className="mb-3 flex max-h-52 flex-col gap-2 overflow-y-auto"
          activityKey={messages.length}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              data-speaker={message.role}
              className={`conversation-message max-w-[90%] break-words rounded-2xl px-3 py-2 text-base ${
                message.role === 'user'
                  ? 'self-end bg-primary/20 text-white'
                  : 'self-start border border-white/10 bg-white/5 text-white/75'
              }`}
            >
              {message.text}
            </div>
          ))}
        </ChatScrollArea>
      )}

      <form
        onSubmit={handleSubmit}
        className="glow-card input-feedback flex items-center gap-2 rounded-full px-3 py-2.5"
      >
        <AIIcon className="h-5 w-5 shrink-0 text-violet-300" />
        <input
          aria-label="Pregunta sobre el tema seleccionado"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={
            nodeLabel
              ? 'Tu pregunta...'
              : 'Elige un tema...'
          }
          disabled={!nodeId}
          className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/75 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={() => setListening((prev) => !prev)}
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
          disabled={!nodeId || !value.trim()}
          aria-label="Enviar"
          title="Enviar"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_16px_rgba(139,92,246,0.5)] transition-colors hover:bg-primary/90 disabled:opacity-40"
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
