import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';
import { ROLE_FIT_PACKS } from '../../data/roles';
import { FIT_ANALYSES } from '../../data/fitAnalysis';
import { CANDIDATES, SIGNAL_PROFILES } from '../../data/candidates';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { PageLayout, PageHeader } from '../../components/layout/PageLayout';

const FIT_STATUS_CONFIG = {
  'strong-alignment': { label: 'Strong alignment', variant: 'success' as const },
  'promising-fit': { label: 'Promising fit', variant: 'default' as const },
  'mixed-fit': { label: 'Mixed fit', variant: 'warning' as const },
  'low-alignment': { label: 'Low alignment', variant: 'tension' as const },
};

const AVATAR_COLORS = { c1: 'indigo', c2: 'violet', c3: 'emerald' } as const;

export function FitPackDetail() {
  const { id } = useParams<{ id: string }>();
  const role = ROLE_FIT_PACKS.find((r) => r.id === id);
  const analyses = FIT_ANALYSES.filter((fa) => fa.roleFitPackId === id);

  if (!role) return <div className="p-8 text-gray-500">Role not found.</div>;

  return (
    <PageLayout>
      <div className="mb-6">
        <Link to="/employer/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft size={14} />
          Dashboard
        </Link>
      </div>

      <PageHeader
        eyebrow={`${role.roleFamily.replace('-', ' ')} · ${role.seniority}`}
        title={role.roleTitle}
        subtitle={role.companyName}
        actions={
          <Link
            to={`/employer/candidates/${id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Users size={14} />
            View candidate matches
          </Link>
        }
      />

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          {/* 90-day success */}
          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">90-day success</p>
            <p className="text-sm text-gray-700 leading-relaxed">{role.successStatement}</p>
          </Card>

          {/* Environment */}
          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">The environment</p>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{role.environmentDescription}</p>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">What tends to frustrate people here</p>
              <p className="text-sm text-gray-700 leading-relaxed">{role.frustrationFactors}</p>
            </div>
          </Card>

          {/* Trade-offs */}
          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Key trade-offs</p>
            <ul className="space-y-2.5">
              {role.topTradeoffs.map((t, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700">{t}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Decision style */}
          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">How decisions get made</p>
            <p className="text-sm text-gray-700 leading-relaxed">{role.decisionStyle}</p>
          </Card>

          {/* Fit dimensions */}
          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Fit dimensions required</p>
            <div className="space-y-4">
              {role.fitDimensions.map((dim) => (
                <div key={dim.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{dim.name}</span>
                    <span className="text-xs text-gray-400">{dim.description}</span>
                  </div>
                  <ProgressBar value={dim.roleScore} max={10} color="indigo" showValue />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Environment profile</p>
            <div className="space-y-2">
              {[
                { label: 'Pace', value: role.pace },
                { label: 'Ambiguity', value: role.ambiguity },
                { label: 'Collaboration', value: role.collaborationIntensity },
                { label: 'Autonomy', value: role.autonomyExpected },
                { label: 'Process maturity', value: role.processMaturity },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-medium text-gray-900 capitalize">{row.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Team style</p>
            <div className="flex flex-wrap gap-1.5">
              {role.valuesAndTeamStyle.map((tag) => (
                <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
              ))}
            </div>
          </Card>

          {/* Candidate matches */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Candidate matches</p>
              <Link to={`/employer/candidates/${id}`} className="text-xs text-indigo-600 hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {analyses.map((fa) => {
                const config = FIT_STATUS_CONFIG[fa.fitStatus];

                const cand = CANDIDATES.find((c) => {
                  const sp = SIGNAL_PROFILES.find((s) => s.id === fa.signalProfileId);
                  return sp && c.id === sp.candidateId;
                });
                if (!cand) return null;

                const avatarColor = AVATAR_COLORS[cand.id as keyof typeof AVATAR_COLORS] || 'indigo';

                return (
                  <Link
                    key={fa.id}
                    to={`/analysis/${cand.id}/${id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar initials={cand.avatarInitials} color={avatarColor} size="sm" />
                      <div>
                        <p className="text-xs font-medium text-gray-700">{cand.firstName} {cand.lastName}</p>
                        <p className="text-xs text-gray-400">{cand.headline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant={config.variant} size="sm">{config.label}</Badge>
                      <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-500" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
