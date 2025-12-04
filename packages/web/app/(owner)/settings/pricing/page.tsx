'use client';

import { useSettings } from '../layout';
import { SettingsSection, SettingsDivider } from '@/components/settings';
import { FormRadioGroup, FormSwitch } from '@/components/ui';

export default function PricingSettingsPage() {
  const { shop, updateShop } = useSettings();

  if (!shop) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-slide-up">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Pricing & Reports
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Configure pricing mode and report settings
        </p>
      </div>

      {/* Pricing Mode */}
      <SettingsSection
        title="Pricing Mode"
        description="How service prices are determined"
      >
        <FormRadioGroup
          value={shop.pricingMode}
          onValueChange={(value) =>
            updateShop({
              pricingMode: value as 'unified' | 'barber_specific',
            })
          }
          options={[
            {
              value: 'unified',
              label: 'Unified Pricing',
              description: 'All barbers charge the same price for each service. Simpler for clients.',
            },
            {
              value: 'barber_specific',
              label: 'Barber-Specific Pricing',
              description: 'Each barber sets their own prices. Based on experience level.',
            },
          ]}
        />

        {shop.pricingMode === 'barber_specific' && (
          <div className="mt-4 p-3 rounded-lg bg-[var(--accent-muted)] border border-[var(--accent)]/30">
            <p className="text-sm text-[var(--accent)]">
              Each barber can set custom prices in their profile. The shop&apos;s service catalog
              serves as the default/base price.
            </p>
          </div>
        )}
      </SettingsSection>

      {/* Report Settings */}
      <SettingsSection
        title="Reports & Exports"
        description="Data export and privacy settings"
      >
        <FormSwitch
          label="Enable Data Exports"
          description="Allow exporting reports to CSV/Excel"
          checked={shop.reports.exportsEnabled}
          onCheckedChange={(checked) =>
            updateShop({
              reports: { ...shop.reports, exportsEnabled: checked },
            })
          }
        />

        <SettingsDivider />

        <FormSwitch
          label="Include Personal Information"
          description="Include client names, emails, and phone numbers in exports"
          checked={shop.reports.exportIncludesPII}
          onCheckedChange={(checked) =>
            updateShop({
              reports: { ...shop.reports, exportIncludesPII: checked },
            })
          }
          disabled={!shop.reports.exportsEnabled}
        />

        {shop.reports.exportIncludesPII && (
          <div className="mt-4 p-3 rounded-lg bg-[var(--warning-muted)] border border-[var(--warning)]/30">
            <p className="text-sm text-[var(--warning)]">
              Exports will contain personal data. Make sure to handle exported files
              securely and in compliance with privacy regulations.
            </p>
          </div>
        )}
      </SettingsSection>

      {/* Quick Stats Preview */}
      <SettingsSection title="Reports Available">
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Revenue', description: 'Daily, weekly, monthly revenue' },
            { name: 'Appointments', description: 'Booking volume and trends' },
            { name: 'Staff Performance', description: 'Per-barber metrics' },
            { name: 'Client Retention', description: 'Return rate analysis' },
            { name: 'Service Popularity', description: 'Most booked services' },
            { name: 'Time Analysis', description: 'Peak hours and days' },
          ].map((report) => (
            <div
              key={report.name}
              className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-hover)]"
            >
              <p className="text-sm font-medium text-[var(--text-primary)]">{report.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{report.description}</p>
            </div>
          ))}
        </div>
      </SettingsSection>
    </div>
  );
}
