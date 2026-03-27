import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useCandidateSession } from '../../context/CandidateSessionContext';
import { ALEX_MORGAN_IMPORT } from '../../data/linkedinSeed';

const IMPORT_STEPS = [
  { id: 1, label: 'Connecting to LinkedIn', duration: 600 },
  { id: 2, label: 'Reading name and headline', duration: 500 },
  { id: 3, label: 'Importing summary', duration: 700 },
  { id: 4, label: 'Fetching recent roles', duration: 800 },
  { id: 5, label: 'Preparing your profile', duration: 500 },
];

export function LinkedInImport() {
  const navigate = useNavigate();
  const { setImportedProfile } = useCandidateSession();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    let elapsed = 0;

    IMPORT_STEPS.forEach((step) => {
      // Mark step as active
      setTimeout(() => {
        setActiveStep(step.id);
      }, elapsed);

      elapsed += step.duration;

      // Mark step as complete
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, step.id]);
      }, elapsed);
    });

    // Store imported profile and navigate to review
    setTimeout(() => {
      setImportedProfile(ALEX_MORGAN_IMPORT);
      navigate('/candidate/review-import');
    }, elapsed + 300);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const progressPct = Math.min(
    100,
    Math.round((completedSteps.length / IMPORT_STEPS.length) * 100)
  );

  return (
    <div className="max-w-sm mx-auto px-6 py-24 text-center">
      {/* LinkedIn badge */}
      <div className="w-14 h-14 bg-[#0A66C2] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-200">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 tracking-tight mb-2">
        Importing your basics
      </h2>
      <p className="text-sm text-gray-500 mb-10">
        Just name, headline, summary, and recent roles — nothing else.
      </p>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8 overflow-hidden">
        <div
          className="h-full bg-[#0A66C2] rounded-full transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Step list */}
      <div className="space-y-3 text-left">
        {IMPORT_STEPS.map((step) => {
          const isComplete = completedSteps.includes(step.id);
          const isActive = activeStep === step.id && !isComplete;

          return (
            <div key={step.id} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isComplete
                    ? 'bg-emerald-500'
                    : isActive
                    ? 'bg-indigo-100 border-2 border-indigo-400'
                    : 'bg-gray-100 border border-gray-200'
                }`}
              >
                {isComplete && <Check size={11} className="text-white" />}
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                )}
              </div>
              <span
                className={`text-sm transition-colors ${
                  isComplete
                    ? 'text-gray-400 line-through'
                    : isActive
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
