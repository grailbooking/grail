import { z } from 'zod';

// ============================================================================
// Branding Schema
// ============================================================================

export const shopBrandingSchema = z.object({
  logoUrl: z.string().url().optional(),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color'),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color').optional(),
  font: z.string().optional(),
});

// ============================================================================
// Booking Settings Schema
// ============================================================================

export const bookingSettingsSchema = z.object({
  mode: z.enum(['appointments', 'walkins', 'both']),
  queueMode: z.enum(['rotation', 'fastest', 'client_choice']).optional(),
  receptionist: z.boolean(),
  marketplaceEnabled: z.boolean(),
  widgetEmbedAllowed: z.boolean(),
});

// ============================================================================
// Payment Settings Schema
// ============================================================================

export const paymentSettingsSchema = z.object({
  processor: z.literal('stripe'),
  payoutMode: z.enum(['shop', 'connect']),
  tipTiming: z.enum(['prepay', 'in_person']),
  taxRate: z.number().min(0).max(100),
  currency: z.string().length(3),
  allowedMethods: z.array(z.enum(['card', 'cash', 'tap'])).min(1),
});

// ============================================================================
// Workforce Settings Schema
// ============================================================================

export const workforceSettingsSchema = z.object({
  type: z.enum(['w2', '1099', 'mixed']),
  businessModel: z.enum(['commission', 'booth_rent', 'hourly', 'mixed']),
  tipDistribution: z.enum(['per_barber', 'shared', 'pooled']),
});

// ============================================================================
// POS Settings Schema
// ============================================================================

export const posSettingsSchema = z.object({
  mode: z.enum(['centralized', 'decentralized', 'configurable']),
});

// ============================================================================
// Cancellation Policy Schema
// ============================================================================

export const cancellationPolicySchema = z.object({
  minNoticeHours: z.number().min(0).max(168),
  lateCancelPct: z.number().min(0).max(100),
  noShowPct: z.number().min(0).max(100),
  graceMin: z.number().min(0).max(60),
  autoCharge: z.boolean(),
});

// ============================================================================
// Reminder Settings Schema
// ============================================================================

export const reminderSettingsSchema = z.object({
  defaultSchedule: z.array(z.string()),
  channels: z.object({
    sms: z.boolean(),
    email: z.boolean(),
  }),
});

// ============================================================================
// Waitlist Settings Schema
// ============================================================================

export const waitlistSettingsSchema = z.object({
  requiresCard: z.boolean(),
  defaultOfferExpiryMin: z.number().min(5).max(60),
  remoteJoin: z.boolean(),
  maxQueueSize: z.number().min(1).nullable(),
  fifo: z.boolean(),
  confirmRequired: z.boolean(),
  notifyChannel: z.enum(['sms', 'email', 'both']),
});

// ============================================================================
// Report Settings Schema
// ============================================================================

export const reportSettingsSchema = z.object({
  exportsEnabled: z.boolean(),
  exportIncludesPII: z.boolean(),
});

// ============================================================================
// Opening Hours Schema
// ============================================================================

export const dayHoursSchema = z.object({
  open: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
  close: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
  closed: z.boolean().optional(),
});

export const openingHoursSchema = z.record(z.string(), dayHoursSchema);

// ============================================================================
// Shop Profile Schema (for settings forms)
// ============================================================================

export const shopProfileSchema = z.object({
  name: z.string().min(1, 'Shop name is required').max(100),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  address: z.string().min(1, 'Address is required').max(200),
  phone: z.string().min(10, 'Valid phone number required').max(20),
  email: z.string().email().optional().or(z.literal('')),
  timezone: z.string().min(1, 'Timezone is required'),
});

// ============================================================================
// Complete Shop Schema
// ============================================================================

export const shopSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  slug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/),
  timezone: z.string(),
  address: z.string().min(1).max(200),
  phone: z.string().min(10).max(20),
  email: z.string().email().optional(),
  branding: shopBrandingSchema,
  bookingSettings: bookingSettingsSchema,
  paymentSettings: paymentSettingsSchema,
  workforce: workforceSettingsSchema,
  posSettings: posSettingsSchema,
  cancellationPolicy: cancellationPolicySchema,
  reminders: reminderSettingsSchema,
  waitlist: waitlistSettingsSchema,
  pricingMode: z.enum(['unified', 'barber_specific']),
  brandingMode: z.literal('co_branded'),
  reports: reportSettingsSchema,
  openingHours: openingHoursSchema,
  onboardingComplete: z.boolean(),
});

// ============================================================================
// Inferred Types
// ============================================================================

export type ShopProfileFormData = z.infer<typeof shopProfileSchema>;
export type ShopBrandingFormData = z.infer<typeof shopBrandingSchema>;
export type BookingSettingsFormData = z.infer<typeof bookingSettingsSchema>;
export type PaymentSettingsFormData = z.infer<typeof paymentSettingsSchema>;
export type WorkforceSettingsFormData = z.infer<typeof workforceSettingsSchema>;
export type POSSettingsFormData = z.infer<typeof posSettingsSchema>;
export type CancellationPolicyFormData = z.infer<typeof cancellationPolicySchema>;
export type ReminderSettingsFormData = z.infer<typeof reminderSettingsSchema>;
export type WaitlistSettingsFormData = z.infer<typeof waitlistSettingsSchema>;
export type ReportSettingsFormData = z.infer<typeof reportSettingsSchema>;
export type OpeningHoursFormData = z.infer<typeof openingHoursSchema>;
