import { Timestamp } from 'firebase/firestore';

export interface Shop {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  timezone: string;
  settings: ShopSettings;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface ShopSettings {
  booking_enabled: boolean;
  walk_ins_enabled: boolean;
  waitlist_enabled: boolean;
  cancellation_fee: number;
  cancellation_hours: number;
  slot_duration_minutes: number;
  opening_hours: OpeningHours;
}

export interface OpeningHours {
  [day: string]: {
    open: string;
    close: string;
    closed?: boolean;
  };
}

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

export interface Client {
  id: string;
  email: string;
  name: string;
  phone?: string;
  notes?: string;
  created_at: Timestamp;
  updated_at: Timestamp;
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
