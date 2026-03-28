import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Users, GitMerge, Sparkles } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-medium text-indigo-700 mb-8">
          <Sparkles size={12} />
          Rethinking how mutual fit works
        </div>
        <h1 className="text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-6">
          Because "results-driven team player" is not a personality.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
          Signal replaces CVs and vague job descriptions with short, role-relevant interactions —
          so both sides get a clearer picture of genuine alignment before committing.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/candidate/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors text-sm"
          >
            Build my signal profile
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/employer/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            Create a role fit pack
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider text-center mb-3">How it works</p>
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-14 tracking-tight">
            Two sides. One clear picture.
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Layers size={22} className="text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Candidates build signal profiles</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Short, role-relevant tasks that reveal how you think, prioritise, and work through trade-offs — reusable across multiple roles.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={22} className="text-violet-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Employers create fit packs</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Structured role descriptions that go beyond responsibilities — exposing real trade-offs, environment, and what success actually looks like.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GitMerge size={22} className="text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Signal surfaces alignment</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Compare both sides and get a clear view of where there's genuine fit — and where there are tensions worth exploring in conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contrast section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 gap-10 items-start">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">The old way</p>
            <ul className="space-y-3">
              {[
                'CV keyword matching',
                'Vague job descriptions',
                'One-way screening',
                'Interviews with no shared frame',
                'Gut feel and cultural fit guesses',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-500">
                  <span className="w-4 h-4 rounded-full bg-gray-200 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-4">The Signal way</p>
            <ul className="space-y-3">
              {[
                'Short, reusable evidence responses',
                'Structured role fit packs',
                'Mutual alignment view',
                'Evidence-led interview prompts',
                'Clear signals on trade-offs and ways of working',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-indigo-700">
                  <span className="w-4 h-4 rounded-full bg-indigo-200 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">
            Ready to try a different approach?
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Explore the prototype as a candidate building a signal profile, or as an employer creating a role fit pack.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/candidate/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm"
            >
              I'm a candidate
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/employer/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-gray-700 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-colors text-sm"
            >
              I'm hiring
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
