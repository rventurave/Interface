import type { Article } from '../../types/hierarchy';

interface ArticleDetailsProps {
  article: Article | null;
  topicLabel: string;
}

export default function ArticleDetails({
  article,
  topicLabel,
}: ArticleDetailsProps) {
  if (!article) {
    return (
      <div className="glow-card p-5 text-sm text-white/75" aria-label={`Artículos sobre ${topicLabel}`}>
        Selecciona un artículo del mapa para ver sus detalles.
      </div>
    );
  }

  return (
    <div className="glow-card context-card p-5" aria-label={`Artículos sobre ${topicLabel}`}>
      <p className="selection-kicker">Artículo seleccionado</p>
      <p className="text-sm font-medium tracking-normal text-white/75">
        {article.venue} · {article.year}
      </p>
      <h2 className="mt-1 text-lg font-bold leading-snug">{article.title}</h2>
      <p className="mt-1.5 text-sm text-white/75">{article.authors.join(', ')}</p>

      <p className="mt-4 text-base text-white/75">{article.abstract}</p>

      <div className="mt-4">
        <p className="text-sm font-medium tracking-normal text-white/75">Relevancia</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.round(article.relevance * 100)}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-white">
            {Math.round(article.relevance * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
