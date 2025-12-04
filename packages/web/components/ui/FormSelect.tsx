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
          'w-full px-3 py-2.5 rounded-lg',
          'bg-[var(--surface)] border border-[var(--border)]',
          'text-sm text-[var(--text-primary)]',
          'transition-all duration-[var(--transition-fast)]',
          'hover:border-[var(--text-muted)]',
          'focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'data-[placeholder]:text-[var(--text-muted)]',
          error && 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]',
          className
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon className="h-4 w-4 text-[var(--text-muted)]" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={clsx(
            'overflow-hidden rounded-lg',
            'bg-[var(--surface)] border border-[var(--border)]',
            'shadow-[var(--shadow-lg)]',
            'animate-fade-in'
          )}
          position="popper"
          sideOffset={4}
        >
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={clsx(
                  'relative flex items-center gap-2 px-3 py-2 rounded-md',
                  'text-sm text-[var(--text-primary)] cursor-pointer',
                  'transition-colors duration-[var(--transition-fast)]',
                  'outline-none',
                  'hover:bg-[var(--surface-hover)]',
                  'focus:bg-[var(--surface-hover)]',
                  'data-[highlighted]:bg-[var(--surface-hover)]',
                  'data-[state=checked]:text-[var(--accent)]'
                )}
              >
                <Select.ItemText>
                  <div className="flex flex-col">
                    <span>{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-[var(--text-muted)]">
                        {option.description}
                      </span>
                    )}
                  </div>
                </Select.ItemText>
                <Select.ItemIndicator className="absolute right-2">
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
