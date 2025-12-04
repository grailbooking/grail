'use client';

import clsx from 'clsx';
import { CheckCircledIcon, CrossCircledIcon, UpdateIcon } from '@radix-ui/react-icons';

type SaveState = 'idle' | 'pending' | 'saving' | 'saved' | 'error';

interface SaveStatusProps {
  state: SaveState;
  message?: string;
  lastSaved?: Date;
  className?: string;
}

export function SaveStatus({
  state,
  message,
  lastSaved,
  className,
}: SaveStatusProps) {
  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);

    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;

    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={clsx(
        'flex items-center gap-2 px-3 py-1.5 rounded-lg',
        'text-xs font-medium',
        'transition-all duration-[var(--transition-base)]',
        state === 'idle' && lastSaved && 'text-[var(--text-muted)]',
        state === 'pending' && 'text-[var(--warning)] bg-[var(--warning-muted)]',
        state === 'saving' && 'text-[var(--accent)] bg-[var(--accent-muted)]',
        state === 'saved' && 'text-[var(--success)] bg-[var(--success-muted)]',
        state === 'error' && 'text-[var(--error)] bg-[var(--error-muted)]',
        className
      )}
    >
      {state === 'pending' && (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span>Unsaved changes</span>
        </>
      )}

      {state === 'saving' && (
        <>
          <UpdateIcon className="w-3.5 h-3.5 animate-spin" />
          <span>Saving...</span>
        </>
      )}

      {state === 'saved' && (
        <>
          <CheckCircledIcon className="w-3.5 h-3.5" />
          <span>Saved</span>
        </>
      )}

      {state === 'error' && (
        <>
          <CrossCircledIcon className="w-3.5 h-3.5" />
          <span>{message || 'Failed to save'}</span>
        </>
      )}

      {state === 'idle' && lastSaved && (
        <span>Last saved {formatLastSaved(lastSaved)}</span>
      )}
    </div>
  );
}
