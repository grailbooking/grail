'use client';

import { useState, createContext, useContext, useCallback } from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { SettingsSidebar } from '@/components/settings/SettingsSidebar';
import { SaveStatus } from '@/components/settings/SaveStatus';
import { useDemoShop } from '@/hooks/useShop';
import { useDemoUpdateShop } from '@/hooks/useUpdateShop';
import type { Shop } from '@/lib/firestore-types';

// Context for sharing shop data across settings pages
interface SettingsContextValue {
  shop: Shop | null;
  loading: boolean;
  updateShop: (updates: Partial<Shop>) => void;
  saveStatus: {
    state: 'idle' | 'pending' | 'saving' | 'saved' | 'error';
    message?: string;
    lastSaved?: Date;
  };
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsLayout');
  }
  return context;
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Use demo hooks for development (replace with real hooks when Firebase is connected)
  const { shop, loading } = useDemoShop();
  const { updateShop, saveStatus } = useDemoUpdateShop();

  const handleUpdateShop = useCallback(
    (updates: Partial<Shop>) => {
      updateShop(updates);
    },
    [updateShop]
  );

  return (
    <SettingsContext.Provider
      value={{
        shop,
        loading,
        updateShop: handleUpdateShop,
        saveStatus,
      }}
    >
      <div className="flex min-h-screen bg-[var(--background)]">
        {/* Sidebar */}
        <SettingsSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header
            className={clsx(
              'sticky top-0 z-30',
              'flex items-center justify-between gap-4 px-4 lg:px-8 py-4',
              'bg-[var(--background)]/80 backdrop-blur-lg',
              'border-b border-[var(--border)]'
            )}
          >
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className={clsx(
                  'lg:hidden p-2 rounded-lg',
                  'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                  'hover:bg-[var(--surface-hover)]',
                  'transition-colors duration-[var(--transition-fast)]'
                )}
                aria-label="Open menu"
              >
                <HamburgerMenuIcon className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-xl font-semibold text-[var(--text-primary)] font-[var(--font-heading)]">
                  Settings
                </h1>
                {shop && (
                  <p className="text-sm text-[var(--text-muted)]">{shop.name}</p>
                )}
              </div>
            </div>

            {/* Save status indicator */}
            <SaveStatus
              state={saveStatus.state}
              message={saveStatus.message}
              lastSaved={saveStatus.lastSaved}
            />
          </header>

          {/* Page content */}
          <div className="flex-1 p-4 lg:p-8">
            <div className="max-w-3xl mx-auto">
              {loading ? (
                <SettingsPageSkeleton />
              ) : shop ? (
                children
              ) : (
                <div className="text-center py-12">
                  <p className="text-[var(--text-muted)]">
                    No shop found. Please complete onboarding first.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SettingsContext.Provider>
  );
}

function SettingsPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="skeleton h-8 w-48" />
      <div className="skeleton h-4 w-64" />
      <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        <div className="space-y-4">
          <div className="skeleton h-6 w-32" />
          <div className="skeleton h-10 w-full" />
          <div className="skeleton h-10 w-full" />
          <div className="skeleton h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
