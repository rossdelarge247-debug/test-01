import type { ImportedProfile } from '../types';
import { BLANK_SIGNAL_TASKS, SKETCH_TASKS } from './tasks';
import { ROLE_FIT_PACKS } from './roles';

// ── Dimension detection ────────────────────────────────────────────────────

type Dimension =
  | 'ambiguity-comfort'
  | 'stakeholder-sensitivity'
  | 'structured-thinking'
  | 'execution-bias'
  | 'collaboration-preference'
  | 'systems-thinking';

const ROLE_KEYWORD_MAP: { keywords: string[]; dimensions: Dimension[] }[] = [
  {
    keywords: ['service design', 'service designer', 'ux', 'user experience', 'design lead', 'product designer'],
    dimensions: ['ambiguity-comfort', 'stakeholder-sensitivity', 'systems-thinking'],
  },
  {
    keywords: ['product manager', 'product management', 'product lead', 'pm', 'head of product'],
    dimensions: ['execution-bias', 'structured-thinking', 'stakeholder-sensitivity'],
  },
  {
    keywords: ['operations', 'transformation', 'programme', 'program', 'delivery', 'change manager'],
    dimensions: ['execution-bias', 'structured-thinking', 'collaboration-preference'],
  },
  {
    keywords: ['customer success', 'account manager', 'client', 'customer experience'],
    dimensions: ['stakeholder-sensitivity', 'collaboration-preference', 'execution-bias'],
  },
  {
    keywords: ['consultant', 'strategy', 'advisory'],
    dimensions: ['structured-thinking', 'ambiguity-comfort', 'stakeholder-sensitivity'],
  },
];

export function detectDimensions(profile: ImportedProfile): Dimension[] {
  const allText = [
    ...profile.roles.map((r) => r.title),
    ...profile.roles.map((r) => r.company),
    profile.headline,
    profile.summary,
  ]
    .join(' ')
    .toLowerCase();

  const scores: Partial<Record<Dimension, number>> = {};

  ROLE_KEYWORD_MAP.forEach(({ keywords, dimensions }) => {
    const matches = keywords.filter((kw) => allText.includes(kw)).length;
    if (matches > 0) {
      dimensions.forEach((dim) => {
        scores[dim] = (scores[dim] ?? 0) + matches;
      });
    }
  });

  // Sort by score descending, return top 3
  return (Object.entries(scores) as [Dimension, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([dim]) => dim);
}

// ── Task recommendations ───────────────────────────────────────────────────

export interface RecommendedTask {
  taskId: string;
  title: string;
  type: string;
  instructions: string;
  rationale: string;
  dimension: Dimension;
  connectedRoles: ConnectedRole[];
  selected: boolean;
}

export interface ConnectedRole {
  roleId: string;
  roleTitle: string;
  companyName: string;
  relevance: string;
}

const DIMENSION_TO_TASKS: Record<Dimension, string[]> = {
  'ambiguity-comfort': ['sketch-b', 'task-3'],           // discovery sketch, stakeholder scenario
  'stakeholder-sensitivity': ['task-3', 'task-4'],        // stakeholder scenario, critique
  'structured-thinking': ['task-1', 'sketch-c'],          // ranking, prioritisation sketch
  'execution-bias': ['task-1', 'sketch-a'],               // ranking, team structure sketch
  'collaboration-preference': ['task-2', 'sketch-e'],     // tradeoff, stakeholder map
  'systems-thinking': ['sketch-d', 'task-4'],             // system sketch, critique
};

const DIMENSION_RATIONALE: Record<Dimension, string> = {
  'ambiguity-comfort':
    'Your background includes roles where the problem space is often undefined at the start. This task surfaces how you navigate that.',
  'stakeholder-sensitivity':
    'Senior roles in your history suggest you regularly operate without direct authority. This task shows how you manage that.',
  'structured-thinking':
    'Across your roles, making sense of complexity and creating shared frameworks is central. This task reveals your approach.',
  'execution-bias':
    'Your experience spans delivery-focused environments. This task shows how you think about priority and pace.',
  'collaboration-preference':
    'Your roles have required working across functions and building shared direction. This task surfaces your natural mode.',
  'systems-thinking':
    'Your work touches services or products at a system level. This task shows how you see and map complexity.',
};

const DIMENSION_TO_ROLES: Record<Dimension, { roleId: string; relevance: string }[]> = {
  'ambiguity-comfort': [
    {
      roleId: 'rfp1',
      relevance: 'Lumio needs someone who can operate in high ambiguity without a defined brief — this task directly shows that.',
    },
  ],
  'stakeholder-sensitivity': [
    {
      roleId: 'rfp1',
      relevance: 'Influencing without authority is a core requirement at Lumio — this task is a direct signal.',
    },
    {
      roleId: 'rfp2',
      relevance: 'Meridian\'s governance environment rewards strong stakeholder navigation. Your response here is directly relevant.',
    },
  ],
  'structured-thinking': [
    {
      roleId: 'rfp2',
      relevance: 'Meridian needs someone who can diagnose and create frameworks in a complex organisation — this task reveals that.',
    },
  ],
  'execution-bias': [
    {
      roleId: 'rfp2',
      relevance: 'Delivering visible progress early is a stated expectation at Meridian. This task shows your instinct here.',
    },
  ],
  'collaboration-preference': [
    {
      roleId: 'rfp1',
      relevance: 'Lumio operates with high collaboration intensity across functions. This task shows your natural approach.',
    },
  ],
  'systems-thinking': [
    {
      roleId: 'rfp1',
      relevance: 'Mapping services that currently sit in people\'s heads is exactly what Lumio needs. This task is a direct match.',
    },
  ],
};

function getAllTasks() {
  return [...BLANK_SIGNAL_TASKS, ...SKETCH_TASKS];
}

export function buildRecommendations(profile: ImportedProfile): RecommendedTask[] {
  const dimensions = detectDimensions(profile);
  const allTasks = getAllTasks();
  const seen = new Set<string>();
  const recommendations: RecommendedTask[] = [];

  for (const dim of dimensions) {
    if (recommendations.length >= 3) break;

    const taskIds = DIMENSION_TO_TASKS[dim] ?? [];
    for (const taskId of taskIds) {
      if (seen.has(taskId) || recommendations.length >= 3) continue;
      const task = allTasks.find((t) => t.id === taskId);
      if (!task) continue;

      seen.add(taskId);

      const roleLinks = (DIMENSION_TO_ROLES[dim] ?? [])
        .map(({ roleId, relevance }) => {
          const role = ROLE_FIT_PACKS.find((r) => r.id === roleId);
          if (!role) return null;
          return {
            roleId,
            roleTitle: role.roleTitle,
            companyName: role.companyName,
            relevance,
          };
        })
        .filter((r): r is ConnectedRole => r !== null);

      recommendations.push({
        taskId: task.id,
        title: task.title,
        type: task.type,
        instructions: task.instructions,
        rationale: DIMENSION_RATIONALE[dim],
        dimension: dim,
        connectedRoles: roleLinks,
        selected: true,
      });
    }
  }

  return recommendations;
}

// Friendly label for each dimension
export const DIMENSION_LABELS: Record<Dimension, string> = {
  'ambiguity-comfort': 'Ambiguity comfort',
  'stakeholder-sensitivity': 'Stakeholder sensitivity',
  'structured-thinking': 'Structured thinking',
  'execution-bias': 'Execution bias',
  'collaboration-preference': 'Collaboration preference',
  'systems-thinking': 'Systems thinking',
};
