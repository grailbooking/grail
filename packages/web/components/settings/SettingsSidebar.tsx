'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  PersonIcon,
  GearIcon,
  CardStackIcon,
  BackpackIcon,
  TimerIcon,
  ListBulletIcon,
  BellIcon,
  BarChartIcon,
  Cross2Icon,
} from '@radix-ui/react-icons';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/settings/profile',
    label: 'Shop Profile',
    icon: PersonIcon,
    description: 'Name, branding, hours',
  },
  {
    href: '/settings/operations',
    label: 'Operations',
    icon: GearIcon,
    description: 'Booking mode, queue, POS',
  },
  {
    href: '/settings/payments',
    label: 'Payments',
    icon: CardStackIcon,
    description: 'Processor, tips, taxes',
  },
  {
    href: '/settings/business',
    label: 'Business',
    icon: BackpackIcon,
    description: 'Workforce, compensation',
  },
  {
    href: '/settings/cancellation',
    label: 'Cancellation',
    icon: TimerIcon,
    description: 'Policy, fees, grace period',
  },
  {
    href: '/settings/waitlist',
    label: 'Waitlist',
    icon: ListBulletIcon,
    description: 'Queue settings, offers',
  },
  {
    href: '/settings/reminders',
    label: 'Reminders',
    icon: BellIcon,
    description: 'Notifications, channels',
  },
  {
    href: '/settings/pricing',
    label: 'Pricing',
    icon: BarChartIcon,
    description: 'Pricing mode, reports',
  },
];

interface SettingsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function SettingsSidebar({
  isOpen = true,
  onClose,
  className,
}: SettingsSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'flex flex-col w-72 h-full',
          'bg-[var(--surface)] border-r border-[var(--border)]',
          // Mobile: fixed overlay
          'fixed inset-y-0 left-0 z-50 lg:z-auto',
          'lg:relative lg:translate-x-0',
          'transition-transform duration-[var(--transition-slow)]',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <Link href="/settings" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
              <GearIcon className="w-4 h-4 text-[var(--text-inverse)]" />
            </div>
            <span className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              Settings
            </span>
          </Link>

          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
              aria-label="Close sidebar"
            >
              <Cross2Icon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item, index) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li
                  key={item.href}
                  className={clsx('animate-slide-in', `stagger-${index + 1}`)}
                  style={{ opacity: 0 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      'flex items-start gap-3 px-3 py-2.5 rounded-lg',
                      'transition-all duration-[var(--transition-fast)]',
                      'group',
                      isActive
                        ? 'bg-[var(--accent-muted)] text-[var(--accent)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                    )}
                  >
                    <Icon
                      className={clsx(
                        'w-5 h-5 mt-0.5 shrink-0',
                        'transition-colors duration-[var(--transition-fast)]',
                        isActive
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span
                        className={clsx(
                          'text-xs',
                          isActive ? 'text-[var(--accent)]/70' : 'text-[var(--text-muted)]'
                        )}
                      >
                        {item.description}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border)]">
          <Link
            href="/dashboard"
            className={clsx(
              'flex items-center gap-2 px-3 py-2 rounded-lg',
              'text-sm text-[var(--text-muted)]',
              'transition-colors duration-[var(--transition-fast)]',
              'hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
            )}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </aside>
    </>
  );
}
