'use client';

import { useCallback } from 'react';
import clsx from 'clsx';
import type { OpeningHours } from '@/lib/firestore-types';

interface OpeningHoursEditorProps {
  value: OpeningHours;
  onChange: (hours: OpeningHours) => void;
  disabled?: boolean;
  className?: string;
}

const DAYS = [
  { key: 'monday', label: 'Mon' },
  { key: 'tuesday', label: 'Tue' },
  { key: 'wednesday', label: 'Wed' },
  { key: 'thursday', label: 'Thu' },
  { key: 'friday', label: 'Fri' },
  { key: 'saturday', label: 'Sat' },
  { key: 'sunday', label: 'Sun' },
] as const;

const TIME_OPTIONS = generateTimeOptions();

function generateTimeOptions() {
  const options: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      options.push(`${h}:${m}`);
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
    <div className={clsx('space-y-2', className)}>
      {/* Header */}
      <div className="grid grid-cols-[80px_1fr_1fr_60px] gap-2 pb-2 border-b border-[var(--border)]">
        <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
          Day
        </div>
        <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
          Open
        </div>
        <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
          Close
        </div>
        <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider text-center">
          Closed
        </div>
      </div>

      {/* Days */}
      {DAYS.map(({ key, label }) => {
        const dayData = value[key] || { open: '09:00', close: '18:00' };
        const isClosed = dayData.closed ?? false;

        return (
          <div
            key={key}
            className={clsx(
              'grid grid-cols-[80px_1fr_1fr_60px] gap-2 items-center py-2',
              'rounded-lg transition-colors duration-[var(--transition-fast)]',
              isClosed && 'opacity-50'
            )}
          >
            {/* Day label */}
            <div className="text-sm font-medium text-[var(--text-primary)]">
              {label}
            </div>

            {/* Open time */}
            <select
              value={dayData.open}
              onChange={(e) => updateDay(key, 'open', e.target.value)}
              disabled={disabled || isClosed}
              className={clsx(
                'px-2 py-1.5 rounded-md text-sm',
                'bg-[var(--surface)] border border-[var(--border)]',
                'text-[var(--text-primary)]',
                'transition-colors duration-[var(--transition-fast)]',
                'hover:border-[var(--text-muted)]',
                'focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {formatTime(time)}
                </option>
              ))}
            </select>

            {/* Close time */}
            <select
              value={dayData.close}
              onChange={(e) => updateDay(key, 'close', e.target.value)}
              disabled={disabled || isClosed}
              className={clsx(
                'px-2 py-1.5 rounded-md text-sm',
                'bg-[var(--surface)] border border-[var(--border)]',
                'text-[var(--text-primary)]',
                'transition-colors duration-[var(--transition-fast)]',
                'hover:border-[var(--text-muted)]',
                'focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {formatTime(time)}
                </option>
              ))}
            </select>

            {/* Closed toggle */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => toggleClosed(key)}
                disabled={disabled}
                className={clsx(
                  'w-6 h-6 rounded-md border',
                  'transition-all duration-[var(--transition-fast)]',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  isClosed
                    ? 'bg-[var(--accent)] border-[var(--accent)]'
                    : 'bg-transparent border-[var(--border)] hover:border-[var(--text-muted)]'
                )}
                aria-label={isClosed ? 'Mark as open' : 'Mark as closed'}
              >
                {isClosed && (
                  <svg
                    className="w-4 h-4 mx-auto text-[var(--text-inverse)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
