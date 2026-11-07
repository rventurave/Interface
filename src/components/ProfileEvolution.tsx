import type { Node } from '@xyflow/react';
import { KIND_COLORS, type NodeKind, type ProfileNodeData } from '../types/graph';

const ROWS: { kind: NodeKind; label: string }[] = [
  { kind: 'preference', label: 'Preferencias' },
  { kind: 'experience', label: 'Experiencias' },
  { kind: 'knowledge', label: 'Conocimiento' },
  { kind: 'information', label: 'Información' },
];

interface ProfileEvolutionProps {
  nodes: Node[];
}

export default function ProfileEvolution({ nodes }: ProfileEvolutionProps) {
  const counts: Record<NodeKind, number> = {
    preference: 0,
    experience: 0,
    knowledge: 0,
    information: 0,
  };

  nodes.forEach((node) => {
    const kind = (node.data as unknown as ProfileNodeData).kind;
    counts[kind] += 1;
  });

  const max = Math.max(
    counts.preference,
    counts.experience,
    counts.knowledge,
    counts.information,
    1,
  );

  return (
    <div className="glow-card p-5">
      <p className="font-semibold">Evolución del perfil</p>
      <p className="mt-1 text-xs text-white/50">
        Tu perfil crece con cada conversación y decisión.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {ROWS.map(({ kind, label }) => (
          <div key={kind}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-white/70">{label}</span>
              <span className="text-white/50">{counts[kind]}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(counts[kind] / max) * 100}%`,
                  background: KIND_COLORS[kind],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
