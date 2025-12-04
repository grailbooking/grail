'use client';

import { useSettings } from '../layout';
import { SettingsSection } from '@/components/settings';
import { FormRadioGroup } from '@/components/ui';

export default function BusinessSettingsPage() {
  const { shop, updateShop } = useSettings();

  if (!shop) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-slide-up">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Business
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Configure your workforce and business model
        </p>
      </div>

      {/* Workforce Type */}
      <SettingsSection
        title="Workforce Type"
        description="How your barbers are classified"
      >
        <FormRadioGroup
          value={shop.workforce.type}
          onValueChange={(value) =>
            updateShop({
              workforce: {
                ...shop.workforce,
                type: value as 'w2' | '1099' | 'mixed',
              },
            })
          }
          options={[
            {
              value: 'w2',
              label: 'W-2 Employees',
              description: 'Traditional employment. You handle taxes, benefits, scheduling.',
            },
            {
              value: '1099',
              label: '1099 Contractors',
              description: 'Independent contractors. They handle their own taxes.',
            },
            {
              value: 'mixed',
              label: 'Mixed',
              description: 'Combination of employees and contractors.',
            },
          ]}
        />
      </SettingsSection>

      {/* Business Model */}
      <SettingsSection
        title="Compensation Model"
        description="How barbers are compensated"
      >
        <FormRadioGroup
          value={shop.workforce.businessModel}
          onValueChange={(value) =>
            updateShop({
              workforce: {
                ...shop.workforce,
                businessModel: value as 'commission' | 'booth_rent' | 'hourly' | 'mixed',
              },
            })
          }
          options={[
            {
              value: 'commission',
              label: 'Commission',
              description: 'Percentage of each service. Common: 40-60% to barber.',
            },
            {
              value: 'booth_rent',
              label: 'Booth Rental',
              description: 'Barbers pay fixed rent. Keep 100% of their earnings.',
            },
            {
              value: 'hourly',
              label: 'Hourly',
              description: 'Fixed hourly rate regardless of services performed.',
            },
            {
              value: 'mixed',
              label: 'Mixed',
              description: 'Different models for different barbers.',
            },
          ]}
        />
      </SettingsSection>

      {/* Tip Distribution */}
      <SettingsSection
        title="Tip Distribution"
        description="How tips are allocated"
      >
        <FormRadioGroup
          value={shop.workforce.tipDistribution}
          onValueChange={(value) =>
            updateShop({
              workforce: {
                ...shop.workforce,
                tipDistribution: value as 'per_barber' | 'shared' | 'pooled',
              },
            })
          }
          options={[
            {
              value: 'per_barber',
              label: 'Individual',
              description: 'Each barber keeps their own tips. Most common.',
            },
            {
              value: 'shared',
              label: 'Shared',
              description: 'Tips split based on hours worked or service count.',
            },
            {
              value: 'pooled',
              label: 'Pooled',
              description: 'All tips divided equally among staff.',
            },
          ]}
        />
      </SettingsSection>
    </div>
  );
}
