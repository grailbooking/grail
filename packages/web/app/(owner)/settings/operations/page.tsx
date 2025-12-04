'use client';

import { useSettings } from '../layout';
import { SettingsSection, SettingsDivider } from '@/components/settings';
import { FormRadioGroup, FormSwitch } from '@/components/ui';

export default function OperationsSettingsPage() {
  const { shop, updateShop } = useSettings();

  if (!shop) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-slide-up">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Operations
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Configure how your shop handles bookings and visits
        </p>
      </div>

      {/* Visit Mode */}
      <SettingsSection
        title="Visit Mode"
        description="How clients can book time with your barbers"
      >
        <FormRadioGroup
          value={shop.bookingSettings.mode}
          onValueChange={(value) =>
            updateShop({
              bookingSettings: {
                ...shop.bookingSettings,
                mode: value as 'appointments' | 'walkins' | 'both',
              },
            })
          }
          options={[
            {
              value: 'appointments',
              label: 'Appointments Only',
              description: 'Clients must book in advance. Best for high-demand shops.',
            },
            {
              value: 'walkins',
              label: 'Walk-ins Only',
              description: 'First come, first served. Traditional barbershop style.',
            },
            {
              value: 'both',
              label: 'Both',
              description: 'Accept both appointments and walk-ins. Maximum flexibility.',
            },
          ]}
        />
      </SettingsSection>

      {/* Queue Mode */}
      {(shop.bookingSettings.mode === 'walkins' || shop.bookingSettings.mode === 'both') && (
        <SettingsSection
          title="Queue Mode"
          description="How walk-in clients are assigned to barbers"
        >
          <FormRadioGroup
            value={shop.bookingSettings.queueMode ?? 'client_choice'}
            onValueChange={(value) =>
              updateShop({
                bookingSettings: {
                  ...shop.bookingSettings,
                  queueMode: value as 'rotation' | 'fastest' | 'client_choice',
                },
              })
            }
            options={[
              {
                value: 'rotation',
                label: 'Rotation',
                description: 'Clients are assigned to the next barber in line. Fair distribution.',
              },
              {
                value: 'fastest',
                label: 'Fastest Available',
                description: 'Clients are assigned to whoever finishes first. Minimizes wait time.',
              },
              {
                value: 'client_choice',
                label: 'Client Choice',
                description: 'Clients choose their preferred barber. Most personal.',
              },
            ]}
          />
        </SettingsSection>
      )}

      {/* POS Mode */}
      <SettingsSection
        title="Point of Sale"
        description="How payments are processed in your shop"
      >
        <FormRadioGroup
          value={shop.posSettings.mode}
          onValueChange={(value) =>
            updateShop({
              posSettings: {
                mode: value as 'centralized' | 'decentralized' | 'configurable',
              },
            })
          }
          options={[
            {
              value: 'centralized',
              label: 'Centralized',
              description: 'All payments through a single register. Best for shops with a receptionist.',
            },
            {
              value: 'decentralized',
              label: 'Per Barber',
              description: 'Each barber handles their own payments. Best for booth renters.',
            },
            {
              value: 'configurable',
              label: 'Configurable',
              description: 'Mix of both, configured per barber. Maximum flexibility.',
            },
          ]}
        />
      </SettingsSection>

      {/* Additional Options */}
      <SettingsSection title="Additional Options">
        <FormSwitch
          label="Receptionist Mode"
          description="Enable check-in and queue management features"
          checked={shop.bookingSettings.receptionist}
          onCheckedChange={(checked) =>
            updateShop({
              bookingSettings: { ...shop.bookingSettings, receptionist: checked },
            })
          }
        />

        <SettingsDivider />

        <FormSwitch
          label="Marketplace Listing"
          description="Show your shop in the Grail marketplace for new clients"
          checked={shop.bookingSettings.marketplaceEnabled}
          onCheckedChange={(checked) =>
            updateShop({
              bookingSettings: { ...shop.bookingSettings, marketplaceEnabled: checked },
            })
          }
        />

        <SettingsDivider />

        <FormSwitch
          label="Widget Embedding"
          description="Allow embedding the booking widget on external websites"
          checked={shop.bookingSettings.widgetEmbedAllowed}
          onCheckedChange={(checked) =>
            updateShop({
              bookingSettings: { ...shop.bookingSettings, widgetEmbedAllowed: checked },
            })
          }
        />
      </SettingsSection>
    </div>
  );
}
