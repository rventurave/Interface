import { useCallback, useMemo, useState } from 'react';
import { MarkerType, type Edge, type Node } from '@xyflow/react';
import {
  CAREER,
  CAREER_DESCRIPTION,
  LEVEL_META,
  generateArticles,
  generateCustomLabel,
  nextLevel,
  recommendedChildren,
} from '../data/hierarchy';
import type { HierarchyLevel, HierarchyNode } from '../types/hierarchy';

const LEVEL_ORDER: HierarchyLevel[] = [
  'career',
  'area',
  'subarea',
  'topic',
  'articles',
];

const LEVEL_X: Record<HierarchyLevel, number> = {
  career: 0,
  area: 260,
  subarea: 520,
  topic: 780,
  articles: 1040,
};

const VERTICAL_GAP = 150;

const ROOT: HierarchyNode = {
  id: 'career',
  parentId: null,
  level: 'career',
  label: CAREER,
  description: CAREER_DESCRIPTION,
};

function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

type FlowItem = {
  id: string;
  kind: 'node' | 'plus' | 'articles';
  parentId: string;
};

function buildInitialNodes(): Record<string, HierarchyNode> {
  const initial: Record<string, HierarchyNode> = { [ROOT.id]: ROOT };
  for (const child of recommendedChildren(ROOT)) {
    initial[child.id] = {
      id: child.id,
      parentId: ROOT.id,
      level: child.level,
      label: child.label,
      affinity: child.affinity,
      description: child.description,
    };
  }
  return initial;
}

