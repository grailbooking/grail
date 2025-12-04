'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface FormNumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  error?: boolean;
  suffix?: string;
  prefix?: string;
}

export const FormNumberField = forwardRef<HTMLInputElement, FormNumberFieldProps>(
  function FormNumberField({ error, suffix, prefix, ...props }, ref) {
    return (
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-sm text-[var(--text-muted)]">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          type="number"
          className={clsx(
            'w-full px-3 py-2.5 rounded-lg',
            'bg-[var(--surface)] border border-[var(--border)]',
            'text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]',
            'transition-all duration-[var(--transition-fast)]',
            'hover:border-[var(--text-muted)]',
            'focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            error && 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]',
            prefix && 'pl-8',
            suffix && 'pr-12'
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 text-sm text-[var(--text-muted)]">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);
