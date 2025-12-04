'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
} from '@radix-ui/react-icons';
import {
  FormField,
  FormTextField,
  FormSelect,
  FormRadioGroup,
  FormColorPicker,
  FormSwitch,
  FormNumberField,
  OpeningHoursEditor,
} from '@/components/ui';
import {
  DEFAULT_OPENING_HOURS,
  DEFAULT_SHOP_BRANDING,
  DEFAULT_BOOKING_SETTINGS,
  DEFAULT_PAYMENT_SETTINGS,
  DEFAULT_WORKFORCE_SETTINGS,
  DEFAULT_POS_SETTINGS,
  DEFAULT_CANCELLATION_POLICY,
  DEFAULT_REMINDER_SETTINGS,
  DEFAULT_WAITLIST_SETTINGS,
  DEFAULT_REPORT_SETTINGS,
} from '@/lib/firestore-types';
import type { Shop } from '@/lib/firestore-types';

// Wizard steps
const STEPS = [
  { id: 'welcome', title: 'Welcome', description: 'Get started with Grail' },
  { id: 'basics', title: 'Shop Basics', description: 'Name and contact info' },
  { id: 'branding', title: 'Branding', description: 'Colors and style' },
  { id: 'hours', title: 'Hours', description: 'Operating schedule' },
  { id: 'operations', title: 'Operations', description: 'How you work' },
  { id: 'payments', title: 'Payments', description: 'Payment setup' },
  { id: 'workforce', title: 'Workforce', description: 'Your team' },
  { id: 'complete', title: 'Complete', description: 'Ready to go' },
] as const;

const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Phoenix', label: 'Arizona (no DST)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
];

type WizardData = Omit<Shop, 'id' | 'created_at' | 'updated_at'>;

