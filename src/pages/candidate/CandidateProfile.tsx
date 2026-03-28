import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Quote } from 'lucide-react';
import { CANDIDATES, SIGNAL_PROFILES } from '../../data/candidates';
import { ROLE_FIT_PACKS } from '../../data/roles';
import { FIT_ANALYSES } from '../../data/fitAnalysis';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { PageLayout, PageHeader } from '../../components/layout/PageLayout';
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

export function CandidateProfile() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'tasks' | 'evidence'>('tasks');

  const candidateId = id || 'c1';
  const candidate = CANDIDATES.find((c) => c.id === candidateId) || CANDIDATES[0];
  const profile = SIGNAL_PROFILES.find((sp) => sp.id === candidate.signalProfileId);
  const analyses = FIT_ANALYSES.filter((fa) => fa.signalProfileId === candidate.signalProfileId);
  const avatarColor = AVATAR_COLORS[candidateId as keyof typeof AVATAR_COLORS] || 'indigo';

  if (!profile) return <div className="p-8 text-gray-500">Profile not found.</div>;

  return (
    <PageLayout>
      <div className="mb-6">
        <Link to="/candidate/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft size={14} />
          Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-4">
          <Card padding="md">
            <div className="flex items-start gap-4 mb-4">
              <Avatar initials={candidate.avatarInitials} color={avatarColor} size="xl" />
              <div>
                <p className="font-semibold text-gray-900 text-lg">{candidate.firstName} {candidate.lastName}</p>
                <p className="text-sm text-gray-500">{candidate.headline}</p>
                <p className="text-xs text-gray-400 mt-0.5">{candidate.yearsExperience} years experience</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{candidate.summary}</p>
          </Card>

          <Card padding="md">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Work style</p>
            <div className="flex flex-wrap gap-1.5">
              {candidate.workStyleTags.map((tag) => (
                <Badge key={tag} variant="neutral">{tag}</Badge>
              ))}
            </div>
          </Card>

          {candidate.importedProfile?.roles && candidate.importedProfile.roles.length > 0 && (
            <Card padding="md">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Work history</p>
              <div className="space-y-3">
                {candidate.importedProfile.roles
                  .slice()
                  .sort((a, b) => (b.startDate > a.startDate ? 1 : -1))
                  .slice(0, 3)
                  .map((role) => {
                    const fmt = (d: string | null) => {
                      if (!d) return 'Present';
                      const [year, month] = d.split('-');
                      return `${new Date(Number(year), Number(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`;
                    };
                    return (
                      <div key={role.id} className="border-l-2 border-indigo-100 pl-3">
                        <p className="text-sm font-medium text-gray-800">{role.title}</p>
                        <p className="text-xs text-gray-500">{role.company}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{fmt(role.startDate)} — {fmt(role.endDate)}</p>
                      </div>
                    );
                  })}
              </div>
            </Card>
          )}

          <Card padding="md">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Strengths</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {profile.strengthTags.map((tag) => (
                <Badge key={tag} variant="success">{tag}</Badge>
              ))}
            </div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-4">Tensions to explore</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.tensionTags.map((tag) => (
                <Badge key={tag} variant="tension">{tag}</Badge>
              ))}
            </div>
          </Card>

          {analyses.length > 0 && (
            <Card padding="md">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Role fit analyses</p>
              <div className="space-y-2">
                {analyses.map((fa) => {
                  const role = ROLE_FIT_PACKS.find((r) => r.id === fa.roleFitPackId);
                  return (
                    <Link
                      key={fa.id}
                      to={`/analysis/${candidateId}/${fa.roleFitPackId}`}
                      className="block p-2.5 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors"
                    >
                      <p className="text-xs font-medium text-gray-700">{role?.roleTitle}</p>
                      <p className="text-xs text-gray-400">{role?.companyName}</p>
                    </Link>
                  );
                })}
              </div>
            </Card>
          )}
        </div>

        {/* Main */}
        <div className="col-span-2 space-y-6">
          <div>
            <PageHeader
              eyebrow={`Signal profile · ${profile.roleFamily.replace('-', ' ')}`}
              title={`${candidate.firstName}'s signal profile`}
            />
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-6">
              <p className="text-sm text-gray-700 leading-relaxed">{profile.overallSummary}</p>
            </div>
          </div>

          <div className="border-b border-gray-200 flex gap-6">
            {(['tasks', 'evidence'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab === 'tasks' ? 'Signal tasks' : 'Evidence snippets'}
              </button>
            ))}
          </div>

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              {profile.tasks.map((task, index) => (
                <Card key={task.id} padding="md">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                        {TASK_TYPE_LABELS[task.type]}
                      </p>
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-3">Task {index + 1}</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">{task.instructions}</p>

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
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-4">
              {profile.evidenceSnippets.map((snippet) => (
                <Card key={snippet.id} padding="md">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Quote size={14} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">"{snippet.quote}"</p>
                      <p className="text-xs text-gray-500 mb-2">{snippet.context}</p>
                      <Badge variant="default" size="sm">{snippet.dimension.replace('-', ' ')}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
