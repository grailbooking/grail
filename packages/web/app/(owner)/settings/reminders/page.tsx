'use client';

import { useSettings } from '../layout';
import { SettingsSection, SettingsDivider } from '@/components/settings';
import { FormSwitch, FormCheckboxGroup } from '@/components/ui';

const REMINDER_OPTIONS = [
  { value: '24h', label: '24 hours before', description: 'Day-before reminder' },
  { value: '2h', label: '2 hours before', description: 'Same-day reminder' },
  { value: '1h', label: '1 hour before', description: 'Last-minute reminder' },
  { value: '30m', label: '30 minutes before', description: 'Final reminder' },
];

export default function RemindersSettingsPage() {
  const { shop, updateShop } = useSettings();

  if (!shop) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-slide-up">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Reminders
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Configure appointment reminders for clients
        </p>
      </div>

      {/* Notification Channels */}
      <SettingsSection
        title="Notification Channels"
        description="How reminders are delivered"
      >
        <FormSwitch
          label="SMS Reminders"
          description="Send text message reminders to clients"
          checked={shop.reminders.channels.sms}
          onCheckedChange={(checked) =>
            updateShop({
              reminders: {
                ...shop.reminders,
                channels: { ...shop.reminders.channels, sms: checked },
              },
            })
          }
        />

        <SettingsDivider />

        <FormSwitch
          label="Email Reminders"
          description="Send email reminders to clients"
          checked={shop.reminders.channels.email}
          onCheckedChange={(checked) =>
            updateShop({
              reminders: {
                ...shop.reminders,
                channels: { ...shop.reminders.channels, email: checked },
              },
            })
          }
        />
      </SettingsSection>

      {/* Reminder Schedule */}
      <SettingsSection
        title="Reminder Schedule"
        description="When to send reminders before appointments"
      >
        <FormCheckboxGroup
          values={shop.reminders.defaultSchedule}
          onValuesChange={(values) =>
            updateShop({
              reminders: {
                ...shop.reminders,
                defaultSchedule: values,
              },
            })
          }
          options={REMINDER_OPTIONS}
        />
      </SettingsSection>

      {/* Preview */}
      <SettingsSection title="Preview">
        <div className="p-4 rounded-lg bg-[var(--surface-hover)] space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-primary)]">Sample SMS Reminder</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                &quot;Hi John, this is a reminder about your haircut at {shop.name} tomorrow at 2:00 PM.
                Reply CONFIRM to confirm or CANCEL to cancel.&quot;
              </p>
            </div>
          </div>

          <SettingsDivider />

          <div className="text-xs text-[var(--text-muted)]">
            <p>Clients will receive reminders at:</p>
            <ul className="mt-1 list-disc list-inside">
              {shop.reminders.defaultSchedule.length > 0 ? (
                shop.reminders.defaultSchedule.map((schedule) => {
                  const option = REMINDER_OPTIONS.find((o) => o.value === schedule);
                  return <li key={schedule}>{option?.label || schedule}</li>;
                })
              ) : (
                <li>No reminders configured</li>
              )}
            </ul>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}
