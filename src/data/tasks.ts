import type { SignalTask } from '../types';

export const RANKING_ITEMS = [
  { id: 'a', label: 'Map the current state and identify where blockers actually sit' },
  { id: 'b', label: 'Facilitate a session to establish a shared view of priorities' },
  { id: 'c', label: 'Meet with the stakeholders to reset expectations' },
  { id: 'd', label: 'Identify quick wins to demonstrate progress' },
  { id: 'e', label: 'Review existing documentation and prior work' },
];

export const TRADEOFF_OPTIONS = [
  { id: 'a', label: 'Speed over polish', description: 'Move fast, iterate later, prefer progress to perfection' },
  { id: 'b', label: 'Alignment over autonomy', description: 'Build shared buy-in before moving forward, even when you could move alone' },
  { id: 'c', label: 'Exploration over standardisation', description: 'Prioritise discovery and learning over established process' },
  { id: 'd', label: 'Depth over breadth', description: 'Go deep on fewer things rather than covering more ground lightly' },
];

export const BLANK_SIGNAL_TASKS: SignalTask[] = [
  {
    id: 'task-1',
    type: 'ranking',
    title: 'Navigating a team in crisis',
    instructions:
      'You have joined a team where delivery is slipping, stakeholders are frustrated, and the team lacks a shared view of priorities. Rank the following actions in the order you would take them first.',
    timeLimit: 5,
    responseFormat: 'ranked list',
    rankingItems: [
      { id: 'a', label: 'Map the current state and identify where blockers actually sit' },
      { id: 'b', label: 'Facilitate a session to establish a shared view of priorities' },
      { id: 'c', label: 'Meet with the stakeholders to reset expectations' },
      { id: 'd', label: 'Identify quick wins to demonstrate progress' },
      { id: 'e', label: 'Review existing documentation and prior work' },
    ],
  },
  {
    id: 'task-2',
    type: 'tradeoff',
    title: 'Your natural trade-off',
    instructions:
      'In this role, which trade-off feels most natural to you? Choose the one that reflects how you genuinely tend to operate — not what sounds best.',
    timeLimit: 3,
    responseFormat: 'selection + rationale',
    tradeoffOptions: [
      { id: 'a', label: 'Speed over polish', description: 'Move fast, iterate later, prefer progress to perfection' },
      { id: 'b', label: 'Alignment over autonomy', description: 'Build shared buy-in before moving forward' },
      { id: 'c', label: 'Exploration over standardisation', description: 'Prioritise discovery over established process' },
      { id: 'd', label: 'Depth over breadth', description: 'Go deep on fewer things rather than covering more ground lightly' },
    ],
  },
  {
    id: 'task-3',
    type: 'scenario',
    title: 'Stakeholder pressure without evidence',
    instructions:
      'A senior stakeholder wants a solution committed this week, but the evidence is weak and key users have not been consulted. What do you do?',
    timeLimit: 7,
    responseFormat: 'short written response (max 300 words)',
  },
  {
    id: 'task-4',
    type: 'critique',
    title: 'What\'s wrong with this brief',
    instructions:
      'Below is a weak brief for a piece of work. What stands out as the biggest issue and why?',
    timeLimit: 5,
    responseFormat: 'short text',
    critiqueArtifact:
      '"We need to redesign the onboarding experience. Users are dropping off. The project will take 8 weeks. We need wireframes and a user journey map. Deliverables due end of month."',
  },
  {
    id: 'task-5',
    type: 'sketch',
    title: 'Sketch a triage process',
    instructions:
      'Sketch how you would structure a rough process for triaging incoming work across a team. Use the canvas below — drag, connect, and label the steps.',
    timeLimit: 10,
    responseFormat: 'sketch canvas',
  },
];
