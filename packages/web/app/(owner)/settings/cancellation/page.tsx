'use client';

import { useSettings } from '../layout';
import { SettingsSection, SettingsRow, SettingsDivider } from '@/components/settings';
import { FormNumberField, FormSwitch } from '@/components/ui';

export default function CancellationSettingsPage() {
  const { shop, updateShop } = useSettings();

  if (!shop) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-slide-up">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Cancellation Policy
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Configure fees for late cancellations and no-shows
        </p>
      </div>

      {/* Notice Period */}
      <SettingsSection
        title="Notice Period"
        description="How much advance notice is required for free cancellation"
      >
        <SettingsRow
          label="Minimum Notice"
          description="Cancellations before this window are free"
        >
          <FormNumberField
            value={shop.cancellationPolicy.minNoticeHours}
            onChange={(e) =>
              updateShop({
                cancellationPolicy: {
                  ...shop.cancellationPolicy,
                  minNoticeHours: parseInt(e.target.value) || 0,
                },
              })
            }
            min={0}
            max={168}
            suffix="hours"
          />
        </SettingsRow>

        <SettingsDivider />

        <SettingsRow
          label="Grace Period"
          description="Extra time before marking as no-show after appointment start"
        >
          <FormNumberField
            value={shop.cancellationPolicy.graceMin}
            onChange={(e) =>
              updateShop({
                cancellationPolicy: {
                  ...shop.cancellationPolicy,
                  graceMin: parseInt(e.target.value) || 0,
                },
              })
            }
            min={0}
            max={60}
            suffix="min"
          />
        </SettingsRow>
      </SettingsSection>

      {/* Fees */}
      <SettingsSection
        title="Cancellation Fees"
        description="Percentage of service price charged for violations"
      >
        <SettingsRow
          label="Late Cancellation Fee"
          description="When cancelled after the notice period"
        >
          <FormNumberField
            value={shop.cancellationPolicy.lateCancelPct}
            onChange={(e) =>
              updateShop({
                cancellationPolicy: {
                  ...shop.cancellationPolicy,
                  lateCancelPct: parseInt(e.target.value) || 0,
                },
              })
            }
            min={0}
            max={100}
            suffix="%"
          />
        </SettingsRow>

        <SettingsDivider />

        <SettingsRow
          label="No-Show Fee"
          description="When client doesn&apos;t show up"
        >
          <FormNumberField
            value={shop.cancellationPolicy.noShowPct}
            onChange={(e) =>
              updateShop({
                cancellationPolicy: {
                  ...shop.cancellationPolicy,
                  noShowPct: parseInt(e.target.value) || 0,
                },
              })
            }
            min={0}
            max={100}
            suffix="%"
          />
        </SettingsRow>
      </SettingsSection>

      {/* Auto Charge */}
      <SettingsSection
        title="Automatic Charging"
        description="Automatically charge fees to saved payment method"
      >
        <FormSwitch
          label="Auto-charge cancellation fees"
          description="Requires clients to have a card on file when booking"
          checked={shop.cancellationPolicy.autoCharge}
          onCheckedChange={(checked) =>
            updateShop({
              cancellationPolicy: {
                ...shop.cancellationPolicy,
                autoCharge: checked,
              },
            })
          }
        />

        {shop.cancellationPolicy.autoCharge && (
          <div className="mt-3 p-3 rounded-lg bg-[var(--warning-muted)] border border-[var(--warning)]/30">
            <p className="text-sm text-[var(--warning)]">
              Clients will be required to save a card when booking. The card will be charged
              automatically if they violate the cancellation policy.
            </p>
          </div>
        )}
      </SettingsSection>

      {/* Preview */}
      <SettingsSection title="Policy Preview">
        <div className="p-4 rounded-lg bg-[var(--surface-hover)] text-sm text-[var(--text-secondary)] space-y-2">
          <p>
            <strong>Free cancellation:</strong> Up to {shop.cancellationPolicy.minNoticeHours} hours before your appointment
          </p>
          <p>
            <strong>Late cancellation:</strong> {shop.cancellationPolicy.lateCancelPct}% fee if cancelled within {shop.cancellationPolicy.minNoticeHours} hours
          </p>
          <p>
            <strong>No-show:</strong> {shop.cancellationPolicy.noShowPct}% fee after {shop.cancellationPolicy.graceMin} minute grace period
          </p>
        </div>
      </SettingsSection>
    </div>
  );
}
