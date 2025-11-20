import { Theme, Container } from '@radix-ui/themes';
import { useState } from 'react';
import { WidgetHome } from './components/WidgetHome';
import { WidgetCalendar } from './components/WidgetCalendar';
import { WaitlistEnroll } from './components/WaitlistEnroll';
import { Checkout } from './components/Checkout';
import { Confirmation } from './components/Confirmation';

export interface WidgetProps {
  shopSlug: string;
}

export type WidgetView = 'home' | 'calendar' | 'waitlist' | 'checkout' | 'confirmation';

export function Widget({ shopSlug }: WidgetProps) {
  const [currentView, setCurrentView] = useState<WidgetView>('home');

  const handleNavigate = (view: WidgetView) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <WidgetHome onNavigate={handleNavigate} />;
      case 'calendar':
        return <WidgetCalendar onNavigate={handleNavigate} />;
      case 'waitlist':
        return <WaitlistEnroll onNavigate={handleNavigate} />;
      case 'checkout':
        return <Checkout onNavigate={handleNavigate} />;
      case 'confirmation':
        return <Confirmation onNavigate={handleNavigate} />;
      default:
        return <WidgetHome onNavigate={handleNavigate} />;
    }
  };

  return (
    <Theme accentColor="blue" grayColor="slate" radius="medium" scaling="95%">
      <Container size="2" className="grail-widget">
        <div data-shop-slug={shopSlug}>{renderView()}</div>
      </Container>
    </Theme>
  );
}
