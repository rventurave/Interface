import type { Node } from '@xyflow/react';
import {
  NODE_RADIUS,
  type NodeKind,
  type ProfileNodeData,
} from '../types/graph';

const GAP = 48;
const MIN_RADIUS = 240;
const GROUP_MARGIN = 140;

const KIND_ORDER: NodeKind[] = ['preference', 'experience', 'knowledge'];

function dataOf(node: Node): ProfileNodeData {
  return node.data as unknown as ProfileNodeData;
}

function estimateWidth(node: Node): number {
  const label = dataOf(node).label;
  return Math.max(NODE_RADIUS * 2, label.length * 12 * 0.62 + 32);
}

export function layoutNodes(nodes: Node[]): Node[] {
  const group = nodes.find((node) => node.type === 'group');
  const content = nodes.filter((node) => node.type !== 'group');

  const knownKinds = new Set<string>(KIND_ORDER);
  const sorted = [
    ...KIND_ORDER.flatMap((kind) =>
      content.filter((node) => dataOf(node).kind === kind),
    ),
    ...content.filter((node) => !knownKinds.has(dataOf(node).kind)),
  ];

  const totalArc = sorted.reduce(
    (sum, node) => sum + estimateWidth(node) + GAP,
    0,
  );
  const radius = Math.max(MIN_RADIUS, totalArc / (2 * Math.PI));
  const size = (radius + GROUP_MARGIN) * 2;
  const center = { x: size / 2, y: size / 2 };

  let cursor = 0;
  const placed: Node[] = sorted.map((node): Node => {
    const width = estimateWidth(node);
    const angle = (cursor + width / 2) / radius - Math.PI / 2;
    cursor += width + GAP;

    return {
      ...node,
      parentId: group?.id,
      extent: 'parent',
      position: {
        x: center.x + Math.cos(angle) * radius - NODE_RADIUS,
        y: center.y + Math.sin(angle) * radius - NODE_RADIUS,
      },
    };
  });

  const groupNode: Node = {
    ...group,
    id: group?.id ?? 'tu',
    type: 'group',
    position: { x: 0, y: 0 },
    data: group?.data ?? { label: 'Tú' },
    style: { width: size, height: size },
  };

  return [groupNode, ...placed];
}
