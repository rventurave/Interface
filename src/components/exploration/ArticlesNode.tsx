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
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          className="flex h-16 w-40 items-center justify-center gap-2 rounded-xl border-2 border-amber-400/80 bg-amber-400/10 px-3 text-center text-xs font-semibold text-amber-300"
          style={{
            boxShadow: isSelected
              ? '0 0 22px rgba(245,158,11,0.6)'
              : '0 0 12px rgba(245,158,11,0.3)',
          }}
        >
          <DocumentIcon className="h-5 w-5 shrink-0" />
          <span className="leading-tight">{label}</span>
          {count > 0 && (
            <span className="rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[10px] text-amber-200">
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
