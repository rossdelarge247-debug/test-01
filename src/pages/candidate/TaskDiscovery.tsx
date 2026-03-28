import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { BLANK_SIGNAL_TASKS, SKETCH_TASKS } from '../../data/tasks';
import type { RoleFamily } from '../../types';

const ALL_TASKS = [...BLANK_SIGNAL_TASKS, ...SKETCH_TASKS];

// Tasks Maya has already completed in the prototype
const COMPLETED_TASK_IDS = new Set(BLANK_SIGNAL_TASKS.map((t) => t.id));

const ROLE_OPTIONS: { id: RoleFamily; label: string; description: string }[] = [
  { id: 'product',            label: 'Product',              description: 'PMs, product leads, product strategy' },
  { id: 'service-design',     label: 'Service Design',       description: 'Service designers, UX, CX design' },
  { id: 'operations',         label: 'Operations',           description: 'Ops leads, process improvement, COO tracks' },
  { id: 'customer-success',   label: 'Customer Success',     description: 'CS leads, account management, support' },
  { id: 'programme-delivery', label: 'Programme & Delivery', description: 'Programme managers, delivery leads, PMO' },
];

const TYPE_LABELS: Record<string, string> = {
  ranking:  'Ranking',
  tradeoff: 'Trade-off',
  scenario: 'Scenario',
  critique: 'Critique',
  sketch:   'Sketch',
};

const TYPE_COLORS: Record<string, string> = {
  ranking:  'bg-blue-50 text-blue-700',
  tradeoff: 'bg-violet-50 text-violet-700',
  scenario: 'bg-amber-50 text-amber-700',
  critique: 'bg-rose-50 text-rose-700',
  sketch:   'bg-emerald-50 text-emerald-700',
};

export function TaskDiscovery() {
  const [selectedRoles, setSelectedRoles] = useState<Set<RoleFamily>>(new Set());

  function toggleRole(id: RoleFamily) {
    setSelectedRoles((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filtered = ALL_TASKS
    .filter((t) => {
      if (selectedRoles.size === 0) return true;
      return t.roleFamilies?.some((rf) => selectedRoles.has(rf));
    })
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));

  const completedCount = filtered.filter((t) => COMPLETED_TASK_IDS.has(t.id)).length;
  const availableCount = filtered.length - completedCount;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Back */}
      <Link
        to="/candidate/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-8 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to dashboard
      </Link>

      <div className="mb-10">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">Build your signal</p>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-3">
          Discover tasks for your target roles
        </h1>
        <p className="text-gray-500 leading-relaxed">
          These tasks are used by real employers to understand working style, judgment, and approach.
          Each one you complete adds a new signal to your profile — reusable across any role you apply for.
        </p>
      </div>

      {/* Role filter */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-gray-700 mb-4">
          What kinds of roles are you targeting?
          <span className="text-xs font-normal text-gray-400 ml-2">Select any that apply</span>
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {ROLE_OPTIONS.map((role) => {
            const active = selectedRoles.has(role.id);
            return (
              <button
                key={role.id}
                onClick={() => toggleRole(role.id)}
                className={`text-left px-4 py-3 rounded-xl border transition-all ${
                  active
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{role.label}</span>
                  {active && (
                    <CheckCircle2 size={15} className="text-indigo-600 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{role.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results summary */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold text-gray-900">
            {filtered.length} task{filtered.length !== 1 ? 's' : ''}
          </p>
          {selectedRoles.size > 0 && (
            <span className="text-xs text-gray-400">
              for {selectedRoles.size} selected role{selectedRoles.size !== 1 ? 's' : ''}
            </span>
          )}
          {completedCount > 0 && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <CheckCircle2 size={11} />
              {completedCount} completed
            </span>
          )}
        </div>
        {availableCount > 0 && (
          <p className="text-xs text-gray-400">{availableCount} available to start</p>
        )}
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {filtered.map((task) => {
          const isComplete = COMPLETED_TASK_IDS.has(task.id);
          const relevantRoles = task.roleFamilies
            ?.map((rf) => ROLE_OPTIONS.find((r) => r.id === rf)?.label)
            .filter(Boolean) ?? [];

          return (
            <div
              key={task.id}
              className={`rounded-2xl border p-5 transition-all ${
                isComplete
                  ? 'bg-gray-50 border-gray-100 opacity-70'
                  : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  {/* Header row */}
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[task.type]}`}>
                      {TYPE_LABELS[task.type]}
                    </span>
                    {task.timeLimit && (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={11} />
                        ~{task.timeLimit} min
                      </span>
                    )}
                    {isComplete && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                        <CheckCircle2 size={12} />
                        Completed
                      </span>
                    )}
                  </div>

                  <h3 className={`font-semibold mb-1.5 ${isComplete ? 'text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
                    {task.instructions}
                  </p>

                  {/* Role tags */}
                  {relevantRoles.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap mb-3">
                      {relevantRoles.map((label) => (
                        <span
                          key={label}
                          className={`text-xs px-2 py-0.5 rounded-full border ${
                            label && selectedRoles.has(
                              ROLE_OPTIONS.find((r) => r.label === label)?.id as RoleFamily
                            )
                              ? 'bg-indigo-50 border-indigo-100 text-indigo-600'
                              : 'bg-gray-50 border-gray-100 text-gray-500'
                          }`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Popularity */}
                  {task.popularity && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <TrendingUp size={11} />
                      Requested by{' '}
                      <span className="font-semibold text-gray-600">{task.popularity.toLocaleString()}</span>{' '}
                      employers
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="flex-shrink-0 flex items-center self-center">
                  {isComplete ? (
                    <CheckCircle2 size={22} className="text-emerald-400" />
                  ) : (
                    <Link
                      to="/candidate/signal-tasks"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-xl hover:bg-indigo-700 transition-colors whitespace-nowrap"
                    >
                      Start task
                      <ChevronRight size={13} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">No tasks match the selected roles yet.</p>
          <p className="text-xs mt-1">Try selecting a different combination.</p>
        </div>
      )}
    </div>
  );
}
