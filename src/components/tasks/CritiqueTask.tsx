import { useState } from 'react';

interface CritiqueTaskProps {
  artifact: string;
  onChange: (response: string) => void;
}

export function CritiqueTask({ artifact, onChange }: CritiqueTaskProps) {
  const [value, setValue] = useState('');

  function handleChange(text: string) {
    setValue(text);
    onChange(text);
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">The artefact</p>
        <p className="text-sm text-gray-700 italic leading-relaxed">{artifact}</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          What's the biggest issue, and why?
        </label>
        <textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Focus on the most important problem — you don't need to cover everything."
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 resize-none placeholder-gray-400 text-gray-700 leading-relaxed"
          rows={5}
        />
        <p className="text-xs text-gray-400">
          Be direct. A precise critique of one thing is more useful than a broad overview.
        </p>
      </div>
    </div>
  );
}
