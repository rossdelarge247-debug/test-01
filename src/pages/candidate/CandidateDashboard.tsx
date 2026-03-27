import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Zap, Clock } from 'lucide-react';
import { CANDIDATES, SIGNAL_PROFILES } from '../../data/candidates';
import { ROLE_FIT_PACKS } from '../../data/roles';
import { FIT_ANALYSES } from '../../data/fitAnalysis';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { PageLayout, PageHeader } from '../../components/layout/PageLayout';

const AVATAR_COLORS = ['indigo', 'violet', 'emerald', 'amber'] as const;

const FIT_STATUS_CONFIG = {
  'strong-alignment': { label: 'Strong alignment', variant: 'success' as const },
  'promising-fit': { label: 'Promising fit', variant: 'default' as const },
  'mixed-fit': { label: 'Mixed fit', variant: 'warning' as const },
  'low-alignment': { label: 'Low alignment', variant: 'tension' as const },
};

// Candidates with a signal profile
const completedCandidates = CANDIDATES.filter((c) => c.signalProfileId);
// Candidates with only profile basics (LinkedIn import, no signal tasks yet)
const basicsCandidates = CANDIDATES.filter((c) => !c.signalProfileId && c.profileBasicsCompleted);

export function CandidateDashboard() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Candidate"
        title="Your profiles"
        subtitle="Profile basics and signal profiles — two different things."
        actions={
          <Link
            to="/candidate/signup"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus size={15} />
            New profile
          </Link>
        }
      />

      {/* Profile basics section — imported but signal pending */}
      {basicsCandidates.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Profile basics</p>
            <span className="text-xs text-gray-400">·</span>
            <p className="text-xs text-gray-400">Imported — signal profile still to build</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {basicsCandidates.map((candidate) => (
              <Card key={candidate.id} padding="md" className="border-dashed border-amber-200 bg-amber-50/30">
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative">
                    <Avatar initials={candidate.avatarInitials} color="amber" size="lg" />
                    {candidate.linkedinConnected && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0A66C2] rounded-full flex items-center justify-center border-2 border-white">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="white">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {candidate.firstName} {candidate.lastName}
                    </p>
                    <p className="text-sm text-gray-500 truncate line-clamp-2">{candidate.headline}</p>
                  </div>
                </div>

                {/* Imported role history preview */}
                {candidate.importedProfile && candidate.importedProfile.roles.length > 0 && (
                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent roles</p>
                    {candidate.importedProfile.roles.slice(0, 2).map((role) => (
                      <div key={role.id} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                        <span className="font-medium truncate">{role.title}</span>
                        <span className="text-gray-400 truncate">· {role.company}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Signal pending callout */}
                <div className="border-t border-amber-100 pt-3 mt-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={12} className="text-amber-500" />
                    <p className="text-xs font-medium text-amber-700">Signal profile not started</p>
                  </div>
                  <Link
                    to="/candidate/onboarding"
                    className="block text-center text-xs font-medium text-indigo-600 hover:text-indigo-800 py-2 rounded-lg hover:bg-indigo-50 border border-indigo-100 bg-white transition-colors"
                  >
                    Build signal profile →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Signal profiles section */}
      <div className="mb-10">
        {basicsCandidates.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Signal profiles</p>
            <span className="text-xs text-gray-400">·</span>
            <p className="text-xs text-gray-400">Built evidence — reusable across roles</p>
          </div>
        )}
        <div className="grid grid-cols-3 gap-6">
          {completedCandidates.map((candidate, i) => {
            const profile = SIGNAL_PROFILES.find((sp) => sp.id === candidate.signalProfileId);
            const analyses = FIT_ANALYSES.filter((fa) => fa.signalProfileId === candidate.signalProfileId);

            return (
              <Card key={candidate.id} padding="md">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar initials={candidate.avatarInitials} color={AVATAR_COLORS[i % 3]} size="lg" />
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
      </div>

      {/* CTA */}
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
