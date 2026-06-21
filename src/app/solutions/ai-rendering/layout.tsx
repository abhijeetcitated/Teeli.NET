import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'AI-Assisted Rendering',
  description:
    'How Teeli uses AI-assisted denoising and automated geometry checks to speed up Blender Cycles cloud renders — assistive tooling, not a replacement for your scene setup.',
  alternates: { canonical: '/solutions/ai-rendering' },
  openGraph: {
    url: 'https://teeli.net/solutions/ai-rendering',
    title: 'AI-Assisted Rendering | TEELI.NET',
    description:
      'AI-assisted denoising and geometry checks that speed up Blender Cycles cloud renders.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
