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

const MAX_EDGES_PER_NODE = 3;

function sharedTagCount(a: Node, b: Node): number {
  const tagsA = new Set(tagsOf(a));
  return tagsOf(b).filter((tag) => tagsA.has(tag)).length;
}

function relevance(a: Node, b: Node): number {
  const scoreA = dataOf(a).score ?? 0;
  const scoreB = dataOf(b).score ?? 0;
  return sharedTagCount(a, b) * 1000 + scoreA + scoreB;
}

export function buildEdges(nodes: Node[]): Edge[] {
  const profiles = nodes.filter((node) => node.type === 'profile');
  const candidates: { a: Node; b: Node; relevance: number }[] = [];

  for (let i = 0; i < profiles.length; i++) {
    for (let j = i + 1; j < profiles.length; j++) {
      const a = profiles[i];
      const b = profiles[j];
      if (!shareTag(a, b)) continue;
      candidates.push({ a, b, relevance: relevance(a, b) });
    }
  }

  candidates.sort((x, y) => {
    if (y.relevance !== x.relevance) return y.relevance - x.relevance;
    return x.a.id.localeCompare(y.a.id) || x.b.id.localeCompare(y.b.id);
  });

  const parent = new Map<string, string>();
  for (const node of profiles) parent.set(node.id, node.id);

  const find = (id: string): string => {
    let root = id;
    while (parent.get(root) !== root) root = parent.get(root)!;
    let current = id;
    while (parent.get(current) !== root) {
      const next = parent.get(current)!;
      parent.set(current, root);
      current = next;
    }
    return root;
  };

  const union = (a: string, b: string): boolean => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA === rootB) return false;
    parent.set(rootA, rootB);
    return true;
  };

  const degree = new Map<string, number>();
  const added = new Set<string>();
  const edges: Edge[] = [];

  const pairKey = (a: string, b: string) => [a, b].sort().join('|');

  const addCandidate = (a: Node, b: Node): boolean => {
    const degreeA = degree.get(a.id) ?? 0;
    const degreeB = degree.get(b.id) ?? 0;
    if (degreeA >= MAX_EDGES_PER_NODE || degreeB >= MAX_EDGES_PER_NODE) {
      return false;
    }

    const key = pairKey(a.id, b.id);
    if (added.has(key)) return false;

    const [source, target] = orderByScore(a, b);
    edges.push(makeEdge(source.id, target.id));
    degree.set(a.id, degreeA + 1);
    degree.set(b.id, degreeB + 1);
    added.add(key);
    return true;
  };

  // Primero conecta componentes separados para garantizar un solo grafo conectado.
  for (const { a, b } of candidates) {
    if (find(a.id) === find(b.id)) continue;
    if (!addCandidate(a, b)) continue;
    union(a.id, b.id);
  }

  // Luego rellena con las relaciones más relevantes hasta el tope por nodo.
  for (const { a, b } of candidates) {
    addCandidate(a, b);
  }

  return edges;
}
