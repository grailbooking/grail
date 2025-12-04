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
  ChevronLeftIcon,
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'flex flex-col w-72 h-full',
          'glass-card-elevated',
          'border-r border-[var(--border)]',
          // Mobile: fixed overlay
          'fixed inset-y-0 left-0 z-50 lg:z-auto',
          'lg:relative lg:translate-x-0',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <Link href="/settings" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center shadow-[var(--shadow-gold)]">
              <GearIcon className="w-5 h-5 text-[var(--text-inverse)]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors font-[var(--font-heading)]">
                Settings
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                Configure your shop
              </span>
            </div>
          </Link>

          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all"
              aria-label="Close sidebar"
            >
              <Cross2Icon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 scrollbar-hide">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item, index) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li
                  key={item.href}
                  className={clsx(
                    'animate-slide-in',
                    `stagger-${index + 1}`
                  )}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      'relative flex items-start gap-3 px-3 py-3 rounded-xl',
                      'transition-all duration-200',
                      'group',
                      isActive
                        ? 'bg-[var(--accent-muted)] text-[var(--accent)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                    )}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-[var(--accent)] animate-scale-in" />
                    )}

                    <div
                      className={clsx(
                        'flex items-center justify-center w-9 h-9 rounded-lg shrink-0',
                        'transition-all duration-200',
                        isActive
                          ? 'bg-[var(--accent)] text-[var(--text-inverse)] shadow-[var(--shadow-gold)]'
                          : 'bg-[var(--surface-hover)] text-[var(--text-muted)] group-hover:bg-[var(--accent-muted)] group-hover:text-[var(--accent)]'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium truncate">{item.label}</span>
                      <span
                        className={clsx(
                          'text-xs truncate',
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
              'flex items-center gap-3 px-3 py-2.5 rounded-xl',
              'text-sm text-[var(--text-muted)]',
              'transition-all duration-200',
              'hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
              'group'
            )}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--surface-hover)] group-hover:bg-[var(--surface-active)] transition-colors">
              <ChevronLeftIcon className="w-4 h-4" />
            </div>
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
