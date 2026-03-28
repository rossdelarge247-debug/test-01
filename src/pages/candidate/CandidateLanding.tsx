import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Repeat, Zap } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    title: 'Import your background',
    body: "Connect LinkedIn or upload your CV. Takes seconds. We pull in your roles so you're not starting from scratch.",
  },
  {
    n: '02',
    title: 'Complete five short tasks',
    body: 'Scenario responses, ranking exercises, trade-off choices, and a sketch. Under 25 minutes. No right answers.',
  },
  {
    n: '03',
    title: 'Share with confidence',
    body: 'Your signal profile is reusable across every role you apply for. Evidence-backed. Owned by you.',
  },
];

const STRENGTH_TAGS = ['systems thinking', 'stakeholder sensitivity', 'structured framing'];
const TENSION_TAGS  = ['pace tension under pressure'];

export function CandidateLanding() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-medium text-indigo-700 mb-6">
              For candidates
            </div>
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight leading-tight mb-5">
              Show how you think,<br />not just what you've done
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Five short tasks. One reusable profile. Evidence that travels with you across every role you apply for — no keyword games, no CV padding.
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/candidate/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors text-sm"
              >
                Build my signal profile
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/candidate/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                See a demo profile
              </Link>
            </div>
          </div>

          {/* Profile preview card */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                MC
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Maya Chen</p>
                <p className="text-xs text-gray-500">Service Design Lead · 8 yrs exp</p>
              </div>
              <span className="ml-auto text-xs font-medium px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                service design
              </span>
            </div>
            <div className="mb-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Signal strengths</p>
              <div className="flex flex-wrap gap-1.5">
                {STRENGTH_TAGS.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-5">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Tensions to explore</p>
              <div className="flex flex-wrap gap-1.5">
                {TENSION_TAGS.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-full text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Evidence snippet</p>
              <p className="text-xs text-gray-600 italic leading-relaxed">
                "I'd frame it as risk reduction, not delay — I wouldn't pretend we have more certainty than we do."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 border-y border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">How it works</p>
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-10">Three steps, under 30 minutes</h2>
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
            { icon: Repeat, title: 'Reusable', body: 'Build once. Apply everywhere. Your profile travels across every role — no repetitive applications.' },
            { icon: CheckCircle, title: 'Evidence-backed', body: 'Not claims — actual responses to real scenarios. Employers see how you reason, not just what you list.' },
            { icon: Zap, title: 'Mutual', body: 'You see how you match to a role before committing. Fit works both ways.' },
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
            Ready to show who you actually are?
          </h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Takes under 30 minutes. No CV required.
          </p>
          <Link
            to="/candidate/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm"
          >
            Build my signal profile
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </div>
  );
}
