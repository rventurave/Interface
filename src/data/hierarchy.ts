import type {
  Article,
  ArticleLink,
  ArticleRelationKind,
  HierarchyLevel,
  HierarchyNode,
} from '../types/hierarchy';

export const CAREER = 'Ciencias de la Computación';
export const CAREER_DESCRIPTION =
  'Carrera raíz del árbol de exploración. Desde aquí se despliegan áreas, subáreas, tópicos y artículos científicos.';

export const LEVEL_META: Record<
  HierarchyLevel,
  { label: string; color: string; text: string }
> = {
  career: { label: 'Carrera', color: '#8B5CF6', text: '#ddd6fe' },
  area: { label: 'Área', color: '#8B5CF6', text: '#c4b5fd' },
  subarea: { label: 'Subárea', color: '#3B82F6', text: '#bfdbfe' },
  topic: { label: 'Tópico', color: '#22C55E', text: '#bbf7d0' },
  articles: { label: 'Artículos', color: '#F59E0B', text: '#fde68a' },
};

export const ARTICLE_RELATION_META: Record<
  ArticleRelationKind,
  { label: string; color: string }
> = {
  tematica: { label: 'Temática', color: '#22C55E' },
  metodologia: { label: 'Metodología', color: '#3B82F6' },
  autores: { label: 'Autores', color: '#F59E0B' },
  referencias: { label: 'Referencias', color: '#EF4444' },
  relacionados: { label: 'Relacionados', color: '#8B5CF6' },
};

interface SeedArea {
  id: string;
  label: string;
  affinity: number;
  description: string;
  subareas: SeedSubarea[];
}

interface SeedSubarea {
  id: string;
  label: string;
  topics: string[];
}

const SEED_AREAS: SeedArea[] = [
  {
    id: 'area-ia',
    label: 'Inteligencia Artificial',
    affinity: 87,
    description:
      'Estudio de sistemas capaces de aprender, razonar y adaptarse. Incluye aprendizaje automático, visión y lenguaje.',
    subareas: [
      {
        id: 'sub-ml',
        label: 'Machine Learning',
        topics: [
          'Aprendizaje supervisado',
          'Aprendizaje por refuerzo',
          'Aprendizaje profundo',
          'Modelos predictivos',
        ],
      },
      {
        id: 'sub-pln',
        label: 'Procesamiento de Lenguaje Natural',
        topics: [
          'Análisis de sentimiento',
          'Traducción automática',
          'Chatbots',
          'Extracción de información',
        ],
      },
      {
        id: 'sub-vision',
        label: 'Visión por Computadora',
        topics: [
          'Detección de objetos',
          'Segmentación de imágenes',
          'Reconocimiento facial',
          'Generación de imágenes',
        ],
      },
      {
        id: 'sub-si',
        label: 'Sistemas Inteligentes',
        topics: [
          'Sistemas expertos',
          'Agentes inteligentes',
          'Razonamiento automático',
          'Robótica cognitiva',
        ],
      },
    ],
  },
  {
    id: 'area-sw',
    label: 'Ingeniería de Software',
    affinity: 74,
    description:
      'Diseño y construcción de sistemas de software robustos, escalables y mantenibles.',
    subareas: [
      {
        id: 'sub-arq',
        label: 'Arquitectura de Software',
        topics: [
          'Microservicios',
          'Diseño dirigido por dominio',
          'Arquitecturas serverless',
          'Patrones de diseño',
        ],
      },
      {
        id: 'sub-calidad',
        label: 'Calidad de Software',
        topics: [
          'Pruebas automatizadas',
          'Métricas de calidad',
          'Revisión de código',
          'Integración continua',
        ],
      },
      {
        id: 'sub-devops',
        label: 'DevOps',
        topics: ['CI/CD', 'Infraestructura como código', 'Contenedores', 'Observabilidad'],
      },
      {
        id: 'sub-agiles',
        label: 'Metodologías Ágiles',
        topics: ['Scrum', 'Kanban', 'Extreme Programming', 'Lean'],
      },
    ],
  },
];

export interface ChildSeed {
  id: string;
  label: string;
  level: HierarchyLevel;
  affinity?: number;
  description?: string;
}

const SEED_CHILDREN: Record<string, ChildSeed[]> = {};

for (const area of SEED_AREAS) {
  SEED_CHILDREN[area.id] = area.subareas.map((subarea) => ({
    id: subarea.id,
    label: subarea.label,
    level: 'subarea',
  }));
}

for (const area of SEED_AREAS) {
  for (const subarea of area.subareas) {
    SEED_CHILDREN[subarea.id] = subarea.topics.map((topic, index) => ({
      id: `${subarea.id}-t${index + 1}`,
      label: topic,
      level: 'topic',
    }));
  }
}

