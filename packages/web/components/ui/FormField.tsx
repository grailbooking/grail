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
        <label
          className="text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
          {required && <span className="ml-1 text-[var(--accent)]">*</span>}
        </label>
        {error && (
          <span className="text-xs text-[var(--error)] animate-fade-in">
            {error}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-[var(--text-muted)] -mt-1">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}
