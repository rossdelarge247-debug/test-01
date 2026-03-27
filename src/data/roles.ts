import type { RoleFitPack, Employer } from '../types';

export const EMPLOYERS: Employer[] = [
  {
    id: 'e1',
    name: 'Sarah Whitfield',
    company: 'Lumio',
    role: 'VP of Design & Research',
    dashboardRoles: ['rfp1'],
  },
  {
    id: 'e2',
    name: 'Tom Adeyemi',
    company: 'Meridian Group',
    role: 'Chief Operating Officer',
    dashboardRoles: ['rfp2'],
  },
];

export const ROLE_FIT_PACKS: RoleFitPack[] = [
  {
    id: 'rfp1',
    employerId: 'e1',
    roleTitle: 'Senior Service Designer',
    companyName: 'Lumio',
    roleFamily: 'service-design',
    seniority: 'Senior',
    successStatement:
      "In the first 90 days, this person will have mapped two or three critical service journeys that currently sit in people's heads, facilitated a cross-functional alignment session on what 'good' looks like, and produced a set of service principles that the team can actually use to make decisions.",
    environmentDescription:
      "Lumio is a B2B SaaS company that has grown quickly by building strong product, but has under-invested in the connective tissue between product, customer success, and professional services. The environment is fast-moving, commercially driven, and has a lot of smart people who don't always talk to each other. Ambiguity is high and won't reduce soon.",
    frustrationFactors:
      "People who need a fully defined brief before they can start, or who produce outputs without building organisational understanding alongside them. People who struggle to operate without a design team or research ops support.",
    topTradeoffs: [
      'Exploration vs standardisation — we need both but in the right order',
      'Depth vs breadth — some areas need deep investigation, others need a good enough frame quickly',
      'Influence vs authority — you won\'t own product decisions but you need to shape them',
    ],
    decisionStyle:
      "Decisions tend to be made by small groups quickly, often without full information. There's a strong bias towards doing and reviewing over planning and deciding. Disagreement is welcome but needs to be voiced early.",
    valuesAndTeamStyle: [
      'direct communication',
      'low hierarchy',
      'curious',
      'commercially aware',
      'evidence-informed not evidence-dependent',
    ],
    pace: 'fast',
    ambiguity: 'high',
    collaborationIntensity: 'high',
    autonomyExpected: 'high',
    processMaturity: 'evolving',
    fitDimensions: [
      { id: 'fd1', name: 'Ambiguity Comfort', description: 'Thrives in undefined problem spaces', roleScore: 9 },
      { id: 'fd2', name: 'Collaboration Preference', description: 'Works effectively across functions', roleScore: 8 },
      { id: 'fd3', name: 'Execution Bias', description: 'Moves to action while staying curious', roleScore: 7 },
      { id: 'fd4', name: 'Structured Thinking', description: 'Creates clarity from complexity', roleScore: 8 },
      { id: 'fd5', name: 'Stakeholder Sensitivity', description: 'Navigates without formal authority', roleScore: 9 },
    ],
  },
  {
    id: 'rfp2',
    employerId: 'e2',
    roleTitle: 'Operations Transformation Lead',
    companyName: 'Meridian Group',
    roleFamily: 'operations',
    seniority: 'Lead / Principal',
    successStatement:
      'In the first 90 days, this person will have diagnosed the top three operational bottlenecks across the core service delivery function, built a working relationship with the heads of each division, and produced a clear transformation roadmap with milestones and dependencies.',
    environmentDescription:
      "Meridian is a professional services organisation with 1,200 people across four divisions. The culture is process-oriented but the processes are often outdated. There's real appetite for change at the leadership level but mixed readiness at the operational level. The person needs to be comfortable working with senior sponsors while remaining credible to frontline teams.",
    frustrationFactors:
      'People who lead with frameworks before understanding the specific context. People who need stable environments to thrive. People who struggle to manage upwards or work effectively in politically complex organisations.',
    topTradeoffs: [
      'Speed vs thoroughness — we need progress visible quickly even if the full picture takes longer',
      'Standardisation vs flexibility — some things need common approaches, others need local variation',
      'Credibility vs challenge — this person needs to earn trust and then use it to push back',
    ],
    decisionStyle:
      'Decisions go through a defined governance process but informal influence matters enormously. The most effective leaders here understand both the formal and informal routes to getting things moved.',
    valuesAndTeamStyle: [
      'credibility through competence',
      'politically aware',
      'structured but adaptable',
      'builds capability not dependency',
      'evidence-based',
    ],
    pace: 'moderate',
    ambiguity: 'medium',
    collaborationIntensity: 'high',
    autonomyExpected: 'medium',
    processMaturity: 'evolving',
    fitDimensions: [
      { id: 'fd1', name: 'Ambiguity Comfort', description: 'Comfortable with incomplete information', roleScore: 7 },
      { id: 'fd2', name: 'Collaboration Preference', description: 'Builds relationships across levels', roleScore: 8 },
      { id: 'fd3', name: 'Execution Bias', description: 'Delivers visible progress early', roleScore: 8 },
      { id: 'fd4', name: 'Structured Thinking', description: 'Creates frameworks from complexity', roleScore: 9 },
      { id: 'fd5', name: 'Stakeholder Sensitivity', description: 'Navigates political complexity', roleScore: 9 },
    ],
  },
];
