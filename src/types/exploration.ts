export type Feedback = 'interested' | 'unsure' | 'not-interested' | null;

export type Area = {
  id: string;
  name: string;
  description: string;
  affinity: number;
  justification: string;
  preferences: string[];
  knowledge: string[];
  researchLines: string[];
  feedback: Feedback;
};

export type PreferenceOption = {
  id: string;
  label: string;
  kind: 'preference' | 'experience' | 'knowledge';
};

export const FEEDBACK_META: Record<
  Exclude<Feedback, null>,
  { label: string; color: string }
> = {
  interested: { label: 'Me interesa', color: '#22C55E' },
  unsure: { label: 'No estoy seguro', color: '#F59E0B' },
  'not-interested': { label: 'No me interesa', color: '#EF4444' },
};
