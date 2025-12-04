'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface FormTextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  error?: boolean;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const FormTextField = forwardRef<HTMLInputElement, FormTextFieldProps>(
  function FormTextField({ error, icon, suffix, ...props }, ref) {
    return (
      <div className="relative group">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-2.5 rounded-xl',
            'bg-[var(--surface)] border border-[var(--border)]',
            'text-[var(--text-primary)] text-sm',
            'placeholder:text-[var(--text-muted)]',
            'transition-all duration-200',
            'hover:border-[var(--border-strong)]',
            'focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-muted)]',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--surface-hover)]',
            error && 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error-muted)]',
            icon && 'pl-11',
            suffix && 'pr-11'
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            {suffix}
          </div>
        )}
      </div>
    );
  }
);
