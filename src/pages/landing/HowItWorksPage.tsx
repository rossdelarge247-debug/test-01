import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Briefcase, BarChart2, RefreshCw } from 'lucide-react';

export function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">The concept</p>
      <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
        How Signal works
      </h1>
      <p className="text-lg text-gray-500 leading-relaxed mb-16">
        Signal is built around one idea: that better hiring comes from better evidence — not more steps in the process.
      </p>

      <div className="space-y-16">
        <div className="flex gap-8">
          <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
            <FileText size={22} className="text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">The signal profile</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              A candidate's signal profile is built from short, role-relevant tasks — not a CV. Each task is designed to surface how someone thinks, prioritises, and navigates trade-offs. Responses are honest and short. The profile is reusable across multiple roles.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Task types include:</p>
              <ul className="space-y-1.5 text-sm text-gray-500">
                <li>· Prioritisation — rank a set of actions in a real scenario</li>
                <li>· Trade-off choice — which tension feels most natural to you</li>
                <li>· Short scenario response — what would you actually do</li>
                <li>· Critique task — what's the real problem here</li>
                <li>· Sketch task — map a rough process or approach</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-shrink-0 w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center">
            <Briefcase size={22} className="text-violet-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">The role fit pack</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Employers don't just post a job description. They create a fit pack — a structured view of what the role really demands. This means naming trade-offs, describing the environment honestly, and defining what success looks like in 90 days.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Fit packs capture:</p>
              <ul className="space-y-1.5 text-sm text-gray-500">
                <li>· What good looks like in the first 90 days</li>
                <li>· What tends to frustrate people in this role</li>
                <li>· The top three trade-offs this role requires</li>
                <li>· How decisions get made</li>
                <li>· Pace, ambiguity, autonomy, and process maturity</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <BarChart2 size={22} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">The fit analysis</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Signal compares the candidate profile and the role fit pack across a set of shared dimensions — things like ambiguity comfort, execution bias, stakeholder sensitivity, and collaboration preference. The output is a nuanced view of alignment and tension — not a score.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">The fit view shows:</p>
              <ul className="space-y-1.5 text-sm text-gray-500">
                <li>· An overall fit summary in plain language</li>
                <li>· Three or more specific alignment highlights</li>
                <li>· Two or three tension areas worth exploring</li>
                <li>· Evidence snippets from the candidate's responses</li>
                <li>· Suggested interview prompts to explore the tensions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
            <RefreshCw size={22} className="text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Reusable, not disposable</h2>
            <p className="text-gray-500 leading-relaxed">
              Unlike a CV or a one-off application, the signal profile is owned by the candidate and persists over time. As you complete more tasks or respond to different role families, your profile deepens. You bring it to multiple roles — it's yours, not the employer's.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-10 border-t border-gray-100 flex gap-4">
        <Link
          to="/candidate/onboarding"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Try as a candidate
          <ArrowRight size={15} />
        </Link>
        <Link
          to="/employer/onboarding"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
        >
          Try as an employer
        </Link>
      </div>
    </div>
  );
}
