import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

interface RootData {
  label?: string;
  description?: string;
  isSelected?: boolean;
}

function RootNode({ data }: NodeProps) {
  const { label, isSelected } = data as unknown as RootData;

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-primary bg-primary/20 p-4 text-center text-xs font-bold leading-tight text-white"
        style={{
          boxShadow: isSelected
            ? '0 0 28px rgba(139,92,246,0.7)'
            : '0 0 20px rgba(139,92,246,0.4)',
        }}
      >
        {label}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#8B5CF6' }}
      />
    </div>
  );
}

export default memo(RootNode);
