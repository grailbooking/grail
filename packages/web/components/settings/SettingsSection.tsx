'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function SettingsSection({
  title,
  description,
  children,
  className,
}: SettingsSectionProps) {
  return (
    <section
      className={clsx(
        'p-6 rounded-xl',
        'bg-[var(--surface)] border border-[var(--border)]',
        'animate-slide-up',
        className
      )}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] font-[var(--font-heading)]">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {description}
          </p>
        )}
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
    <hr className={clsx('border-t border-[var(--border)] my-4', className)} />
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
        'flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 py-3',
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </div>
        {description && (
          <div className="mt-0.5 text-xs text-[var(--text-muted)]">
            {description}
          </div>
        )}
      </div>
      <div className="sm:w-[280px] shrink-0">
        {children}
      </div>
    </div>
  );
}
