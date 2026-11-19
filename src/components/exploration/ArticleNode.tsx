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
    <div className="map-interactive-node flex flex-col items-center" title={`${title} (${year}). Selecciona para ver detalles.`}>
      <div className="relative">
        <div
          className="flex min-h-24 w-[168px] items-center justify-center rounded-lg border-2 p-2 text-center text-sm font-medium leading-snug text-white"
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
        <span className="mx-auto mt-1 block w-fit rounded-full bg-[#14101f] px-2 text-sm leading-snug text-white/80">
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
