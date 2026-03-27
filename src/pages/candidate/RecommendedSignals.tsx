import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building2, Check, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useCandidateSession } from '../../context/CandidateSessionContext';
import { buildRecommendations, DIMENSION_LABELS, type RecommendedTask } from '../../data/signalRecommendations';
import { ALEX_MORGAN_IMPORT } from '../../data/linkedinSeed';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

const TASK_TYPE_LABELS: Record<string, string> = {
  ranking: 'Prioritisation',
  tradeoff: 'Trade-off choice',
  scenario: 'Scenario response',
  critique: 'Critique task',
  sketch: 'Visual sketch',
};

const TASK_TYPE_COLORS: Record<string, string> = {
  ranking: 'bg-blue-50 text-blue-700 border-blue-100',
  tradeoff: 'bg-violet-50 text-violet-700 border-violet-100',
  scenario: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  critique: 'bg-amber-50 text-amber-700 border-amber-100',
  sketch: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

function TaskCard({
  rec,
  onToggle,
}: {
  rec: RecommendedTask;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`relative rounded-2xl border-2 transition-all overflow-hidden ${
        rec.selected
          ? 'border-indigo-300 bg-white shadow-sm'
          : 'border-gray-200 bg-gray-50 opacity-60'
      }`}
    >
      {/* Selection toggle */}
      <button
        onClick={onToggle}
        className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all z-10 ${
          rec.selected
            ? 'bg-indigo-600 border-indigo-600'
            : 'bg-white border-gray-300 hover:border-indigo-300'
        }`}
        aria-label={rec.selected ? 'Deselect task' : 'Select task'}
      >
        {rec.selected && <Check size={11} className="text-white" />}
      </button>

      <div className="p-5 pr-14">
        {/* Type + dimension */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
              TASK_TYPE_COLORS[rec.type]
            }`}
          >
            {TASK_TYPE_LABELS[rec.type] || rec.type}
          </span>
          <Badge variant="neutral" size="sm">
            {DIMENSION_LABELS[rec.dimension]}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-1.5">{rec.title}</h3>

        {/* Rationale */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{rec.rationale}</p>

        {/* Connected roles */}
        {rec.connectedRoles.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Connects to live roles
            </p>
            {rec.connectedRoles.map((role) => (
              <div key={role.roleId} className="flex items-start gap-2.5">
                <div className="w-6 h-6 bg-indigo-50 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Building2 size={12} className="text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-700">
                    {role.roleTitle}
                    <span className="text-gray-400 font-normal"> · {role.companyName}</span>
                  </p>
                  <button
                    onClick={() => setExpanded((e) => !e)}
                    className="inline-flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 mt-0.5"
                  >
                    {expanded ? 'Hide detail' : 'Why this task matters for this role'}
                    {expanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                  </button>
                  {expanded && (
                    <p className="text-xs text-gray-500 leading-relaxed mt-1.5 pr-2">
                      {role.relevance}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function RecommendedSignals() {
  const navigate = useNavigate();
  const { importedProfile, setRecommendedTaskIds } = useCandidateSession();

  const profile = importedProfile ?? ALEX_MORGAN_IMPORT;
  const firstName = profile.fullName.split(' ')[0];

  const initialRecs = useMemo(() => buildRecommendations(profile), [profile]);
  const [recs, setRecs] = useState<RecommendedTask[]>(initialRecs);

  const selected = recs.filter((r) => r.selected);
  const allDeselected = selected.length === 0;

  function toggleRec(taskId: string) {
    setRecs((prev) =>
      prev.map((r) => (r.taskId === taskId ? { ...r, selected: !r.selected } : r))
    );
  }

  function handleContinue() {
    const ids = selected.map((r) => r.taskId);
    setRecommendedTaskIds(ids);
    navigate('/candidate/signal-tasks');
  }

  function handleSkip() {
    setRecommendedTaskIds([]);
    navigate('/candidate/role-family');
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-start gap-3 mb-8">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles size={18} className="text-indigo-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            Recommended signals
          </p>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-2">
            Based on your background, {firstName}
          </h1>
          <p className="text-gray-500 leading-relaxed text-sm">
            We've looked at your imported roles and identified the signal tasks most likely to be relevant — both to how you work and to the roles currently active on Signal. Select the ones you want to complete.
          </p>
        </div>
      </div>

      {/* How these were chosen */}
      <div className="mb-6 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-700">How these were chosen:</strong> Your imported roles suggest experience in{' '}
          <strong className="text-gray-700">
            {profile.roles
              .slice(0, 2)
              .map((r) => r.title)
              .join(' and ')}
          </strong>. The tasks below are selected to surface the dimensions most relevant to that kind of work — and to the roles currently waiting to be matched.
        </p>
      </div>

      {/* Task cards */}
      <div className="space-y-4 mb-8">
        {recs.map((rec) => (
          <TaskCard key={rec.taskId} rec={rec} onToggle={() => toggleRec(rec.taskId)} />
        ))}
      </div>

      {/* Summary */}
      <Card padding="sm" className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">
              {selected.length === 0
                ? 'No tasks selected'
                : `${selected.length} task${selected.length > 1 ? 's' : ''} selected`}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {selected.length > 0
                ? `Connects to ${[...new Set(selected.flatMap((r) => r.connectedRoles.map((c) => c.companyName)))].join(' and ')}`
                : 'Select at least one task to continue'}
            </p>
          </div>
          {selected.length < recs.length && (
            <button
              onClick={() => setRecs((prev) => prev.map((r) => ({ ...r, selected: true })))}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800"
            >
              <RotateCcw size={11} />
              Select all
            </button>
          )}
        </div>
      </Card>

      {/* Role fit pack previews */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Live roles these tasks connect to
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[...new Set(recs.flatMap((r) => r.connectedRoles.map((c) => c.roleId)))].map((roleId) => {
            const roleData = recs.flatMap((r) => r.connectedRoles).find((c) => c.roleId === roleId);
            const taskCount = recs.filter((r) => r.connectedRoles.some((c) => c.roleId === roleId) && r.selected).length;
            if (!roleData) return null;
            return (
              <Link
                key={roleId}
                to={`/employer/fit-pack/${roleId}`}
                target="_blank"
                className="flex items-start gap-3 p-3.5 bg-white border border-gray-200 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/20 transition-all group"
              >
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 size={14} className="text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{roleData.roleTitle}</p>
                  <p className="text-xs text-gray-500">{roleData.companyName}</p>
                  <p className="text-xs text-indigo-500 mt-1">
                    {taskCount} selected task{taskCount !== 1 ? 's' : ''} relevant
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleSkip}
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          Skip — let me choose my own tasks
        </button>
        <button
          onClick={handleContinue}
          disabled={allDeselected}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start {selected.length} recommended task{selected.length !== 1 ? 's' : ''}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
