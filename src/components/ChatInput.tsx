import { useState, type FormEvent } from 'react';
import { AIIcon, MicIcon, SendIcon } from './icons/Icons';
import type { Question } from '../data/questions';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

interface ChatInputProps {
  onAnswer: (text: string) => void;
  selectedQuestion: Question | null;
}

export default function ChatInput({ onAnswer, selectedQuestion }: ChatInputProps) {
  const [value, setValue] = useState('');
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    const text = value.trim();
    if (!text) return;

    const aiReply = selectedQuestion
      ? `Guardé tu respuesta sobre «${selectedQuestion.title}».`
      : 'Actualicé tu grafo de preferencias con esa información.';

    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text },
      { id: `a-${Date.now()}`, role: 'ai', text: aiReply },
    ]);
    setValue('');
    onAnswer(text);
  };

  return (
    <div className="mt-auto w-full pt-8">
      {selectedQuestion && (
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-primary">
          <span className="truncate">Respondiendo a: {selectedQuestion.title}</span>
        </div>
      )}

      {messages.length > 0 && (
        <div className="mb-4 flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
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
        className="glow-card flex items-center gap-3 rounded-full px-4 py-3 lg:px-5 lg:py-4"
      >
        <AIIcon className="h-6 w-6 shrink-0 text-primary" />
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={
            selectedQuestion
              ? 'Escribe tu respuesta...'
              : 'Pregunta lo que quieras investigar...'
          }
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
        />
        <button
          type="button"
          onClick={() => setListening((prev) => !prev)}
          aria-label="Activar micrófono"
          title="Activar micrófono"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
            listening
              ? 'border-danger/60 bg-danger/15 text-danger'
              : 'border-white/10 bg-white/5 text-white/70 hover:text-white'
          }`}
        >
          <MicIcon className="h-5 w-5" />
        </button>
        <button
          type="submit"
          aria-label="Enviar"
          title="Enviar"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_16px_rgba(139,92,246,0.5)] transition-colors hover:bg-primary/90"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
