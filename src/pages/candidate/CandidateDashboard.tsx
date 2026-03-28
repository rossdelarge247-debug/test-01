import { Link } from 'react-router-dom';
import { ArrowRight, Users, Trophy, Zap, TrendingUp } from 'lucide-react';
import { CANDIDATES, SIGNAL_PROFILES } from '../../data/candidates';
import { ROLE_FIT_PACKS } from '../../data/roles';
import { FIT_ANALYSES } from '../../data/fitAnalysis';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { PageLayout, PageHeader } from '../../components/layout/PageLayout';
import { ProfileAvatar, getAvatarStage } from '../../components/avatar/ProfileAvatar';

// The prototype's "logged-in" candidate
const ME_ID = 'c1';

const ANON_LABELS = ['A', 'B', 'C', 'D', 'E'];

const FIT_STATUS_CONFIG = {
  'strong-alignment': { label: 'Strong alignment', variant: 'success' as const, color: 'text-emerald-600' },
  'promising-fit':    { label: 'Promising fit',    variant: 'default' as const,  color: 'text-blue-600'   },
  'mixed-fit':        { label: 'Mixed fit',         variant: 'warning' as const,  color: 'text-amber-600'  },
  'low-alignment':    { label: 'Low alignment',     variant: 'tension' as const,  color: 'text-red-500'    },
};

