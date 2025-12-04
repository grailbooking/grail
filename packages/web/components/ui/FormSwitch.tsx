'use client';

import * as Switch from '@radix-ui/react-switch';
import clsx from 'clsx';

interface FormSwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function FormSwitch({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
  className,
}: FormSwitchProps) {
  return (
    <label
      className={clsx(
        'flex items-start justify-between gap-4 py-3 cursor-pointer',
        'group transition-colors duration-200',
        'rounded-xl px-4 -mx-4',
        'hover:bg-[var(--surface-hover)]',
        disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
          {label}
        </span>
        {description && (
          <span className="text-xs text-[var(--text-muted)] max-w-sm">
            {description}
          </span>
        )}
      </div>

      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={clsx(
          'relative inline-flex h-7 w-12 shrink-0 rounded-full',
          'border-2 border-transparent cursor-pointer',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
          'disabled:cursor-not-allowed',
          'data-[state=unchecked]:bg-[var(--border-strong)]',
          'data-[state=checked]:bg-[var(--accent)]',
          'data-[state=checked]:shadow-[var(--shadow-gold)]'
        )}
      >
        <Switch.Thumb
          className={clsx(
            'pointer-events-none block h-6 w-6 rounded-full',
            'bg-white shadow-[var(--shadow-sm)]',
            'transition-transform duration-200',
            'data-[state=unchecked]:translate-x-0',
            'data-[state=checked]:translate-x-5'
          )}
        />
      </Switch.Root>
    </label>
  );
}