const STORAGE_KEY = 'grail_onboarding_data';
const STEP_KEY = 'grail_onboarding_step';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<WizardData>({
    name: '',
    slug: '',
    address: '',
    phone: '',
    email: '',
    timezone: 'America/New_York',
    branding: DEFAULT_SHOP_BRANDING,
    bookingSettings: DEFAULT_BOOKING_SETTINGS,
    paymentSettings: DEFAULT_PAYMENT_SETTINGS,
    workforce: DEFAULT_WORKFORCE_SETTINGS,
    posSettings: DEFAULT_POS_SETTINGS,
    cancellationPolicy: DEFAULT_CANCELLATION_POLICY,
    reminders: DEFAULT_REMINDER_SETTINGS,
    waitlist: DEFAULT_WAITLIST_SETTINGS,
    pricingMode: 'unified',
    brandingMode: 'co_branded',
    reports: DEFAULT_REPORT_SETTINGS,
    openingHours: DEFAULT_OPENING_HOURS,
    onboardingComplete: false,
  });

  // Load saved state on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedStep = localStorage.getItem(STEP_KEY);

      if (savedData) {
        setData(JSON.parse(savedData));
      }
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    } catch {
      // Ignore localStorage errors
    }
    setIsLoading(false);
  }, []);

  // Persist state on changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        localStorage.setItem(STEP_KEY, currentStep.toString());
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [data, currentStep, isLoading]);

  const updateData = useCallback((updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const goNext = useCallback(() => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleComplete = useCallback(async () => {
    // In production, this would create the shop in Firestore
    console.log('Creating shop with data:', data);

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);

    // Redirect to settings
    router.push('/settings');
  }, [data, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-pulse text-[var(--text-muted)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Progress header */}
      <header className="border-b border-[var(--border)] px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[var(--text-muted)]">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span className="text-sm font-medium text-[var(--accent)]">
              {STEPS[currentStep]?.title}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <StepContent
            step={STEPS[currentStep]?.id ?? 'welcome'}
            data={data}
            updateData={updateData}
          />
        </div>
      </main>

      {/* Navigation footer */}
      <footer className="border-t border-[var(--border)] px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-lg',
              'text-sm font-medium',
              'transition-all duration-[var(--transition-fast)]',
              currentStep === 0
                ? 'text-[var(--text-muted)] cursor-not-allowed'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
            )}
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Back
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={goNext}
              className={clsx(
                'flex items-center gap-2 px-6 py-2.5 rounded-lg',
                'bg-[var(--accent)] text-[var(--text-inverse)]',
                'text-sm font-medium',
                'transition-all duration-[var(--transition-fast)]',
                'hover:bg-[var(--accent-light)] hover:shadow-[var(--shadow-glow)]'
              )}
            >
              Continue
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className={clsx(
                'flex items-center gap-2 px-6 py-2.5 rounded-lg',
                'bg-[var(--success)] text-white',
                'text-sm font-medium',
                'transition-all duration-[var(--transition-fast)]',
                'hover:bg-green-600'
              )}
            >
              <CheckIcon className="w-4 h-4" />
              Launch Your Shop
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

// Step content component
interface StepContentProps {
  step: string;
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

function StepContent({ step, data, updateData }: StepContentProps) {
  switch (step) {
    case 'welcome':
      return <WelcomeStep />;
    case 'basics':
      return <BasicsStep data={data} updateData={updateData} />;
    case 'branding':
      return <BrandingStep data={data} updateData={updateData} />;
    case 'hours':
      return <HoursStep data={data} updateData={updateData} />;
    case 'operations':
      return <OperationsStep data={data} updateData={updateData} />;
    case 'payments':
      return <PaymentsStep data={data} updateData={updateData} />;
    case 'workforce':
      return <WorkforceStep data={data} updateData={updateData} />;
    case 'complete':
      return <CompleteStep data={data} />;
    default:
      return null;
  }
}

// Individual step components
function WelcomeStep() {
  return (
    <div className="text-center animate-slide-up">
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--accent)] flex items-center justify-center shadow-[var(--shadow-glow)]">
        <svg className="w-10 h-10 text-[var(--text-inverse)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-[var(--text-primary)] font-[var(--font-heading)] mb-3">
        Welcome to <span className="gold-gradient">Grail</span>
      </h1>

      <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
        Let&apos;s get your barbershop set up. This wizard will walk you through
        the essential configuration in just a few minutes.
      </p>

      <div className="grid grid-cols-2 gap-4 text-left">
        {[
          { icon: '1', label: 'Basic info', desc: 'Name and contact details' },
          { icon: '2', label: 'Branding', desc: 'Colors and style' },
          { icon: '3', label: 'Operations', desc: 'How you work' },
          { icon: '4', label: 'Payments', desc: 'Get paid' },
        ].map((item) => (
          <div
            key={item.icon}
            className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
          >
            <div className="w-6 h-6 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] text-xs font-bold flex items-center justify-center mb-2">
              {item.icon}
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
            <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BasicsStep({ data, updateData }: { data: WizardData; updateData: (u: Partial<WizardData>) => void }) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Shop Basics
        </h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Tell us about your barbershop
        </p>
      </div>

      <div className="space-y-4">
        <FormField label="Shop Name" required>
          <FormTextField
            value={data.name}
            onChange={(e) => {
              updateData({ name: e.target.value });
              // Auto-generate slug
              const slug = e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
              updateData({ slug });
            }}
            placeholder="The Gentleman's Cut"
          />
        </FormField>

        <FormField label="URL Slug" description="grail.app/book/{slug}">
          <FormTextField
            value={data.slug}
            onChange={(e) =>
              updateData({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })
            }
            placeholder="gentlemans-cut"
          />
        </FormField>

        <FormField label="Address" required>
          <FormTextField
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="123 Main Street, Brooklyn, NY 11201"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Phone" required>
            <FormTextField
              type="tel"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              placeholder="(555) 123-4567"
            />
          </FormField>

          <FormField label="Email">
            <FormTextField
              type="email"
              value={data.email ?? ''}
              onChange={(e) => updateData({ email: e.target.value })}
              placeholder="hello@yourshop.com"
            />
          </FormField>
        </div>

        <FormField label="Timezone">
          <FormSelect
            value={data.timezone}
            onValueChange={(value) => updateData({ timezone: value })}
            options={TIMEZONE_OPTIONS}
          />
        </FormField>
      </div>
    </div>
  );
}

function BrandingStep({ data, updateData }: { data: WizardData; updateData: (u: Partial<WizardData>) => void }) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Branding
        </h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Customize your shop&apos;s appearance
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          label="Primary Color"
          description="Your main brand color"
        >
          <FormColorPicker
            value={data.branding.primaryColor}
            onChange={(color) =>
              updateData({ branding: { ...data.branding, primaryColor: color } })
            }
          />
        </FormField>

        <FormField
          label="Secondary Color"
          description="Used for backgrounds and accents"
        >
          <FormColorPicker
            value={data.branding.secondaryColor ?? '#1A1A1A'}
            onChange={(color) =>
              updateData({ branding: { ...data.branding, secondaryColor: color } })
            }
          />
        </FormField>

        {/* Preview */}
        <div className="p-4 rounded-lg border border-[var(--border)]">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">Preview</p>
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: data.branding.secondaryColor }}
          >
            <div
              className="text-lg font-bold font-[var(--font-heading)]"
              style={{ color: data.branding.primaryColor }}
            >
              {data.name || 'Your Shop Name'}
            </div>
            <button
              className="mt-3 px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-inverse)]"
              style={{ backgroundColor: data.branding.primaryColor }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HoursStep({ data, updateData }: { data: WizardData; updateData: (u: Partial<WizardData>) => void }) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Opening Hours
        </h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Set your regular operating hours
        </p>
      </div>

      <OpeningHoursEditor
        value={data.openingHours}
        onChange={(hours) => updateData({ openingHours: hours })}
      />
    </div>
  );
}

function OperationsStep({ data, updateData }: { data: WizardData; updateData: (u: Partial<WizardData>) => void }) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Operations
        </h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          How do clients visit your shop?
        </p>
      </div>

      <FormRadioGroup
        value={data.bookingSettings.mode}
        onValueChange={(value) =>
          updateData({
            bookingSettings: {
              ...data.bookingSettings,
              mode: value as 'appointments' | 'walkins' | 'both',
            },
          })
        }
        options={[
          {
            value: 'appointments',
            label: 'Appointments Only',
            description: 'Clients must book in advance',
          },
          {
            value: 'walkins',
            label: 'Walk-ins Only',
            description: 'First come, first served',
          },
          {
            value: 'both',
            label: 'Both (Recommended)',
            description: 'Accept appointments and walk-ins',
          },
        ]}
      />

      <div className="border-t border-[var(--border)] pt-6">
        <FormSwitch
          label="Enable Marketplace Listing"
          description="Show your shop in the Grail marketplace"
          checked={data.bookingSettings.marketplaceEnabled}
          onCheckedChange={(checked) =>
            updateData({
              bookingSettings: { ...data.bookingSettings, marketplaceEnabled: checked },
            })
          }
        />
      </div>
    </div>
  );
}

