import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGlossaryTerms, getGlossaryTermBySlug } from '@/lib/glossary';

export async function generateStaticParams() {
  const terms = getAllGlossaryTerms();
  return terms.map((t) => ({
    term: t.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ term: string }>;
}): Promise<Metadata> {
  const { term: slug } = await params;
  const data = getGlossaryTermBySlug(slug);

  if (!data) {
    return {
      title: 'Term Not Found',
      description: 'The requested 3D geometry term could not be found.',
    };
  }

  const url = `https://teeli.net/glossary/${data.slug}`;

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: url,
      siteName: 'TEELI.NET',
      type: 'article',
      publishedTime: data.updatedDate,
      modifiedTime: data.updatedDate,
      authors: [data.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle,
      description: data.metaDescription,
    },
    keywords: [
      data.term,
      'non-manifold mesh',
      'watertight 3D model',
      '3D printing repair',
      'slicer error fix',
      'Bambu Studio fix model',
      'Cura mesh repair',
      'PrusaSlicer repair',
      'Blender non manifold',
    ],
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term: slug } = await params;
  const data = getGlossaryTermBySlug(slug);

  if (!data) {
    notFound();
  }

  // Only link related terms that are published (unpublished slugs would 404).
  const publishedSlugs = new Set(getAllGlossaryTerms().map((t) => t.slug));
  const relatedTerms = data.relatedTerms.filter((t) => publishedSlugs.has(t.slug));

  // Structured JSON-LD Schema (Article + DefinedTerm + FAQPage + BreadcrumbList)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://teeli.net/glossary/${data.slug}#article`,
        mainEntityOfPage: `https://teeli.net/glossary/${data.slug}`,
        headline: data.headline,
        description: data.metaDescription,
        datePublished: data.updatedDate,
        dateModified: data.updatedDate,
        author: {
          '@type': 'Person',
          name: data.author.name,
          url: data.author.url,
          sameAs: data.author.sameAs,
        },
        publisher: {
          '@type': 'Organization',
          name: 'TEELI',
          url: 'https://teeli.net',
          logo: {
            '@type': 'ImageObject',
            url: 'https://teeli.net/favicon.ico',
          },
        },
        about: {
          '@id': `https://teeli.net/glossary/${data.slug}#term`,
        },
      },
      {
        '@type': 'DefinedTerm',
        '@id': `https://teeli.net/glossary/${data.slug}#term`,
        name: data.term,
        description: data.shortDefinition,
        url: `https://teeli.net/glossary/${data.slug}`,
        inDefinedTermSet: {
          '@type': 'DefinedTermSet',
          '@id': 'https://teeli.net/glossary#set',
          name: 'TEELI 3D Mesh & Geometry Glossary',
          url: 'https://teeli.net/glossary',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `https://teeli.net/glossary/${data.slug}#faq`,
        mainEntity: data.faq.map((item) => ({
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
            name: 'Glossary',
            item: 'https://teeli.net/glossary',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: data.term,
            item: `https://teeli.net/glossary/${data.slug}`,
          },
        ],
      },
    ],
  };

  // Convert simple markdown headings and paragraphs into styled elements
  const formatContent = (content: string) => {
    const sections = content.split('\n\n');
    return sections.map((sec, idx) => {
      const trimmed = sec.trim();
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4 border-b border-zinc-800 pb-3"
          >
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            className="text-xl md:text-2xl font-semibold text-emerald-400 mt-8 mb-3"
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith(':::callout')) {
        const calloutText = trimmed
          .replace(':::callout', '')
          .replace(':::', '')
          .trim();
        return (
          <div
            key={idx}
            className="my-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900/60 to-zinc-900 border border-emerald-500/30 shadow-lg shadow-emerald-950/20 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">
                  Automated Geometry Verification
                </h4>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                  {calloutText.split('\n')[0]}
                </p>
                <a
                  href="https://app.teeli.net/?utm_source=teeli.net&utm_medium=glossary&utm_campaign=non-manifold"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all shadow-md hover:shadow-emerald-500/20"
                >
                  <span>Launch Free Diagnostic Check</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        );
      }
      if (trimmed.startsWith('* ') || trimmed.startsWith('1. ')) {
        const items = trimmed.split('\n').filter(Boolean);
        return (
          <ul key={idx} className="space-y-3 my-4 pl-2">
            {items.map((it, iIdx) => {
              const cleanItem = it.replace(/^(\*|\d+\.)\s+/, '');
              return (
                <li key={iIdx} className="flex items-start gap-3 text-zinc-300">
                  <span className="text-emerald-400 mt-1">▸</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cleanItem
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-300 font-mono text-xs">$1</code>'),
                    }}
                  />
                </li>
              );
            })}
          </ul>
        );
      }

      // Default paragraph
      return (
        <p
          key={idx}
          className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6"
          dangerouslySetInnerHTML={{
            __html: trimmed
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
              .replace(/\*(.*?)\*/g, '<em class="text-zinc-200 italic">$1</em>')
              .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-300 font-mono text-xs">$1</code>'),
          }}
        />
      );
    });
  };

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-black text-zinc-100 pt-24 pb-20">
      <article>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 mb-8"
          >
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/glossary"
              className="hover:text-emerald-400 transition-colors"
            >
              Glossary
            </Link>
            <span>/</span>
            <span className="text-zinc-200 font-medium">{data.term}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4 tracking-wide uppercase">
                3D Geometry Terminology
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {data.headline}
              </h1>

              {/* Metadata strip */}
              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-zinc-400 mb-8 border-b border-zinc-800/80 pb-6">
                <span>Updated {data.updatedDate}</span>
                <span>•</span>
                <span>{data.readTime}</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">
                  By {data.author.name} ({data.author.role})
                </span>
              </div>

              {/* Answer Paragraph (Hero Snippet for AI Overviews) */}
              <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/90 border-2 border-emerald-500/40 shadow-xl mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Exact Definition (AI Citation Ready)
                </div>
                <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                  {data.shortDefinition}
                </p>

                {/* Quick Answers Matrix */}
                <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {data.quickAnswers.map((qa, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-black/40 border border-zinc-800"
                    >
                      <div className="text-xs font-bold text-emerald-300 mb-1">
                        {qa.question}
                      </div>
                      <div className="text-xs text-zinc-300 leading-normal">
                        {qa.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-invert max-w-none">
                {formatContent(data.content)}
              </div>

              {/* FAQ Section */}
              <section className="mt-16 pt-10 border-t border-zinc-800">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-zinc-400">
                      Standard technical questions around non-manifold geometry and slicer warnings
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {data.faq.map((item, idx) => (
                    <details
                      key={idx}
                      className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 open:bg-zinc-900/80 transition-all cursor-pointer"
                    >
                      <summary className="flex items-center justify-between font-semibold text-white list-none text-base md:text-lg">
                        <span>{item.question}</span>
                        <span className="text-emerald-400 transition group-open:rotate-180">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </span>
                      </summary>
                      <p className="mt-4 text-zinc-300 text-sm md:text-base leading-relaxed border-t border-zinc-800/60 pt-3">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              {/* Author & Review Card */}
              <div className="mt-16 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-black text-2xl flex-shrink-0">
                  AP
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                    <span>{data.author.name}</span>
                    <a
                      href={data.author.sameAs[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-emerald-400 text-xs inline-flex items-center gap-1 bg-zinc-800 px-2 py-0.5 rounded"
                    >
                      LinkedIn ↗
                    </a>
                  </div>
                  <div className="text-xs text-emerald-400 font-medium mb-1">
                    {data.author.role}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Researched and validated against Bambu Studio, Orca Slicer, Cura 5.x, PrusaSlicer 2.9, and Blender 4.x test meshes.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Column (Desktop sticky) */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Tool Widget Card (High Dwell-Time Converter) */}
              <div className="sticky top-28 space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-emerald-500/30 shadow-xl relative overflow-hidden">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                    Interactive Utility
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Check Your 3D File Online
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                    Don&apos;t guess what broke your print. Upload your STL, GLB or zipped OBJ to inspect non-manifold edges, flipped normals, and watertightness instantly.
                  </p>

                  <a
                    href="https://app.teeli.net/?utm_source=teeli.net&utm_medium=glossary&utm_campaign=non-manifold"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all shadow-lg hover:shadow-emerald-500/25"
                  >
                    <span>Inspect 3D File Free</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>

                  <div className="mt-4 pt-4 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                    <span>✓ Free diagnosis</span>
                    <span>✓ No account needed</span>
                    <span>✓ 200 MB free cap</span>
                  </div>
                </div>

                {/* Related Tools Box */}
                {data.relatedTools && data.relatedTools.length > 0 && (
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Related Tools
                  </h4>
                  <ul className="space-y-3">
                    {data.relatedTools.map((tool) => (
                      <li key={tool.url}>
                        {tool.url.startsWith('/') ? (
                          <Link href={tool.url} className="text-sm font-semibold text-emerald-300 hover:text-emerald-200 underline underline-offset-2">
                            {tool.name}
                          </Link>
                        ) : (
                          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-300 hover:text-emerald-200 underline underline-offset-2">
                            {tool.name}
                          </a>
                        )}
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{tool.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                )}

                {/* Related Terms Box */}
                {relatedTerms.length > 0 && (
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Related Geometry Terms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {relatedTerms.map((t, idx) => (
                      <Link
                        key={idx}
                        href={`/glossary/${t.slug}`}
                        className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-emerald-500/10 hover:text-emerald-300 text-zinc-300 border border-zinc-700/50 transition-colors"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>
      </main>
    </>
  );
}
