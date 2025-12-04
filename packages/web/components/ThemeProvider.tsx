'use client';

import { Theme } from '@radix-ui/themes';
import type { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <Theme
      appearance="dark"
      accentColor="amber"
      grayColor="sand"
      radius="medium"
      scaling="100%"
    >
      {children}
    </Theme>
  );
}
