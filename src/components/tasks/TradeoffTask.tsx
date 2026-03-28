import { useState } from 'react';
import { clsx } from 'clsx';
import type { TradeoffOption } from '../../types';

interface TradeoffTaskProps {
  options: TradeoffOption[];
  onSelect: (optionId: string, rationale: string) => void;
}

export function TradeoffTask({ options, onSelect }: TradeoffTaskProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [rationale, setRationale] = useState('');

  function handleSelect(id: string) {
    setSelected(id);
    onSelect(id, rationale);
  }

  function handleRationale(value: string) {
    setRationale(value);
    if (selected) onSelect(selected, value);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={clsx(
              'text-left p-4 rounded-xl border-2 transition-all',
              selected === option.id
                ? 'border-indigo-400 bg-indigo-50 ring-2 ring-indigo-100'
                : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
            )}
          >
            <p className={clsx('font-medium text-sm', selected === option.id ? 'text-indigo-800' : 'text-gray-800')}>
              {option.label}
            </p>
            <p className={clsx('text-xs mt-1 leading-relaxed', selected === option.id ? 'text-indigo-600' : 'text-gray-500')}>
              {option.description}
            </p>
          </button>
        ))}
      </div>

      {selected && (
        <div className="space-y-2 animate-in slide-in-from-bottom-2">
          <label className="block text-sm font-medium text-gray-700">
            In one or two sentences, why does this feel natural to you?
          </label>
          <textarea
            value={rationale}
            onChange={(e) => handleRationale(e.target.value)}
            placeholder="e.g. I find that moving with incomplete information is faster overall, because you learn more from a real attempt than from extended planning..."
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 resize-none placeholder-gray-400 text-gray-700"
            rows={3}
          />
        </div>
      )}
    </div>
  );
}
