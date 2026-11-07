export type NodeKind = 'preference' | 'experience' | 'knowledge';

export interface ProfileNodeData {
  label: string;
  kind: NodeKind;
  score?: number;
  tags?: string[];
}

export const NODE_RADIUS = 22;

export const KIND_COLORS: Record<NodeKind, string> = {
  preference: '#22C55E',
  experience: '#3B82F6',
  knowledge: '#8B5CF6',
};
