import '@radix-ui/themes/styles.css';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Grail - Barbershop Booking & POS',
  description: 'Premium multi-tenant barbershop booking and point-of-sale platform',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
