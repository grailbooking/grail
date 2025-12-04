import { Timestamp } from 'firebase/firestore';

// ============================================================================
// Shop Branding & Configuration Types
// ============================================================================

export interface ShopBranding {
  logoUrl?: string;
  primaryColor: string;
  secondaryColor?: string;
  font?: string;
}

export interface BookingSettings {
  mode: 'appointments' | 'walkins' | 'both';
  queueMode?: 'rotation' | 'fastest' | 'client_choice';
  receptionist: boolean;
  marketplaceEnabled: boolean;
  widgetEmbedAllowed: boolean;
}

export interface PaymentSettings {
  processor: 'stripe';
  payoutMode: 'shop' | 'connect';
  tipTiming: 'prepay' | 'in_person';
  taxRate: number;
  currency: string;
  allowedMethods: Array<'card' | 'cash' | 'tap'>;
}

export interface WorkforceSettings {
  type: 'w2' | '1099' | 'mixed';
  businessModel: 'commission' | 'booth_rent' | 'hourly' | 'mixed';
  tipDistribution: 'per_barber' | 'shared' | 'pooled';
}

export interface POSSettings {
  mode: 'centralized' | 'decentralized' | 'configurable';
}

export interface CancellationPolicy {
  minNoticeHours: number;
  lateCancelPct: number;
  noShowPct: number;
  graceMin: number;
  autoCharge: boolean;
}

export interface ReminderSettings {
  defaultSchedule: string[];
  channels: { sms: boolean; email: boolean };
}

export interface WaitlistSettings {
  requiresCard: boolean;
  defaultOfferExpiryMin: number;
  remoteJoin: boolean;
  maxQueueSize: number | null;
  fifo: boolean;
  confirmRequired: boolean;
  notifyChannel: 'sms' | 'email' | 'both';
}

export interface ReportSettings {
  exportsEnabled: boolean;
  exportIncludesPII: boolean;
}

export interface OpeningHours {
  [day: string]: {
    open: string;
    close: string;
    closed?: boolean;
  };
}

// ============================================================================
// Shop Interface
// ============================================================================

export interface Shop {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  address: string;
  phone: string;
  email?: string;
  branding: ShopBranding;
  bookingSettings: BookingSettings;
  paymentSettings: PaymentSettings;
  workforce: WorkforceSettings;
  posSettings: POSSettings;
  cancellationPolicy: CancellationPolicy;
  reminders: ReminderSettings;
  waitlist: WaitlistSettings;
  pricingMode: 'unified' | 'barber_specific';
  brandingMode: 'co_branded';
  reports: ReportSettings;
  openingHours: OpeningHours;
  onboardingComplete: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ============================================================================
// Staff & Service Types
// ============================================================================

export interface Staff {
  id: string;
  shop_id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  role: 'owner' | 'barber' | 'receptionist';
  active: boolean;
  created_at: Timestamp;
}

export interface Service {
  id: string;
  shop_id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  active: boolean;
  created_at: Timestamp;
}

// ============================================================================
// Appointment & Scheduling Types
// ============================================================================

export interface Appointment {
  id: string;
  shop_id: string;
  barber_id: string;
  client_id: string;
  service_id: string;
  start_time: Timestamp;
  end_time: Timestamp;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface Waitlist {
  id: string;
  shop_id: string;
  client_id: string;
  service_id: string;
  status: 'waiting' | 'offered' | 'accepted' | 'expired' | 'cancelled';
  requested_at: Timestamp;
  offered_at?: Timestamp;
  offer_expires_at?: Timestamp;
  accepted_at?: Timestamp;
  slot_start?: Timestamp;
  slot_end?: Timestamp;
}

export interface Availability {
  id: string;
  shop_id: string;
  barber_id: string;
  date: string; // YYYY-MM-DD
  slots: TimeSlot[];
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface TimeSlot {
  start: string; // HH:mm
  end: string; // HH:mm
  available: boolean;
  appointment_id?: string;
}

// ============================================================================
// Client & Payment Types
// ============================================================================

export interface Client {
  id: string;
  email: string;
  name: string;
  phone?: string;
  notes?: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface Payment {
  id: string;
  shop_id: string;
  appointment_id?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: 'card' | 'cash' | 'other';
  stripe_payment_intent_id?: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ============================================================================
// Default Values for Shop Creation
// ============================================================================

export const DEFAULT_OPENING_HOURS: OpeningHours = {
  monday: { open: '09:00', close: '18:00' },
  tuesday: { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday: { open: '09:00', close: '18:00' },
  friday: { open: '09:00', close: '18:00' },
  saturday: { open: '10:00', close: '16:00' },
  sunday: { open: '00:00', close: '00:00', closed: true },
};

export const DEFAULT_SHOP_BRANDING: ShopBranding = {
  primaryColor: '#C9A962',
  secondaryColor: '#1A1A1A',
};

export const DEFAULT_BOOKING_SETTINGS: BookingSettings = {
  mode: 'both',
  queueMode: 'client_choice',
  receptionist: false,
  marketplaceEnabled: true,
  widgetEmbedAllowed: true,
};

export const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = {
  processor: 'stripe',
  payoutMode: 'shop',
  tipTiming: 'in_person',
  taxRate: 0,
  currency: 'USD',
  allowedMethods: ['card', 'cash'],
};

export const DEFAULT_WORKFORCE_SETTINGS: WorkforceSettings = {
  type: 'w2',
  businessModel: 'commission',
  tipDistribution: 'per_barber',
};

export const DEFAULT_POS_SETTINGS: POSSettings = {
  mode: 'centralized',
};

export const DEFAULT_CANCELLATION_POLICY: CancellationPolicy = {
  minNoticeHours: 24,
  lateCancelPct: 50,
  noShowPct: 100,
  graceMin: 15,
  autoCharge: false,
};

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  defaultSchedule: ['24h', '1h'],
  channels: { sms: true, email: true },
};

export const DEFAULT_WAITLIST_SETTINGS: WaitlistSettings = {
  requiresCard: false,
  defaultOfferExpiryMin: 15,
  remoteJoin: true,
  maxQueueSize: null,
  fifo: true,
  confirmRequired: true,
  notifyChannel: 'sms',
};

export const DEFAULT_REPORT_SETTINGS: ReportSettings = {
  exportsEnabled: true,
  exportIncludesPII: false,
};
