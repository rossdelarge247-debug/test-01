import { clsx } from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-600',
  secondary: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 border border-transparent',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 border border-rose-600',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
