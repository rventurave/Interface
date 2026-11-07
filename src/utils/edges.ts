import { MarkerType, type Edge, type Node } from '@xyflow/react';
import type { ProfileNodeData } from '../types/graph';

function dataOf(node: Node): ProfileNodeData {
  return node.data as unknown as ProfileNodeData;
}

function tagsOf(node: Node): string[] {
  return dataOf(node).tags ?? [];
}

function shareTag(a: Node, b: Node): boolean {
  const tagsA = tagsOf(a);
  const tagsB = tagsOf(b);
  return tagsA.some((tag) => tagsB.includes(tag));
}

function orderByScore(a: Node, b: Node): [Node, Node] {
  const scoreA = dataOf(a).score ?? 0;
  const scoreB = dataOf(b).score ?? 0;
  if (scoreA === scoreB) {
    return a.id.localeCompare(b.id) <= 0 ? [a, b] : [b, a];
  }
  return scoreA >= scoreB ? [a, b] : [b, a];
}

function makeEdge(source: string, target: string): Edge {
  return {
    id: `rel-${source}-${target}`,
    source,
    target,
    type: 'straight',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ffffff',
      width: 14,
      height: 14,
    },
    style: {
      stroke: '#ffffff',
      strokeWidth: 2.2,
      opacity: 1,
    },
  };
}

export function buildEdges(nodes: Node[]): Edge[] {
  const profiles = nodes.filter((node) => node.type === 'profile');
  const edges: Edge[] = [];

  for (let i = 0; i < profiles.length; i++) {
    for (let j = i + 1; j < profiles.length; j++) {
      const a = profiles[i];
      const b = profiles[j];
      if (!shareTag(a, b)) continue;

      const [source, target] = orderByScore(a, b);
      edges.push(makeEdge(source.id, target.id));
    }
  }

  return edges;
}
