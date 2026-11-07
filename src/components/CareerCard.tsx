import { BrainLogo } from './Logo';
import { ChevronRightIcon } from './icons/Icons';

interface CareerCardProps {
  onClick?: () => void;
}

export default function CareerCard({ onClick }: CareerCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glow-card mx-auto mt-6 flex w-full max-w-md items-center gap-4 px-5 py-4 text-left transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]"
    >
      <BrainLogo className="h-9 w-9 shrink-0" />
      <span className="flex-1">
        <span className="block font-semibold">Comenzar a explorar</span>
        <span className="block text-sm text-white/55">
          Explora áreas, subáreas, tópicos y artículos científicos.
        </span>
      </span>
      <ChevronRightIcon className="h-5 w-5 text-white/40" />
    </button>
  );
}
