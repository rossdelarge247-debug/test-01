export type RoleFamily =
  | 'product'
  | 'service-design'
  | 'operations'
  | 'customer-success'
  | 'programme-delivery';

export type TaskType =
  | 'ranking'
  | 'tradeoff'
  | 'scenario'
  | 'critique'
  | 'sketch';

export type FitStatus =
  | 'strong-alignment'
  | 'promising-fit'
  | 'mixed-fit'
  | 'low-alignment';

export type AuthProvider = 'linkedin' | 'email' | 'none';

export interface ImportedRole {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface ImportedProfile {
  source: 'linkedin';
  fullName: string;
  headline: string;
  summary: string;
  roles: ImportedRole[];
  importedAt: string;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  roleFamily: RoleFamily;
  summary: string;
  yearsExperience: number;
  workStyleTags: string[];
  signalProfileId: string | null;
  avatarInitials: string;
  authProvider?: AuthProvider;
  importedProfile?: ImportedProfile;
  profileBasicsCompleted?: boolean;
  linkedinConnected?: boolean;
}

export interface RankingItem {
  id: string;
  label: string;
}

export interface TradeoffOption {
  id: string;
  label: string;
  description: string;
}

export interface SignalTask {
  id: string;
  type: TaskType;
  title: string;
  instructions: string;
  timeLimit?: number;
  responseFormat: string;
  candidateResponse?: string | string[];
  rankingItems?: RankingItem[];
  tradeoffOptions?: TradeoffOption[];
  critiqueArtifact?: string;
  sketchPrompt?: string;
  sketchPlaceholder?: string;
  extractedTags?: string[];
  dimension?: string;
  dimensionScore?: number;
}

export interface SignalProfile {
  id: string;
  candidateId: string;
  roleFamily: RoleFamily;
  completionDate: string;
  overallSummary: string;
  strengthTags: string[];
  tensionTags: string[];
  tasks: SignalTask[];
  evidenceSnippets: EvidenceSnippet[];
}

export interface EvidenceSnippet {
  id: string;
  taskId: string;
  dimension: string;
  quote: string;
  context: string;
}

export interface Employer {
  id: string;
  name: string;
  company: string;
  role: string;
  dashboardRoles: string[];
}

export type Pace = 'slow' | 'moderate' | 'fast';
export type Ambiguity = 'low' | 'medium' | 'high';
export type CollaborationIntensity = 'low' | 'medium' | 'high';
export type AutonomyExpected = 'low' | 'medium' | 'high';
export type ProcessMaturity = 'immature' | 'evolving' | 'mature';

export interface RoleFitPack {
  id: string;
  employerId: string;
  roleTitle: string;
  companyName: string;
  roleFamily: RoleFamily;
  seniority: string;
  successStatement: string;
  environmentDescription: string;
  frustrationFactors: string;
  topTradeoffs: string[];
  decisionStyle: string;
  valuesAndTeamStyle: string[];
  pace: Pace;
  ambiguity: Ambiguity;
  collaborationIntensity: CollaborationIntensity;
  autonomyExpected: AutonomyExpected;
  processMaturity: ProcessMaturity;
  fitDimensions: FitDimension[];
}

export interface FitDimension {
  id: string;
  name: string;
  description: string;
  roleScore: number;
}

export interface FitAnalysis {
  id: string;
  signalProfileId: string;
  roleFitPackId: string;
  overallFitSummary: string;
  fitStatus: FitStatus;
  alignmentScore: number;
  strengths: FitPoint[];
  tensions: FitPoint[];
  evidenceLinks: EvidenceLink[];
  interviewPrompts: string[];
}

export interface FitPoint {
  dimension: string;
  headline: string;
  detail: string;
  evidenceSnippet?: string;
}

export interface EvidenceLink {
  taskId: string;
  dimension: string;
  snippet: string;
  relevance: string;
}
