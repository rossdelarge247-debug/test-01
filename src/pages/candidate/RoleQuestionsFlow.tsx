import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, SkipForward } from 'lucide-react';
import { useCandidateSession } from '../../context/CandidateSessionContext';
import type { ImportedRole } from '../../types';

// ── Question selection based on role title ────────────────────────────────────

function getQuestionForRole(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('service design') || (t.includes('service') && t.includes('design')))
    return "What's one service journey you simplified in this role — what was the before and after for users?";
  if (t.includes('product manager') || t.includes('product lead') || t.includes('head of product'))
    return "What was the product bet you were most proud of making here — and how did it land?";
  if (t.includes('product designer') || t.includes('ux') || t.includes('user experience'))
    return "What design problem in this role took the most iteration to crack?";
  if (t.includes('strategy') || t.includes('strategic'))
    return "What was the most ambiguous challenge you were asked to work through, and how did you build confidence in a direction?";
  if (t.includes('operations') || t.includes('ops lead') || t.includes('head of ops'))
    return "What process or system did you improve most significantly — what changed, and what was the impact?";
  if (t.includes('programme') || t.includes('program') || t.includes('delivery lead'))
    return "What was the moment in this role when the complexity of the programme felt most unmanageable — how did you respond?";
  if (t.includes('consultant') || t.includes('consulting'))
    return "What's one client challenge that changed how you think about your craft?";
  if (t.includes('engineer') || t.includes('developer') || t.includes('software'))
    return "What technical decision in this role would you approach differently with hindsight?";
  if (t.includes('designer'))
    return "How did you balance user needs against business or technical constraints in this role?";
  if (t.includes('lead') || t.includes('head of') || t.includes('director'))
    return "What did you learn about yourself as a leader in this role that you didn't expect?";
  return "What would your team say was your single biggest contribution in this role?";
}

function formatDate(d: string | null) {
  if (!d) return 'Present';
  const [year, month] = d.split('-');
  return `${new Date(Number(year), Number(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`;
}

// ── Role question card ────────────────────────────────────────────────────────

function RoleQuestionCard({
  role,
  question,
  answer,
  onChange,
}: {
  role: ImportedRole;
  question: string;
  answer: string;
  onChange: (v: string) => void;
}) {
  const [skipped, setSkipped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (skipped) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 opacity-60">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500">{role.title}</p>
            <p className="text-xs text-gray-400">{role.company}</p>
          </div>
          <button
            onClick={() => setSkipped(false)}
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Answer instead
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all">
      {/* Role header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-gray-900">{role.title}</p>
          <p className="text-sm text-gray-500">
            {role.company} · {formatDate(role.startDate)} — {formatDate(role.endDate)}
          </p>
        </div>
        <button
          onClick={() => { setSkipped(true); onChange(''); }}
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 flex-shrink-0 ml-4"
        >
          <SkipForward size={12} />
          Skip
        </button>
      </div>

      {/* Question */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-4">
        <p className="text-sm font-medium text-indigo-800 leading-relaxed">{question}</p>
      </div>

      {/* Answer area */}
      {!expanded && !answer ? (
        <button
          onClick={() => setExpanded(true)}
          className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <ChevronDown size={14} />
          Answer this question
        </button>
      ) : (
        <div>
          <textarea
            autoFocus={expanded && !answer}
            value={answer}
            onChange={(e) => { onChange(e.target.value); setExpanded(true); }}
            rows={4}
            placeholder="Keep it brief — 2–4 sentences is plenty. This adds context that a job title can't."
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none text-gray-700 leading-relaxed placeholder:text-gray-400"
          />
          {answer && (
            <p className="text-xs text-gray-400 mt-1.5">
              {answer.length} characters — {answer.split(/\s+/).filter(Boolean).length} words
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function RoleQuestionsFlow() {
  const navigate = useNavigate();
  const { importedProfile, setRoleAnswers } = useCandidateSession();

  // Last 3 roles, most recent first
  const roles = (importedProfile?.roles ?? [])
    .slice()
    .sort((a, b) => (b.startDate > a.startDate ? 1 : -1))
    .slice(0, 3);

  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(roles.map((r) => [r.id, '']))
  );

  function handleChange(roleId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [roleId]: value }));
  }

  function handleContinue() {
    // Save non-empty answers to context
    const filled = Object.fromEntries(
      Object.entries(answers).filter(([, v]) => v.trim().length > 0)
    );
    setRoleAnswers(filled);
    navigate('/candidate/recommended-signals');
  }

  const answeredCount = Object.values(answers).filter((v) => v.trim().length > 0).length;

  // If no roles to ask about, skip straight through
  if (roles.length === 0) {
    navigate('/candidate/recommended-signals');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
          Step 2 of 3 — Experience context
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-3">
          Bring your experience to life
        </h1>
        <p className="text-gray-500 leading-relaxed">
          We've picked one question for each of your recent roles based on what you were doing.
          Answer the ones that feel natural — skip anything you'd rather leave out.
          These give employers a richer picture than a job title alone.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {roles.map((role) => (
          <RoleQuestionCard
            key={role.id}
            role={role}
            question={getQuestionForRole(role.title)}
            answer={answers[role.id] ?? ''}
            onChange={(v) => handleChange(role.id, v)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/candidate/recommended-signals')}
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          Skip all for now
        </button>
        <button
          onClick={handleContinue}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors text-sm"
        >
          {answeredCount > 0
            ? `Continue with ${answeredCount} answer${answeredCount !== 1 ? 's' : ''}`
            : 'Continue'}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
