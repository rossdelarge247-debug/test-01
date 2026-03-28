import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Quote, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { CANDIDATES, SIGNAL_PROFILES } from '../../data/candidates';
import { ROLE_FIT_PACKS } from '../../data/roles';
import { FIT_ANALYSES } from '../../data/fitAnalysis';
import { useCandidateSession } from '../../context/CandidateSessionContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { PageLayout } from '../../components/layout/PageLayout';
import type { RankingItem } from '../../types';

const AVATAR_COLORS = { c1: 'indigo', c2: 'violet', c3: 'emerald' } as const;
const TASK_TYPE_LABELS: Record<string, string> = {
  ranking: 'Prioritisation',
  tradeoff: 'Trade-off choice',
  scenario: 'Scenario response',
  critique: 'Critique',
  sketch: 'Sketch task',
};
const TRADEOFF_LABELS: Record<string, string> = {
  a: 'Speed over polish',
  b: 'Alignment over autonomy',
  c: 'Exploration over standardisation',
  d: 'Depth over breadth',
};

function formatDate(d: string | null) {
  if (!d) return 'Present';
  const [year, month] = d.split('-');
  return `${new Date(Number(year), Number(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`;
}

// ── Collapsible section ───────────────────────────────────────────────────────

function CollapsibleSection({
  label,
  summary,
  children,
  defaultOpen = false,
}: {
  label: string;
  summary: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card padding="none">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left group"
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{label}</p>
          {!open && <div className="truncate">{summary}</div>}
        </div>
        <span className="flex-shrink-0 mt-0.5 text-gray-300 group-hover:text-gray-500 transition-colors">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </Card>
  );
}

// ── Inline tag list with overflow ─────────────────────────────────────────────

