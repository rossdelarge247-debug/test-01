import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import type { RoleFamily } from '../../types';

const ROLE_FAMILIES: { id: RoleFamily; label: string; description: string; color: string }[] = [
  {
    id: 'product',
    label: 'Product',
    description: 'Product management, strategy, discovery, and roadmap ownership',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-300',
  },
  {
    id: 'service-design',
    label: 'Service Design',
    description: 'Service design, UX, research, and experience design',
    color: 'bg-violet-50 border-violet-200 hover:border-violet-300',
  },
  {
    id: 'operations',
    label: 'Operations',
    description: 'Operations, process design, transformation, and delivery management',
    color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-300',
  },
  {
    id: 'customer-success',
    label: 'Customer Success',
    description: 'Customer success, account management, and post-sale experience',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-300',
  },
  {
    id: 'programme-delivery',
    label: 'Programme Delivery',
    description: 'Programme, project, and change delivery',
    color: 'bg-rose-50 border-rose-200 hover:border-rose-300',
  },
];

export function RoleFamilySelection() {
  const [selected, setSelected] = useState<RoleFamily | null>(null);
  const navigate = useNavigate();

  function handleContinue() {
    if (selected) {
      sessionStorage.setItem('signal_roleFamily', selected);
      navigate('/candidate/signal-tasks');
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Step 1 of 2 — Focus area</p>
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-2">
        What kind of work do you do?
      </h1>
      <p className="text-gray-500 mb-3 leading-relaxed">
        Your tasks will be tailored to this area — the scenarios, trade-offs, and priorities that are most relevant to how you actually work.
      </p>
      <p className="text-xs text-gray-400 mb-10">
        Pick the closest match. You can always complete tasks from other areas later.
      </p>

      <div className="space-y-3 mb-10">
        {ROLE_FAMILIES.map((family) => (
          <button
            key={family.id}
            onClick={() => setSelected(family.id)}
            className={clsx(
              'w-full text-left p-4 rounded-xl border-2 transition-all',
              family.color,
              selected === family.id ? 'ring-2 ring-indigo-300 ring-offset-2' : ''
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{family.label}</p>
                <p className="text-sm text-gray-500 mt-0.5">{family.description}</p>
              </div>
              {selected === family.id && (
                <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 ml-3">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected}
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to signal tasks
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
