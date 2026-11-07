import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';

interface GroupData {
  label?: string;
  nombre?: string;
  edad?: number;
  profesion?: string;
}

function GroupNode({ data }: NodeProps) {
  const { label, nombre, edad, profesion } = data as GroupData;
  const detail = [nombre, edad != null ? `${edad} años` : null, profesion]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="relative h-full w-full rounded-3xl border border-dashed border-primary/50 bg-primary/[0.04] shadow-[inset_0_0_60px_rgba(139,92,246,0.06)]">
      <div className="absolute left-3 top-3">
        <span className="inline-block rounded-lg bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
          {label ?? 'Tú'}
        </span>
        {detail && <p className="mt-1.5 text-xs text-white/70">{detail}</p>}
      </div>
    </div>
  );
}

export default memo(GroupNode);
