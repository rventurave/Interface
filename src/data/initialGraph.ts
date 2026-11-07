import type { Node } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'pref-mate',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Matemáticas', kind: 'preference', score: 94, tags: ['matemáticas'] },
  },
  {
    id: 'pref-prog',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Programación', kind: 'preference', score: 90, tags: ['computación', 'software'] },
  },
  {
    id: 'exp-estructuras',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Estructuras de Datos', kind: 'experience', score: 86, tags: ['computación', 'software'] },
  },
  {
    id: 'exp-calculo',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Cálculo Diferencial', kind: 'experience', score: 78, tags: ['matemáticas'] },
  },
  {
    id: 'know-algoritmos',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Algoritmos', kind: 'knowledge', score: 88, tags: ['computación'] },
  },
  {
    id: 'know-biocomp',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: { label: 'Biología Computacional', kind: 'knowledge', score: 70, tags: ['biología', 'computación'] },
  },
  {
    id: 'info-cs',
    type: 'profile',
    position: { x: 0, y: 0 },
    data: {
      label: 'Ciencias de la Computación',
      kind: 'information',
      score: 95,
      tags: ['computación', 'software', 'matemáticas', 'biología'],
    },
  },
];
