import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Quote, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { FIT_ANALYSES } from '../../data/fitAnalysis';
import { CANDIDATES, SIGNAL_PROFILES } from '../../data/candidates';
import { ROLE_FIT_PACKS } from '../../data/roles';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import { PageLayout } from '../../components/layout/PageLayout';
import type { FitPoint, EvidenceLink } from '../../types';

const FIT_STATUS_DISPLAY = {
  'strong-alignment': {
    label: 'Strong alignment',
    variant: 'success' as const,
    bg: 'bg-emerald-50 border-emerald-200',
    description: 'The candidate profile and role requirements show strong mutual alignment across most dimensions.',
    bar: 'emerald' as const,
  },
  'promising-fit': {
    label: 'Promising fit with tensions',
    variant: 'default' as const,
    bg: 'bg-indigo-50 border-indigo-200',
    description: 'There is meaningful alignment, alongside some areas that are worth exploring further.',
    bar: 'indigo' as const,
  },
  'mixed-fit': {
    label: 'Mixed fit',
    variant: 'warning' as const,
    bg: 'bg-amber-50 border-amber-200',
    description: 'Some areas of alignment exist, but there are meaningful tensions that should be investigated.',
    bar: 'amber' as const,
  },
  'low-alignment': {
    label: 'Low alignment',
    variant: 'tension' as const,
    bg: 'bg-rose-50 border-rose-200',
    description: 'Significant differences exist between the candidate profile and role requirements.',
    bar: 'rose' as const,
  },
};

const AVATAR_COLORS = { c1: 'indigo', c2: 'violet', c3: 'emerald' } as const;

