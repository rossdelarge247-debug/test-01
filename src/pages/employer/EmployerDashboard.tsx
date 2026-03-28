import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Users, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ROLE_FIT_PACKS, EMPLOYERS } from '../../data/roles';
import { CANDIDATES, SIGNAL_PROFILES } from '../../data/candidates';
import { FIT_ANALYSES } from '../../data/fitAnalysis';
import { BLANK_SIGNAL_TASKS } from '../../data/tasks';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { PageLayout, PageHeader } from '../../components/layout/PageLayout';

type VoteDir = 'up' | 'down';
interface TaskVote { up: number; down: number; myVote: VoteDir | null; }

const SEED_VOTES: Record<string, TaskVote> = {
  'task-1': { up: 28, down: 4,  myVote: null },
  'task-2': { up: 45, down: 2,  myVote: null },
  'task-3': { up: 31, down: 8,  myVote: null },
  'task-4': { up: 22, down: 12, myVote: null },
  'task-5': { up: 19, down: 5,  myVote: null },
};

const TYPE_LABELS: Record<string, string> = {
  ranking: 'Ranking', tradeoff: 'Trade-off', scenario: 'Scenario',
  critique: 'Critique', sketch: 'Sketch',
};

const FIT_STATUS_CONFIG = {
  'strong-alignment': { label: 'Strong alignment', variant: 'success' as const },
  'promising-fit': { label: 'Promising fit', variant: 'default' as const },
  'mixed-fit': { label: 'Mixed fit', variant: 'warning' as const },
  'low-alignment': { label: 'Low alignment', variant: 'tension' as const },
};

const PACE_LABELS = { slow: 'Slow pace', moderate: 'Moderate pace', fast: 'Fast pace' };
const AMBIGUITY_LABELS = { low: 'Low ambiguity', medium: 'Medium ambiguity', high: 'High ambiguity' };

export function EmployerDashboard() {
  const [votes, setVotes] = useState<Record<string, TaskVote>>(SEED_VOTES);

  function handleVote(taskId: string, dir: VoteDir) {
    setVotes((prev) => {
      const v = prev[taskId];
      if (!v) return prev;
      let { up, down } = v;
      if (v.myVote === 'up') up--;
      if (v.myVote === 'down') down--;
      const newVote: VoteDir | null = v.myVote === dir ? null : dir;
      if (newVote === 'up') up++;
      if (newVote === 'down') down++;
      return { ...prev, [taskId]: { up, down, myVote: newVote } };
    });
  }

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Employer"
        title="Role fit packs"
        subtitle="Manage your role fit packs and explore candidate matches."
        actions={
          <Link
            to="/employer/create-fit-pack"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus size={15} />
            New fit pack
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {ROLE_FIT_PACKS.map((role) => {
          const employer = EMPLOYERS.find((e) => e.id === role.employerId);
          const analyses = FIT_ANALYSES.filter((fa) => fa.roleFitPackId === role.id);
          const strongMatches = analyses.filter((fa) => fa.fitStatus === 'strong-alignment').length;

          return (
            <Card key={role.id} padding="md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-gray-900">{role.roleTitle}</p>
                  <p className="text-sm text-gray-500">{role.companyName} · {role.seniority}</p>
                </div>
                <Badge variant="neutral" size="sm">{role.roleFamily.replace('-', ' ')}</Badge>
              </div>

              <div className="flex gap-2 flex-wrap mb-4">
                <Badge variant="neutral" size="sm">{PACE_LABELS[role.pace]}</Badge>
                <Badge variant="neutral" size="sm">{AMBIGUITY_LABELS[role.ambiguity]}</Badge>
                <Badge variant={role.processMaturity === 'mature' ? 'success' : 'warning'} size="sm">
                  {role.processMaturity} processes
                </Badge>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">
                {role.successStatement}
              </p>

              <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Users size={13} />
                  {analyses.length} signal profiles reviewed
                  {strongMatches > 0 && (
                    <Badge variant="success" size="sm">{strongMatches} strong fit</Badge>
                  )}
                </div>
                <Link
                  to={`/employer/fit-pack/${role.id}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800"
                >
                  View pack
                  <ArrowRight size={12} />
                </Link>
              </div>

              {employer && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                  <Avatar initials={employer.name.split(' ').map(n => n[0]).join('')} size="sm" color="violet" />
                  <span className="text-xs text-gray-500">{employer.name} · {employer.role}</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Candidate overview */}
      <div>
        <PageHeader
          title="Signal profiles in pool"
          subtitle="Candidates who have completed signal profiles relevant to your roles."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CANDIDATES.map((c, i) => {
            const profile = SIGNAL_PROFILES.find((sp) => sp.id === c.signalProfileId);
            const relevantAnalyses = FIT_ANALYSES.filter((fa) => fa.signalProfileId === c.signalProfileId);

            return (
              <Card key={c.id} padding="sm" hover>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar
                    initials={c.avatarInitials}
                    color={(['indigo', 'violet', 'emerald'] as const)[i]}
                    size="md"
                  />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{c.firstName} {c.lastName}</p>
                    <p className="text-xs text-gray-500 truncate">{c.headline}</p>
                  </div>
                </div>
                {profile && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {profile.strengthTags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="success" size="sm">{tag}</Badge>
                    ))}
                  </div>
                )}
                <div className="space-y-1">
                  {relevantAnalyses.map((fa) => {
                    const role = ROLE_FIT_PACKS.find((r) => r.id === fa.roleFitPackId);
                    const config = FIT_STATUS_CONFIG[fa.fitStatus];
                    return (
                      <Link
                        key={fa.id}
                        to={`/analysis/${c.id}/${fa.roleFitPackId}`}
                        className="flex items-center justify-between text-xs hover:bg-gray-50 rounded px-1 py-0.5 transition-colors"
                      >
                        <span className="text-gray-600 truncate">{role?.roleTitle}</span>
                        <Badge variant={config.variant} size="sm">{config.label}</Badge>
                      </Link>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      {/* Task signal quality */}
      <div className="mt-12">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Task quality</p>
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            How useful were these tasks?
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Your votes help surface the highest-signal tasks for future candidates. Be honest — a task that felt unhelpful is useful feedback too.
          </p>
        </div>

        <div className="space-y-3">
          {BLANK_SIGNAL_TASKS.map((task) => {
            const v = votes[task.id];
            if (!v) return null;
            const total = v.up + v.down;
            const pct = total > 0 ? Math.round((v.up / total) * 100) : 0;
            const isTopTask = v.up === Math.max(...BLANK_SIGNAL_TASKS.map((t) => votes[t.id]?.up ?? 0));

            return (
              <Card key={task.id} padding="md">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {TYPE_LABELS[task.type]}
                      </span>
                      {isTopTask && (
                        <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                          Top signal task
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-gray-900 mb-2">{task.title}</p>

                    {/* Usefulness bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-14 text-right flex-shrink-0">
                        {total > 0 ? `${pct}% useful` : 'No votes yet'}
                      </span>
                    </div>
                  </div>

                  {/* Vote buttons */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleVote(task.id, 'up')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                        v.myVote === 'up'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-200 hover:text-emerald-600'
                      }`}
                    >
                      <ThumbsUp size={13} />
                      {v.up}
                    </button>
                    <button
                      onClick={() => handleVote(task.id, 'down')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                        v.myVote === 'down'
                          ? 'bg-rose-50 border-rose-200 text-rose-700'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-rose-200 hover:text-rose-600'
                      }`}
                    >
                      <ThumbsDown size={13} />
                      {v.down}
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
