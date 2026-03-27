import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { clsx } from 'clsx';

const STEPS = [
  { id: 1, label: 'Role basics' },
  { id: 2, label: 'Environment' },
  { id: 3, label: 'Trade-offs' },
  { id: 4, label: 'Context' },
  { id: 5, label: 'Review' },
];

type Pace = 'slow' | 'moderate' | 'fast';
type Ambiguity = 'low' | 'medium' | 'high';
type CollaborationIntensity = 'low' | 'medium' | 'high';
type AutonomyExpected = 'low' | 'medium' | 'high';
type ProcessMaturity = 'immature' | 'evolving' | 'mature';

interface FormData {
  roleTitle: string;
  companyName: string;
  roleFamily: string;
  seniority: string;
  successStatement: string;
  environmentDescription: string;
  frustrationFactors: string;
  tradeoffs: string[];
  decisionStyle: string;
  pace: Pace;
  ambiguity: Ambiguity;
  collaborationIntensity: CollaborationIntensity;
  autonomyExpected: AutonomyExpected;
  processMaturity: ProcessMaturity;
}

const TRADEOFF_OPTIONS = [
  'Speed vs polish',
  'Standardisation vs flexibility',
  'Autonomy vs alignment',
  'Exploration vs predictability',
  'Breadth vs depth',
  'Individual output vs team consensus',
  'Short-term delivery vs long-term quality',
];

const INITIAL: FormData = {
  roleTitle: '',
  companyName: '',
  roleFamily: '',
  seniority: '',
  successStatement: '',
  environmentDescription: '',
  frustrationFactors: '',
  tradeoffs: [],
  decisionStyle: '',
  pace: 'moderate',
  ambiguity: 'medium',
  collaborationIntensity: 'medium',
  autonomyExpected: 'medium',
  processMaturity: 'evolving',
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-gray-700 mb-1.5">{children}</label>;
}

function TextArea({ value, onChange, placeholder, rows = 4 }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 resize-none placeholder-gray-400 text-gray-700 leading-relaxed"
    />
  );
}

function TextInput({ value, onChange, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 placeholder-gray-400 text-gray-700"
    />
  );
}

