import { useCallback, useMemo } from 'react';
import { useNodesState, type Node } from '@xyflow/react';
import { initialNodes } from '../data/initialGraph';
import type { NodeKind } from '../types/graph';
import { buildEdges } from '../utils/edges';
import { layoutNodes } from '../utils/layout';

type SimulationSample = {
  label: string;
  kind: NodeKind;
  score: number;
  tags: string[];
};

const SAMPLES: SimulationSample[] = [
  { label: 'Procesamiento de lenguaje', kind: 'preference', score: 86, tags: ['ia', 'cognición'] },
  { label: 'Ética en IA', kind: 'preference', score: 84, tags: ['ia'] },
  { label: 'Robótica', kind: 'preference', score: 80, tags: ['ia'] },
  { label: 'UX Research', kind: 'experience', score: 76, tags: ['diseño', 'interfaces'] },
  { label: 'Bases de datos', kind: 'experience', score: 82, tags: ['datos'] },
  { label: 'Filosofía de la mente', kind: 'knowledge', score: 74, tags: ['cognición'] },
  { label: 'Estadística', kind: 'knowledge', score: 79, tags: ['datos'] },
];

export function usePreferenceGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutNodes(initialNodes));

  const edges = useMemo(() => buildEdges(nodes), [nodes]);

  const simulate = useCallback(() => {
    const sample = SAMPLES[Math.floor(Math.random() * SAMPLES.length)];
    const id = `${sample.kind}-${Date.now()}`;

    const node: Node = {
      id,
      type: 'profile',
      position: { x: 0, y: 0 },
      data: sample,
    };

    setNodes((prev) => layoutNodes([...prev, node]));
  }, [setNodes]);

  return { nodes, edges, onNodesChange, simulate };
}
