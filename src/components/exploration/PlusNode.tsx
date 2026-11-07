import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

interface PlusData {
  label?: string;
}

function PlusNode({ data }: NodeProps) {
  const { label } = data as unknown as PlusData;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-primary/70 bg-primary/10 text-2xl font-light text-primary transition-colors hover:bg-primary/20">
          +
        </div>
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: '#8B5CF6' }}
        />
      </div>
      <span className="mt-1.5 text-xs font-medium text-white/60">{label}</span>
    </div>
  );
}

export default memo(PlusNode);
