import { KIND_COLORS } from '../types/graph';

const ITEMS = [
  { label: 'Preferencias', color: KIND_COLORS.preference },
  { label: 'Experiencia', color: KIND_COLORS.experience },
  { label: 'Conocimiento relacionado', color: KIND_COLORS.knowledge },
  { label: 'Relación común', color: '#9ca3af' },
];

export default function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/55">
      {ITEMS.map(({ label, color }) => (
        <span key={label} className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
          {label}
        </span>
      ))}
    </div>
  );
}
