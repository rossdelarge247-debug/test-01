import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;
        const isLast = i === steps.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  isCompleted && 'bg-indigo-600 text-white',
                  isActive && 'bg-indigo-600 text-white ring-4 ring-indigo-100',
                  !isCompleted && !isActive && 'bg-gray-100 text-gray-400'
                )}
              >
                {isCompleted ? <Check size={14} /> : step.id}
              </div>
              <span
                className={clsx(
                  'text-xs mt-1.5 whitespace-nowrap',
                  isActive ? 'text-indigo-700 font-medium' : 'text-gray-400'
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={clsx(
                  'h-px w-12 mx-1 mb-4',
                  isCompleted ? 'bg-indigo-300' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
