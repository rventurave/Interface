import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
  type NodeTypes,
  type ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import AreaContextMenu from './AreaContextMenu';
import AreaNode from './AreaNode';
import GenerateAreaPanel from './GenerateAreaPanel';
import PlusNode from './PlusNode';
import RootNode from './RootNode';
import type { Area, Feedback } from '../../types/exploration';

const nodeTypes = {
  root: RootNode,
  area: AreaNode,
  plus: PlusNode,
} satisfies NodeTypes;

interface ExplorationGraphProps {
  nodes: Node[];
  edges: Edge[];
  areas: Area[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onFeedback: (id: string, feedback: Feedback) => void;
  onDelete: (id: string) => void;
  onAddArea: (area: Area) => void;
}

export default function ExplorationGraph({
  nodes,
  edges,
  areas,
  onSelect,
  onFeedback,
  onDelete,
  onAddArea,
}: ExplorationGraphProps) {
  const [menu, setMenu] = useState<{ x: number; y: number; area: Area } | null>(null);
  const [plusOpen, setPlusOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const instanceRef = useRef<ReactFlowInstance | null>(null);

  useEffect(() => {
    instanceRef.current?.fitView({ padding: 0.3 });
  }, [nodes.length]);

  const closeMenu = useCallback(() => setMenu(null), []);

  const showNotice = useCallback((message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2500);
  }, []);

  const handleNodeClick = useCallback(
    (_event: ReactMouseEvent, node: Node) => {
      if (node.id === 'plus') {
        setPlusOpen(true);
        return;
      }
      onSelect(node.id);
    },
    [onSelect],
  );

  const handleNodeContextMenu = useCallback(
    (event: ReactMouseEvent, node: Node) => {
      if (node.type !== 'area') return;
      event.preventDefault();
      const area = areas.find((item) => item.id === node.id);
      if (!area) return;
      setMenu({ x: event.clientX, y: event.clientY, area });
    },
    [areas],
  );

  const handleChangeFeedback = useCallback(
    (id: string) => {
      const area = areas.find((item) => item.id === id);
      if (!area) return;
      const order: Feedback[] = [null, 'interested', 'unsure', 'not-interested'];
      const index = order.indexOf(area.feedback);
      const next = order[(index + 1) % order.length];
      onFeedback(id, next);
    },
    [areas, onFeedback],
  );

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        onInit={(instance) => {
          instanceRef.current = instance;
        }}
        onNodeClick={handleNodeClick}
        onNodeContextMenu={handleNodeContextMenu}
        onPaneClick={() => {
          onSelect(null);
          closeMenu();
        }}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#3b2a63" gap={24} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>

      {notice && (
        <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-lg border border-primary/30 bg-[#14101f] px-4 py-2 text-xs text-white/80">
          {notice}
        </div>
      )}

      {menu && (
        <AreaContextMenu
          x={menu.x}
          y={menu.y}
          area={menu.area}
          onClose={closeMenu}
          onExplore={(id) => {
            onSelect(id);
            closeMenu();
          }}
          onExplain={(id) => {
            onSelect(id);
            closeMenu();
          }}
          onShowPreferences={(id) => {
            onSelect(id);
            closeMenu();
          }}
          onGenerateSubareas={() => {
            showNotice('Generar subáreas: funcionalidad demo, aún no implementada.');
            closeMenu();
          }}
          onSendToChat={(id) => {
            onSelect(id);
            closeMenu();
          }}
          onChangeFeedback={(id) => {
            handleChangeFeedback(id);
            closeMenu();
          }}
          onDelete={(id) => {
            onDelete(id);
            closeMenu();
          }}
        />
      )}

      {plusOpen && (
        <GenerateAreaPanel
          onClose={() => setPlusOpen(false)}
          onGenerate={(area) => {
            onAddArea(area);
            setPlusOpen(false);
          }}
        />
      )}
    </div>
  );
}
