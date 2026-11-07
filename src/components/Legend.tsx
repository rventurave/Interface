import { KIND_COLORS } from '../types/graph';

const ITEMS = [
  { label: 'Preferencias', color: KIND_COLORS.preference },
  { label: 'Experiencias', color: KIND_COLORS.experience },
  { label: 'Conocimiento', color: KIND_COLORS.knowledge },
  { label: 'Información', color: KIND_COLORS.information },
  { label: 'Relación común', color: '#ffffff' },
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
