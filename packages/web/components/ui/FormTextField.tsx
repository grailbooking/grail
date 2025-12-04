'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface FormTextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  error?: boolean;
  icon?: React.ReactNode;
}

export const FormTextField = forwardRef<HTMLInputElement, FormTextFieldProps>(
  function FormTextField({ error, icon, ...props }, ref) {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-3 py-2.5 rounded-lg',
            'bg-[var(--surface)] border border-[var(--border)]',
            'text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]',
            'transition-all duration-[var(--transition-fast)]',
            'hover:border-[var(--text-muted)]',
            'focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]',
            icon && 'pl-10'
          )}
          {...props}
        />
      </div>
    );
  }
);
