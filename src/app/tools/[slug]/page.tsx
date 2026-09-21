import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTools, getToolBySlug } from '@/lib/tools';
import ToolUploadDropzone from '@/components/tools/ToolUploadDropzone';

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | TEELI',
      description: 'The requested 3D repair tool could not be found.',
    };
  }

  const url = `https://teeli.net/tools/${tool.slug}`;

  return {
    title: `${tool.metaTitle} | TEELI`,
    description: tool.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: url,
      siteName: 'TEELI.NET',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Schema Markup: SoftwareApplication + FAQPage + BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `https://teeli.net/tools/${tool.slug}#app`,
        name: tool.name,
        applicationCategory: 'DesignApplication',
        applicationSubCategory: '3D mesh repair',
        operatingSystem: 'All (Web-based: Chrome, Edge, Safari, Firefox)',
        browserRequirements: 'Requires HTML5, WebGL/WebGPU capable browser',
        url: `https://teeli.net/tools/${tool.slug}`,
        description: tool.metaDescription,
        dateModified: tool.lastUpdated,
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          description: 'Free diagnosis, no account required. Repair is credit-based.',
        },
        publisher: {
          '@type': 'Organization',
          name: 'TEELI',
          url: 'https://teeli.net',
        },
      },
      {
        '@type': 'HowTo',
        '@id': `https://teeli.net/tools/${tool.slug}#howto`,
        name: `How to Fix Non-Manifold ${tool.format.toUpperCase()} Files for 3D Printing`,
        description: `Step-by-step automated workflow to inspect, identify non-manifold defects, and repair 3D meshes for Bambu Studio, OrcaSlicer, Cura, and PrusaSlicer.`,
        totalTime: 'PT1M',
        step: (tool.repairSteps || [
          { step: '01', name: 'Upload 3D Mesh', desc: 'Drag and drop your 3D mesh into the cloud inspector.' },
          { step: '02', name: 'Ray-Cast Diagnostic Check', desc: 'Automated topology algorithm scans for open boundaries and non-manifold edges.' },
          { step: '03', name: 'Review Defect Counts', desc: 'Inspect exact non-manifold edge count and slicer compatibility report.' },
          { step: '04', name: 'Download Watertight Solid', desc: 'Automated repair stitches detached vertices and outputs a 2-manifold print-ready file.' },
        ]).map((s, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: s.name,
          text: s.desc,
          url: `https://teeli.net/tools/${tool.slug}`,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `https://teeli.net/tools/${tool.slug}#faq`,
        mainEntity: tool.faq.map((item) => ({
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
            name: 'Tools',
            item: 'https://teeli.net/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: tool.name,
            item: `https://teeli.net/tools/${tool.slug}`,
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

      <main className="min-h-screen bg-black text-zinc-100 pt-8 sm:pt-10 md:pt-12 pb-20 antialiased selection:bg-emerald-500 selection:text-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 mb-3"
          >
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/tools"
              className="hover:text-emerald-400 transition-colors"
            >
              Tools
            </Link>
            <span>/</span>
            <span className="text-zinc-200 font-medium">{tool.name}</span>
          </nav>

          {/* 2. H1 Header */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2.5">
            {tool.headline}
          </h1>

          {/* 3. Answer Paragraph (Above the Fold) */}
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl mb-2">
            {tool.answerParagraph}
          </p>

          {/* 4. Interactive Widget Component (Above the fold conversion) */}
          <ToolUploadDropzone
            format={tool.format}
            slug={tool.slug}
            sizeCapMB={tool.trustStrip.sizeCapMB}
          />

          {/* 5. Trust Strip */}
          <div className="mb-10 py-2.5 px-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <span className="text-emerald-400">✓</span> 100% Free Diagnosis
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <span className="text-emerald-400">✓</span> No Account or Card Needed
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <span className="text-emerald-400">✓</span> Auto-deleted after {tool.trustStrip.purgeHours}h
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <span className="text-emerald-400">✓</span> Up to {tool.trustStrip.sizeCapMB}MB
            </span>
          </div>

          {/* 6–10. Body Content Sections */}
          <div className="space-y-16 max-w-4xl text-zinc-300 leading-relaxed">
            
            {/* 6. What is non-manifold geometry? */}
            <section className="border-t border-zinc-800/80 pt-10">
              <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
                Geometric Foundations
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                What is non-manifold geometry in 3D printing?
              </h2>
              <p className="text-base sm:text-lg text-zinc-200 mb-6 leading-relaxed font-normal">
                {tool.issueExplanation}
              </p>

              {/* Bullet Key Points (Scannable Architecture) */}
              {tool.issueKeyPoints && tool.issueKeyPoints.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  {tool.issueKeyPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/90 hover:border-emerald-500/30 transition-all flex flex-col justify-start"
                    >
                      <div className="text-2xl mb-3">{pt.icon}</div>
                      <h3 className="font-bold text-white text-sm mb-2">
                        {pt.label}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {pt.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Visual Diagnostic Cards (3 Core Defects) */}
              {tool.issueCards && tool.issueCards.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  {tool.issueCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col justify-between hover:border-zinc-700 transition-colors"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-xl mb-3">
                          {card.icon}
                        </div>
                        <h3 className="font-bold text-white text-sm mb-2">
                          {card.title}
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Complete Defects Comparison Table */}
              {tool.defectsTable && tool.defectsTable.length > 0 && (
                <div className="my-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                    <span>📊</span> Non-Manifold Defect Classification Matrix
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-xl">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="border-b border-zinc-800 bg-zinc-900/80 uppercase text-zinc-400 text-[11px] tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4 font-bold text-white">Defect Category</th>
                          <th className="py-3.5 px-4 font-bold">Topological Condition</th>
                          <th className="py-3.5 px-4 font-bold">Slicer Ray-Cast</th>
                          <th className="py-3.5 px-4 font-bold text-red-400">Print Failure</th>
                          <th className="py-3.5 px-4 font-bold text-emerald-400">TEELI Repair</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                        {tool.defectsTable.map((row, idx) => (
                          <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                              {row.defect}
                            </td>
                            <td className="py-3.5 px-4 text-zinc-300 font-mono text-[11px]">
                              {row.condition}
                            </td>
                            <td className="py-3.5 px-4 text-zinc-400 text-xs">
                              {row.raycast}
                            </td>
                            <td className="py-3.5 px-4 text-red-300/90 text-xs">
                              {row.physicalImpact}
                            </td>
                            <td className="py-3.5 px-4 text-emerald-300 text-xs font-medium">
                              ✓ {row.fix}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Math Callout */}
              {tool.mathExplanation && (
                <div className="my-6 p-5 rounded-2xl bg-gradient-to-r from-zinc-900/90 to-zinc-900/40 border border-emerald-500/20 text-sm text-zinc-300">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2">
                    <span>📐</span> The Euler-Poincaré Topological Condition
                  </div>
                  <p className="leading-relaxed text-xs sm:text-sm text-zinc-200 font-mono mb-2 bg-black/40 p-2.5 rounded-lg border border-zinc-800/80 inline-block">
                    V - E + F = 2(1 - g) &amp; 3F = 2E
                  </p>
                  <p className="leading-relaxed text-xs sm:text-sm text-zinc-300">
                    {tool.mathExplanation}
                  </p>
                </div>
              )}

              {/* High-Visibility Glossary Action Card */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80">
                <Link
                  href="/glossary/non-manifold-edges"
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900/90 to-zinc-900/60 border border-emerald-500/30 hover:border-emerald-400 hover:bg-zinc-900 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                      📖
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-0.5">
                        Interactive 3D Geometry Glossary
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        Read comprehensive definition in our 3D Geometry Glossary
                      </div>
                      <div className="text-xs text-zinc-400">
                        Topological formula, slicer behavior differences &amp; edge classification
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all whitespace-nowrap self-start sm:self-center px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 group-hover:bg-emerald-500/20">
                    <span>View Glossary Term</span>
                    <span>→</span>
                  </div>
                </Link>
              </div>
            </section>

            {/* 7. Why does this break 3D printing? */}
            <section className="border-t border-zinc-800/80 pt-10">
              <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-red-400 mb-2">
                Manufacturing Impact
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                Why does non-manifold geometry break 3D printing?
              </h2>
              <p className="text-base sm:text-lg text-zinc-200 mb-6 font-normal">
                {tool.printingImpact}
              </p>

              {/* Printing Failure Cards */}
              {tool.printingFailures && tool.printingFailures.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  {tool.printingFailures.map((fail, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-red-950/15 border border-red-900/40 flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-3">
                          {fail.badge}
                        </span>
                        <h3 className="font-bold text-white text-sm mb-2">
                          {fail.title}
                        </h3>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {fail.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Slicer Error Comparison Table (High-Density Structured Table) */}
              {tool.slicerTable && tool.slicerTable.length > 0 && (
                <div className="my-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                    <span>⚠️</span> Slicer Diagnostics &amp; Native Limitations Matrix
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-xl">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="border-b border-zinc-800 bg-zinc-900/80 uppercase text-zinc-400 text-[11px] tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4 font-bold text-white">Slicer</th>
                          <th className="py-3.5 px-4 font-bold">Dialog Warning Alert</th>
                          <th className="py-3.5 px-4 font-bold">Default Behavior</th>
                          <th className="py-3.5 px-4 font-bold">Native Repair Tool</th>
                          <th className="py-3.5 px-4 font-bold text-amber-300">OS Limitations</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                        {tool.slicerTable.map((row, idx) => (
                          <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                              {row.slicer}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px] text-amber-200/90">
                              {row.dialog}
                            </td>
                            <td className="py-3.5 px-4 text-zinc-400 text-xs">
                              {row.behavior}
                            </td>
                            <td className="py-3.5 px-4 text-zinc-300 text-xs">
                              {row.nativeTool}
                            </td>
                            <td className="py-3.5 px-4 text-red-300 text-xs font-medium">
                              {row.limitations}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>



            {/* 8. How TEELI Fixes It */}
            <section className="border-t border-zinc-800/80 pt-10">
              <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
                Automated Pipeline
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                How TEELI repairs your 3D mesh (4-Step Pipeline)
              </h2>
              <p className="text-base sm:text-lg text-zinc-200 mb-6 font-normal">
                {tool.howTeeliFixes}
              </p>

              {/* Step-by-Step Pipeline Cards with Bullet Points */}
              {tool.repairSteps && tool.repairSteps.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  {tool.repairSteps.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 relative overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="text-2xl font-black text-emerald-400 font-mono tracking-tighter">
                            {s.step}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Automated Stage
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-base mb-1.5">
                          {s.name}
                        </h3>
                        <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                          {s.desc}
                        </p>
                        {s.bulletPoints && s.bulletPoints.length > 0 && (
                          <ul className="space-y-1.5 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-3">
                            {s.bulletPoints.map((bp, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold">✓</span>
                                <span>{bp}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Proof / Verification Table */}
              {tool.verificationTable && tool.verificationTable.length > 0 && (
                <div className="my-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                    <span>🔬</span> Quality Inspection &amp; Slicer Verification
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-xl">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="border-b border-zinc-800 bg-zinc-900/80 text-xs uppercase text-zinc-400 tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4 font-bold text-white">Quality Inspection Metric</th>
                          <th className="py-3.5 px-4 font-bold text-red-400">Raw Upload (Corrupted STL)</th>
                          <th className="py-3.5 px-4 font-bold text-emerald-400">After TEELI Automated Repair</th>
                          <th className="py-3.5 px-4 font-bold">Slicer Toolpath Impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                        {tool.verificationTable.map((v, idx) => (
                          <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                            <td className="py-3.5 px-4 font-medium text-white whitespace-nowrap">
                              {v.metric}
                            </td>
                            <td className="py-3.5 px-4 text-red-400 font-mono text-xs">
                              {v.before}
                            </td>
                            <td className="py-3.5 px-4 text-emerald-400 font-mono text-xs font-semibold">
                              {v.after}
                            </td>
                            <td className="py-3.5 px-4 text-zinc-400 text-xs">
                              {v.impact}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            {/* 9. Free Alternatives & 2026 Comparison Matrix */}
            <section className="border-t border-zinc-800/80 pt-10">
              <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Market Benchmarks
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                Free Alternatives vs. TEELI in 2026
              </h2>
              <p className="text-base sm:text-lg text-zinc-200 mb-6 font-normal">
                {tool.freeAlternatives}
              </p>

              {/* 2026 Comparison Matrix Table */}
              {tool.comparisonMatrix && tool.comparisonMatrix.length > 0 && (
                <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40 my-6 shadow-xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="border-b border-zinc-800 bg-zinc-900/80 uppercase text-zinc-400 text-[11px] tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4 font-bold text-white">Tool Name</th>
                        <th className="py-3.5 px-4 font-bold">Architecture Type</th>
                        <th className="py-3.5 px-4 font-bold">Pricing Model</th>
                        <th className="py-3.5 px-4 font-bold">Mac &amp; Linux Support</th>
                        <th className="py-3.5 px-4 font-bold">Preserves Multi-Color</th>
                        <th className="py-3.5 px-4 font-bold">2026 Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      {tool.comparisonMatrix.map((c, idx) => (
                        <tr
                          key={idx}
                          className={c.tool.includes('TEELI') ? 'bg-emerald-500/5 font-medium' : 'hover:bg-zinc-800/30 transition-colors'}
                        >
                          <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                            {c.tool}
                          </td>
                          <td className="py-3.5 px-4 text-zinc-400">{c.type}</td>
                          <td className="py-3.5 px-4 text-zinc-300">{c.price}</td>
                          <td className="py-3.5 px-4">
                            {c.macLinuxSupport.includes('100%') || c.macLinuxSupport.includes('Native') ? (
                              <span className="text-emerald-400 font-medium">✓ {c.macLinuxSupport}</span>
                            ) : (
                              <span className="text-amber-400 font-medium">⚠️ {c.macLinuxSupport}</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            {c.preservesPainting.includes('Yes') ? (
                              <span className="text-emerald-400 font-medium">✓ {c.preservesPainting}</span>
                            ) : (
                              <span className="text-zinc-400">{c.preservesPainting}</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={c.status2026.includes('Discontinued') || c.status2026.includes('Deprecated') ? 'text-red-400 font-medium' : 'text-zinc-300'}>
                              {c.status2026}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Free Alternative Step-by-Step Checklists */}
              {tool.freeAlternativeGuides && tool.freeAlternativeGuides.length > 0 && (
                <div className="space-y-6 my-8">
                  <h3 className="text-base font-bold text-white mb-3">
                    Step-by-Step Free Offline Repair Tutorials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tool.freeAlternativeGuides.map((guide, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <h4 className="font-bold text-white text-sm">
                              {guide.tool}
                            </h4>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                              {guide.badge}
                            </span>
                          </div>
                          <ol className="space-y-2 text-xs text-zinc-300 list-decimal list-inside leading-relaxed">
                            {guide.steps.map((step, sIdx) => (
                              <li key={sIdx} className="pl-1">
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 10. Honesty Chunk & Edge Cases (When automated repair is not enough) */}
            <section className="border-t border-zinc-800/80 pt-10">
              <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">
                Engineering Boundaries
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                When automated repair is not enough (CAD Solutions)
              </h2>
              <p className="text-base sm:text-lg text-zinc-200 mb-6 font-normal">
                {tool.limitsOfAutoRepair}
              </p>

              {/* Key Boundary Bullet Points */}
              {tool.limitsKeyPoints && tool.limitsKeyPoints.length > 0 && (
                <div className="space-y-3 my-6">
                  {tool.limitsKeyPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-start gap-3"
                    >
                      <span className="text-amber-400 font-bold text-sm mt-0.5">⚠️</span>
                      <div className="text-xs sm:text-sm leading-relaxed">
                        <strong className="text-white font-semibold">{pt.label}:</strong>{' '}
                        <span className="text-zinc-300">{pt.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Edge Cases Table */}
              {tool.limitsTable && tool.limitsTable.length > 0 && (
                <div className="my-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                    <span>🛠️</span> Complex Mesh Scenarios &amp; Manual Workarounds
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-xl">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="border-b border-zinc-800 bg-zinc-900/80 uppercase text-zinc-400 text-[11px] tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4 font-bold text-white">Corrupted Mesh Scenario</th>
                          <th className="py-3.5 px-4 font-bold">Why Cloud Repair Fails</th>
                          <th className="py-3.5 px-4 font-bold text-emerald-400">Recommended Manual Fix</th>
                          <th className="py-3.5 px-4 font-bold">Software Tool</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                        {tool.limitsTable.map((row, idx) => (
                          <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                              {row.scenario}
                            </td>
                            <td className="py-3.5 px-4 text-zinc-400 text-xs">
                              {row.whyFails}
                            </td>
                            <td className="py-3.5 px-4 text-emerald-300 text-xs font-medium">
                              {row.manualFix}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-300">
                              {row.tool}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            {/* 11. FAQ Section */}
            <section className="border-t border-zinc-800/80 pt-10">
              <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
                Knowledge Base
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {tool.faq.map((item, idx) => (
                  <details
                    key={idx}
                    className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 open:bg-zinc-900/80 transition-all cursor-pointer"
                  >
                    <summary className="flex items-center justify-between font-semibold text-white list-none text-sm sm:text-base">
                      <span>{item.question}</span>
                      <span className="text-emerald-400 transition group-open:rotate-180">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="mt-3 text-zinc-300 text-sm leading-relaxed border-t border-zinc-800/60 pt-3 space-y-2">
                      <p>{item.answer}</p>
                      {item.bulletPoints && item.bulletPoints.length > 0 && (
                        <ul className="space-y-1.5 pt-2 text-xs text-zinc-400">
                          {item.bulletPoints.map((bp, bpIdx) => (
                            <li key={bpIdx} className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span className="text-zinc-300">{bp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>



            {/* 12. Related Pages */}
            <section className="border-t border-zinc-800/80 pt-10">
              <h3 className="text-lg font-bold text-white mb-4">
                Related Tools &amp; Geometry Guides
              </h3>
              <div className="flex flex-wrap gap-3">
                {tool.relatedPages.map((pg, idx) => (
                  <Link
                    key={idx}
                    href={pg.href}
                    className="text-xs px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-emerald-500/10 hover:text-emerald-300 text-zinc-300 border border-zinc-800 transition-colors"
                  >
                    {pg.title}
                  </Link>
                ))}
              </div>
            </section>

            {/* 13. Last Updated */}
            <div className="border-t border-zinc-800/80 pt-6 text-xs text-zinc-500">
              Last modified: {tool.lastUpdated} · Certified for Bambu Studio, Orca Slicer, Cura 5.x &amp; PrusaSlicer 2.9
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
