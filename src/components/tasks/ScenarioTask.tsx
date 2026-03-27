import { useState } from 'react';

const MAX_CHARS = 500;

interface ScenarioTaskProps {
  onChange: (response: string) => void;
}

export function ScenarioTask({ onChange }: ScenarioTaskProps) {
  const [value, setValue] = useState('');

  function handleChange(text: string) {
    if (text.length <= MAX_CHARS) {
      setValue(text);
      onChange(text);
    }
  }

  const pct = (value.length / MAX_CHARS) * 100;

  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write your response here. Focus on what you would actually do — not what sounds ideal in theory."
        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 resize-none placeholder-gray-400 text-gray-700 leading-relaxed"
        rows={6}
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Keep it focused — short, direct responses are often more revealing than long ones.</p>
        <div className="flex items-center gap-2">
          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-400 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className={`text-xs ${value.length > MAX_CHARS * 0.9 ? 'text-amber-600' : 'text-gray-400'}`}>
            {MAX_CHARS - value.length}
          </span>
        </div>
      </div>
    </div>
  );
}
