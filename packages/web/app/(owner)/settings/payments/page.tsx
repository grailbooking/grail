'use client';

import { useSettings } from '../layout';
import { SettingsSection, SettingsRow, SettingsDivider } from '@/components/settings';
import { FormSelect, FormRadioGroup, FormNumberField, FormCheckboxGroup } from '@/components/ui';

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
  { value: 'EUR', label: 'Euro (EUR)' },
];

export default function PaymentsSettingsPage() {
  const { shop, updateShop } = useSettings();

  if (!shop) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-slide-up">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Payments
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Configure payment processing and tip settings
        </p>
      </div>

      {/* Payment Processor */}
      <SettingsSection
        title="Payment Processor"
        description="Manage how you accept payments"
      >
        <div className="p-4 rounded-lg bg-[var(--accent-muted)] border border-[var(--accent)]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--text-inverse)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.423-.977 1.478 0 2.887.582 3.909 1.072l.638-3.072c-.906-.404-2.088-.8-3.834-.8-1.478 0-2.7.395-3.591 1.112-.907.73-1.423 1.77-1.423 3.021 0 1.892 1.478 2.916 3.482 3.551 1.626.517 2.177.977 2.177 1.688 0 .693-.569 1.138-1.626 1.138-1.279 0-2.943-.551-4.096-1.28l-.657 3.064c1.153.693 2.943 1.183 4.753 1.183 1.551 0 2.836-.391 3.765-1.099.956-.737 1.494-1.825 1.494-3.195 0-1.951-1.409-3.013-3.902-3.603z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-[var(--text-primary)]">Stripe Connected</p>
              <p className="text-sm text-[var(--text-muted)]">Accepting card payments</p>
            </div>
            <button className="px-3 py-1.5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--surface-hover)] rounded-lg transition-colors">
              Manage
            </button>
          </div>
        </div>
      </SettingsSection>

      {/* Payout Mode */}
      <SettingsSection
        title="Payout Mode"
        description="How earnings are distributed"
      >
        <FormRadioGroup
          value={shop.paymentSettings.payoutMode}
          onValueChange={(value) =>
            updateShop({
              paymentSettings: {
                ...shop.paymentSettings,
                payoutMode: value as 'shop' | 'connect',
              },
            })
          }
          options={[
            {
              value: 'shop',
              label: 'Shop Account',
              description: 'All payments go to a single shop account. You distribute to barbers.',
            },
            {
              value: 'connect',
              label: 'Stripe Connect',
              description: 'Each barber has their own Stripe account. Direct payouts.',
            },
          ]}
        />
      </SettingsSection>

      {/* Tips */}
      <SettingsSection
        title="Tips"
        description="When clients can add tips"
      >
        <FormRadioGroup
          value={shop.paymentSettings.tipTiming}
          onValueChange={(value) =>
            updateShop({
              paymentSettings: {
                ...shop.paymentSettings,
                tipTiming: value as 'prepay' | 'in_person',
              },
            })
          }
          options={[
            {
              value: 'prepay',
              label: 'At Booking',
              description: 'Clients add tip when booking online. Locks in gratuity.',
            },
            {
              value: 'in_person',
              label: 'In Person',
              description: 'Clients tip after service. Traditional approach.',
            },
          ]}
        />
      </SettingsSection>

      {/* Currency & Tax */}
      <SettingsSection
        title="Currency & Tax"
        description="Financial settings for your region"
      >
        <SettingsRow label="Currency">
          <FormSelect
            value={shop.paymentSettings.currency}
            onValueChange={(value) =>
              updateShop({
                paymentSettings: { ...shop.paymentSettings, currency: value },
              })
            }
            options={CURRENCY_OPTIONS}
          />
        </SettingsRow>

        <SettingsDivider />

        <SettingsRow
          label="Tax Rate"
          description="Sales tax applied to services"
        >
          <FormNumberField
            value={shop.paymentSettings.taxRate}
            onChange={(e) =>
              updateShop({
                paymentSettings: {
                  ...shop.paymentSettings,
                  taxRate: parseFloat(e.target.value) || 0,
                },
              })
            }
            min={0}
            max={100}
            step={0.001}
            suffix="%"
          />
        </SettingsRow>
      </SettingsSection>

      {/* Accepted Methods */}
      <SettingsSection
        title="Accepted Payment Methods"
        description="Payment types you accept"
      >
        <FormCheckboxGroup
          values={shop.paymentSettings.allowedMethods}
          onValuesChange={(values) =>
            updateShop({
              paymentSettings: {
                ...shop.paymentSettings,
                allowedMethods: values as Array<'card' | 'cash' | 'tap'>,
              },
            })
          }
          options={[
            { value: 'card', label: 'Credit/Debit Card', description: 'Visa, Mastercard, Amex' },
            { value: 'cash', label: 'Cash', description: 'Physical currency' },
            { value: 'tap', label: 'Tap to Pay', description: 'Apple Pay, Google Pay, contactless' },
          ]}
        />
      </SettingsSection>
    </div>
  );
}