function FitPointCard({ point, type }: { point: FitPoint; type: 'strength' | 'tension' }) {
  const [expanded, setExpanded] = useState(false);
  const isStrength = type === 'strength';

  return (
    <div className={`p-4 rounded-xl border ${isStrength ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left flex items-start justify-between gap-2"
      >
        <div className="flex items-start gap-2.5">
          <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isStrength ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isStrength ? 'text-emerald-600' : 'text-amber-600'}`}>
              {point.dimension}
            </p>
            <p className={`text-sm font-medium ${isStrength ? 'text-emerald-900' : 'text-amber-900'}`}>
              {point.headline}
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp size={14} className="text-gray-400 flex-shrink-0 mt-1" />
        ) : (
          <ChevronDown size={14} className="text-gray-400 flex-shrink-0 mt-1" />
        )}
      </button>

      {expanded && (
        <div className="mt-3 pl-4 border-l-2 border-current border-opacity-20">
          <p className={`text-sm leading-relaxed ${isStrength ? 'text-emerald-800' : 'text-amber-800'}`}>
            {point.detail}
          </p>
          {point.evidenceSnippet && (
            <div className="mt-3 flex items-start gap-2">
              <Quote size={12} className={`flex-shrink-0 mt-0.5 ${isStrength ? 'text-emerald-400' : 'text-amber-400'}`} />
              <p className={`text-xs italic leading-relaxed ${isStrength ? 'text-emerald-700' : 'text-amber-700'}`}>
                "{point.evidenceSnippet}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EvidenceLinkCard({ link }: { link: EvidenceLink }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full text-left p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
      >
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Quote size={12} className="text-indigo-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">{link.dimension.replace('-', ' ')}</p>
            <p className="text-sm text-gray-700 group-hover:text-gray-900">"{link.snippet}"</p>
          </div>
        </div>
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Evidence detail">
        <div className="p-6 space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Dimension</p>
            <Badge variant="default">{link.dimension.replace('-', ' ')}</Badge>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">From the candidate's response</p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <p className="text-sm text-gray-700 italic leading-relaxed">"{link.snippet}"</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Why this is relevant</p>
            <p className="text-sm text-gray-600 leading-relaxed">{link.relevance}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function FitAnalysisPage() {
  const { candidateId, roleId } = useParams<{ candidateId: string; roleId: string }>();

  const candidate = CANDIDATES.find((c) => c.id === candidateId);
  const role = ROLE_FIT_PACKS.find((r) => r.id === roleId);
  const profile = candidate ? SIGNAL_PROFILES.find((sp) => sp.candidateId === candidate.id) : null;
  const analysis = FIT_ANALYSES.find(
    (fa) => fa.signalProfileId === profile?.id && fa.roleFitPackId === roleId
  );

  if (!candidate || !role || !analysis) {
    return (
      <PageLayout maxWidth="md">
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">Fit analysis not found.</p>
          <Link to="/candidate/dashboard" className="text-indigo-600 hover:underline text-sm">
            Back to dashboard
          </Link>
        </div>
      </PageLayout>
    );
  }

  const avatarColor = AVATAR_COLORS[candidateId as keyof typeof AVATAR_COLORS] || 'indigo';
  const statusDisplay = FIT_STATUS_DISPLAY[analysis.fitStatus];

  return (
    <PageLayout>
      <div className="mb-6 flex items-center gap-4">
        <Link to="/candidate/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft size={14} />
          Back
        </Link>
      </div>

      {/* Header */}
      <div className={`rounded-2xl border p-5 sm:p-6 mb-8 ${statusDisplay.bg}`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar initials={candidate.avatarInitials} color={avatarColor} size="xl" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Fit analysis</p>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
                {candidate.firstName} {candidate.lastName}
              </h1>
              <p className="text-gray-500 text-sm">
                vs. <strong className="text-gray-700">{role.roleTitle}</strong> at {role.companyName}
              </p>
            </div>
          </div>
          <div className="sm:text-right flex-shrink-0 flex sm:flex-col items-center sm:items-end gap-3">
            <Badge variant={statusDisplay.variant} size="md">{statusDisplay.label}</Badge>
            <div className="sm:mt-2 w-40">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Alignment</span>
                <span className="font-medium text-gray-900">{analysis.alignmentScore}%</span>
              </div>
              <ProgressBar value={analysis.alignmentScore} max={100} color={statusDisplay.bar} />
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/40">
          <p className="text-sm text-gray-700 leading-relaxed">{analysis.overallFitSummary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Strengths */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Alignment highlights
            </h2>
            <div className="space-y-3">
              {analysis.strengths.map((s) => (
                <FitPointCard key={s.dimension} point={s} type="strength" />
              ))}
            </div>
          </section>

          {/* Tensions */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Tensions to explore
            </h2>
            <div className="space-y-3">
              {analysis.tensions.map((t) => (
                <FitPointCard key={t.dimension} point={t} type="tension" />
              ))}
            </div>
          </section>

          {/* Evidence */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Quote size={15} className="text-gray-400" />
              Evidence from responses
            </h2>
            <div className="space-y-3">
              {analysis.evidenceLinks.map((link) => (
                <EvidenceLinkCard key={link.taskId} link={link} />
              ))}
            </div>
          </section>

          {/* Interview prompts */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare size={15} className="text-gray-400" />
              Suggested interview prompts
            </h2>
            <div className="space-y-3">
              {analysis.interviewPrompts.map((prompt, i) => (
                <div key={i} className="flex gap-3 p-4 bg-white border border-gray-200 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{prompt}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Candidate</p>
            <div className="flex items-center gap-3 mb-3">
              <Avatar initials={candidate.avatarInitials} color={avatarColor} size="md" />
              <div>
                <p className="font-medium text-gray-900 text-sm">{candidate.firstName} {candidate.lastName}</p>
                <p className="text-xs text-gray-500">{candidate.headline}</p>
              </div>
            </div>
            <Link
              to={`/candidate/profile/${candidate.id}`}
              className="text-xs text-indigo-600 hover:underline"
            >
              View full profile →
            </Link>
          </Card>

          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Role</p>
            <p className="font-medium text-gray-900 text-sm">{role.roleTitle}</p>
            <p className="text-xs text-gray-500 mb-3">{role.companyName} · {role.seniority}</p>
            <Link
              to={`/employer/fit-pack/${role.id}`}
              className="text-xs text-indigo-600 hover:underline"
            >
              View fit pack →
            </Link>
          </Card>

          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick summary</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 flex-1">Strengths</span>
                <span className="text-sm font-semibold text-emerald-600">{analysis.strengths.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 flex-1">Tensions</span>
                <span className="text-sm font-semibold text-amber-600">{analysis.tensions.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 flex-1">Interview prompts</span>
                <span className="text-sm font-semibold text-gray-700">{analysis.interviewPrompts.length}</span>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Other analyses</p>
            <div className="space-y-2">
              {ROLE_FIT_PACKS.filter((r) => r.id !== roleId).map((r) => {
                const otherAnalysis = FIT_ANALYSES.find(
                  (fa) => fa.roleFitPackId === r.id && fa.signalProfileId === profile?.id
                );
                return (
                  <div key={r.id} className="text-xs">
                    {otherAnalysis ? (
                      <Link
                        to={`/analysis/${candidateId}/${r.id}`}
                        className="text-indigo-600 hover:underline"
                      >
                        {r.roleTitle} at {r.companyName} →
                      </Link>
                    ) : (
                      <span className="text-gray-400">{r.roleTitle} — no analysis</span>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
