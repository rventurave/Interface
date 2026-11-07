import { useCallback, useState } from 'react';
import CareerCard from './CareerCard';
import ChatInput from './ChatInput';
import QuestionCards from './QuestionCards';
import { BrainLogo } from './Logo';
import { pickQuestions, type Question } from '../data/questions';

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

  const selectedQuestion = questions.find((q) => q.id === selectedId) ?? null;

  const toggleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const reload = () => {
    setLeavingId(null);
    setSelectedId(null);
    setQuestions((prev) => pickQuestions(3, prev.map((q) => q.id)));
  };

  const handleAnswer = useCallback(
    (_text: string) => {
      onSend();
      if (!selectedId) return;

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
    },
    [onSend, selectedId],
  );

  return (
    <section className="flex min-h-screen flex-col px-6 py-6 lg:min-h-0 lg:px-12 lg:py-10">
      <header className="flex items-center gap-2.5">
        <BrainLogo className="h-6 w-6" />
        <span className="text-sm font-medium text-white/70">IA de Investigación</span>
      </header>

      <div className="mt-12 text-center lg:mt-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Este eres <span className="text-primary">tú</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
          Tu asistente construye un perfil de investigación a partir de lo que compartes.
        </p>
      </div>

      <QuestionCards
        questions={questions}
        selectedId={selectedId}
        leavingId={leavingId}
        onSelect={toggleSelect}
        onReload={reload}
      />

      <ChatInput onAnswer={handleAnswer} selectedQuestion={selectedQuestion} />

      <CareerCard onClick={onOpenExploration} />
    </section>
  );
}
