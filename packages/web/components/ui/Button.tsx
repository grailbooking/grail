'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: clsx(
    'bg-[var(--accent)] text-[var(--text-inverse)]',
    'hover:bg-[var(--accent-light)]',
    'active:bg-[var(--accent-dark)]',
    'shadow-[var(--shadow-sm)]',
    'hover:shadow-[var(--shadow-gold)]'
  ),
  secondary: clsx(
    'bg-[var(--surface)] text-[var(--text-primary)]',
    'border border-[var(--border)]',
    'hover:bg-[var(--surface-hover)]',
    'hover:border-[var(--border-strong)]',
    'active:bg-[var(--surface-active)]'
  ),
  ghost: clsx(
    'bg-transparent text-[var(--text-secondary)]',
    'hover:bg-[var(--surface-hover)]',
    'hover:text-[var(--text-primary)]',
    'active:bg-[var(--surface-active)]'
  ),
  danger: clsx(
    'bg-[var(--error)] text-white',
    'hover:bg-[var(--error)]/90',
    'active:bg-[var(--error)]/80',
    'shadow-[var(--shadow-sm)]'
  ),
  outline: clsx(
    'bg-transparent text-[var(--accent)]',
    'border border-[var(--accent)]',
    'hover:bg-[var(--accent-muted)]',
    'active:bg-[var(--accent-muted)]'
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

// Loading spinner component
function LoadingSpinner({ size }: { size: ButtonSize }) {
  return (
    <svg
      className={clsx('animate-spin', iconSizeStyles[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={clsx(
          // Base styles
          'inline-flex items-center justify-center',
          'font-medium rounded-lg',
          'transition-all duration-[var(--duration-fast)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Width
          fullWidth && 'w-full',
          // Disabled state
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner or left icon */}
        {loading ? (
          <LoadingSpinner size={size} />
        ) : (
          icon && iconPosition === 'left' && (
            <span className={iconSizeStyles[size]}>{icon}</span>
          )
        )}

        {/* Button text */}
        {children && <span>{children}</span>}

        {/* Right icon (only shown when not loading) */}
        {!loading && icon && iconPosition === 'right' && (
          <span className={iconSizeStyles[size]}>{icon}</span>
        )}
      </button>
    );
  }
);

// Icon-only button variant
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon: ReactNode;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      variant = 'ghost',
      size = 'md',
      loading = false,
      icon,
      className,
      disabled,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || loading;

    const iconButtonSizes: Record<ButtonSize, string> = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    };

    return (
      <button
        ref={ref}
        className={clsx(
          // Base styles
          'inline-flex items-center justify-center',
          'rounded-lg',
          'transition-all duration-[var(--duration-fast)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
          // Variant styles
          variantStyles[variant],
          // Size styles
          iconButtonSizes[size],
          // Disabled state
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <LoadingSpinner size={size} />
        ) : (
          <span className={iconSizeStyles[size]}>{icon}</span>
        )}
      </button>
    );
  }
);
