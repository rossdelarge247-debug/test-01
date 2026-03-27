import { Zap, Loader2, AlertCircle } from 'lucide-react';
import type { SignalAnalysis } from '../../services/signalAnalysis';

interface Props {
  state: 'analysing' | 'done' | 'error';
  result?: SignalAnalysis;
  error?: string;
}

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  const color =
    score >= 8 ? 'bg-emerald-500' :
    score >= 5 ? 'bg-indigo-500' :
                 'bg-amber-400';
  const label =
    score >= 8 ? 'Strong signal' :
    score >= 5 ? 'Moderate signal' :
                 'Emerging signal';

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-700 tabular-nums w-6">{score}</span>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}

export function SignalAnalysisCard({ state, result, error }: Props) {
  if (state === 'analysing') {
    return (
      <div className="mt-6 p-4 border border-indigo-100 bg-indigo-50/40 rounded-xl flex items-center gap-3">
        <Loader2 size={16} className="text-indigo-500 animate-spin flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-indigo-700">Reading your response…</p>
          <p className="text-xs text-indigo-500 mt-0.5">Analysing signal strength and extracting evidence</p>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="mt-6 p-4 border border-amber-100 bg-amber-50/40 rounded-xl flex items-center gap-3">
        <AlertCircle size={16} className="text-amber-500 flex-shrink-0" />
        <p className="text-xs text-amber-700">{error || 'Analysis unavailable — you can continue.'}</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="mt-6 border border-indigo-100 bg-white rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-indigo-50/60 border-b border-indigo-100">
        <Zap size={13} className="text-indigo-500" />
        <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">Signal read</p>
        <span className="ml-auto text-xs text-indigo-400 font-medium">{result.dimensionLabel}</span>
      </div>

      <div className="p-4 space-y-4">
        {/* Score bar */}
        <ScoreBar score={result.score} />

        {/* Standout quote */}
        {result.standoutQuote && (
          <blockquote className="pl-3 border-l-2 border-indigo-200">
            <p className="text-sm text-gray-700 italic">"{result.standoutQuote}"</p>
          </blockquote>
        )}

        {/* Rationale */}
        {result.rationale && (
          <p className="text-xs text-gray-500 leading-relaxed">{result.rationale}</p>
        )}

        {/* Tags */}
        {result.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {result.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs text-indigo-600 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
