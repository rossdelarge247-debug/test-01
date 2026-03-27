import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'indigo' | 'emerald' | 'amber' | 'rose';
  size?: 'sm' | 'md';
  className?: string;
}

const colors = {
  indigo: 'bg-indigo-600',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  color = 'indigo',
  size = 'md',
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={clsx('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1.5">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          {showValue && <span className="text-sm font-medium text-gray-900">{pct}%</span>}
        </div>
      )}
      <div className={clsx('w-full bg-gray-100 rounded-full overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2')}>
        <div
          className={clsx('h-full rounded-full transition-all duration-500', colors[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