function SelectRow({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-600 mb-2">{label}</p>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={clsx(
              'flex-1 py-2 text-xs font-medium rounded-lg border transition-all',
              value === opt.value
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CreateFitPack() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const navigate = useNavigate();

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleTradeoff(item: string) {
    setForm((prev) => ({
      ...prev,
      tradeoffs: prev.tradeoffs.includes(item)
        ? prev.tradeoffs.filter((t) => t !== item)
        : prev.tradeoffs.length < 3
        ? [...prev.tradeoffs, item]
        : prev.tradeoffs,
    }));
  }

  function handleSubmit() {
    sessionStorage.setItem('signal_newFitPack', JSON.stringify(form));
    navigate('/employer/dashboard');
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8 overflow-x-auto">
        <StepIndicator steps={STEPS} currentStep={step} />
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Step 1</p>
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">Role basics</h2>
            <p className="text-sm text-gray-500">The fundamentals of the role you're building a fit pack for.</p>
          </div>
          <div>
            <FieldLabel>Role title</FieldLabel>
            <TextInput value={form.roleTitle} onChange={(v) => update('roleTitle', v)} placeholder="e.g. Senior Service Designer" />
          </div>
          <div>
            <FieldLabel>Company or team name</FieldLabel>
            <TextInput value={form.companyName} onChange={(v) => update('companyName', v)} placeholder="e.g. Lumio" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Role family</FieldLabel>
              <select
                value={form.roleFamily}
                onChange={(e) => update('roleFamily', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700 bg-white"
              >
                <option value="">Select...</option>
                <option value="product">Product</option>
                <option value="service-design">Service Design</option>
                <option value="operations">Operations</option>
                <option value="customer-success">Customer Success</option>
                <option value="programme-delivery">Programme Delivery</option>
              </select>
            </div>
            <div>
              <FieldLabel>Seniority level</FieldLabel>
              <select
                value={form.seniority}
                onChange={(e) => update('seniority', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700 bg-white"
              >
                <option value="">Select...</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
                <option value="Lead / Principal">Lead / Principal</option>
                <option value="Head of">Head of</option>
                <option value="Director">Director</option>
              </select>
            </div>
          </div>
          <div>
            <FieldLabel>What does success look like in the first 90 days?</FieldLabel>
            <TextArea
              value={form.successStatement}
              onChange={(v) => update('successStatement', v)}
              placeholder="Be specific — what will this person have done, built, or changed in their first three months?"
              rows={5}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Step 2</p>
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">The environment</h2>
            <p className="text-sm text-gray-500">Help candidates understand what they're actually stepping into.</p>
          </div>
          <div>
            <FieldLabel>Describe the environment this person will work in</FieldLabel>
            <TextArea
              value={form.environmentDescription}
              onChange={(v) => update('environmentDescription', v)}
              placeholder="What's the team like? What stage is the organisation at? What's the culture around pace, ambiguity, and structure?"
              rows={5}
            />
          </div>
          <div>
            <FieldLabel>What tends to frustrate people in this role?</FieldLabel>
            <TextArea
              value={form.frustrationFactors}
              onChange={(v) => update('frustrationFactors', v)}
              placeholder="Be honest — what kinds of people struggle here? What behaviours or expectations mismatch?"
              rows={4}
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700">Environment profile</p>
            <SelectRow
              label="Pace"
              value={form.pace}
              options={[
                { value: 'slow', label: 'Slow' },
                { value: 'moderate', label: 'Moderate' },
                { value: 'fast', label: 'Fast' },
              ]}
              onChange={(v) => update('pace', v as Pace)}
            />
            <SelectRow
              label="Ambiguity"
              value={form.ambiguity}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
              onChange={(v) => update('ambiguity', v as Ambiguity)}
            />
            <SelectRow
              label="Collaboration intensity"
              value={form.collaborationIntensity}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
              onChange={(v) => update('collaborationIntensity', v as CollaborationIntensity)}
            />
            <SelectRow
              label="Autonomy expected"
              value={form.autonomyExpected}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
              onChange={(v) => update('autonomyExpected', v as AutonomyExpected)}
            />
            <SelectRow
              label="Process maturity"
              value={form.processMaturity}
              options={[
                { value: 'immature', label: 'Immature' },
                { value: 'evolving', label: 'Evolving' },
                { value: 'mature', label: 'Mature' },
              ]}
              onChange={(v) => update('processMaturity', v as ProcessMaturity)}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Step 3</p>
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">Role trade-offs</h2>
            <p className="text-sm text-gray-500">Select the top 3 trade-offs this role genuinely requires.</p>
          </div>
          <div className="space-y-2">
            {TRADEOFF_OPTIONS.map((option) => {
              const selected = form.tradeoffs.includes(option);
              const disabled = !selected && form.tradeoffs.length >= 3;
              return (
                <button
                  key={option}
                  onClick={() => toggleTradeoff(option)}
                  disabled={disabled}
                  className={clsx(
                    'w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-between',
                    selected
                      ? 'bg-indigo-50 border-indigo-300'
                      : disabled
                      ? 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  )}
                >
                  <span className={clsx('text-sm font-medium', selected ? 'text-indigo-800' : 'text-gray-700')}>
                    {option}
                  </span>
                  {selected && (
                    <span className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-white" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-400">
            {form.tradeoffs.length}/3 selected
            {form.tradeoffs.length < 3 && ` — choose ${3 - form.tradeoffs.length} more`}
          </p>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Step 4</p>
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">Decision context</h2>
            <p className="text-sm text-gray-500">Help candidates understand how this organisation actually makes decisions.</p>
          </div>
          <div>
            <FieldLabel>How do decisions tend to get made here?</FieldLabel>
            <TextArea
              value={form.decisionStyle}
              onChange={(v) => update('decisionStyle', v)}
              placeholder="Describe both formal and informal routes. How much does consensus matter vs individual authority? How fast do things move?"
              rows={5}
            />
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Tip:</strong> The more honest you are about how decisions actually get made — vs how they're supposed to — the better your matches will be. Candidates who can navigate your real decision environment will self-select in; those who can't will self-select out.
            </p>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Review</p>
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">Review your fit pack</h2>
            <p className="text-sm text-gray-500">Check the details before publishing.</p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Role title', value: form.roleTitle || '—' },
              { label: 'Company', value: form.companyName || '—' },
              { label: 'Role family', value: form.roleFamily || '—' },
              { label: 'Seniority', value: form.seniority || '—' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">{row.label}</span>
                <span className="text-sm font-medium text-gray-900">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">90-day success</p>
              <p className="text-sm text-gray-700">{form.successStatement || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Trade-offs</p>
              {form.tradeoffs.length > 0 ? (
                <ul className="space-y-1">
                  {form.tradeoffs.map((t) => (
                    <li key={t} className="text-sm text-gray-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No trade-offs selected</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Pace', value: form.pace },
                { label: 'Ambiguity', value: form.ambiguity },
                { label: 'Process maturity', value: form.processMaturity },
              ].map((d) => (
                <div key={d.label} className="text-center">
                  <p className="text-xs text-gray-400">{d.label}</p>
                  <p className="text-sm font-medium text-gray-700 capitalize">{d.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-8">
        {step > 1 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={15} />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Continue
            <ChevronRight size={15} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Check size={15} />
            Publish fit pack
          </button>
        )}
      </div>
    </div>
  );
}
