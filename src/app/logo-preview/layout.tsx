import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Internal design-preview page — keep out of search and AI indexes.
export const metadata: Metadata = {
  title: 'Logo Preview',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
