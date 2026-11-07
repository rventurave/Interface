import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

interface ArticleNodeData {
  title: string;
  year: number;
  relevance: number;
  isSelected?: boolean;
}

function ArticleNode({ data }: NodeProps) {
  const { title, year, relevance, isSelected } = data as unknown as ArticleNodeData;
  const color =
    relevance >= 0.8 ? '#22C55E' : relevance >= 0.5 ? '#3B82F6' : '#8B5CF6';

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          className="flex h-24 w-44 items-center justify-center rounded-lg border-2 p-2 text-center text-[11px] font-medium leading-tight text-white"
          style={{
            borderColor: color,
            background: '#14101f',
            boxShadow: isSelected
              ? `0 0 20px ${color}`
              : `0 0 10px ${color}55`,
          }}
        >
          {title}
        </div>
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-2 text-[10px] text-white/70">
          {year}
        </span>
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: color }}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export default memo(ArticleNode);
