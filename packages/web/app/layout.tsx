import '@radix-ui/themes/styles.css';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
