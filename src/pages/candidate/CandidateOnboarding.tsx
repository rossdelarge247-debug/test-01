import { Link } from 'react-router-dom';
import { ArrowRight, Clock, RotateCcw, Layers, CheckCircle } from 'lucide-react';
import { useCandidateSession } from '../../context/CandidateSessionContext';

export function CandidateOnboarding() {
  const { importedProfile } = useCandidateSession();
  const isLinkedInImport = !!importedProfile;
  const firstName = importedProfile?.fullName.split(' ')[0];

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* LinkedIn import confirmation banner */}
      {isLinkedInImport && (
        <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-8">
          <CheckCircle size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-emerald-800 mb-0.5">
              Profile basics imported{firstName ? `, ${firstName}` : ''}
            </p>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Your name, headline, summary, and recent roles are saved. Now let's build the part a CV can't show.
            </p>
          </div>
        </div>
      )}

      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">
        {isLinkedInImport ? 'Step 2 of 3' : 'Getting started'}
      </p>
      <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
        {isLinkedInImport ? 'Now build your signal profile' : 'Build your signal profile'}
      </h1>
      <p className="text-lg text-gray-500 leading-relaxed mb-12">
        {isLinkedInImport
          ? 'Your profile basics are in place. Next, show how you actually think, prioritise, and work through trade-offs — the part that makes matching meaningful.'
          : 'Your profile is built from short, role-relevant responses that show how you think, prioritise, and work through trade-offs.'}
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
          <strong className="text-gray-800">What to expect:</strong> You'll complete 5 short tasks — the whole thing takes under 25 minutes. You can pause and return at any point.
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
