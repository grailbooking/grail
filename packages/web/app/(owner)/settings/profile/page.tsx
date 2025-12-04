'use client';

import { useSettings } from '../layout';
import { SettingsSection, SettingsRow, SettingsDivider } from '@/components/settings';
import {
  FormField,
  FormTextField,
  FormColorPicker,
  FormSelect,
  OpeningHoursEditor,
} from '@/components/ui';

const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Phoenix', label: 'Arizona (no DST)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
];

export default function ProfileSettingsPage() {
  const { shop, updateShop } = useSettings();

  if (!shop) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-slide-up">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Shop Profile
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Basic information about your barbershop
        </p>
      </div>

      {/* Basic Info */}
      <SettingsSection
        title="Basic Information"
        description="Your shop&apos;s name and contact details"
      >
        <FormField label="Shop Name" required>
          <FormTextField
            value={shop.name}
            onChange={(e) => updateShop({ name: e.target.value })}
            placeholder="The Gentleman's Cut"
          />
        </FormField>

        <FormField
          label="URL Slug"
          description="Used in your booking link: grail.app/book/{slug}"
        >
          <FormTextField
            value={shop.slug}
            onChange={(e) => updateShop({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
            placeholder="gentlemans-cut"
          />
        </FormField>

        <SettingsDivider />

        <FormField label="Address" required>
          <FormTextField
            value={shop.address}
            onChange={(e) => updateShop({ address: e.target.value })}
            placeholder="123 Main Street, Brooklyn, NY 11201"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Phone" required>
            <FormTextField
              type="tel"
              value={shop.phone}
              onChange={(e) => updateShop({ phone: e.target.value })}
              placeholder="(555) 123-4567"
            />
          </FormField>

          <FormField label="Email">
            <FormTextField
              type="email"
              value={shop.email ?? ''}
              onChange={(e) => updateShop({ email: e.target.value })}
              placeholder="hello@yourshop.com"
            />
          </FormField>
        </div>

        <FormField label="Timezone">
          <FormSelect
            value={shop.timezone}
            onValueChange={(value) => updateShop({ timezone: value })}
            options={TIMEZONE_OPTIONS}
          />
        </FormField>
      </SettingsSection>

      {/* Branding */}
      <SettingsSection
        title="Branding"
        description="Customize your shop&apos;s appearance"
      >
        <SettingsRow
          label="Primary Color"
          description="Your brand color used throughout the booking experience"
        >
          <FormColorPicker
            value={shop.branding.primaryColor}
            onChange={(color) =>
              updateShop({ branding: { ...shop.branding, primaryColor: color } })
            }
          />
        </SettingsRow>

        <SettingsDivider />

        <SettingsRow
          label="Secondary Color"
          description="Used for backgrounds and accents"
        >
          <FormColorPicker
            value={shop.branding.secondaryColor ?? '#1A1A1A'}
            onChange={(color) =>
              updateShop({ branding: { ...shop.branding, secondaryColor: color } })
            }
          />
        </SettingsRow>
      </SettingsSection>

      {/* Opening Hours */}
      <SettingsSection
        title="Opening Hours"
        description="Set your shop&apos;s regular operating hours"
      >
        <OpeningHoursEditor
          value={shop.openingHours}
          onChange={(hours) => updateShop({ openingHours: hours })}
        />
      </SettingsSection>
    </div>
  );
}
