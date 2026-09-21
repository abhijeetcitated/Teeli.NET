import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGlossaryTerms } from '@/lib/glossary';

export const metadata: Metadata = {
  title: '3D Mesh & Geometry Glossary (2026) | TEELI',
  description:
    'Comprehensive technical reference for 3D printing geometry errors, slicer troubleshooting (Bambu, Cura, PrusaSlicer), mesh repair terms, and file specifications.',
  alternates: {
    canonical: 'https://teeli.net/glossary',
  },
  openGraph: {
    title: '3D Mesh & Geometry Glossary (2026) | TEELI',
    description:
      'Clear, practical technical definitions for 3D printing mesh errors, watertight solids, non-manifold edges, and slicer warnings.',
    url: 'https://teeli.net/glossary',
    siteName: 'TEELI.NET',
  },
};

export default function GlossaryIndexPage() {
  const terms = getAllGlossaryTerms();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': 'https://teeli.net/glossary#set',
    name: 'TEELI 3D Mesh & Geometry Glossary',
    description:
      'A technical glossary covering 3D mesh geometry, non-manifold topology, 3D printing slicer warnings, and automated repair standards.',
    url: 'https://teeli.net/glossary',
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.shortDefinition,
      url: `https://teeli.net/glossary/${t.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-black text-zinc-100 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 mb-8"
          >
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-zinc-200 font-medium">Glossary</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4 tracking-wide uppercase">
              Technical Reference & Definitions
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              3D Mesh &amp; Geometry Glossary
            </h1>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Standardized engineering definitions for 3D printing defects, mesh topology errors, slicer warnings (Bambu Studio, Cura, PrusaSlicer), and repair mechanisms.
            </p>
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {terms.map((term) => (
              <Link
                key={term.slug}
                href={`/glossary/${term.slug}`}
                className="group p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Geometry Term
                    </span>
                    <span className="text-xs text-zinc-400">{term.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                    {term.term}
                  </h2>
                  <p className="text-zinc-300 text-sm line-clamp-3 leading-relaxed mb-4">
                    {term.shortDefinition}
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span>Read full definition &amp; fixes</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Tool CTA Banner */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-950 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Need to Diagnose a Broken 3D Model?
              </h3>
              <p className="text-sm text-zinc-300 max-w-xl">
                Run our automated mesh diagnostic engine to check non-manifold geometry, boundary holes, inverted normals, and scale verification in seconds.
              </p>
            </div>
            <a
              href="https://app.teeli.net/?utm_source=teeli.net&utm_medium=glossary_index&utm_campaign=cta"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all shadow-lg hover:shadow-emerald-500/20 flex-shrink-0"
            >
              Check File for Free →
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
