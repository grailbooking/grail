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
        'group transition-colors duration-[var(--transition-fast)]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
          {label}
        </span>
        {description && (
          <span className="text-xs text-[var(--text-muted)]">
            {description}
          </span>
        )}
      </div>

      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={clsx(
          'relative inline-flex h-6 w-11 shrink-0 rounded-full',
          'border-2 border-transparent cursor-pointer',
          'transition-colors duration-[var(--transition-fast)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
          'disabled:cursor-not-allowed',
          'data-[state=unchecked]:bg-[var(--border)]',
          'data-[state=checked]:bg-[var(--accent)]'
        )}
      >
        <Switch.Thumb
          className={clsx(
            'pointer-events-none block h-5 w-5 rounded-full',
            'bg-[var(--text-primary)] shadow-lg',
            'transition-transform duration-[var(--transition-fast)]',
            'data-[state=unchecked]:translate-x-0',
            'data-[state=checked]:translate-x-5'
          )}
        />
      </Switch.Root>
    </label>
  );
}
