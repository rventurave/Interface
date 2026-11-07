import { useMemo, useState } from 'react';
import {
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ArticleDetails from './exploration/ArticleDetails';
import ArticleNode from './exploration/ArticleNode';
import { BrainLogo } from './Logo';
import { ARTICLE_RELATION_META, generateArticles } from '../data/hierarchy';
import type { Article } from '../types/hierarchy';

const nodeTypes = { article: ArticleNode } satisfies NodeTypes;

function layoutArticles(articles: Article[]): Map<string, { x: number; y: number }> {
  const map = new Map<string, { x: number; y: number }>();
  const radius = 200;
  articles.forEach((article, index) => {
    const angle = (index / articles.length) * Math.PI * 2 - Math.PI / 2;
    map.set(article.id, {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    });
  });
  return map;
}

interface ArticlesViewProps {
  topic: { topicId: string; topicLabel: string };
  onBack: () => void;
}

export default function ArticlesView({ topic, onBack }: ArticlesViewProps) {
  const { articles, links } = useMemo(
    () => generateArticles(topic.topicLabel),
    [topic.topicLabel],
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const positions = useMemo(() => layoutArticles(articles), [articles]);

  const nodes: Node[] = useMemo(
    () =>
      articles.map((article) => {
        const position = positions.get(article.id)!;
        return {
          id: article.id,
          type: 'article',
          position,
          data: {
            title: article.title,
            year: article.year,
            relevance: article.relevance,
            isSelected: selectedId === article.id,
          },
        };
      }),
    [articles, positions, selectedId],
  );

  const edges: Edge[] = useMemo(
    () =>
      links.map((link) => {
        const meta = ARTICLE_RELATION_META[link.kind];
        return {
          id: link.id,
          source: link.source,
          target: link.target,
          type: 'smoothstep',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: meta.color,
            width: 12,
            height: 12,
          },
          style: { stroke: meta.color, strokeWidth: 1.6, opacity: 0.8 },
        };
      }),
    [links],
  );

  const selected = articles.find((article) => article.id === selectedId) ?? null;

  return (
    <div className="flex min-w-0 flex-1 flex-col pt-14 lg:flex-row lg:pt-0">
      <div className="flex w-full flex-col lg:h-screen lg:w-[30%] lg:overflow-hidden lg:border-r lg:border-primary/20">
        <div className="flex flex-col px-5 py-6 lg:h-full lg:px-6 lg:py-8">
          <header className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-white/60 transition-colors hover:text-white"
            >
              ← Volver al árbol
            </button>
            <BrainLogo className="h-6 w-6" />
            <span className="text-sm font-medium text-white/70">Artículos científicos</span>
          </header>

          <div className="mt-6 lg:flex-1 lg:overflow-y-auto">
            <ArticleDetails article={selected} topicLabel={topic.topicLabel} />
          </div>

          <div className="mt-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-white/40">
              Tipo de relación
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(ARTICLE_RELATION_META).map(([key, meta]) => (
                <span
                  key={key}
                  className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: meta.color }}
                  />
                  {meta.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[72vh] w-full lg:h-screen lg:w-[70%]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          onNodeClick={(_event, node) => setSelectedId(node.id)}
          onPaneClick={() => setSelectedId(null)}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#3b2a63" gap={24} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}
