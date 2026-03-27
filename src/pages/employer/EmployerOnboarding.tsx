import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, GitMerge } from 'lucide-react';

export function EmployerOnboarding() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">For employers</p>
      <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
        Create a role fit pack
      </h1>
      <p className="text-lg text-gray-500 leading-relaxed mb-12">
        A fit pack helps you describe the real shape of a role — not just responsibilities and requirements. It's what makes the matching meaningful.
      </p>

      <div className="space-y-4 mb-12">
        {[
          {
            icon: <Target size={18} className="text-indigo-600" />,
            title: 'Define what actually matters',
            description:
              "A fit pack goes beyond a job description. You'll describe what success looks like, what tends to frustrate people, and the real trade-offs the role demands. This context is what makes matching work.",
          },
          {
            icon: <Eye size={18} className="text-indigo-600" />,
            title: 'Expose the real environment',
            description:
              "Candidates see what the role genuinely looks like — pace, ambiguity, how decisions get made. Honest descriptions attract people who will thrive in your actual environment, not a curated version of it.",
          },
          {
            icon: <GitMerge size={18} className="text-indigo-600" />,
            title: 'Get richer evidence than a CV',
            description:
              "You'll be matched against candidate signal profiles — short, role-relevant responses that show how people think and work. Better evidence leads to better conversations.",
          },
        ].map((point) => (
          <div key={point.title} className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl">
            <div className="flex-shrink-0 w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center">
              {point.icon}
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">{point.title}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{point.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-10">
        <p className="text-sm text-gray-600 leading-relaxed">
          <strong className="text-gray-800">About the builder:</strong> The fit pack takes about 10–15 minutes to complete. It's a guided form with structured fields — not a blank job description template.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          to="/employer/create-fit-pack"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Create a fit pack
          <ArrowRight size={16} />
        </Link>
        <Link
          to="/employer/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
        >
          View example roles
        </Link>
      </div>
    </div>
  );
}