SEED_CHILDREN['career'] = SEED_AREAS.map((area) => ({
  id: area.id,
  label: area.label,
  level: 'area',
  affinity: area.affinity,
  description: area.description,
}));

export function nextLevel(level: HierarchyLevel): HierarchyLevel | null {
  switch (level) {
    case 'career':
      return 'area';
    case 'area':
      return 'subarea';
    case 'subarea':
      return 'topic';
    case 'topic':
      return 'articles';
    default:
      return null;
  }
}

function genericChildren(parent: HierarchyNode): ChildSeed[] {
  const level = nextLevel(parent.level);
  if (!level || level === 'articles') return [];

  const kind = level === 'subarea' ? 'Subárea' : 'Tópico';
  return [1, 2].map((index) => ({
    id: `gen-${parent.id}-${index}`,
    label: `${kind} de ${parent.label} ${index}`,
    level,
  }));
}

export function recommendedChildren(parent: HierarchyNode): ChildSeed[] {
  return SEED_CHILDREN[parent.id] ?? genericChildren(parent);
}

export function generateCustomLabel(parent: HierarchyNode, prompt: string): string {
  const clean = prompt
    .trim()
    .replace(/^quiero explorar\s+/i, '')
    .replace(/^explorar\s+/i, '');
  if (!clean) return `Alternativa en ${parent.label}`;
  return clean.length > 48 ? `${clean.slice(0, 48)}…` : clean;
}

export function generateArticles(topicLabel: string): {
  articles: Article[];
  links: ArticleLink[];
} {
  const articles: Article[] = [
    {
      id: 'art-1',
      title: `Fundamentos de ${topicLabel}`,
      authors: ['Ana García', 'Luis Torres'],
      year: 2023,
      venue: 'Journal of Research',
      abstract: `Introducción a los conceptos centrales de ${topicLabel} y su evolución reciente.`,
      relevance: 0.9,
      topicLabel,
    },
    {
      id: 'art-2',
      title: `${topicLabel}: una revisión sistemática`,
      authors: ['María López', 'Ana García'],
      year: 2022,
      venue: 'ACM Computing Surveys',
      abstract: `Revisión sistemática del estado del arte en ${topicLabel}, métodos y resultados.`,
      relevance: 0.75,
      topicLabel,
    },
    {
      id: 'art-3',
      title: `Nuevas metodologías en ${topicLabel}`,
      authors: ['Carlos Ruiz'],
      year: 2024,
      venue: 'IEEE Transactions',
      abstract: `Propuesta metodológica para abordar ${topicLabel} con enfoques reproducibles.`,
      relevance: 0.6,
      topicLabel,
    },
    {
      id: 'art-4',
      title: `Aplicaciones prácticas de ${topicLabel}`,
      authors: ['Elena Martín', 'Carlos Ruiz'],
      year: 2021,
      venue: 'NeurIPS',
      abstract: `Casos de uso y aplicaciones reales de ${topicLabel} en la industria.`,
      relevance: 0.5,
      topicLabel,
    },
    {
      id: 'art-5',
      title: `Desafíos abiertos en ${topicLabel}`,
      authors: ['Jorge Díaz'],
      year: 2023,
      venue: 'Nature Machine Intelligence',
      abstract: `Problemas abiertos y líneas futuras de investigación en ${topicLabel}.`,
      relevance: 0.4,
      topicLabel,
    },
    {
      id: 'art-6',
      title: `Herramientas para ${topicLabel}`,
      authors: ['Sofía Pérez', 'Jorge Díaz'],
      year: 2020,
      venue: 'SoftwareX',
      abstract: `Revisión de herramientas y plataformas disponibles para ${topicLabel}.`,
      relevance: 0.3,
      topicLabel,
    },
  ];

  const links: ArticleLink[] = [
    { id: 'l1', source: 'art-1', target: 'art-2', kind: 'tematica' },
    { id: 'l2', source: 'art-2', target: 'art-3', kind: 'metodologia' },
    { id: 'l3', source: 'art-3', target: 'art-4', kind: 'referencias' },
    { id: 'l4', source: 'art-4', target: 'art-5', kind: 'relacionados' },
    { id: 'l5', source: 'art-1', target: 'art-4', kind: 'autores' },
    { id: 'l6', source: 'art-2', target: 'art-5', kind: 'tematica' },
    { id: 'l7', source: 'art-3', target: 'art-6', kind: 'metodologia' },
    { id: 'l8', source: 'art-5', target: 'art-6', kind: 'relacionados' },
  ];

  return { articles, links };
}
