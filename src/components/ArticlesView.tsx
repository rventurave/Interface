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
        <div className="flex flex-col px-5 py-6 lg:h-full lg:px-6 lg:pb-24 lg:pt-8">
          <header className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-white/10 px-2.5 py-1 text-sm text-white/75 transition-colors hover:text-white"
            >
              ← Volver a los temas
            </button>
            <BrainLogo className="h-6 w-6" />
            <span className="text-sm font-medium text-white/70">Artículos de ejemplo</span>
          </header>

          <p className="article-topic-context mt-4 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-sm text-white/75">
            Tema de investigación<br />
            <strong className="break-words text-white">{topic.topicLabel}</strong>
          </p>

          <div className="mt-6 lg:flex-1 lg:overflow-y-auto">
            <ArticleDetails article={selected} topicLabel={topic.topicLabel} />
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-medium tracking-normal text-white/75">
              Tipo de relación
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(ARTICLE_RELATION_META).map(([key, meta]) => (
                <span
                  key={key}
                  className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-sm text-white/70"
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

      <div className="map-frame h-[72vh] w-full lg:h-screen lg:w-[70%]">
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
