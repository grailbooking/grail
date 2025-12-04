'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface SettingsSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: ReactNode;
  className?: string;
}

export function SettingsSection({
  title,
  description,
  icon,
  children,
  className,
}: SettingsSectionProps) {
  return (
    <section
      className={clsx(
        'p-6 rounded-2xl',
        'glass-card',
        'animate-slide-up',
        className
      )}
    >
      <div className="mb-6 flex items-start gap-4">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
            <span className="text-[var(--accent)]">{icon}</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] font-[var(--font-heading)]">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}

interface SettingsDividerProps {
  className?: string;
}

export function SettingsDivider({ className }: SettingsDividerProps) {
  return (
    <hr className={clsx('border-t border-[var(--border)] my-6', className)} />
  );
}

interface SettingsRowProps {
  label: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function SettingsRow({
  label,
  description,
  children,
  className,
}: SettingsRowProps) {
  return (
    <div
      className={clsx(
        'flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 py-4',
        'border-b border-[var(--border)] last:border-b-0 last:pb-0 first:pt-0',
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </div>
        {description && (
          <div className="mt-1 text-xs text-[var(--text-muted)] max-w-md">
            {description}
          </div>
        )}
      </div>
      <div className="sm:w-[300px] shrink-0">
        {children}
      </div>
    </div>
  );
}

// New: Settings Group for organizing related sections
interface SettingsGroupProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function SettingsGroup({
  title,
  children,
  className,
}: SettingsGroupProps) {
  return (
    <div className={clsx('space-y-6', className)}>
      {title && (
        <h2 className="text-xl font-bold text-[var(--text-primary)] font-[var(--font-heading)] px-1">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