function TagSummary({ tags, variant = 'neutral', limit = 4 }: {
  tags: string[];
  variant?: 'neutral' | 'success' | 'tension';
  limit?: number;
}) {
  const visible = tags.slice(0, limit);
  const overflow = tags.length - limit;
  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {visible.map((t) => <Badge key={t} variant={variant} size="sm">{t}</Badge>)}
      {overflow > 0 && <span className="text-xs text-gray-400">+{overflow} more</span>}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function CandidateProfile() {
  const { id } = useParams<{ id: string }>();
  const { roleAnswers } = useCandidateSession();

  const candidateId = id || 'c1';
  const ownProfile = !id;
  const candidate = CANDIDATES.find((c) => c.id === candidateId) || CANDIDATES[0];
  const profile = SIGNAL_PROFILES.find((sp) => sp.id === candidate.signalProfileId);
  const analyses = FIT_ANALYSES.filter((fa) => fa.signalProfileId === candidate.signalProfileId);
  const avatarColor = AVATAR_COLORS[candidateId as keyof typeof AVATAR_COLORS] || 'indigo';

  const recentRoles = (candidate.importedProfile?.roles ?? [])
    .slice()
    .sort((a, b) => (b.startDate > a.startDate ? 1 : -1))
    .slice(0, 3);

  if (!profile) return <div className="p-8 text-gray-500">Profile not found.</div>;

  // Collapsed summaries
  const signalSummaryText = profile.overallSummary.split('.')[0] + '.';

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/candidate/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft size={14} />
            Dashboard
          </Link>
        </div>

        {/* ── Identity header ── */}
        <Card padding="md" className="mb-4">
          <div className="flex items-center gap-4">
            <Avatar initials={candidate.avatarInitials} color={avatarColor} size="xl" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-xl leading-tight">
                {candidate.firstName} {candidate.lastName}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">{candidate.headline}</p>
              <p className="text-xs text-gray-400 mt-0.5">{candidate.yearsExperience} years experience</p>
            </div>
          </div>
          {candidate.summary && (
            <p className="text-sm text-gray-600 leading-relaxed mt-4 pt-4 border-t border-gray-100">
              {candidate.summary}
            </p>
          )}
        </Card>

        {/* ── Collapsible sections ── */}
        <div className="space-y-2">

          {/* Signal overview */}
          <CollapsibleSection
            label={`Signal profile · ${profile.roleFamily.replace('-', ' ')}`}
            defaultOpen
            summary={
              <p className="text-sm text-gray-600 truncate">{signalSummaryText}</p>
            }
          >
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <p className="text-sm text-gray-700 leading-relaxed">{profile.overallSummary}</p>
            </div>
          </CollapsibleSection>

          {/* Work style & strengths */}
          <CollapsibleSection
            label="Work style & strengths"
            summary={<TagSummary tags={[...candidate.workStyleTags, ...profile.strengthTags]} limit={5} />}
          >
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-400 mb-2">Work style</p>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.workStyleTags.map((t) => <Badge key={t} variant="neutral">{t}</Badge>)}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 mb-2">Strengths</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.strengthTags.map((t) => <Badge key={t} variant="success">{t}</Badge>)}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 mb-2">Tensions to explore</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.tensionTags.map((t) => <Badge key={t} variant="tension">{t}</Badge>)}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Work history */}
          {recentRoles.length > 0 && (
            <CollapsibleSection
              label="Work history"
              defaultOpen
              summary={
                <p className="text-sm text-gray-500 truncate">
                  {recentRoles.map((r) => r.title).join(' · ')}
                </p>
              }
            >
              <div className="space-y-4">
                {recentRoles.map((role) => {
                  const answered = roleAnswers[role.id]?.trim().length > 0;
                  return (
                    <div key={role.id} className="border-l-2 border-gray-100 pl-4">
                      <p className="font-semibold text-gray-900 text-sm">{role.title}</p>
                      <p className="text-sm text-gray-500">{role.company}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatDate(role.startDate)} — {formatDate(role.endDate)}
                      </p>
                      {role.description && (
                        <p className="text-xs text-gray-500 leading-relaxed mt-1.5">{role.description}</p>
                      )}
                      {answered ? (
                        <div className="mt-3 flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700 leading-relaxed">{roleAnswers[role.id]}</p>
                        </div>
                      ) : ownProfile ? (
                        <div className="mt-3">
                          <Link
                            to="/candidate/role-questions"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                          >
                            Add context to this role
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </CollapsibleSection>
          )}

          {/* Signal tasks */}
          <CollapsibleSection
            label="Signal tasks"
            defaultOpen
            summary={
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{profile.tasks.length} tasks</span>
                <div className="flex flex-wrap gap-1 flex-1 min-w-0 overflow-hidden">
                  {[...new Set(profile.tasks.map((t) => TASK_TYPE_LABELS[t.type]))].map((label) => (
                    <Badge key={label} variant="neutral" size="sm">{label}</Badge>
                  ))}
                </div>
              </div>
            }
          >
            <div className="space-y-4">
              {profile.tasks.map((task, index) => (
                <div key={task.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                        {TASK_TYPE_LABELS[task.type]}
                      </p>
                      <h3 className="font-semibold text-gray-900 text-sm">{task.title}</h3>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-3">#{index + 1}</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-3">{task.instructions}</p>

                  {task.type === 'ranking' && Array.isArray(task.candidateResponse) && task.rankingItems && (
                    <div className="space-y-1.5">
                      {task.candidateResponse.map((itemId, i) => {
                        const item = task.rankingItems!.find((ri: RankingItem) => ri.id === itemId);
                        return item ? (
                          <div key={itemId} className="flex items-center gap-2.5 text-sm">
                            <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold flex items-center justify-center flex-shrink-0">
                              {i + 1}
                            </span>
                            <span className="text-gray-700">{item.label}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}

                  {task.type === 'tradeoff' && typeof task.candidateResponse === 'string' && (
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-indigo-800">
                        {TRADEOFF_LABELS[task.candidateResponse] || task.candidateResponse}
                      </p>
                    </div>
                  )}

                  {(task.type === 'scenario' || task.type === 'critique') &&
                    typeof task.candidateResponse === 'string' && (
                      <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">{task.candidateResponse}</p>
                      </div>
                    )}

                  {task.type === 'sketch' && (
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500">Process sketch submitted</p>
                    </div>
                  )}

                  {task.extractedTags && task.extractedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
                      {task.extractedTags.map((tag) => (
                        <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Evidence snippets */}
          <CollapsibleSection
            label="Evidence snippets"
            summary={
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{profile.evidenceSnippets.length} snippets</span>
                <div className="flex flex-wrap gap-1 overflow-hidden">
                  {[...new Set(profile.evidenceSnippets.map((s) => s.dimension))].slice(0, 4).map((dim) => (
                    <Badge key={dim} variant="default" size="sm">{dim.replace('-', ' ')}</Badge>
                  ))}
                </div>
              </div>
            }
          >
            <div className="space-y-4">
              {profile.evidenceSnippets.map((snippet) => (
                <div key={snippet.id} className="flex items-start gap-3 border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Quote size={13} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">"{snippet.quote}"</p>
                    <p className="text-xs text-gray-500 mb-2">{snippet.context}</p>
                    <Badge variant="default" size="sm">{snippet.dimension.replace('-', ' ')}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Role fit analyses */}
          {analyses.length > 0 && (
            <CollapsibleSection
              label="Role fit analyses"
              summary={
                <p className="text-sm text-gray-500 truncate">
                  {analyses.map((fa) => {
                    const r = ROLE_FIT_PACKS.find((r) => r.id === fa.roleFitPackId);
                    return r?.roleTitle;
                  }).filter(Boolean).join(' · ')}
                </p>
              }
            >
              <div className="space-y-2">
                {analyses.map((fa) => {
                  const role = ROLE_FIT_PACKS.find((r) => r.id === fa.roleFitPackId);
                  return (
                    <Link
                      key={fa.id}
                      to={`/analysis/${candidateId}/${fa.roleFitPackId}`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors group"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">{role?.roleTitle}</p>
                        <p className="text-xs text-gray-400">{role?.companyName}</p>
                      </div>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </CollapsibleSection>
          )}

        </div>
      </div>
    </PageLayout>
  );
}
