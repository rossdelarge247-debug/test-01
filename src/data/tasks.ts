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
    title: 'Map how work flows through your team',
    instructions:
      'Sketch how incoming work gets triaged, assigned, and tracked in a team you have worked in or would want to work in. Show the key stages, decision points, and who owns what. Labels and rough shapes are fine — this is about your mental model, not a polished diagram.',
    timeLimit: 10,
    responseFormat: 'freehand sketch',
    sketchPrompt: 'Show the stages work passes through — from request to done',
    sketchPlaceholder: 'Sketch your team\'s work flow — stages, handoffs, decision points',
  },
];

// ── Standalone whiteboard questions ────────────────────────────────────────
// These are used when a role family benefits from additional visual tasks.

export const SKETCH_TASKS: SignalTask[] = [
  {
    id: 'sketch-a',
    type: 'sketch',
    title: 'Sketch your ideal team structure',
    instructions:
      'Draw the shape of a team structure that you think works well for the kind of role you are applying for. Think about reporting lines, cross-functional relationships, and where decisions get made. It does not need to be a formal org chart — a rough diagram that reflects how you think about team design is more useful.',
    timeLimit: 10,
    responseFormat: 'freehand sketch',
    sketchPrompt: 'How would you structure the team? Who connects to whom, and where do decisions sit?',
    sketchPlaceholder: 'Draw roles, relationships, and decision points — rough is fine',
  },
  {
    id: 'sketch-b',
    type: 'sketch',
    title: 'Map a discovery process',
    instructions:
      'Sketch how you would approach the discovery phase of a poorly-defined problem. A stakeholder has told you "users are struggling with onboarding" but there is no existing research, no clear scope, and a six-week timeline. Show how you would move from ambiguity to a clear direction.',
    timeLimit: 12,
    responseFormat: 'freehand sketch',
    sketchPrompt: 'What are your steps, and how do they connect? Where are the key decisions?',
    sketchPlaceholder: 'Sketch your discovery process — steps, decision points, outputs',
  },
  {
    id: 'sketch-c',
    type: 'sketch',
    title: 'Draw a prioritisation framework',
    instructions:
      'You are sitting down with a team that has 20 potential pieces of work and no agreed way to prioritise them. Sketch the framework or approach you would use to help the team get to a shared, defensible priority order. You can draw a matrix, a set of criteria, a scoring approach, or anything else that reflects how you actually think about prioritisation.',
    timeLimit: 10,
    responseFormat: 'freehand sketch',
    sketchPrompt: 'What dimensions matter, and how does the framework work in practice?',
    sketchPlaceholder: 'Sketch your prioritisation approach — axes, criteria, or process',
  },
  {
    id: 'sketch-d',
    type: 'sketch',
    title: 'Visualise a service or system you know well',
    instructions:
      'Pick a service, product, or internal system you have worked with that had a complexity problem — where things were hard to understand, hand off, or improve. Sketch it as it actually was: the parts, the connections, the gaps. Then mark where the biggest friction was and what you would have changed.',
    timeLimit: 15,
    responseFormat: 'freehand sketch',
    sketchPrompt: 'Show the system as it was — then mark the problems and your proposed change',
    sketchPlaceholder: 'Draw the system, its parts and connections — then annotate what was broken',
  },
  {
    id: 'sketch-e',
    type: 'sketch',
    title: 'Sketch how you think about stakeholder relationships',
    instructions:
      'In complex roles, managing stakeholder relationships is as important as the work itself. Sketch how you think about and map stakeholders in a new role or project — who you would prioritise, how you would think about influence and interest, and how you would plan your engagement. Show your mental model, not a textbook answer.',
    timeLimit: 10,
    responseFormat: 'freehand sketch',
    sketchPrompt: 'How do you map and prioritise stakeholder relationships?',
    sketchPlaceholder: 'Sketch your stakeholder model — groups, relationships, engagement priorities',
  },
];