function PaymentsStep({ data, updateData }: { data: WizardData; updateData: (u: Partial<WizardData>) => void }) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Payments
        </h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Set up how you get paid
        </p>
      </div>

      {/* Stripe Connect CTA */}
      <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-[#635BFF] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.423-.977 1.478 0 2.887.582 3.909 1.072l.638-3.072c-.906-.404-2.088-.8-3.834-.8-1.478 0-2.7.395-3.591 1.112-.907.73-1.423 1.77-1.423 3.021 0 1.892 1.478 2.916 3.482 3.551 1.626.517 2.177.977 2.177 1.688 0 .693-.569 1.138-1.626 1.138-1.279 0-2.943-.551-4.096-1.28l-.657 3.064c1.153.693 2.943 1.183 4.753 1.183 1.551 0 2.836-.391 3.765-1.099.956-.737 1.494-1.825 1.494-3.195 0-1.951-1.409-3.013-3.902-3.603z"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-[var(--text-primary)]">Stripe Payments</p>
            <p className="text-sm text-[var(--text-muted)]">Accept cards, Apple Pay, and more</p>
          </div>
        </div>
        <button
          className={clsx(
            'w-full py-2.5 rounded-lg',
            'bg-[#635BFF] text-white font-medium text-sm',
            'hover:bg-[#5851E1] transition-colors'
          )}
        >
          Connect with Stripe
        </button>
        <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
          You can skip this and set up later in Settings
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <FormField label="Tax Rate">
          <FormNumberField
            value={data.paymentSettings.taxRate}
            onChange={(e) =>
              updateData({
                paymentSettings: {
                  ...data.paymentSettings,
                  taxRate: parseFloat(e.target.value) || 0,
                },
              })
            }
            min={0}
            max={100}
            step={0.001}
            suffix="%"
          />
        </FormField>
      </div>
    </div>
  );
}

function WorkforceStep({ data, updateData }: { data: WizardData; updateData: (u: Partial<WizardData>) => void }) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)]">
          Workforce
        </h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          How is your team structured?
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)] mb-3">Worker Classification</p>
          <FormRadioGroup
            value={data.workforce.type}
            onValueChange={(value) =>
              updateData({
                workforce: {
                  ...data.workforce,
                  type: value as 'w2' | '1099' | 'mixed',
                },
              })
            }
            options={[
              { value: 'w2', label: 'W-2 Employees', description: 'Traditional employment' },
              { value: '1099', label: '1099 Contractors', description: 'Independent' },
              { value: 'mixed', label: 'Mixed', description: 'Both types' },
            ]}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-[var(--text-primary)] mb-3">Compensation Model</p>
          <FormRadioGroup
            value={data.workforce.businessModel}
            onValueChange={(value) =>
              updateData({
                workforce: {
                  ...data.workforce,
                  businessModel: value as 'commission' | 'booth_rent' | 'hourly' | 'mixed',
                },
              })
            }
            options={[
              { value: 'commission', label: 'Commission', description: '% of services' },
              { value: 'booth_rent', label: 'Booth Rental', description: 'Fixed rent' },
              { value: 'hourly', label: 'Hourly', description: 'Hourly wage' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function CompleteStep({ data }: { data: WizardData }) {
  return (
    <div className="text-center animate-slide-up">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--success)] flex items-center justify-center">
        <CheckIcon className="w-10 h-10 text-white" />
      </div>

      <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)] mb-3">
        You&apos;re All Set!
      </h2>

      <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
        <strong className="gold-gradient">{data.name}</strong> is ready to launch.
        Click below to create your shop and start accepting bookings.
      </p>

      <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-left space-y-2">
        <p className="text-sm text-[var(--text-muted)]">Summary:</p>
        <ul className="text-sm text-[var(--text-secondary)] space-y-1">
          <li>Shop: <strong>{data.name}</strong></li>
          <li>URL: grail.app/book/<strong>{data.slug}</strong></li>
          <li>Mode: <strong>{data.bookingSettings.mode === 'both' ? 'Appointments + Walk-ins' : data.bookingSettings.mode}</strong></li>
          <li>Team: <strong>{data.workforce.type === 'w2' ? 'Employees' : data.workforce.type === '1099' ? 'Contractors' : 'Mixed'}</strong></li>
        </ul>
      </div>
    </div>
  );
}
