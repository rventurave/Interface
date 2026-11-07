import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { FEEDBACK_META, type Area } from '../../types/exploration';

type AreaNodeData = Area & { isSelected?: boolean };

function AreaNode({ data }: NodeProps) {
  const area = data as unknown as AreaNodeData;
  const isSelected = area.isSelected;
  const feedbackColor = area.feedback
    ? FEEDBACK_META[area.feedback].color
    : '#8B5CF6';
  const badgeColor = area.feedback ? feedbackColor : '#52525b';

  return (
    <div className="flex flex-col items-center" style={{ width: 56 }}>
      <div className="relative">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-xs font-semibold"
          style={{
            color: '#c4b5fd',
            borderColor: feedbackColor,
            background: '#14101f',
            boxShadow: isSelected
              ? '0 0 20px rgba(139,92,246,0.6)'
              : '0 0 12px rgba(139,92,246,0.25)',
          }}
        >
          {area.affinity}%
        </div>
        {isSelected && (
          <span className="absolute inset-0 rounded-full ring-2 ring-white/80 ring-offset-2 ring-offset-[#050505]" />
        )}
        <span
          className="absolute -right-1 -top-1 h-3 w-3 rounded-full border border-black"
          style={{ background: badgeColor }}
        />
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: feedbackColor }}
        />
      </div>
      <span className="mt-1.5 w-[140px] text-center text-xs font-medium leading-tight text-white/85">
        {area.name}
      </span>
    </div>
  );
}

export default memo(AreaNode);
