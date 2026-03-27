import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  selected?: boolean;
}

export function Card({
  children,
  padding = 'md',
  hover = false,
  selected = false,
  className,
  ...props
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-xl border shadow-sm',
        paddings[padding],
        hover && 'cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5',
        selected ? 'border-indigo-300 ring-2 ring-indigo-100' : 'border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function CardSection({ title, children, className }: CardSectionProps) {
  return (
    <div className={clsx('border-t border-gray-100 pt-4 mt-4', className)}>
      {title && <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</h4>}
      {children}
    </div>
  );
}
