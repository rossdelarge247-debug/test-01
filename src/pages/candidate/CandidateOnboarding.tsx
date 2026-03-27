import { Link } from 'react-router-dom';
import { ArrowRight, Clock, RotateCcw, Layers } from 'lucide-react';

export function CandidateOnboarding() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Getting started</p>
      <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
        Build your signal profile
      </h1>
      <p className="text-lg text-gray-500 leading-relaxed mb-12">
        Your profile is built from short, role-relevant responses that show how you think, prioritise, and work through trade-offs.
      </p>

      <div className="space-y-4 mb-12">
        {[
          {
            icon: <Clock size={18} className="text-indigo-600" />,
            title: 'This is not a test',
            description:
              "There are no right answers. The tasks are designed to surface how you genuinely operate — not to catch you out or measure you against a fixed rubric.",
          },
          {
            icon: <Layers size={18} className="text-indigo-600" />,
            title: 'Responses are short and focused',
            description:
              "Each task takes between 2 and 10 minutes. The format varies — ranking, trade-off choices, short written responses, and a simple sketch. Direct, concise answers work best.",
          },
          {
            icon: <RotateCcw size={18} className="text-indigo-600" />,
            title: 'Your profile is reusable',
            description:
              "Once complete, your signal profile can be submitted to multiple roles without repeating everything from scratch. You own it — it travels with you.",
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
          <strong className="text-gray-800">About the pack:</strong> You'll complete 5 short tasks. The whole thing should take under 25 minutes. You can pause and return — responses are saved as you go.
        </p>
      </div>

      <Link
        to="/candidate/role-family"
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
      >
        Get started
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