export function useHierarchyGraph() {
  const [nodes, setNodes] = useState<Record<string, HierarchyNode>>(
    buildInitialNodes,
  );
  const [expanded, setExpanded] = useState<Set<string>>(new Set([ROOT.id]));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [articlesTopic, setArticlesTopic] = useState<{
    topicId: string;
    topicLabel: string;
  } | null>(null);

  const selectNode = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const expandNode = useCallback(
    (id: string) => {
      const node = nodes[id];
      if (!node) return;

      setExpanded((prev) => new Set(prev).add(id));

      const childLevel = nextLevel(node.level);
      if (!childLevel || childLevel === 'articles') return;

      setNodes((prev) => {
        if (Object.values(prev).some((item) => item.parentId === id)) return prev;
        const additions: Record<string, HierarchyNode> = {};
        for (const child of recommendedChildren(node)) {
          additions[child.id] = {
            id: child.id,
            parentId: id,
            level: child.level,
            label: child.label,
            affinity: child.affinity,
            description: child.description,
          };
        }
        return { ...prev, ...additions };
      });
    },
    [nodes],
  );

  const collapseNode = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setSelectedId(id);
  }, []);

  const addCustomNode = useCallback(
    (parentId: string, prompt: string) => {
      const parent = nodes[parentId];
      if (!parent) return;
      const childLevel = nextLevel(parent.level);
      if (!childLevel || childLevel === 'articles') return;

      const id = makeId('custom');
      const node: HierarchyNode = {
        id,
        parentId,
        level: childLevel,
        label: generateCustomLabel(parent, prompt),
        description: 'Alternativa personalizada generada a partir de tu solicitud (demo).',
        isCustom: true,
        affinity: 60,
      };

      setNodes((prev) => ({ ...prev, [id]: node }));
      setSelectedId(id);
      setExpanded((prev) => new Set(prev).add(parentId));
    },
    [nodes],
  );

  const deleteNode = useCallback(
    (id: string) => {
      if (id === ROOT.id) return;

      const descendants = new Set<string>();
      const collect = (parentId: string) => {
        for (const node of Object.values(nodes)) {
          if (node.parentId === parentId) {
            descendants.add(node.id);
            collect(node.id);
          }
        }
      };
      collect(id);

      setNodes((prev) => {
        const next = { ...prev };
        for (const key of [id, ...descendants]) delete next[key];
        return next;
      });

      setSelectedId((prev) =>
        prev === id || descendants.has(prev ?? '') ? null : prev,
      );

      setExpanded((prev) => {
        const next = new Set(prev);
        next.delete(id);
        for (const descendant of descendants) next.delete(descendant);
        return next;
      });
    },
    [nodes],
  );

  const toggleImportant = useCallback((id: string) => {
    setNodes((prev) => {
      const node = prev[id];
      if (!node) return prev;
      return { ...prev, [id]: { ...node, important: !node.important } };
    });
  }, []);

  const openArticles = useCallback(
    (topicId: string) => {
      const topic = nodes[topicId];
      if (!topic) return;
      setArticlesTopic({ topicId, topicLabel: topic.label });
    },
    [nodes],
  );

  const closeArticles = useCallback(() => setArticlesTopic(null), []);

  const flow = useMemo(() => {
    const all = Object.values(nodes);
    const visible = new Set<string>([ROOT.id]);
    const stack = [ROOT.id];

    while (stack.length) {
      const id = stack.pop()!;
      if (!expanded.has(id)) continue;
      for (const node of all) {
        if (node.parentId === id) {
          visible.add(node.id);
          stack.push(node.id);
        }
      }
    }

    const columns = new Map<HierarchyLevel, FlowItem[]>();
    const add = (item: FlowItem, level: HierarchyLevel) => {
      const list = columns.get(level) ?? [];
      list.push(item);
      columns.set(level, list);
    };

    for (const node of all) {
      if (!visible.has(node.id)) continue;
      add({ id: node.id, kind: 'node', parentId: node.parentId ?? '' }, node.level);

      if (!expanded.has(node.id)) continue;
      const childLevel = nextLevel(node.level);
      if (childLevel === 'area' || childLevel === 'subarea' || childLevel === 'topic') {
        add({ id: `plus:${node.id}`, kind: 'plus', parentId: node.id }, childLevel);
      } else if (childLevel === 'articles') {
        add(
          { id: `articles:${node.id}`, kind: 'articles', parentId: node.id },
          'articles',
        );
      }
    }

    const flowNodes: Node[] = [];
    const flowEdges: Edge[] = [];

    for (const level of LEVEL_ORDER) {
      const list = columns.get(level) ?? [];
      list.forEach((item, index) => {
        const position = {
          x: LEVEL_X[level],
          y: (index - (list.length - 1) / 2) * VERTICAL_GAP,
        };

        if (item.kind === 'plus') {
          flowNodes.push({
            id: item.id,
            type: 'plus',
            position,
            data: { label: 'Agregar' },
          });
          flowEdges.push({
            id: `e-${item.id}`,
            source: item.parentId,
            target: item.id,
            type: 'smoothstep',
            style: {
              stroke: '#8B5CF6',
              strokeWidth: 1.4,
              strokeDasharray: '4 4',
              opacity: 0.7,
            },
          });
          return;
        }

        if (item.kind === 'articles') {
          const topic = nodes[item.parentId];
          const count = topic ? generateArticles(topic.label).articles.length : 0;
          flowNodes.push({
            id: item.id,
            type: 'articles',
            position,
            data: {
              label: 'Artículos científicos',
              count,
            },
          });
          flowEdges.push({
            id: `e-${item.id}`,
            source: item.parentId,
            target: item.id,
            type: 'smoothstep',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#F59E0B',
              width: 12,
              height: 12,
            },
            style: { stroke: '#F59E0B', strokeWidth: 1.8, opacity: 0.9 },
          });
          return;
        }

        const hnode = nodes[item.id];
        const type = hnode.level === 'career' ? 'root' : 'level';
        const color = LEVEL_META[hnode.level].color;
        flowNodes.push({
          id: item.id,
          type,
          position,
          data: {
            label: hnode.label,
            level: hnode.level,
            affinity: hnode.affinity,
            description: hnode.description,
            isSelected: selectedId === hnode.id,
            isCustom: hnode.isCustom,
            important: hnode.important,
          },
        });

        if (item.parentId) {
          flowEdges.push({
            id: `e-${item.id}`,
            source: item.parentId,
            target: item.id,
            type: 'smoothstep',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color,
              width: 12,
              height: 12,
            },
            style: { stroke: color, strokeWidth: 1.8, opacity: 0.9 },
          });
        }
      });
    }

    return { flowNodes, flowEdges };
  }, [nodes, expanded, selectedId]);

  const selectedNode = selectedId ? (nodes[selectedId] ?? null) : null;

  const breadcrumb = useMemo(() => {
    if (!selectedId) return [];
    const path: HierarchyNode[] = [];
    const seen = new Set<string>();
    let current: HierarchyNode | undefined = nodes[selectedId];

    while (current && !seen.has(current.id)) {
      seen.add(current.id);
      path.unshift(current);
      current = current.parentId ? nodes[current.parentId] : undefined;
    }
    return path;
  }, [selectedId, nodes]);

  return {
    flowNodes: flow.flowNodes,
    flowEdges: flow.flowEdges,
    nodeById: nodes,
    selectedNode,
    breadcrumb,
    articlesTopic,
    expanded,
    selectNode,
    expandNode,
    collapseNode,
    addCustomNode,
    deleteNode,
    toggleImportant,
    openArticles,
    closeArticles,
  };
}