export function CandidateDashboard() {
  const me = CANDIDATES.find((c) => c.id === ME_ID)!;
  const myProfile = SIGNAL_PROFILES.find((sp) => sp.id === me.signalProfileId);
  const myAnalyses = FIT_ANALYSES.filter((fa) => fa.signalProfileId === me.signalProfileId);

  const strongCount = myAnalyses.filter((fa) => fa.fitStatus === 'strong-alignment').length;
  const totalTasks = 5;
  const tasksCompleted = myProfile ? totalTasks : 0;
  const avatarStage = getAvatarStage(tasksCompleted, totalTasks, myAnalyses.length > 0);

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Candidate"
        title={`Welcome back, ${me.firstName}`}
        subtitle="Your signal profile and how you compare to the field."
        actions={
          <Link
            to="/candidate/signup"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Zap size={15} />
            Add signal profile
          </Link>
        }
      />

      {/* Profile summary + stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="col-span-2">
          <Card padding="md">
            <div className="flex items-start gap-4 mb-5">
              <ProfileAvatar stage={avatarStage} size={64} showLabel />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">
                  {me.firstName} {me.lastName}
                </p>
                <p className="text-sm text-gray-500 mb-2">{me.headline}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="neutral">{me.roleFamily.replace('-', ' ')}</Badge>
                  <span className="text-xs text-gray-400">{me.yearsExperience} years experience</span>
                </div>
              </div>
              <Link
                to={`/candidate/profile/${me.id}`}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 flex-shrink-0"
              >
                View full profile <ArrowRight size={12} />
              </Link>
            </div>

            {myProfile && (
              <>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {myProfile.strengthTags.map((tag) => (
                    <Badge key={tag} variant="success" size="sm">{tag}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {myProfile.tensionTags.map((tag) => (
                    <Badge key={tag} variant="tension" size="sm">{tag}</Badge>
                  ))}
                </div>
              </>
            )}
          </Card>
        </div>

        <div className="space-y-3">
          <Card padding="md" className="text-center">
            <p className="text-4xl font-bold text-indigo-600 mb-1">{myAnalyses.length}</p>
            <p className="text-xs text-gray-500">
              role{myAnalyses.length !== 1 ? 's' : ''} assessed
            </p>
          </Card>
          <Card padding="md" className="text-center">
            <p className="text-4xl font-bold text-emerald-600 mb-1">{strongCount}</p>
            <p className="text-xs text-gray-500">
              strong alignment{strongCount !== 1 ? 's' : ''}
            </p>
          </Card>
        </div>
      </div>

      {/* Per-role: fit result + field comparison */}
      {myAnalyses.map((analysis) => {
        const role = ROLE_FIT_PACKS.find((r) => r.id === analysis.roleFitPackId);
        const statusConfig = FIT_STATUS_CONFIG[analysis.fitStatus];

        // All candidates assessed for this role, ranked by score
        const allForRole = [...FIT_ANALYSES]
          .filter((fa) => fa.roleFitPackId === analysis.roleFitPackId)
          .sort((a, b) => b.alignmentScore - a.alignmentScore);

        const myRank = allForRole.findIndex((fa) => fa.signalProfileId === me.signalProfileId) + 1;

        let anonIndex = 0;
        const field = allForRole.map((fa) => {
          const isMe = fa.signalProfileId === me.signalProfileId;
          const profile = SIGNAL_PROFILES.find((sp) => sp.id === fa.signalProfileId);
          const label = isMe ? 'You' : `Candidate ${ANON_LABELS[anonIndex++]}`;
          return { fa, isMe, profile, label };
        });

        return (
          <div key={analysis.id} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {role?.companyName}
              </p>
              <span className="text-xs text-gray-300">·</span>
              <p className="text-xs text-gray-700 font-medium">{role?.roleTitle}</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Your result */}
              <Card padding="md" className="border-indigo-100 bg-indigo-50/30 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your fit</p>
                  <Badge variant={statusConfig.variant} size="sm">{statusConfig.label}</Badge>
                </div>
                <div className="flex items-end gap-2 mb-1">
                  <p className={`text-5xl font-bold ${statusConfig.color}`}>{analysis.alignmentScore}</p>
                  <p className="text-sm text-gray-400 mb-2">%</p>
                </div>
                <p className="text-xs text-gray-400 mb-5">alignment score</p>
                <div className="mt-auto">
                  <Link
                    to={`/analysis/${me.id}/${analysis.roleFitPackId}`}
                    className="block text-center text-xs font-medium text-indigo-600 hover:text-indigo-800 py-2 rounded-lg hover:bg-indigo-100 border border-indigo-100 bg-white transition-colors"
                  >
                    View full analysis →
                  </Link>
                </div>
              </Card>

              {/* The field */}
              <div className="col-span-2">
                <Card padding="md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-gray-400" />
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        The field
                      </p>
                      <span className="text-xs text-gray-400">
                        · {allForRole.length} candidate{allForRole.length !== 1 ? 's' : ''} assessed
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy size={12} className="text-amber-500" />
                      <p className="text-xs text-gray-500">
                        Ranked{' '}
                        <span className="font-semibold text-gray-800">
                          #{myRank} of {allForRole.length}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {field.map(({ fa, isMe, profile, label }, i) => {
                      const config = FIT_STATUS_CONFIG[fa.fitStatus];
                      const topStrengths = profile?.strengthTags.slice(0, 2) ?? [];

                      return (
                        <div
                          key={fa.id}
                          className={`flex items-center gap-3 p-3 rounded-xl ${
                            isMe
                              ? 'bg-indigo-50 border border-indigo-100'
                              : 'bg-gray-50'
                          }`}
                        >
                          <span className="text-xs font-bold text-gray-300 w-4 text-center flex-shrink-0">
                            {i + 1}
                          </span>

                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              isMe ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            {isMe ? 'Y' : label.slice(-1)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold mb-1 ${isMe ? 'text-indigo-700' : 'text-gray-600'}`}>
                              {label}
                            </p>
                            <div className="flex gap-1 flex-wrap">
                              {topStrengths.map((tag) => (
                                <span
                                  key={tag}
                                  className={`text-xs px-1.5 py-0.5 rounded ${
                                    isMe
                                      ? 'bg-indigo-100 text-indigo-600'
                                      : 'bg-gray-200 text-gray-500'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <p className={`text-sm font-bold ${config.color}`}>
                              {fa.alignmentScore}%
                            </p>
                            <Badge variant={config.variant} size="sm">{config.label}</Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-2">
                    <TrendingUp size={12} className="text-gray-300 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-400">
                      Names and identifying details are anonymised. Role families and top strengths are visible to provide context.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );
      })}

      {/* Add profile CTA */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex items-center gap-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Zap size={18} className="text-indigo-600" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-indigo-900 mb-1">Add a new signal profile</p>
          <p className="text-sm text-indigo-700 opacity-80">
            Complete a signal pack for a different role family. Responses are short and take under 25 minutes.
          </p>
        </div>
        <Link
          to="/candidate/signup"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors flex-shrink-0"
        >
          Start
          <ArrowRight size={14} />
        </Link>
      </div>
    </PageLayout>
  );
}
