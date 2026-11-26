import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { DocumentIcon } from '../icons/Icons';

interface ArticlesNodeData {
  label: string;
  count: number;
  isSelected?: boolean;
}

function ArticlesNode({ data }: NodeProps) {
  const { label, count, isSelected } = data as unknown as ArticlesNodeData;

  return (
    <div data-selected={isSelected} className="map-interactive-node flex flex-col items-center" title="Ver artículos de ejemplo">
      <div className="relative">
        <div
          className="map-rect flex h-16 w-40 items-center justify-center gap-1.5 rounded-xl border-2 border-amber-400/80 bg-amber-400/10 px-3 text-center text-sm font-semibold text-amber-300"
          style={{
            boxShadow: isSelected
              ? '0 0 14px rgba(245,158,11,0.5)'
              : '0 0 6px rgba(245,158,11,0.15)',
          }}
        >
          <DocumentIcon className="h-5 w-5 shrink-0" />
          <span className="min-w-0 break-words leading-snug">{label}</span>
          {count > 0 && (
            <span className="rounded-full bg-amber-400/20 px-1.5 py-0.5 text-sm text-amber-200">
              {count}
            </span>
          )}
        </div>
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: '#F59E0B' }}
        />
      </div>
    </div>
  );
}

export default memo(ArticlesNode);
