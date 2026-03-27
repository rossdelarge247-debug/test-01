import { clsx } from 'clsx';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'indigo' | 'violet' | 'emerald' | 'amber';
  className?: string;
}

const colors = {
  indigo: 'bg-indigo-100 text-indigo-700',
  violet: 'bg-violet-100 text-violet-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
};

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
};

export function Avatar({ initials, size = 'md', color = 'indigo', className }: AvatarProps) {
  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center font-semibold flex-shrink-0',
        colors[color],
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
