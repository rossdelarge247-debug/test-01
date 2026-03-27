import type { ImportedProfile } from '../types';

export const ALEX_MORGAN_IMPORT: ImportedProfile = {
  source: 'linkedin',
  fullName: 'Alex Morgan',
  headline: 'Service Design Lead helping organisations simplify complex services',
  summary:
    'Experienced service designer with a background in transformation, product thinking, and cross-functional delivery. Comfortable working in ambiguity and aligning teams around practical outcomes. I care most about the work that happens between teams — the coordination, the clarity, and the difficult conversations that make services actually work.',
  roles: [
    {
      id: 'r1',
      title: 'Service Design Lead',
      company: 'DEFRA / APHA',
      startDate: '2024-01',
      endDate: null,
      description:
        'Leading service design across a portfolio of digital transformation programmes. Working across policy, operations, and digital delivery teams to map and improve end-to-end services.',
    },
    {
      id: 'r2',
      title: 'Senior Product Designer',
      company: 'HSBC',
      startDate: '2022-03',
      endDate: '2024-01',
      description:
        'Embedded designer in a cross-functional product team working on SME banking experiences. Responsible for discovery, prototyping, and design delivery.',
    },
    {
      id: 'r3',
      title: 'UX Consultant',
      company: 'Independent',
      startDate: '2019-06',
      endDate: '2022-03',
      description: '',
    },
  ],
  importedAt: new Date().toISOString(),
};
