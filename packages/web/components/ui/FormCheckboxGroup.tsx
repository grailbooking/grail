'use client';

import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
}

interface FormCheckboxGroupProps {
  values: string[];
  onValuesChange: (values: string[]) => void;
  options: CheckboxOption[];
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  className?: string;
}

export function FormCheckboxGroup({
  values,
  onValuesChange,
  options,
  orientation = 'vertical',
  disabled,
  className,
}: FormCheckboxGroupProps) {
  const handleCheckedChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onValuesChange([...values, optionValue]);
    } else {
      onValuesChange(values.filter((v) => v !== optionValue));
    }
  };

  return (
    <div
      className={clsx(
        'flex gap-2',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        className
      )}
    >
      {options.map((option) => {
        const isChecked = values.includes(option.value);

        return (
          <label
            key={option.value}
            className={clsx(
              'flex items-start gap-3 p-3 rounded-lg cursor-pointer',
              'border border-[var(--border)] bg-[var(--surface)]',
              'transition-all duration-[var(--transition-fast)]',
              'hover:border-[var(--text-muted)] hover:bg-[var(--surface-hover)]',
              isChecked && 'border-[var(--accent)] bg-[var(--accent-muted)]',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Checkbox.Root
              checked={isChecked}
              onCheckedChange={(checked) =>
                handleCheckedChange(option.value, checked === true)
              }
              disabled={disabled}
              className={clsx(
                'mt-0.5 h-4 w-4 shrink-0 rounded',
                'border border-[var(--text-muted)] bg-transparent',
                'transition-colors duration-[var(--transition-fast)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
                'data-[state=checked]:bg-[var(--accent)] data-[state=checked]:border-[var(--accent)]'
              )}
            >
              <Checkbox.Indicator className="flex items-center justify-center text-[var(--text-inverse)]">
                <CheckIcon className="h-3 w-3" />
              </Checkbox.Indicator>
            </Checkbox.Root>

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
        );
      })}
    </div>
  );
}
