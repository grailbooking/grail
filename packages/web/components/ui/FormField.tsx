'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface FormFieldProps {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  description,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-sm font-medium text-[var(--text-primary)]">
          {label}
          {required && (
            <span className="ml-1 text-[var(--accent)]" aria-label="required">
              *
            </span>
          )}
        </label>
        {error && (
          <span className="text-xs font-medium text-[var(--error)] animate-fade-in">
            {error}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-[var(--text-muted)] -mt-1 max-w-md">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}

// Inline field variant for horizontal layouts
interface FormFieldInlineProps {
  label: string;
  description?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormFieldInline({
  label,
  description,
  error,
  children,
  className,
}: FormFieldInlineProps) {
  return (
    <div
      className={clsx(
        'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3',
        'py-3 border-b border-[var(--border)] last:border-b-0',
        className
      )}
    >
      <div className="flex flex-col gap-0.5">
        <label className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
        {description && (
          <span className="text-xs text-[var(--text-muted)]">{description}</span>
        )}
        {error && (
          <span className="text-xs font-medium text-[var(--error)] animate-fade-in">
            {error}
          </span>
        )}
      </div>
      <div className="sm:w-[280px] shrink-0">{children}</div>
    </div>
  );
}
