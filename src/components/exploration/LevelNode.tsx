import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { LEVEL_META } from '../../data/hierarchy';
import type { HierarchyLevel } from '../../types/hierarchy';

interface LevelNodeData {
  label: string;
  level: HierarchyLevel;
  affinity?: number;
  isSelected?: boolean;
  isCustom?: boolean;
  important?: boolean;
}

function LevelNode({ data }: NodeProps) {
  const { label, level, affinity, isSelected, isCustom, important } =
    data as unknown as LevelNodeData;
  const meta = LEVEL_META[level];

  return (
    <div data-selected={isSelected} className="map-interactive-node flex flex-col items-center" title={`${label}. Clic: detalles. Clic derecho: opciones.`}>
      <div className="relative">
        <div
          className="map-circle relative flex h-14 w-14 items-center justify-center rounded-full border-2 text-center text-sm font-semibold"
          style={{
            color: meta.text,
            borderColor: meta.color,
            background: '#14101f',
            boxShadow: isSelected
              ? `0 0 16px ${meta.color}`
              : `0 0 5px ${meta.color}33`,
          }}
        >
          {affinity != null ? `${affinity}%` : label.charAt(0).toUpperCase()}
        </div>
        {isCustom && (
          <span title="Alternativa personalizada (demo)" aria-label="Alternativa personalizada" className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-xs text-white/70">
            P
          </span>
        )}
        {important && (
          <span title="Marcado como importante" className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-black shadow">
            ★
          </span>
        )}
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: meta.color }}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: meta.color }}
        />
      </div>
      <span className="map-node-label mt-1.5 w-[150px] text-center text-sm font-medium leading-snug text-white/85">
        {label}
      </span>
    </div>
  );
}

export default memo(LevelNode);
