import '@radix-ui/themes/styles.css';
import './globals.css';
import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grail - Barbershop Booking & POS',
  description: 'Multi-tenant barbershop booking and point-of-sale platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%">
          {children}
        </Theme>
      </body>
    </html>
  );
}
