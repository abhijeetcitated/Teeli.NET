import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllComparisons, getComparisonBySlug } from '@/lib/compare';

export async function generateStaticParams() {
  const items = getAllComparisons();
  return items.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);

  if (!comp) {
    return {
      title: 'Comparison Not Found',
      description: 'The requested 3D comparison could not be found.',
    };
  }

  const url = `https://teeli.net/compare/${comp.slug}`;

  return {
    title: comp.metaTitle,
    description: comp.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: comp.metaTitle,
      description: comp.metaDescription,
      url: url,
      siteName: 'TEELI.NET',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: comp.metaTitle,
      description: comp.metaDescription,
    },
  };
}

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);

  if (!comp) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://teeli.net/compare/${comp.slug}#article`,
        headline: comp.headline,
        description: comp.metaDescription,
        datePublished: comp.updatedDate,
        dateModified: comp.updatedDate,
        author: {
          '@type': 'Organization',
          name: 'TEELI 3D Engineering Team',
          url: 'https://teeli.net',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `https://teeli.net/compare/${comp.slug}#faq`,
        mainEntity: comp.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://teeli.net/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Compare',
            item: 'https://teeli.net/compare',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: comp.title,
            item: `https://teeli.net/compare/${comp.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-black text-zinc-100 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 mb-6"
          >
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/compare"
              className="hover:text-emerald-400 transition-colors"
            >
              Compare
            </Link>
            <span>/</span>
            <span className="text-zinc-200 font-medium">{comp.slug}</span>
          </nav>

          {/* Badge & H1 */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4 tracking-wide uppercase">
            Format &amp; Slicer Benchmark
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {comp.headline}
          </h1>

          {/* AI Answer Summary Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              Executive Summary (Direct Answer)
            </div>
            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed">
              {comp.summary}
            </p>
          </div>

          {/* Item Quick Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 mb-2 inline-block">
                {comp.itemA.badge}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{comp.itemA.name}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{comp.itemA.description}</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 mb-2 inline-block">
                {comp.itemB.badge}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{comp.itemB.name}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{comp.itemB.description}</p>
            </div>

            {comp.itemC && (
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 mb-2 inline-block">
                  {comp.itemC.badge}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{comp.itemC.name}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{comp.itemC.description}</p>
              </div>
            )}
          </div>

          {/* Comparison Matrix Table */}
          <section className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Side-by-Side Capability Matrix
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-800 bg-zinc-900/90 text-xs uppercase text-zinc-400">
                  <tr>
                    <th className="py-4 px-5 font-bold">Feature</th>
                    <th className="py-4 px-5 font-bold text-zinc-200">{comp.itemA.name}</th>
                    <th className="py-4 px-5 font-bold text-zinc-200">{comp.itemB.name}</th>
                    {comp.itemC && <th className="py-4 px-5 font-bold text-emerald-400">{comp.itemC.name}</th>}
                    <th className="py-4 px-5 font-bold text-emerald-400">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {comp.matrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">{row.feature}</td>
                      <td className="py-4 px-5 text-zinc-400 text-xs leading-relaxed">{row.itemA}</td>
                      <td className="py-4 px-5 text-zinc-400 text-xs leading-relaxed">{row.itemB}</td>
                      {comp.itemC && (
                        <td className="py-4 px-5 text-emerald-300 text-xs leading-relaxed font-medium">
                          {row.itemC}
                        </td>
                      )}
                      <td className="py-4 px-5 text-xs font-bold text-emerald-400">
                        {row.winner || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Verdict & Recommendation */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-950 border border-emerald-500/30 mb-14">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Final Recommendation &amp; Best Practice
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              {comp.verdict}
            </p>
            <a
              href="https://app.teeli.net/?utm_source=teeli.net&utm_medium=compare&utm_campaign=format-benchmark"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm transition-all shadow-md"
            >
              <span>Verify &amp; Repair Your 3D File on TEELI</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* FAQ Section */}
          <section className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {comp.faq.map((item, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 open:bg-zinc-900/80 transition-all cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-semibold text-white list-none">
                    <span>{item.question}</span>
                    <span className="text-emerald-400 transition group-open:rotate-180">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-zinc-300 text-sm leading-relaxed border-t border-zinc-800/60 pt-3">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section className="border-t border-zinc-800/80 pt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
              Related Geometry Guides &amp; Tools
            </h3>
            <div className="flex flex-wrap gap-3">
              {comp.relatedSlugs.map((l, idx) => (
                <Link
                  key={idx}
                  href={l.href}
                  className="text-xs px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-emerald-500/10 hover:text-emerald-300 text-zinc-300 border border-zinc-800 transition-colors"
                >
                  {l.title}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
