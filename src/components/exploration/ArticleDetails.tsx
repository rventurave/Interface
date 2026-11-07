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
      <div className="glow-card p-5 text-sm text-white/50">
        Selecciona un artículo para consultar sus detalles. Tópico de referencia:{' '}
        <span className="text-white/80">{topicLabel}</span>.
      </div>
    );
  }

  return (
    <div className="glow-card p-5">
      <p className="text-xs uppercase tracking-wider text-white/40">
        {article.venue} · {article.year}
      </p>
      <h2 className="mt-1 text-lg font-bold leading-tight">{article.title}</h2>
      <p className="mt-1.5 text-xs text-white/50">{article.authors.join(', ')}</p>

      <p className="mt-4 text-sm text-white/65">{article.abstract}</p>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-white/40">Relevancia</p>
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
