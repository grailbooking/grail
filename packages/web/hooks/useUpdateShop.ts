'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import type { Shop } from '@/lib/firestore-types';
import { Subject, debounceTime } from 'rxjs';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type ShopUpdate = DeepPartial<Omit<Shop, 'id' | 'created_at' | 'updated_at'>>;

interface SaveStatus {
  state: 'idle' | 'pending' | 'saving' | 'saved' | 'error';
  message?: string;
  lastSaved?: Date;
}

interface UseUpdateShopResult {
  updateShop: (updates: ShopUpdate) => void;
  updateShopImmediate: (updates: ShopUpdate) => Promise<void>;
  saveStatus: SaveStatus;
  isDirty: boolean;
}

const DEBOUNCE_MS = 1000;
const SAVED_DISPLAY_MS = 2000;

/**
 * Hook for updating shop data with debounced autosave and optimistic updates.
 * Uses RxJS for debouncing to maintain consistency with project patterns.
 */
export function useUpdateShop(shopId: string | null): UseUpdateShopResult {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({ state: 'idle' });
  const [isDirty, setIsDirty] = useState(false);

  const updateSubject = useRef(new Subject<ShopUpdate>());
  const pendingUpdates = useRef<ShopUpdate>({});

  // Immediate save function
  const saveToFirestore = useCallback(async (updates: ShopUpdate) => {
    if (!shopId) {
      setSaveStatus({ state: 'error', message: 'No shop ID provided' });
      return;
    }

    setSaveStatus({ state: 'saving' });

    try {
      // Dynamically import Firebase to avoid initialization errors when not configured
      const { firestore } = await import('@/lib/firebase');
      const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore');

      const shopRef = doc(firestore, 'shops', shopId);

      // Flatten nested updates for Firestore dot notation
      const flattenedUpdates = flattenObject(updates);

      await updateDoc(shopRef, {
        ...flattenedUpdates,
        updated_at: serverTimestamp(),
      });

      setSaveStatus({
        state: 'saved',
        lastSaved: new Date()
      });
      setIsDirty(false);
      pendingUpdates.current = {};

      // Reset to idle after showing "saved" status
      setTimeout(() => {
        setSaveStatus((prev) =>
          prev.state === 'saved' ? { state: 'idle', lastSaved: prev.lastSaved } : prev
        );
      }, SAVED_DISPLAY_MS);
    } catch (err) {
      console.error('Error updating shop:', err);
      setSaveStatus({
        state: 'error',
        message: err instanceof Error ? err.message : 'Failed to save'
      });
    }
  }, [shopId]);

  // Set up debounced subscription
  useEffect(() => {
    const subscription = updateSubject.current
      .pipe(debounceTime(DEBOUNCE_MS))
      .subscribe((updates) => {
        saveToFirestore(updates);
      });

    return () => subscription.unsubscribe();
  }, [saveToFirestore]);

  // Debounced update function
  const updateShop = useCallback((updates: ShopUpdate) => {
    // Merge with pending updates
    pendingUpdates.current = deepMerge(pendingUpdates.current, updates);

    setIsDirty(true);
    setSaveStatus({ state: 'pending' });

    // Push to debounce stream
    updateSubject.current.next(pendingUpdates.current);
  }, []);

  // Immediate update function (bypasses debounce)
  const updateShopImmediate = useCallback(async (updates: ShopUpdate) => {
    await saveToFirestore(updates);
  }, [saveToFirestore]);

  return {
    updateShop,
    updateShopImmediate,
    saveStatus,
    isDirty,
  };
}

/**
 * Demo hook for development - simulates updates without Firebase.
 */
export function useDemoUpdateShop(): UseUpdateShopResult {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({ state: 'idle' });
  const [isDirty, setIsDirty] = useState(false);
  const updateSubject = useRef(new Subject<ShopUpdate>());

  useEffect(() => {
    const subscription = updateSubject.current
      .pipe(debounceTime(DEBOUNCE_MS))
      .subscribe(() => {
        setSaveStatus({ state: 'saving' });

        // Simulate save delay
        setTimeout(() => {
          setSaveStatus({ state: 'saved', lastSaved: new Date() });
          setIsDirty(false);

          setTimeout(() => {
            setSaveStatus((prev) =>
              prev.state === 'saved' ? { state: 'idle', lastSaved: prev.lastSaved } : prev
            );
          }, SAVED_DISPLAY_MS);
        }, 500);
      });

    return () => subscription.unsubscribe();
  }, []);

  const updateShop = useCallback((updates: ShopUpdate) => {
    console.log('Demo update:', updates);
    setIsDirty(true);
    setSaveStatus({ state: 'pending' });
    updateSubject.current.next(updates);
  }, []);

  const updateShopImmediate = useCallback(async (updates: ShopUpdate) => {
    console.log('Demo immediate update:', updates);
    setSaveStatus({ state: 'saving' });
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSaveStatus({ state: 'saved', lastSaved: new Date() });
    setIsDirty(false);
  }, []);

  return {
    updateShop,
    updateShopImmediate,
    saveStatus,
    isDirty,
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Flattens nested object for Firestore dot notation updates.
 * e.g., { branding: { primaryColor: '#fff' } } => { 'branding.primaryColor': '#fff' }
 */
function flattenObject(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        !(value instanceof Date)
      ) {
        Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
      } else {
        result[newKey] = value;
      }
    }
  }

  return result;
}

/**
 * Deep merge two objects.
 */
function deepMerge<T extends Record<string, unknown>>(target: T, source: T): T {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (
        sourceValue !== null &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue !== null &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        ) as T[Extract<keyof T, string>];
      } else {
        result[key] = sourceValue;
      }
    }
  }

  return result;
}
