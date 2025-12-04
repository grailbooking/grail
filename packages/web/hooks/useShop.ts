'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Shop } from '@/lib/firestore-types';

interface UseShopResult {
  shop: Shop | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Real-time Firestore subscription hook for shop data.
 * Provides live updates when shop document changes.
 * Note: Requires Firebase to be properly configured.
 */
export function useShop(shopId: string | null): UseShopResult {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refetch = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!shopId) {
      setShop(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Dynamically import Firebase to avoid initialization errors when not configured
    import('@/lib/firebase').then(({ firestore }) => {
      import('firebase/firestore').then(({ doc, onSnapshot }) => {
        const shopRef = doc(firestore, 'shops', shopId);

        const unsubscribe = onSnapshot(
          shopRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              setShop({ ...data, id: snapshot.id } as Shop);
            } else {
              setShop(null);
            }
            setLoading(false);
          },
          (err) => {
            console.error('Error fetching shop:', err);
            setError(err as Error);
            setLoading(false);
          }
        );

        return () => unsubscribe();
      });
    }).catch((err) => {
      console.error('Firebase not configured:', err);
      setError(new Error('Firebase not configured'));
      setLoading(false);
    });
  }, [shopId, refreshKey]);

  return { shop, loading, error, refetch };
}

/**
 * Demo shop hook for development - returns mock data.
 * Use this when Firebase emulators aren't running.
 */
export function useDemoShop(): UseShopResult {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setShop(DEMO_SHOP);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    shop,
    loading,
    error: null,
    refetch: () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 300);
    },
  };
}

// Demo shop data for development
const DEMO_SHOP: Shop = {
  id: 'demo-shop',
  name: 'The Gentleman\'s Cut',
  slug: 'gentlemans-cut',
  timezone: 'America/New_York',
  address: '123 Main Street, Brooklyn, NY 11201',
  phone: '(555) 123-4567',
  email: 'hello@gentlemanscut.com',
  branding: {
    primaryColor: '#C9A962',
    secondaryColor: '#1A1A1A',
  },
  bookingSettings: {
    mode: 'both',
    queueMode: 'client_choice',
    receptionist: false,
    marketplaceEnabled: true,
    widgetEmbedAllowed: true,
  },
  paymentSettings: {
    processor: 'stripe',
    payoutMode: 'shop',
    tipTiming: 'in_person',
    taxRate: 8.875,
    currency: 'USD',
    allowedMethods: ['card', 'cash'],
  },
  workforce: {
    type: 'w2',
    businessModel: 'commission',
    tipDistribution: 'per_barber',
  },
  posSettings: {
    mode: 'centralized',
  },
  cancellationPolicy: {
    minNoticeHours: 24,
    lateCancelPct: 50,
    noShowPct: 100,
    graceMin: 15,
    autoCharge: false,
  },
  reminders: {
    defaultSchedule: ['24h', '1h'],
    channels: { sms: true, email: true },
  },
  waitlist: {
    requiresCard: false,
    defaultOfferExpiryMin: 15,
    remoteJoin: true,
    maxQueueSize: null,
    fifo: true,
    confirmRequired: true,
    notifyChannel: 'sms',
  },
  pricingMode: 'unified',
  brandingMode: 'co_branded',
  reports: {
    exportsEnabled: true,
    exportIncludesPII: false,
  },
  openingHours: {
    monday: { open: '09:00', close: '19:00' },
    tuesday: { open: '09:00', close: '19:00' },
    wednesday: { open: '09:00', close: '19:00' },
    thursday: { open: '09:00', close: '20:00' },
    friday: { open: '09:00', close: '20:00' },
    saturday: { open: '10:00', close: '18:00' },
    sunday: { open: '00:00', close: '00:00', closed: true },
  },
  onboardingComplete: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  created_at: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updated_at: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
};
