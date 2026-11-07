export type HierarchyLevel =
  | 'career'
  | 'area'
  | 'subarea'
  | 'topic'
  | 'articles';

export interface HierarchyNode {
  id: string;
  parentId: string | null;
  level: HierarchyLevel;
  label: string;
  description?: string;
  affinity?: number;
  isCustom?: boolean;
  important?: boolean;
}

export type ArticleRelationKind =
  | 'tematica'
  | 'metodologia'
  | 'autores'
  | 'referencias'
  | 'relacionados';

export interface Article {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  abstract: string;
  relevance: number;
  topicLabel: string;
}

export interface ArticleLink {
  id: string;
  source: string;
  target: string;
  kind: ArticleRelationKind;
}
