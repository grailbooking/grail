'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

type CardVariant = 'default' | 'glass' | 'elevated' | 'outlined' | 'ghost';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  glow?: boolean;
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: clsx(
    'bg-[var(--surface)]',
    'border border-[var(--border)]',
    'shadow-[var(--shadow-sm)]'
  ),
  glass: clsx(
    'glass-card',
    'rounded-xl'
  ),
  elevated: clsx(
    'bg-[var(--background-elevated)]',
    'border border-[var(--border)]',
    'shadow-[var(--shadow-lg)]'
  ),
  outlined: clsx(
    'bg-transparent',
    'border border-[var(--border-strong)]'
  ),
  ghost: clsx(
    'bg-transparent',
    'border border-transparent'
  ),
};

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      variant = 'default',
      padding = 'md',
      hover = false,
      glow = false,
      children,
      className,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-xl',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'hover-lift cursor-pointer',
          glow && 'animate-glow-pulse',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Card Header component
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx('mb-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Card Title component
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle({ children, className, as: Component = 'h3', ...props }, ref) {
    return (
      <Component
        ref={ref}
        className={clsx(
          'font-[var(--font-heading)] font-semibold text-[var(--text-primary)]',
          Component === 'h1' && 'text-3xl',
          Component === 'h2' && 'text-2xl',
          Component === 'h3' && 'text-xl',
          Component === 'h4' && 'text-lg',
          Component === 'h5' && 'text-base',
          Component === 'h6' && 'text-sm',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

// Card Description component
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ children, className, ...props }, ref) {
    return (
      <p
        ref={ref}
        className={clsx(
          'text-sm text-[var(--text-secondary)] mt-1',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

// Card Content component
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx('', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Card Footer component
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx(
          'mt-4 pt-4 border-t border-[var(--border)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
