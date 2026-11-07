import type { Area, PreferenceOption } from '../types/exploration';

export const CAREER = 'Ciencias de la Computación';

export const CAREER_DESCRIPTION =
  'Carrera raíz del árbol de exploración. Las áreas recomendadas se derivan de tu grafo de preferencias (demo).';

export const PREFERENCE_OPTIONS: PreferenceOption[] = [
  { id: 'p-ml', label: 'Machine Learning', kind: 'preference' },
  { id: 'p-viz', label: 'Visualización de datos', kind: 'preference' },
  { id: 'p-neuro', label: 'Neurociencia', kind: 'preference' },
  { id: 'p-web', label: 'Desarrollo web', kind: 'experience' },
  { id: 'p-datos', label: 'Análisis de datos', kind: 'experience' },
  { id: 'p-investigacion', label: 'Investigación académica', kind: 'experience' },
  { id: 'p-ia', label: 'Inteligencia Artificial', kind: 'knowledge' },
  { id: 'p-cognicion', label: 'Cognición', kind: 'knowledge' },
  { id: 'p-diseno', label: 'Diseño de interfaces', kind: 'knowledge' },
];

export const INITIAL_AREAS: Area[] = [
  {
    id: 'area-ia',
    name: 'Inteligencia Artificial',
    description:
      'Estudio de sistemas capaces de aprender, razonar y adaptarse. Incluye aprendizaje automático, visión y lenguaje.',
    affinity: 87,
    justification:
      'Recomendada por tu interés en Machine Learning y tu conocimiento en IA y redes neuronales.',
    preferences: ['Machine Learning', 'Inteligencia Artificial', 'Neurociencia'],
    knowledge: ['Redes neuronales', 'Aprendizaje supervisado', 'Álgebra lineal'],
    researchLines: [
      'Aprendizaje profundo',
      'Procesamiento de lenguaje natural',
      'Visión por computadora',
    ],
    feedback: null,
  },
  {
    id: 'area-sw',
    name: 'Ingeniería de Software',
    description:
      'Diseño y construcción de sistemas de software robustos, escalables y mantenibles.',
    affinity: 74,
    justification:
      'Recomendada por tu experiencia en desarrollo web y tu conocimiento en diseño de interfaces.',
    preferences: ['Desarrollo web', 'Diseño de interfaces'],
    knowledge: ['Arquitectura de software', 'Metodologías ágiles', 'Pruebas de software'],
    researchLines: ['Calidad de software', 'DevOps', 'Arquitecturas distribuidas'],
    feedback: null,
  },
];

export function generateDemoArea(
  preference: string,
  prompt: string,
): Area {
  const name = (prompt.trim() || `${preference} (área generada)`).slice(0, 64);

  return {
    id: `area-${Date.now()}`,
    name,
    description:
      'Área de investigación generada a partir de tu petición (datos de demostración).',
    affinity: 68,
    justification: `Generada a partir de tu preferencia «${preference}» y tu petición: «${prompt}».`,
    preferences: [preference],
    knowledge: [],
    researchLines: [],
    feedback: null,
  };
}
