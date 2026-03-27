import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CANDIDATES } from '../../data/candidates';
import { ROLE_FIT_PACKS } from '../../data/roles';
import { FIT_ANALYSES } from '../../data/fitAnalysis';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { PageLayout } from '../../components/layout/PageLayout';

const AVATAR_COLORS = { c1: 'indigo', c2: 'violet', c3: 'emerald' } as const;
const FIT_STATUS_CONFIG = {
  'strong-alignment': { label: 'Strong alignment', variant: 'success' as const, color: 'bg-emerald-50 border-emerald-100' },
  'promising-fit': { label: 'Promising fit', variant: 'default' as const, color: 'bg-indigo-50 border-indigo-100' },
  'mixed-fit': { label: 'Mixed fit', variant: 'warning' as const, color: 'bg-amber-50 border-amber-100' },
  'low-alignment': { label: 'Low alignment', variant: 'tension' as const, color: 'bg-rose-50 border-rose-100' },
};

export function CandidateFitExplorer() {
  const { id } = useParams<{ id: string }>();
  const candidateId = id || 'c1';
  const candidate = CANDIDATES.find((c) => c.id === candidateId) || CANDIDATES[0];
  const analyses = FIT_ANALYSES.filter((fa) => fa.signalProfileId === candidate.signalProfileId);
  const avatarColor = AVATAR_COLORS[candidateId as keyof typeof AVATAR_COLORS] || 'indigo';

  return (
    <PageLayout maxWidth="lg">
      <div className="mb-6">
        <Link to="/candidate/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft size={14} />
          Dashboard
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <Avatar initials={candidate.avatarInitials} color={avatarColor} size="lg" />
        <div>
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Fit explorer</p>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {candidate.firstName}'s role fit
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">How your signal profile aligns with live roles</p>
        </div>
      </div>

      {analyses.length === 0 ? (
        <Card padding="md">
          <p className="text-gray-500 text-sm">No fit analyses available for this profile.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {analyses.map((fa) => {
            const role = ROLE_FIT_PACKS.find((r) => r.id === fa.roleFitPackId);
            if (!role) return null;
            const config = FIT_STATUS_CONFIG[fa.fitStatus];

            return (
              <Card key={fa.id} padding="md" className={`border ${config.color}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{role.roleTitle}</p>
                    <p className="text-sm text-gray-500">{role.companyName} · {role.seniority}</p>
                  </div>
                  <Badge variant={config.variant}>{config.label}</Badge>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">{fa.overallFitSummary}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Alignment highlights</p>
                    <ul className="space-y-1.5">
                      {fa.strengths.slice(0, 2).map((s) => (
                        <li key={s.dimension} className="text-xs text-gray-600 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                          {s.headline}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tensions to explore</p>
                    <ul className="space-y-1.5">
                      {fa.tensions.slice(0, 2).map((t) => (
                        <li key={t.dimension} className="text-xs text-gray-600 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                          {t.headline}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={`/analysis/${candidateId}/${role.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  View full fit analysis
                  <ArrowRight size={14} />
                </Link>
              </Card>
            );
          })}
        </div>
      )}

      {/* All available roles */}
      <div className="mt-10">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">All available roles</p>
        <div className="grid grid-cols-2 gap-4">
          {ROLE_FIT_PACKS.map((role) => {
            const existing = analyses.find((fa) => fa.roleFitPackId === role.id);
            return (
              <Card key={role.id} padding="sm" hover>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{role.roleTitle}</p>
                    <p className="text-xs text-gray-500">{role.companyName}</p>
                  </div>
                  <Badge variant="neutral" size="sm">{role.seniority}</Badge>
                </div>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{role.environmentDescription.slice(0, 100)}...</p>
                {existing ? (
                  <Link
                    to={`/analysis/${candidateId}/${role.id}`}
                    className="text-xs font-medium text-indigo-600 hover:underline"
                  >
                    View fit analysis →
                  </Link>
                ) : (
                  <span className="text-xs text-gray-400">No analysis yet</span>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
