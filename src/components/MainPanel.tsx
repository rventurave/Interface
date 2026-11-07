import { useState } from 'react';
import CareerCard from './CareerCard';
import ChatInput from './ChatInput';
import QuestionCards from './QuestionCards';
import { BrainLogo } from './Logo';
import { pickQuestions, type Question } from '../data/questions';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

interface MainPanelProps {
  onSend: () => void;
  onOpenExploration: () => void;
}

export default function MainPanel({
  onSend,
  onOpenExploration,
}: MainPanelProps) {
  const [questions, setQuestions] = useState<Question[]>(() => pickQuestions(3));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [leavingId, setLeavingId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState('');
  const [listening, setListening] = useState(false);

  const selectedQuestion = questions.find((q) => q.id === selectedId) ?? null;

  const toggleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const reload = () => {
    setLeavingId(null);
    setSelectedId(null);
    setQuestions((prev) => pickQuestions(3, prev.map((q) => q.id)));
  };

  const submit = () => {
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
    onSend();

    if (selectedId) {
      const answeredId = selectedId;
      setLeavingId(answeredId);
      setSelectedId(null);

      window.setTimeout(() => {
        setQuestions((prev) => {
          const replacement = pickQuestions(1, prev.map((q) => q.id))[0];
          if (!replacement) return prev;
          return prev.map((q) => (q.id === answeredId ? replacement : q));
        });
        setLeavingId(null);
      }, 300);
    }
  };

  return (
    <section className="flex min-h-screen flex-col px-6 py-6 lg:h-full lg:min-h-0 lg:px-12 lg:py-8">
      <header className="flex items-center gap-2.5">
        <BrainLogo className="h-6 w-6" />
        <span className="text-sm font-medium text-white/70">IA de Investigación</span>
      </header>

      <h1 className="mt-8 text-center text-3xl font-extrabold tracking-tight lg:text-4xl">
        Este eres <span className="text-primary">tú</span>
      </h1>

      <div className="min-h-0 flex-1 overflow-y-auto py-6">
        {messages.length > 0 ? (
          <div className="flex flex-col gap-2">
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
        ) : (
          <p className="mx-auto max-w-md text-center text-sm text-white/45">
            Tu asistente construye un perfil de investigación a partir de lo que compartes.
          </p>
        )}
      </div>

      <QuestionCards
        questions={questions}
        selectedId={selectedId}
        leavingId={leavingId}
        onSelect={toggleSelect}
        onReload={reload}
      />

      <div className="mt-3">
        <ChatInput
          value={value}
          onChange={setValue}
          onSubmit={submit}
          placeholder={
            selectedQuestion
              ? 'Escribe tu respuesta...'
              : 'Pregunta lo que quieras investigar...'
          }
          listening={listening}
          onToggleListening={() => setListening((prev) => !prev)}
        />
      </div>

      <CareerCard onClick={onOpenExploration} />
    </section>
  );
}
