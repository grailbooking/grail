'use client';

import { useSettings } from '../layout';
import { SettingsSection, SettingsRow, SettingsDivider } from '@/components/settings';
import { FormNumberField, FormSwitch, FormRadioGroup } from '@/components/ui';

export default function WaitlistSettingsPage() {
  const { shop, updateShop } = useSettings();

  if (!shop) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-slide-up">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Waitlist
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Configure queue management and offer settings
        </p>
      </div>

      {/* Queue Settings */}
      <SettingsSection
        title="Queue Settings"
        description="Control how clients join the waitlist"
      >
        <FormSwitch
          label="FIFO Order"
          description="First in, first out. Clients are served in order they joined."
          checked={shop.waitlist.fifo}
          onCheckedChange={(checked) =>
            updateShop({
              waitlist: { ...shop.waitlist, fifo: checked },
            })
          }
        />

        <SettingsDivider />

        <FormSwitch
          label="Remote Join"
          description="Allow clients to join the waitlist remotely via the booking widget"
          checked={shop.waitlist.remoteJoin}
          onCheckedChange={(checked) =>
            updateShop({
              waitlist: { ...shop.waitlist, remoteJoin: checked },
            })
          }
        />

        <SettingsDivider />

        <SettingsRow
          label="Maximum Queue Size"
          description="Leave empty for unlimited"
        >
          <FormNumberField
            value={shop.waitlist.maxQueueSize ?? ''}
            onChange={(e) =>
              updateShop({
                waitlist: {
                  ...shop.waitlist,
                  maxQueueSize: e.target.value ? parseInt(e.target.value) : null,
                },
              })
            }
            min={1}
            max={100}
            placeholder="Unlimited"
          />
        </SettingsRow>
      </SettingsSection>

      {/* Offer Settings */}
      <SettingsSection
        title="Offer Settings"
        description="How waitlist offers work"
      >
        <SettingsRow
          label="Offer Expiry Time"
          description="How long clients have to accept a slot offer"
        >
          <FormNumberField
            value={shop.waitlist.defaultOfferExpiryMin}
            onChange={(e) =>
              updateShop({
                waitlist: {
                  ...shop.waitlist,
                  defaultOfferExpiryMin: parseInt(e.target.value) || 15,
                },
              })
            }
            min={5}
            max={60}
            suffix="min"
          />
        </SettingsRow>

        <SettingsDivider />

        <FormSwitch
          label="Require Confirmation"
          description="Clients must confirm they&apos;re on their way when offered a slot"
          checked={shop.waitlist.confirmRequired}
          onCheckedChange={(checked) =>
            updateShop({
              waitlist: { ...shop.waitlist, confirmRequired: checked },
            })
          }
        />

        <SettingsDivider />

        <FormSwitch
          label="Require Card on File"
          description="Clients must save a card to join the waitlist"
          checked={shop.waitlist.requiresCard}
          onCheckedChange={(checked) =>
            updateShop({
              waitlist: { ...shop.waitlist, requiresCard: checked },
            })
          }
        />
      </SettingsSection>

      {/* Notification Channel */}
      <SettingsSection
        title="Notification Channel"
        description="How clients are notified when offered a slot"
      >
        <FormRadioGroup
          value={shop.waitlist.notifyChannel}
          onValueChange={(value) =>
            updateShop({
              waitlist: {
                ...shop.waitlist,
                notifyChannel: value as 'sms' | 'email' | 'both',
              },
            })
          }
          options={[
            {
              value: 'sms',
              label: 'SMS Only',
              description: 'Text message notifications. Fastest delivery.',
            },
            {
              value: 'email',
              label: 'Email Only',
              description: 'Email notifications. No SMS costs.',
            },
            {
              value: 'both',
              label: 'Both',
              description: 'Send both SMS and email. Maximum reach.',
            },
          ]}
        />
      </SettingsSection>
    </div>
  );
}
