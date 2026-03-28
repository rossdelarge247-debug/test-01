export type ThemeId = 'corporate' | 'bumble' | 'hinge';

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  dot: string; // swatch color for the toggle UI
}

export const THEMES: Theme[] = [
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Clean & professional',
    dot: '#4f46e5',
  },
  {
    id: 'bumble',
    name: 'Bumble',
    description: 'Bold & playful',
    dot: '#FBCE3B',
  },
  {
    id: 'hinge',
    name: 'Hinge',
    description: 'Warm & editorial',
    dot: '#1a4731',
  },
];
