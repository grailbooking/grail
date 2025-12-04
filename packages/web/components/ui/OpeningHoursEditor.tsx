'use client';

import { useCallback } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import type { OpeningHours } from '@/lib/firestore-types';
import { FormSelect } from './FormSelect';

interface OpeningHoursEditorProps {
  value: OpeningHours;
  onChange: (hours: OpeningHours) => void;
  disabled?: boolean;
  className?: string;
}

const DAYS = [
  { key: 'monday', label: 'Monday', short: 'Mon' },
  { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { key: 'thursday', label: 'Thursday', short: 'Thu' },
  { key: 'friday', label: 'Friday', short: 'Fri' },
  { key: 'saturday', label: 'Saturday', short: 'Sat' },
  { key: 'sunday', label: 'Sunday', short: 'Sun' },
] as const;

const TIME_OPTIONS = generateTimeOptions();

function generateTimeOptions() {
  const options: { value: string; label: string }[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      const value = `${h}:${m}`;
      options.push({ value, label: formatTime(value) });
    }
  }
  return options;
}

function formatTime(time: string): string {
  const parts = time.split(':').map(Number);
  const hours = parts[0] ?? 0;
  const minutes = parts[1] ?? 0;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function OpeningHoursEditor({
  value,
  onChange,
  disabled,
  className,
}: OpeningHoursEditorProps) {
  const updateDay = useCallback(
    (day: string, field: 'open' | 'close' | 'closed', fieldValue: string | boolean) => {
      const currentDay = value[day] || { open: '09:00', close: '18:00' };

      onChange({
        ...value,
        [day]: {
          ...currentDay,
          [field]: fieldValue,
        },
      });
    },
    [value, onChange]
  );

  const toggleClosed = useCallback(
    (day: string) => {
      const currentDay = value[day] || { open: '09:00', close: '18:00' };
      const isClosed = currentDay.closed ?? false;

      onChange({
        ...value,
        [day]: {
          open: currentDay.open,
          close: currentDay.close,
          closed: !isClosed,
        },
      });
    },
    [value, onChange]
  );

  return (
    <div className={clsx('space-y-1', className)}>
      {/* Header */}
      <div className="grid grid-cols-[100px_1fr_1fr_70px] gap-3 pb-3 border-b border-[var(--border)]">
        <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          Day
        </div>
        <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          Opens
        </div>
        <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          Closes
        </div>
        <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider text-center">
          Closed
        </div>
      </div>

      {/* Days */}
      {DAYS.map(({ key, label, short }) => {
        const dayData = value[key] || { open: '09:00', close: '18:00' };
        const isClosed = dayData.closed ?? false;

        return (
          <div
            key={key}
            className={clsx(
              'grid grid-cols-[100px_1fr_1fr_70px] gap-3 items-center py-2.5',
              'rounded-lg transition-all duration-[var(--transition-fast)]',
              'hover:bg-[var(--surface-hover)]',
              '-mx-2 px-2',
              isClosed && 'opacity-60'
            )}
          >
            {/* Day label */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {short}
              </span>
              <span className="text-xs text-[var(--text-muted)] hidden sm:block">
                {label}
              </span>
            </div>

            {/* Open time */}
            <FormSelect
              value={dayData.open}
              onValueChange={(val) => updateDay(key, 'open', val)}
              options={TIME_OPTIONS}
              disabled={disabled || isClosed}
              className="w-full"
            />

            {/* Close time */}
            <FormSelect
              value={dayData.close}
              onValueChange={(val) => updateDay(key, 'close', val)}
              options={TIME_OPTIONS}
              disabled={disabled || isClosed}
              className="w-full"
            />

            {/* Closed checkbox */}
            <div className="flex justify-center">
              <Checkbox.Root
                checked={isClosed}
                onCheckedChange={() => toggleClosed(key)}
                disabled={disabled}
                className={clsx(
                  'w-6 h-6 rounded-md',
                  'border-2 transition-all duration-[var(--transition-fast)]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  isClosed
                    ? 'bg-[var(--accent)] border-[var(--accent)]'
                    : 'bg-transparent border-[var(--border-strong)] hover:border-[var(--accent)]'
                )}
                aria-label={isClosed ? `${label} is closed, click to open` : `${label} is open, click to close`}
              >
                <Checkbox.Indicator className="flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-[var(--text-inverse)]" />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </div>
          </div>
        );
      })}
    </div>
  );
}
