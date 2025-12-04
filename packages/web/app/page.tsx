import Link from 'next/link';
import {
  CalendarIcon,
  PersonIcon,
  DashboardIcon,
  GearIcon,
  BarChartIcon,
  ClockIcon,
  MobileIcon,
  LightningBoltIcon,
} from '@radix-ui/react-icons';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-radial" />
      <div className="absolute inset-0 gradient-radial-gold opacity-60" />
      <div className="absolute inset-0 pattern-dots opacity-30" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center shadow-[var(--shadow-gold)]">
            <span className="text-[var(--text-inverse)] font-bold text-lg font-[var(--font-heading)]">G</span>
          </div>
          <span className="text-xl font-bold text-[var(--text-primary)] font-[var(--font-heading)] group-hover:text-[var(--accent)] transition-colors">
            Grail
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/settings"
            className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/onboarding"
            className="px-5 py-2.5 text-sm font-medium rounded-lg gold-gradient-bg text-[var(--text-inverse)] shadow-[var(--shadow-gold)] hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center max-w-4xl mx-auto mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] text-sm font-medium mb-8 animate-fade-in">
            <LightningBoltIcon className="w-4 h-4" />
            <span>Premium Barbershop Management</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up font-[var(--font-heading)] leading-tight">
            The <span className="gold-gradient">Holy Grail</span> of
            <br />
            Barbershop Software
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 animate-slide-up stagger-1 text-balance">
            Seamless booking, intelligent scheduling, and powerful analytics.
            Everything you need to run a world-class barbershop.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-2">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl gold-gradient-bg text-[var(--text-inverse)] shadow-[var(--shadow-gold)] hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Start Free Trial
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] transition-all shadow-[var(--shadow-sm)]"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Barber Dashboard Card */}
          <div className="glass-card rounded-2xl p-8 hover-lift animate-slide-up stagger-3 group">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl gold-gradient-bg flex items-center justify-center shadow-[var(--shadow-gold)] group-hover:scale-110 transition-transform">
                <CalendarIcon className="w-7 h-7 text-[var(--text-inverse)]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)] mb-1">
                  Barber Dashboard
                </h2>
                <p className="text-[var(--text-secondary)]">
                  Manage your daily schedule and clients
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <FeatureItem icon={ClockIcon} text="Today's schedule at a glance" />
              <FeatureItem icon={CalendarIcon} text="Full calendar management" />
              <FeatureItem icon={PersonIcon} text="Client history & preferences" />
              <FeatureItem icon={MobileIcon} text="Point of sale checkout" />
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/today"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg gold-gradient-bg text-[var(--text-inverse)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-gold)] transition-all"
              >
                <ClockIcon className="w-4 h-4" />
                Today&apos;s Schedule
              </Link>
              <Link
                href="/calendar"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[var(--surface-hover)] text-[var(--text-primary)] hover:bg-[var(--surface-active)] transition-colors"
              >
                <CalendarIcon className="w-4 h-4" />
                Calendar
              </Link>
              <Link
                href="/clients"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[var(--surface-hover)] text-[var(--text-primary)] hover:bg-[var(--surface-active)] transition-colors"
              >
                <PersonIcon className="w-4 h-4" />
                Clients
              </Link>
              <Link
                href="/pos"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[var(--surface-hover)] text-[var(--text-primary)] hover:bg-[var(--surface-active)] transition-colors"
              >
                <MobileIcon className="w-4 h-4" />
                POS
              </Link>
            </div>
          </div>

          {/* Owner Dashboard Card */}
          <div className="glass-card rounded-2xl p-8 hover-lift animate-slide-up stagger-4 group">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl gold-gradient-bg flex items-center justify-center shadow-[var(--shadow-gold)] group-hover:scale-110 transition-transform">
                <DashboardIcon className="w-7 h-7 text-[var(--text-inverse)]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-heading)] mb-1">
                  Owner Dashboard
                </h2>
                <p className="text-[var(--text-secondary)]">
                  Manage your shop and view analytics
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <FeatureItem icon={BarChartIcon} text="Revenue & performance metrics" />
              <FeatureItem icon={GearIcon} text="Complete shop configuration" />
              <FeatureItem icon={PersonIcon} text="Staff management" />
              <FeatureItem icon={DashboardIcon} text="Business intelligence" />
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg gold-gradient-bg text-[var(--text-inverse)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-gold)] transition-all"
              >
                <DashboardIcon className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/settings"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[var(--surface-hover)] text-[var(--text-primary)] hover:bg-[var(--surface-active)] transition-colors"
              >
                <GearIcon className="w-4 h-4" />
                Settings
              </Link>
              <Link
                href="/reports"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[var(--surface-hover)] text-[var(--text-primary)] hover:bg-[var(--surface-active)] transition-colors"
              >
                <BarChartIcon className="w-4 h-4" />
                Reports
              </Link>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-20 text-center animate-slide-up stagger-5">
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Trusted by premium barbershops worldwide
          </p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-[var(--text-muted)] font-[var(--font-heading)]">Blade & Co.</div>
            <div className="w-px h-6 bg-[var(--border)]" />
            <div className="text-2xl font-bold text-[var(--text-muted)] font-[var(--font-heading)]">The Parlor</div>
            <div className="w-px h-6 bg-[var(--border)]" />
            <div className="text-2xl font-bold text-[var(--text-muted)] font-[var(--font-heading)]">Gentlemen&apos;s</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--border)] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Grail. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
            <Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature item component
function FeatureItem({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="flex items-center gap-3 text-[var(--text-secondary)]">
      <div className="w-6 h-6 rounded-md bg-[var(--accent-muted)] flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-[var(--accent)]" />
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
}
