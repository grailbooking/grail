'use client';

import * as RadioGroup from '@radix-ui/react-radio-group';
import clsx from 'clsx';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface FormRadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  options: RadioOption[];
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  className?: string;
}

export function FormRadioGroup({
  value,
  onValueChange,
  options,
  orientation = 'vertical',
  disabled,
  className,
}: FormRadioGroupProps) {
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      orientation={orientation}
      className={clsx(
        'flex gap-2',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        className
      )}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={clsx(
            'flex items-start gap-3 p-3 rounded-lg cursor-pointer',
            'border border-[var(--border)] bg-[var(--surface)]',
            'transition-all duration-[var(--transition-fast)]',
            'hover:border-[var(--text-muted)] hover:bg-[var(--surface-hover)]',
            value === option.value && 'border-[var(--accent)] bg-[var(--accent-muted)]',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <RadioGroup.Item
            value={option.value}
            className={clsx(
              'mt-0.5 h-4 w-4 shrink-0 rounded-full',
              'border border-[var(--text-muted)] bg-transparent',
              'transition-colors duration-[var(--transition-fast)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
              'data-[state=checked]:border-[var(--accent)]'
            )}
          >
            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            </RadioGroup.Indicator>
          </RadioGroup.Item>

          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {option.label}
            </span>
            {option.description && (
              <span className="text-xs text-[var(--text-muted)]">
                {option.description}
              </span>
            )}
          </div>
        </label>
      ))}
    </RadioGroup.Root>
  );
}
