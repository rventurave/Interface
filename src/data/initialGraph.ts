import type { Node } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'pref-ml',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Machine Learning', kind: 'preference', score: 94, tags: ['ia', 'datos'] },
  },
  {
    id: 'pref-viz',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Visualización de datos', kind: 'preference', score: 82, tags: ['datos', 'diseño'] },
  },
  {
    id: 'pref-neuro',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Neurociencia', kind: 'preference', score: 88, tags: ['cognición', 'ia'] },
  },
  {
    id: 'exp-web',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Desarrollo web', kind: 'experience', score: 78, tags: ['diseño', 'interfaces'] },
  },
  {
    id: 'exp-datos',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Análisis de datos', kind: 'experience', score: 84, tags: ['datos'] },
  },
  {
    id: 'exp-investigacion',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Investigación académica', kind: 'experience', score: 80, tags: ['cognición', 'ia'] },
  },
  {
    id: 'know-ia',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Inteligencia Artificial', kind: 'knowledge', score: 90, tags: ['ia'] },
  },
  {
    id: 'know-datos',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Ciencia de Datos', kind: 'knowledge', score: 87, tags: ['datos'] },
  },
  {
    id: 'know-cognicion',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Cognición', kind: 'knowledge', score: 75, tags: ['cognición'] },
  },
  {
    id: 'know-diseno',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Diseño de interfaces', kind: 'knowledge', score: 72, tags: ['diseño', 'interfaces'] },
  },
  {
    id: 'info-cs',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: {
      label: 'Ciencias de la Computación',
      kind: 'information',
      score: 95,
      tags: ['computación', 'software', 'ia', 'datos', 'interfaces'],
    },
  },
  {
    id: 'info-curso-ml',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Curso de Machine Learning', kind: 'information', score: 90, tags: ['ia', 'datos'] },
  },
  {
    id: 'info-curso-db',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Curso de Bases de Datos', kind: 'information', score: 82, tags: ['datos'] },
  },
  {
    id: 'info-curso-ihc',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Curso de IHC', kind: 'information', score: 85, tags: ['interfaces', 'diseño'] },
  },
];
