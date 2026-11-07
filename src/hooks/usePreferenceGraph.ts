import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useNodesState, type Node } from '@xyflow/react';
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type Simulation,
  type SimulationNodeDatum,
} from 'd3-force';
import { initialNodes } from '../data/initialGraph';
import type { NodeKind, ProfileNodeData } from '../types/graph';
import type { Area, Feedback } from '../types/exploration';
import { buildEdges } from '../utils/edges';

interface ForceNode extends SimulationNodeDatum {
  id: string;
}

interface ForceLink {
  source: string;
  target: string;
}

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
  { label: 'Curso de Álgebra lineal', kind: 'information', score: 80, tags: ['ia', 'datos'] },
];

function seedNodes(): Node[] {
  return initialNodes.map((node, index) => {
    const angle = (index / initialNodes.length) * Math.PI * 2;
    const radius = 240;
    return {
      ...node,
      position: {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      },
    };
  });
}

function makeNode(
  kind: NodeKind,
  label: string,
  score: number,
  tags: string[],
): Node {
  return {
    id: `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type: 'profile',
    position: { x: (Math.random() - 0.5) * 140, y: (Math.random() - 0.5) * 140 },
    data: { label, kind, score, tags },
  };
}

export function usePreferenceGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(seedNodes());

  const nodeSignature = useMemo(
    () =>
      nodes
        .map((node) => {
          const data = node.data as unknown as ProfileNodeData;
          return `${node.id}:${data.label}:${data.score}:${(data.tags ?? []).join(',')}`;
        })
        .join('|'),
    [nodes],
  );

  const edges = useMemo(() => buildEdges(nodes), [nodeSignature]);

  const simulationRef = useRef<{
    sim: Simulation<ForceNode, ForceLink>;
    nodes: ForceNode[];
  } | null>(null);

  useEffect(() => {
    const forceNodes: ForceNode[] = nodes.map((node) => ({
      id: node.id,
      x: node.position.x,
      y: node.position.y,
    }));

    const links: ForceLink[] = edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
    }));

    const simulation = forceSimulation<ForceNode>(forceNodes)
      .force(
        'link',
        forceLink<ForceNode, ForceLink>(links)
          .id((d) => d.id)
          .distance(140)
          .strength(0.4),
      )
      .force('charge', forceManyBody<ForceNode>().strength(-320))
      .force('collide', forceCollide<ForceNode>().radius(64))
      .force('center', forceCenter(0, 0))
      .force('x', forceX<ForceNode>(0).strength(0.04))
      .force('y', forceY<ForceNode>(0).strength(0.04));

    simulation.on('tick', () => {
      setNodes((prev) =>
        prev.map((node) => {
          const forceNode = forceNodes.find((f) => f.id === node.id);
          return forceNode
            ? {
                ...node,
                position: {
                  x: forceNode.x ?? 0,
                  y: forceNode.y ?? 0,
                },
              }
            : node;
        }),
      );
    });

    simulationRef.current = { sim: simulation, nodes: forceNodes };

    return () => {
      simulation.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeSignature]);

  const handleNodeDragStart = useCallback((_event: MouseEvent | TouchEvent, node: Node) => {
    const current = simulationRef.current;
    if (!current) return;
    const forceNode = current.nodes.find((f) => f.id === node.id);
    if (forceNode) {
      forceNode.fx = forceNode.x;
      forceNode.fy = forceNode.y;
      current.sim.alphaTarget(0.3).restart();
    }
  }, []);

  const handleNodeDrag = useCallback((_event: MouseEvent | TouchEvent, node: Node) => {
    const current = simulationRef.current;
    if (!current) return;
    const forceNode = current.nodes.find((f) => f.id === node.id);
    if (forceNode) {
      forceNode.fx = node.position.x;
      forceNode.fy = node.position.y;
    }
  }, []);

  const handleNodeDragStop = useCallback((_event: MouseEvent | TouchEvent, node: Node) => {
    const current = simulationRef.current;
    if (!current) return;
    const forceNode = current.nodes.find((f) => f.id === node.id);
    if (forceNode) {
      forceNode.fx = null;
      forceNode.fy = null;
      current.sim.alphaTarget(0);
    }
  }, []);

  const simulate = useCallback(() => {
    const sample = SAMPLES[Math.floor(Math.random() * SAMPLES.length)];
    const node = makeNode(sample.kind, sample.label, sample.score, sample.tags);
    setNodes((prev) => [...prev, node]);
  }, [setNodes]);

  const addFromArea = useCallback(
    (area: Area, feedback: Feedback) => {
      if (feedback !== 'interested') return;

      setNodes((prev) => {
        const existing = new Set(
          prev.map((node) => (node.data as unknown as ProfileNodeData).label),
        );
        const additions: Node[] = [];

        if (!existing.has(area.name)) {
          additions.push(makeNode('preference', area.name, area.affinity, [area.name]));
        }
        for (const concept of area.knowledge) {
          if (!existing.has(concept)) {
            additions.push(makeNode('knowledge', concept, 75, [area.name]));
          }
        }

        return additions.length === 0 ? prev : [...prev, ...additions];
      });
    },
    [setNodes],
  );

  const addConcept = useCallback(
    (label: string, tag?: string) => {
      const clean = label.trim().slice(0, 48);
      if (!clean) return;

      setNodes((prev) => {
        const existing = new Set(
          prev.map((node) => (node.data as unknown as ProfileNodeData).label),
        );
        if (existing.has(clean)) return prev;
        return [...prev, makeNode('knowledge', clean, 70, tag ? [tag] : [])];
      });
    },
    [setNodes],
  );

  const toggleImportant = useCallback(
    (id: string) => {
      setNodes((prev) =>
        prev.map((node) => {
          if (node.id !== id) return node;
          const data = node.data as unknown as ProfileNodeData;
          return {
            ...node,
            data: { ...data, important: !data.important },
          };
        }),
      );
    },
    [setNodes],
  );

  const deleteNode = useCallback(
    (id: string) => {
      setNodes((prev) => prev.filter((node) => node.id !== id));
    },
    [setNodes],
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onNodeDragStart: handleNodeDragStart,
    onNodeDrag: handleNodeDrag,
    onNodeDragStop: handleNodeDragStop,
    simulate,
    addFromArea,
    addConcept,
    toggleImportant,
    deleteNode,
  };
}
