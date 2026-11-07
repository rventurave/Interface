import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import {
  KIND_COLORS,
  NODE_RADIUS,
  type NodeKind,
  type ProfileNodeData,
} from '../types/graph';

const KIND_STYLES: Record<NodeKind, { text: string; bg: string; glow: string }> = {
  preference: { text: '#bbf7d0', bg: '#0a2315', glow: 'rgba(34,197,94,0.6)' },
  experience: { text: '#bfdbfe', bg: '#0b1c33', glow: 'rgba(59,130,246,0.6)' },
  knowledge: { text: '#e9d5ff', bg: '#1c1133', glow: 'rgba(139,92,246,0.45)' },
  information: { text: '#fde68a', bg: '#2a1c05', glow: 'rgba(245,158,11,0.55)' },
};

function ProfileNode({ data }: NodeProps) {
  const { label, kind, score } = data as unknown as ProfileNodeData;
  const color = KIND_COLORS[kind];
  const style = KIND_STYLES[kind];
  const size = NODE_RADIUS * 2;

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <div className="relative">
        <div
          className="flex items-center justify-center rounded-full border-2 text-center font-semibold transition-transform hover:scale-105"
          style={{
            width: size,
            height: size,
            color: style.text,
            borderColor: color,
            background: style.bg,
            boxShadow: `0 0 18px ${style.glow}`,
            fontSize: 11,
          }}
        >
          {score != null ? (
            `${score}%`
          ) : (
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
          )}
        </div>
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: color, border: '2px solid #050505' }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: color, border: '2px solid #050505' }}
        />
      </div>
      <span className="mt-1.5 whitespace-nowrap text-center text-xs font-medium text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
        {label}
      </span>
    </div>
  );
}

export default memo(ProfileNode);
