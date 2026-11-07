import { BrainIcon } from './icons/Icons';

interface BrainLogoProps {
  className?: string;
}

export function BrainLogo({ className }: BrainLogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className ?? ''}`}>
      <BrainIcon className="h-full w-full text-primary" />
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success shadow-[0_0_8px_#22C55E]" />
      <span className="absolute -bottom-0.5 -left-0.5 h-2 w-2 rounded-full bg-danger shadow-[0_0_8px_#EF4444]" />
      <span className="absolute -left-1.5 top-1/2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_#8B5CF6]" />
      <span className="absolute -right-1 bottom-1/3 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_#8B5CF6]" />
    </div>
  );
}
