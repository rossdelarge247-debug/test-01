import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, User, Zap, RefreshCw, Share2 } from 'lucide-react';
import { BLANK_SIGNAL_TASKS } from '../../data/tasks';

const TASK_TYPE_LABELS: Record<string, string> = {
  ranking:  'Prioritisation',
  tradeoff: 'Trade-off',
  scenario: 'Scenario',
  critique: 'Critique',
  sketch:   'Sketch',
};

export function ProfileComplete() {
  const taskCount = BLANK_SIGNAL_TASKS.length;
  const taskTypes = [...new Set(BLANK_SIGNAL_TASKS.map((t) => TASK_TYPE_LABELS[t.type]))];

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      {/* Success mark */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
          <CheckCircle size={28} className="text-emerald-600" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-3">
          Your signal profile is ready
        </h1>
        <p className="text-gray-500 leading-relaxed">
          You've completed {taskCount} tasks covering {taskTypes.join(', ').toLowerCase()} — giving employers a picture of how you actually think and work.
        </p>
      </div>

      {/* What was captured */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">What's in your profile</p>
        <div className="space-y-2.5">
          {BLANK_SIGNAL_TASKS.map((task) => (
            <div key={task.id} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={11} className="text-emerald-600" />
              </div>
              <span className="text-sm text-gray-700">{task.title}</span>
              <span className="ml-auto text-xs text-gray-400">{TASK_TYPE_LABELS[task.type]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What happens next */}
      <div className="space-y-3 mb-8">
        {[
          {
            icon: Share2,
            title: 'Reusable across every role',
            body: 'Your signal profile can be shared with any employer on Fit. — you never repeat the same tasks.',
          },
          {
            icon: RefreshCw,
            title: 'Deepen it over time',
            body: 'Add context to your work history and reflect on your answers to build a richer picture.',
          },
          {
            icon: Zap,
            title: 'Matched to roles that fit',
            body: 'Employers using Fit. will see how your signals align to their specific role requirements.',
          },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white border border-gray-100">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon size={15} className="text-indigo-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{title}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link
          to="/candidate/profile"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <User size={16} />
          View my signal profile
        </Link>
        <Link
          to="/candidate/dashboard"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
        >
          Go to dashboard
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
