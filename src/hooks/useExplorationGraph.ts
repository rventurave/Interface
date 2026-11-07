import { useCallback, useMemo, useState } from 'react';
import { MarkerType, type Edge, type Node } from '@xyflow/react';
import {
  CAREER,
  CAREER_DESCRIPTION,
  INITIAL_AREAS,
} from '../data/exploration';
import type { Area, Feedback } from '../types/exploration';

const AREA_SPACING = 240;
const AREA_Y = 260;

function buildNodes(areas: Area[], selectedId: string | null): Node[] {
  const childCount = areas.length + 1; // areas + plus node
  const xForIndex = (index: number) =>
    (index - (childCount - 1) / 2) * AREA_SPACING;

  const root: Node = {
    id: 'career',
    type: 'root',
    position: { x: 0, y: 0 },
    data: {
      label: CAREER,
      description: CAREER_DESCRIPTION,
      isSelected: selectedId === 'career',
    },
  };

  const areaNodes: Node[] = areas.map((area, index) => ({
    id: area.id,
    type: 'area',
    position: { x: xForIndex(index), y: AREA_Y },
    data: { ...area, isSelected: area.id === selectedId },
  }));

  const plusNode: Node = {
    id: 'plus',
    type: 'plus',
    position: { x: xForIndex(areas.length), y: AREA_Y },
    data: { label: 'Nueva área' },
  };

  return [root, ...areaNodes, plusNode];
}

function buildEdges(areas: Area[]): Edge[] {
  const markerEnd = {
    type: MarkerType.ArrowClosed,
    color: '#8B5CF6',
    width: 16,
    height: 16,
  };

  const areaEdges: Edge[] = areas.map((area) => ({
    id: `e-${area.id}`,
    source: 'career',
    target: area.id,
    markerEnd,
    style: { stroke: '#8B5CF6', strokeWidth: 1.6, opacity: 0.7 },
  }));

  const plusEdge: Edge = {
    id: 'e-plus',
    source: 'career',
    target: 'plus',
    markerEnd,
    style: {
      stroke: '#8B5CF6',
      strokeWidth: 1.6,
      opacity: 0.5,
      strokeDasharray: '5 5',
    },
  };

  return [...areaEdges, plusEdge];
}

export function useExplorationGraph() {
  const [areas, setAreas] = useState<Area[]>(INITIAL_AREAS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const nodes = useMemo(
    () => buildNodes(areas, selectedId),
    [areas, selectedId],
  );
  const edges = useMemo(() => buildEdges(areas), [areas]);

  const selectedArea = useMemo(
    () => areas.find((area) => area.id === selectedId) ?? null,
    [areas, selectedId],
  );

  const selectNode = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const setFeedback = useCallback((id: string, feedback: Feedback) => {
    setAreas((prev) =>
      prev.map((area) => (area.id === id ? { ...area, feedback } : area)),
    );
  }, []);

  const addArea = useCallback((area: Area) => {
    setAreas((prev) => [...prev, area]);
    setSelectedId(area.id);
  }, []);

  const deleteArea = useCallback((id: string) => {
    setAreas((prev) => prev.filter((area) => area.id !== id));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  return {
    areas,
    nodes,
    edges,
    selectedId,
    selectedArea,
    selectNode,
    setFeedback,
    addArea,
    deleteArea,
  };
}
