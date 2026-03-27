import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Zap } from 'lucide-react';
import { CANDIDATES, SIGNAL_PROFILES } from '../../data/candidates';
import { ROLE_FIT_PACKS } from '../../data/roles';
import { FIT_ANALYSES } from '../../data/fitAnalysis';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { PageLayout, PageHeader } from '../../components/layout/PageLayout';

const AVATAR_COLORS = ['indigo', 'violet', 'emerald'] as const;

const FIT_STATUS_CONFIG = {
  'strong-alignment': { label: 'Strong alignment', variant: 'success' as const },
  'promising-fit': { label: 'Promising fit', variant: 'default' as const },
  'mixed-fit': { label: 'Mixed fit', variant: 'warning' as const },
  'low-alignment': { label: 'Low alignment', variant: 'tension' as const },
};

export function CandidateDashboard() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Candidate"
        title="Signal profiles"
        subtitle="Your reusable signal profiles and role fit results."
        actions={
          <Link
            to="/candidate/onboarding"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus size={15} />
            New signal pack
          </Link>
        }
      />

      <div className="grid grid-cols-3 gap-6 mb-10">
        {CANDIDATES.map((candidate, i) => {
          const profile = SIGNAL_PROFILES.find((sp) => sp.id === candidate.signalProfileId);
          const analyses = FIT_ANALYSES.filter((fa) => fa.signalProfileId === candidate.signalProfileId);

          return (
            <Card key={candidate.id} padding="md">
              <div className="flex items-start gap-3 mb-4">
                <Avatar initials={candidate.avatarInitials} color={AVATAR_COLORS[i % AVATAR_COLORS.length]} size="lg" />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {candidate.firstName} {candidate.lastName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{candidate.headline}</p>
                  <Badge variant="neutral" className="mt-1.5">
                    {candidate.roleFamily.replace('-', ' ')}
                  </Badge>
                </div>
              </div>

              {profile && (
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {profile.strengthTags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="success" size="sm">{tag}</Badge>
                    ))}
                  </div>
                  {profile.tensionTags.slice(0, 1).map((tag) => (
                    <Badge key={tag} variant="tension" size="sm">{tag}</Badge>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-100 pt-3 mt-3">
                <p className="text-xs font-medium text-gray-500 mb-2">Role fit results</p>
                {analyses.length > 0 ? (
                  <div className="space-y-2">
                    {analyses.map((fa) => {
                      const role = ROLE_FIT_PACKS.find((r) => r.id === fa.roleFitPackId);
                      const config = FIT_STATUS_CONFIG[fa.fitStatus];
                      return (
                        <Link
                          key={fa.id}
                          to={`/analysis/${candidate.id}/${fa.roleFitPackId}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-700 truncate">{role?.roleTitle}</p>
                            <p className="text-xs text-gray-400 truncate">{role?.companyName}</p>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <Badge variant={config.variant} size="sm">{config.label}</Badge>
                            <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-500" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">No fit analyses yet</p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-3 mt-3 flex gap-2">
                <Link
                  to={`/candidate/profile/${candidate.id}`}
                  className="flex-1 text-center text-xs font-medium text-indigo-600 hover:text-indigo-800 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  View profile
                </Link>
                <Link
                  to={`/candidate/fit/${candidate.id}`}
                  className="flex-1 text-center text-xs font-medium text-gray-600 hover:text-gray-800 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Explore fit
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex items-center gap-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Zap size={18} className="text-indigo-600" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-indigo-900 mb-1">Add a new signal profile</p>
          <p className="text-sm text-indigo-700 opacity-80">
            Complete a new signal pack for a different role family. Responses are short and take under 25 minutes.
          </p>
        </div>
        <Link
          to="/candidate/onboarding"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors flex-shrink-0"
        >
          Start
          <ArrowRight size={14} />
        </Link>
      </div>
    </PageLayout>
  );
}
