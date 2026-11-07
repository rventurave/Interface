import { BrainLogo } from './Logo';
import { ChevronRightIcon } from './icons/Icons';

export default function CareerCard() {
  return (
    <button
      type="button"
      className="glow-card mx-auto mt-6 flex w-full max-w-md items-center gap-4 px-5 py-4 text-left transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]"
    >
      <BrainLogo className="h-9 w-9 shrink-0" />
      <span className="flex-1">
        <span className="block font-semibold">Carrera y Áreas</span>
        <span className="block text-sm text-white/55">
          Define tu carrera y las áreas que quieres explorar.
        </span>
      </span>
      <ChevronRightIcon className="h-5 w-5 text-white/40" />
    </button>
  );
}
