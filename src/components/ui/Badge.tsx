import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'tension' | 'neutral' | 'role';
  size?: 'sm' | 'md';
  className?: string;
}

const variants = {
  default: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  warning: 'bg-amber-50 text-amber-700 border border-amber-100',
  tension: 'bg-rose-50 text-rose-700 border border-rose-100',
  neutral: 'bg-gray-100 text-gray-600 border border-gray-200',
  role: 'bg-violet-50 text-violet-700 border border-violet-100',
};

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
