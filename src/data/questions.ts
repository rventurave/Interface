export interface Question {
  id: string;
  title: string;
  description: string;
}

export const QUESTIONS_POOL: Question[] = [
  {
    id: 'q-tema',
    title: '¿Qué tema te gustaría investigar?',
    description: 'Cuéntame sobre un área que te llame la atención.',
  },
  {
    id: 'q-experiencia',
    title: '¿Qué experiencia tienes en investigación?',
    description: 'Proyectos, cursos o trabajos previos.',
  },
  {
    id: 'q-areas',
    title: '¿Qué áreas de conocimiento te interesan?',
    description: 'Menciona los temas que te apasionan.',
  },
  {
    id: 'q-herramientas',
    title: '¿Qué herramientas o tecnologías usas?',
    description: 'Lenguajes, frameworks o software.',
  },
  {
    id: 'q-aprender',
    title: '¿Qué te gustaría aprender próximamente?',
    description: 'Nuevas habilidades o temas.',
  },
  {
    id: 'q-problemas',
    title: '¿Qué tipo de problemas te gusta resolver?',
    description: 'Teóricos, prácticos, sociales o técnicos.',
  },
  {
    id: 'q-evitar',
    title: '¿Qué prefieres evitar en tu trabajo?',
    description: 'Tareas o áreas que no disfrutas.',
  },
  {
    id: 'q-carrera',
    title: '¿Cómo conectas tu carrera con tus intereses?',
    description: 'Relación entre lo que estudias y lo que te gusta.',
  },
  {
    id: 'q-proyecto',
    title: '¿Tienes algún proyecto en mente?',
    description: 'Una idea o problema que quieras explorar.',
  },
];

export function pickQuestions(
  count: number,
  excludeIds: string[] = [],
): Question[] {
  const available = QUESTIONS_POOL.filter((q) => !excludeIds.includes(q.id));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
