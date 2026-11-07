export type NodeKind = 'preference' | 'experience' | 'knowledge' | 'information';

export interface ProfileNodeData {
  label: string;
  kind: NodeKind;
  score?: number;
  tags?: string[];
  important?: boolean;
}

export const NODE_RADIUS = 22;

export const KIND_COLORS: Record<NodeKind, string> = {
  preference: '#22C55E',
  experience: '#3B82F6',
  knowledge: '#8B5CF6',
  information: '#F59E0B',
};

export const KIND_LABELS: Record<NodeKind, string> = {
  preference: 'Preferencia',
  experience: 'Experiencia',
  knowledge: 'Conocimiento',
  information: 'Información',
};
