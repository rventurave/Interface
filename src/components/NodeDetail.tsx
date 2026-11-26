import type { Node } from '@xyflow/react';
import { KIND_COLORS, KIND_LABELS, type ProfileNodeData } from '../types/graph';

interface NodeDetailProps {
  node: Node;
  onClose: () => void;
}

export default function NodeDetail({ node, onClose }: NodeDetailProps) {
  const data = node.data as unknown as ProfileNodeData;
  const color = KIND_COLORS[data.kind];

  return (
    <div className="glow-card context-card p-5">
      <p className="selection-kicker">Elemento seleccionado</p>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium tracking-normal text-white/75">
            {KIND_LABELS[data.kind]}
          </p>
          <h3 className="mt-1 text-lg font-bold leading-snug">{data.label}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/75 transition-colors hover:bg-white/5 hover:text-white"
          title="Cerrar detalle"
          aria-label="Cerrar detalle"
        >
          ✕
        </button>
      </div>

      {data.important && (
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2.5 py-1 text-sm font-medium text-amber-300">
          ★ Importante
        </span>
      )}

      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 rounded-full bg-white/5">
          <div
            className="h-full rounded-full"
            style={{ width: `${data.score ?? 0}%`, background: color }}
          />
        </div>
        <span className="text-sm font-semibold text-white">{data.score}%</span>
      </div>

      {data.tags && data.tags.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium tracking-normal text-white/75">
            Relacionado con
          </p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-2.5 py-1 text-sm text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 text-sm text-white/75">
        Las conexiones indican etiquetas compartidas.
      </p>
    </div>
  );
}
