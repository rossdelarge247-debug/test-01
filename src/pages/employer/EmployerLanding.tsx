import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Users, MessageSquare } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    title: 'Build a role fit pack',
    body: 'Describe what success actually looks like — the environment, real trade-offs, pace, and decision style. Not just responsibilities.',
  },
  {
    n: '02',
    title: 'Review signal profiles',
    body: 'See evidence-backed candidate responses matched to your specific role dimensions. Alignment scored and explained.',
  },
  {
    n: '03',
    title: 'Interview with confidence',
    body: "Get evidence-led interview prompts generated from genuine tensions in the candidate's profile — not gut feel.",
  },
];

export function EmployerLanding() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-medium text-indigo-700 mb-6">
              For employers
            </div>
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight leading-tight mb-5">
              Understand how candidates work,<br />not just what they've done
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Role fit packs give you a structured way to describe what success really looks like — and match it to candidate evidence, not keyword CVs.
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/employer/onboarding"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors text-sm"
              >
                Create a role fit pack
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/employer/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                See a demo analysis
              </Link>
            </div>
          </div>

          {/* Fit analysis preview card */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-gray-500">Fit analysis</p>
              <span className="text-xs font-medium px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">
                Strong alignment
              </span>
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Maya Chen → Senior Service Designer</p>
            <p className="text-xs text-gray-400 mb-4">Lumio · role fit pack rfp1</p>

            {/* Score bar */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }} />
              </div>
              <span className="text-sm font-bold text-emerald-600">82%</span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Strengths</p>
                {['High comfort with undefined problem spaces', 'Strong diagnostic instinct', 'Skilled at navigating without authority'].map(s => (
                  <div key={s} className="flex items-start gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600">{s}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Tensions to explore</p>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600">Alignment-first orientation may create pace tension</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Suggested interview prompt</p>
              <p className="text-xs text-gray-600 italic leading-relaxed">
                "Tell me about a time you had to move quickly on a project you felt was under-researched."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 border-y border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">How it works</p>
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-10">From job spec to evidence, fast</h2>
          <div className="grid grid-cols-3 gap-8">
            {STEPS.map(s => (
              <div key={s.n}>
                <p className="text-3xl font-bold text-gray-100 mb-3">{s.n}</p>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: FileText, title: 'Beyond the job spec', body: 'Fit packs describe your real environment — pace, autonomy, trade-offs, decision style. Candidates self-select in or out.' },
            { icon: Users, title: 'Evidence, not claims', body: 'See how candidates respond to real scenarios that mirror your role. Scored against dimensions that matter to you.' },
            { icon: MessageSquare, title: 'Smarter interviews', body: "Every analysis generates evidence-led interview prompts based on genuine tensions in the candidate's profile." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
              <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <Icon size={17} className="text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-white tracking-tight mb-3">
            Ready to hire on evidence?
          </h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Build your first role fit pack in minutes. No integration required.
          </p>
          <Link
            to="/employer/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm"
          >
            Create a role fit pack
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </div>
  );
}
