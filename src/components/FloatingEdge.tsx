import { BaseEdge, useInternalNode, type EdgeProps } from '@xyflow/react';
import { NODE_RADIUS } from '../types/graph';

export default function FloatingEdge({ source, target, markerEnd, style }: EdgeProps) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) return null;

  const sx = sourceNode.internals.positionAbsolute.x + NODE_RADIUS;
  const sy = sourceNode.internals.positionAbsolute.y + NODE_RADIUS;
  const tx = targetNode.internals.positionAbsolute.x + NODE_RADIUS;
  const ty = targetNode.internals.positionAbsolute.y + NODE_RADIUS;

  const dx = tx - sx;
  const dy = ty - sy;
  const distance = Math.hypot(dx, dy) || 1;
  const ux = dx / distance;
  const uy = dy / distance;

  const path = `M ${sx + ux * NODE_RADIUS} ${sy + uy * NODE_RADIUS} L ${tx - ux * NODE_RADIUS} ${ty - uy * NODE_RADIUS}`;

  return <BaseEdge path={path} markerEnd={markerEnd} style={style} />;
}
