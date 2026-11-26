import { BrainLogo } from './Logo';
import NodeChat from './exploration/NodeChat';
import { LEVEL_META } from '../data/hierarchy';
import type { HierarchyNode } from '../types/hierarchy';

interface ExplorerPanelProps {
  selectedNode: HierarchyNode | null;
  breadcrumb: HierarchyNode[];
  onSelect: (id: string) => void;
  onBack: () => void;
}

export default function ExplorerPanel({
  selectedNode,
  breadcrumb,
  onSelect,
  onBack,
}: ExplorerPanelProps) {
  const meta = selectedNode ? LEVEL_META[selectedNode.level] : null;

  return (
    <section className="flex flex-col px-5 py-6 lg:h-full lg:overflow-y-auto lg:px-6 lg:pb-24 lg:pt-8">
      <header className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-white/10 px-2.5 py-1 text-sm text-white/75 transition-colors hover:text-white"
        >
          ← Volver
        </button>
        <BrainLogo className="h-6 w-6" />
        <span className="text-sm font-medium text-white/70">Explorador de investigación</span>
      </header>

      <p className="mt-4 text-sm text-white/75">
        Clic: detalles. Clic derecho: opciones. Tópico significa tema de investigación.
      </p>

      <div className="mt-6 lg:flex-1">
        {breadcrumb.length > 0 && (
          <div className="exploration-path mb-4 flex flex-wrap items-center gap-1.5 text-sm text-white/75">
            {breadcrumb.map((item, index) => (
              <span key={item.id} className="flex min-w-0 max-w-full items-center gap-1.5">
                {index > 0 && <span className="text-white/75">›</span>}
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className="min-w-0 break-words text-left hover:text-white"
                >
                  {item.label}
                </button>
              </span>
            ))}
          </div>
        )}

        {selectedNode && meta ? (
          <div className="glow-card context-card p-5">
            <p className="selection-kicker">Tema seleccionado</p>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium tracking-normal" style={{ color: meta.color }}>
                  {meta.label}
                </p>
                <h2 className="mt-1 text-lg font-bold leading-snug">
                  {selectedNode.label}
                </h2>
              </div>
              {selectedNode.isCustom && (
                <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-sm text-white/70">
                  Personalizado
                </span>
              )}
            </div>

            {selectedNode.affinity != null && (
              <div className="mt-4">
                <p className="text-sm font-medium tracking-normal text-white/75">Coincidencia de ejemplo</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-1.5 flex-1 rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${selectedNode.affinity}%`,
                        background: meta.color,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {selectedNode.affinity}%
                  </span>
                </div>
              </div>
            )}

            {selectedNode.description && (
              <p className="mt-4 text-base text-white/75">{selectedNode.description}</p>
            )}
          </div>
        ) : (
          <div className="glow-card p-5 text-base text-white/75">
            Aquí aparecerán los detalles del tema seleccionado.
          </div>
        )}
      </div>

      <div className="mt-4">
        <NodeChat
          nodeId={selectedNode?.id ?? null}
          nodeLabel={selectedNode?.label ?? null}
        />
      </div>
    </section>
  );
}
