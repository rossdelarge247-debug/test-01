import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ROLE_FIT_PACKS } from '../../data/roles';
import { FIT_ANALYSES } from '../../data/fitAnalysis';
import { CANDIDATES, SIGNAL_PROFILES } from '../../data/candidates';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { PageLayout, PageHeader } from '../../components/layout/PageLayout';

const FIT_STATUS_CONFIG = {
  'strong-alignment': { label: 'Strong alignment', variant: 'success' as const, bar: 'emerald' as const },
  'promising-fit': { label: 'Promising fit', variant: 'default' as const, bar: 'indigo' as const },
  'mixed-fit': { label: 'Mixed fit', variant: 'warning' as const, bar: 'amber' as const },
  'low-alignment': { label: 'Low alignment', variant: 'tension' as const, bar: 'rose' as const },
};

const AVATAR_COLORS = { c1: 'indigo', c2: 'violet', c3: 'emerald' } as const;

export function CandidateComparison() {
  const { roleId } = useParams<{ roleId: string }>();
  const role = ROLE_FIT_PACKS.find((r) => r.id === roleId);
  const analyses = FIT_ANALYSES.filter((fa) => fa.roleFitPackId === roleId);

  if (!role) return <div className="p-8 text-gray-500">Role not found.</div>;

  return (
    <PageLayout>
      <div className="mb-6">
        <Link to={`/employer/fit-pack/${roleId}`} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft size={14} />
          Back to fit pack
        </Link>
      </div>

      <PageHeader
        eyebrow={`${role.roleTitle} · ${role.companyName}`}
        title="Candidate comparison"
        subtitle={`${analyses.length} signal profiles reviewed against this role.`}
      />

      <div className="space-y-6">
        {analyses.map((fa) => {
          const profile = SIGNAL_PROFILES.find((sp) => sp.id === fa.signalProfileId);
          const candidate = CANDIDATES.find((c) => c.id === profile?.candidateId);
          if (!candidate || !profile) return null;
          const config = FIT_STATUS_CONFIG[fa.fitStatus];
          const avatarColor = AVATAR_COLORS[candidate.id as keyof typeof AVATAR_COLORS] || 'indigo';

          return (
            <Card key={fa.id} padding="md">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={candidate.avatarInitials} color={avatarColor} size="lg" />
                  <div>
                    <p className="font-semibold text-gray-900">{candidate.firstName} {candidate.lastName}</p>
                    <p className="text-sm text-gray-500">{candidate.headline}</p>
                    <div className="flex gap-1.5 mt-1.5">
                      {profile.strengthTags.slice(0, 2).map((t) => (
                        <Badge key={t} variant="success" size="sm">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={config.variant}>{config.label}</Badge>
                  <div className="mt-2 w-32">
                    <ProgressBar value={fa.alignmentScore} max={100} color={config.bar} size="sm" showValue />
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">{fa.overallFitSummary}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Alignment highlights</p>
                  <ul className="space-y-1.5">
                    {fa.strengths.slice(0, 2).map((s) => (
                      <li key={s.dimension} className="flex items-start gap-1.5 text-xs text-gray-600">
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
                      <li key={t.dimension} className="flex items-start gap-1.5 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                        {t.headline}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <Link
                  to={`/analysis/${candidate.id}/${roleId}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  View full fit analysis
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </PageLayout>
  );
}
