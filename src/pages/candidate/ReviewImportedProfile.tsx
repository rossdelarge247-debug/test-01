import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Pencil, Trash2, Check, X, Plus } from 'lucide-react';
import { useCandidateSession } from '../../context/CandidateSessionContext';
import type { ImportedProfile, ImportedRole } from '../../types';

// ── Inline editable text ───────────────────────────────────────────────────

function EditableText({
  value,
  onChange,
  multiline = false,
  placeholder,
  className = '',
}: {
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function commit() {
    onChange(draft);
    setEditing(false);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="space-y-1.5">
        {multiline ? (
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 text-sm border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none text-gray-700 leading-relaxed ${className}`}
          />
        ) : (
          <input
            autoFocus
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className={`w-full px-3 py-2 text-sm border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700 ${className}`}
          />
        )}
        <div className="flex gap-1.5">
          <button
            onClick={commit}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Check size={11} />
            Save
          </button>
          <button
            onClick={cancel}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X size={11} />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => { setEditing(true); setDraft(value); }}
      className="group cursor-text"
    >
      <div className="flex items-start gap-2">
        <span className={`flex-1 ${className || 'text-sm text-gray-700 leading-relaxed'} ${!value && 'text-gray-400 italic'}`}>
          {value || placeholder || 'Click to add…'}
        </span>
        <Pencil
          size={12}
          className="text-gray-300 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5"
        />
      </div>
    </div>
  );
}

// ── Role card ──────────────────────────────────────────────────────────────

function RoleCard({
  role,
  onUpdate,
  onRemove,
}: {
  role: ImportedRole;
  onUpdate: (updated: ImportedRole) => void;
  onRemove: () => void;
}) {
  function formatDate(d: string | null) {
    if (!d) return 'Present';
    const [year, month] = d.split('-');
    return `${new Date(Number(year), Number(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`;
  }

  return (
    <div className="group relative p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-rose-500 hover:border-rose-200 shadow-sm"
        title="Remove this role"
      >
        <Trash2 size={11} />
      </button>
      <div className="pr-8">
        <EditableText
          value={role.title}
          onChange={(v) => onUpdate({ ...role, title: v })}
          className="font-semibold text-gray-900"
          placeholder="Job title"
        />
        <EditableText
          value={role.company}
          onChange={(v) => onUpdate({ ...role, company: v })}
          className="text-sm text-gray-500"
          placeholder="Company"
        />
        <p className="text-xs text-gray-400 mt-0.5">
          {formatDate(role.startDate)} — {formatDate(role.endDate)}
        </p>
        {(role.description || true) && (
          <div className="mt-2">
            <EditableText
              value={role.description}
              onChange={(v) => onUpdate({ ...role, description: v })}
              multiline
              className="text-xs text-gray-500 leading-relaxed"
              placeholder="Add a short description (optional)"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────

function Section({
  label,
  source,
  children,
}: {
  label: string;
  source?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        {source && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#0A66C2]/10 border border-[#0A66C2]/20 rounded-full text-xs text-[#0A66C2] font-medium">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            imported
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export function ReviewImportedProfile() {
  const navigate = useNavigate();
  const { importedProfile, setImportedProfile } = useCandidateSession();

  // Fall back to empty state if somehow reached directly
  const [profile, setProfile] = useState<ImportedProfile>(
    importedProfile ?? {
      source: 'linkedin',
      fullName: '',
      headline: '',
      summary: '',
      roles: [],
      importedAt: new Date().toISOString(),
    }
  );

  function updateField<K extends keyof ImportedProfile>(key: K, value: ImportedProfile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  function updateRole(id: string, updated: ImportedRole) {
    setProfile((prev) => ({
      ...prev,
      roles: prev.roles.map((r) => (r.id === id ? updated : r)),
    }));
  }

  function removeRole(id: string) {
    setProfile((prev) => ({ ...prev, roles: prev.roles.filter((r) => r.id !== id) }));
  }

  function handleContinue() {
    setImportedProfile(profile);
    navigate('/candidate/role-questions');
  }

  const [firstName, ...rest] = profile.fullName.split(' ');
  const lastName = rest.join(' ');

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
          Step 1 of 3 — Review import
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-2">
          Check the basics
        </h1>
        <p className="text-gray-500 leading-relaxed">
          We've pulled in the obvious profile details from LinkedIn. Edit anything you want before continuing — or remove anything that isn't right.
        </p>
      </div>

      <div className="space-y-8">
        {/* Name */}
        <Section label="Your name" source>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border border-gray-200 rounded-xl">
              <p className="text-xs text-gray-400 mb-1.5">First name</p>
              <EditableText
                value={firstName}
                onChange={(v) =>
                  updateField('fullName', [v, lastName].filter(Boolean).join(' '))
                }
                placeholder="First name"
              />
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-xl">
              <p className="text-xs text-gray-400 mb-1.5">Last name</p>
              <EditableText
                value={lastName}
                onChange={(v) =>
                  updateField('fullName', [firstName, v].filter(Boolean).join(' '))
                }
                placeholder="Last name"
              />
            </div>
          </div>
        </Section>

        {/* Headline */}
        <Section label="Professional headline" source>
          <div className="p-3 bg-white border border-gray-200 rounded-xl">
            <EditableText
              value={profile.headline}
              onChange={(v) => updateField('headline', v)}
              placeholder="Your professional headline"
            />
          </div>
        </Section>

        {/* Summary */}
        <Section label="Summary" source>
          <div className="p-3 bg-white border border-gray-200 rounded-xl">
            <EditableText
              value={profile.summary}
              onChange={(v) => updateField('summary', v)}
              multiline
              placeholder="Your summary"
            />
          </div>
          <p className="text-xs text-gray-400">
            This is your LinkedIn about text. You can edit it to better reflect how you'd describe yourself for the kind of roles you're exploring.
          </p>
        </Section>

        {/* Roles */}
        <Section label="Recent roles" source>
          <div className="space-y-3">
            {profile.roles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                onUpdate={(updated) => updateRole(role.id, updated)}
                onRemove={() => removeRole(role.id)}
              />
            ))}
          </div>
          {profile.roles.length === 0 && (
            <p className="text-sm text-gray-400 italic px-1">
              All roles removed. You can add context manually later.
            </p>
          )}
          <button
            onClick={() =>
              setProfile((prev) => ({
                ...prev,
                roles: [
                  ...prev.roles,
                  {
                    id: String(Date.now()),
                    title: '',
                    company: '',
                    startDate: '',
                    endDate: null,
                    description: '',
                  },
                ],
              }))
            }
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 mt-1"
          >
            <Plus size={12} />
            Add a role
          </button>
        </Section>
      </div>

      {/* Post-import framing */}
      <div className="mt-10 p-5 bg-indigo-50 border border-indigo-100 rounded-2xl">
        <p className="text-sm font-semibold text-indigo-900 mb-1">
          Basics imported. Signal still to build.
        </p>
        <p className="text-sm text-indigo-700 leading-relaxed">
          Next, you'll choose a role family and complete a short set of tasks that show how you think, prioritise, and work through trade-offs. That's the part a LinkedIn profile can't show.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => navigate('/candidate/recommended-signals')}
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          Skip for now
        </button>
        <button
          onClick={handleContinue}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors text-sm"
        >
          Looks good — continue
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
