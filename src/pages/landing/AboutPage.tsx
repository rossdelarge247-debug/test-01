import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const USE_CASES = [
  {
    audience: 'For candidates',
    audienceColor: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    title: 'You\'ve done the work.\nYour CV doesn\'t show it.',
    scenario:
      'A non-linear career. A sector change. Years of portfolio work that doesn\'t compress into bullet points. The ATS filters you out before a human ever reads your name.',
    shift:
      'A signal profile shows how you think — not what a keyword algorithm expects to see. Your diagnostic instinct, your approach to ambiguity, your stakeholder instincts. All of it surfaced from a 25-minute task set.',
  },
  {
    audience: 'For candidates',
    audienceColor: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    title: 'You keep getting to final stage\nand losing.',
    scenario:
      'You\'re great at the job. You\'re less great at performing your greatness in a one-hour interview. You can\'t always articulate your instincts under pressure in a room with strangers.',
    shift:
      'Your signal profile does the articulating before the interview starts. Employers arrive knowing how you approach trade-offs and what your strongest dimensions are — the conversation begins in a different place.',
  },
  {
    audience: 'For employers',
    audienceColor: 'text-violet-600 bg-violet-50 border-violet-100',
    title: 'You hired the perfect CV.\nIt went wrong.',
    scenario:
      'Ten years of experience. Great references. Couldn\'t handle the ambiguity. Struggled with the pace. Left inside a year. The CV told you what they\'d done — not how they\'d operate in your specific environment.',
    shift:
      'A role fit pack makes your actual demands visible upfront — pace, autonomy, trade-offs, decision style. Candidates self-select against reality, not a sanitised job description. The analysis flags tensions before you\'re three months in.',
  },
  {
    audience: 'For employers',
    audienceColor: 'text-violet-600 bg-violet-50 border-violet-100',
    title: 'Six interview rounds.\nStill feels like a coin flip.',
    scenario:
      'More interviews don\'t produce more certainty without a shared frame. No one agreed upfront what good actually looks like for this role. The panel debrief runs long and ends in a shrug.',
    shift:
      'A fit pack forces that definition before you start. What does success look like in 90 days? What are the three non-negotiable trade-offs? Once that\'s written down, every candidate is assessed against the same thing.',
  },
];

const BELIEFS = [
  {
    n: '01',
    statement: 'A CV tells you what someone has done.\nIt tells you almost nothing about how they think.',
  },
  {
    n: '02',
    statement: 'Mutual fit isn\'t a nice-to-have.\nIt\'s why most people leave within 18 months.',
  },
  {
    n: '03',
    statement: 'More interview rounds don\'t reduce uncertainty.\nA shared frame for what good looks like does.',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-4">About Fit.</p>
        <h1 className="text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-6">
          Hiring is still broken.<br />
          <span className="text-indigo-600">We have a theory about why.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          The problem isn't that hiring is hard. It's that the tools haven't changed — CVs, job descriptions, gut-feel interviews. Fit. is an experiment in replacing claims with evidence, on both sides.
        </p>
      </section>

      {/* Use cases */}
      <section className="bg-gray-50 border-y border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Where we fit</p>
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-10">
            Four situations we're built for
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
                <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full border ${uc.audienceColor}`}>
                  {uc.audience}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 leading-snug whitespace-pre-line">
                  {uc.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{uc.scenario}</p>
                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">What changes</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{uc.shift}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">What we believe</p>
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-10">
          Three things that shape everything we build
        </h2>
        <div className="space-y-8">
          {BELIEFS.map((b) => (
            <div key={b.n} className="flex gap-8 items-start">
              <span className="text-4xl font-bold text-gray-100 flex-shrink-0 w-12">{b.n}</span>
              <p className="text-xl font-medium text-gray-800 leading-snug whitespace-pre-line pt-1">{b.statement}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The hypothesis */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">This is a prototype</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">We're testing a hypothesis, not shipping a product.</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Fit. is an early-stage experiment. We're exploring whether short, structured tasks produce better hiring signal than CVs — and whether candidates and employers both get enough value to change their behaviour.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            The things we're most curious about: whether candidates will trust a process that asks them to show their thinking, whether employers will act on a signal profile without a traditional interview first, and whether mutual transparency actually reduces mismatched hires.
          </p>
          <div className="flex gap-3">
            <Link
              to="/candidate/signup"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Try it as a candidate
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/employer/onboarding"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-indigo-200 text-indigo-700 text-sm font-medium rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Try it as an employer
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
