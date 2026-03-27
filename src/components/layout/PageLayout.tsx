import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const maxWidths = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export function PageLayout({ children, maxWidth = 'xl', className }: PageLayoutProps) {
  return (
    <main className={clsx('mx-auto px-6 py-10', maxWidths[maxWidth], className)}>
      {children}
    </main>
  );
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <div className={clsx('flex items-start justify-between mb-8', className)}>
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">{eyebrow}</p>
        )}
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-gray-500 mt-1.5 text-sm leading-relaxed max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 ml-6 flex-shrink-0">{actions}</div>}
    </div>
  );
}

interface SidebarLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  sidebarWidth?: 'sm' | 'md';
}

export function SidebarLayout({ sidebar, main, sidebarWidth = 'md' }: SidebarLayoutProps) {
  return (
    <div className="flex gap-8">
      <aside className={clsx('flex-shrink-0', sidebarWidth === 'sm' ? 'w-56' : 'w-72')}>
        {sidebar}
      </aside>
      <div className="flex-1 min-w-0">{main}</div>
    </div>
  );
}
