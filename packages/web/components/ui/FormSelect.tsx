'use client';

import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface FormSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export function FormSelect({
  value,
  onValueChange,
  options,
  placeholder = 'Select...',
  disabled,
  error,
  className,
}: FormSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <Select.Trigger
        className={clsx(
          'inline-flex items-center justify-between gap-2',
          'w-full px-4 py-2.5 rounded-xl',
          'bg-[var(--surface)] border border-[var(--border)]',
          'text-sm text-[var(--text-primary)]',
          'transition-all duration-200',
          'hover:border-[var(--border-strong)]',
          'focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-muted)]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--surface-hover)]',
          'data-[placeholder]:text-[var(--text-muted)]',
          error && 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error-muted)]',
          className
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon className="h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={clsx(
            'overflow-hidden rounded-xl',
            'bg-[var(--surface)] border border-[var(--border)]',
            'shadow-[var(--shadow-xl)]',
            'animate-scale-in',
            'z-50'
          )}
          position="popper"
          sideOffset={4}
        >
          <Select.Viewport className="p-1.5 max-h-[300px]">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={clsx(
                  'relative flex items-center gap-2 px-3 py-2.5 rounded-lg',
                  'text-sm text-[var(--text-primary)] cursor-pointer',
                  'transition-colors duration-150',
                  'outline-none select-none',
                  'hover:bg-[var(--surface-hover)]',
                  'focus:bg-[var(--surface-hover)]',
                  'data-[highlighted]:bg-[var(--surface-hover)]',
                  'data-[state=checked]:bg-[var(--accent-muted)]',
                  'data-[state=checked]:text-[var(--accent)]'
                )}
              >
                <Select.ItemText>
                  <div className="flex flex-col">
                    <span className="font-medium">{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-[var(--text-muted)]">
                        {option.description}
                      </span>
                    )}
                  </div>
                </Select.ItemText>
                <Select.ItemIndicator className="absolute right-3">
                  <CheckIcon className="h-4 w-4 text-[var(--accent)]" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
