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
import ArticlesNode from './ArticlesNode';
import GenerateAlternativePanel from './GenerateAlternativePanel';
import LevelNode from './LevelNode';
import NodeMenu from './NodeMenu';
import PlusNode from './PlusNode';
import RootNode from './RootNode';
import type { HierarchyNode } from '../../types/hierarchy';

const nodeTypes = {
  root: RootNode,
  level: LevelNode,
  articles: ArticlesNode,
  plus: PlusNode,
} satisfies NodeTypes;

interface HierarchyGraphProps {
  nodes: Node[];
  edges: Edge[];
  nodeById: Record<string, HierarchyNode>;
  expanded: Set<string>;
  onSelect: (id: string) => void;
  onExpand: (id: string) => void;
  onOpenArticles: (topicId: string) => void;
  onAddCustom: (parentId: string, prompt: string) => void;
  onCollapse: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleImportant: (id: string) => void;
}

export default function HierarchyGraph({
  nodes,
  edges,
  nodeById,
  expanded,
  onSelect,
  onExpand,
  onOpenArticles,
  onAddCustom,
  onCollapse,
  onDelete,
  onToggleImportant,
}: HierarchyGraphProps) {
  const [plusParentId, setPlusParentId] = useState<string | null>(null);
  const [menu, setMenu] = useState<{ x: number; y: number; node: Node } | null>(
    null,
  );
  const instanceRef = useRef<ReactFlowInstance | null>(null);

  useEffect(() => {
    instanceRef.current?.fitView({ padding: 0.25 });
  }, [nodes.length]);

  const closeMenu = useCallback(() => setMenu(null), []);

  const handleNodeClick = useCallback(
    (_event: ReactMouseEvent, node: Node) => {
      if (node.id.startsWith('plus:')) {
        setPlusParentId(node.id.slice('plus:'.length));
        setMenu(null);
        return;
      }
      if (node.id.startsWith('articles:')) {
        onOpenArticles(node.id.slice('articles:'.length));
        setMenu(null);
        return;
      }

      setMenu(null);
      onSelect(node.id);
    },
    [onSelect, onOpenArticles],
  );

  const handleNodeContextMenu = useCallback(
    (event: ReactMouseEvent, node: Node) => {
      if (node.type !== 'level' && node.type !== 'root') return;
      event.preventDefault();
      setMenu({ x: event.clientX, y: event.clientY, node });
    },
    [],
  );

  const parent = plusParentId ? nodeById[plusParentId] : null;

  const menuNode = menu ? nodeById[menu.node.id] : null;
  const isExpanded = menuNode ? expanded.has(menuNode.id) : false;
  const isImportant = menuNode?.important ?? false;
  const canDelete = menuNode ? menuNode.id !== 'career' : false;

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
        onPaneClick={closeMenu}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#3b2a63" gap={24} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>

      {plusParentId && parent && (
        <GenerateAlternativePanel
          parentLabel={parent.label}
          onClose={() => setPlusParentId(null)}
          onGenerate={(prompt) => {
            onAddCustom(plusParentId, prompt);
            setPlusParentId(null);
          }}
        />
      )}

      {menu && menuNode && (
        <NodeMenu
          x={menu.x}
          y={menu.y}
          label={menuNode.label}
          isExpanded={isExpanded}
          isImportant={isImportant}
          canDelete={canDelete}
          onClose={closeMenu}
          onToggleExpand={() => {
            if (isExpanded) {
              onCollapse(menuNode.id);
            } else {
              onExpand(menuNode.id);
            }
            closeMenu();
          }}
          onToggleImportant={() => {
            onToggleImportant(menuNode.id);
            closeMenu();
          }}
          onDelete={() => {
            onDelete(menuNode.id);
            closeMenu();
          }}
        />
      )}
    </div>
  );
}
