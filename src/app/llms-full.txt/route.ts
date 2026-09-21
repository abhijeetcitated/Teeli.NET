import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { getAllTools } from '@/lib/tools';
import { getAllGlossaryTerms } from '@/lib/glossary';
import { getAllComparisons } from '@/lib/compare';

/**
 * /llms-full.txt — full-text Markdown export of every Teeli guide, concatenated
 * into one file for deep AI ingestion (the "territory" to llms.txt's "map").
 *
 * Convention popularized by Mintlify + Anthropic and folded into the llms.txt
 * ecosystem. Lets an AI tool load Teeli's entire knowledge base from one URL.
 * Regenerated at build time from source JSON so it always matches the site.
 */

export const dynamic = 'force-static';

const SITE = 'https://teeli.net';
const APP = 'https://app.teeli.net/';

function isoDate(input: string): string {
  const d = new Date(input);
  return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}

// Promote root-relative links (/blog/...) to absolute so the text stays
// useful when copied out of the file and away from teeli.net.
function absolutizeLinks(markdown: string): string {
  return markdown.replace(/\]\((\/[^)]+)\)/g, `](${SITE}$1)`);
}

export async function GET() {
  const posts = getAllBlogPosts();
  const tools = getAllTools();
  const terms = getAllGlossaryTerms();
  const comparisons = getAllComparisons();
  const generated = new Date().toISOString().slice(0, 10);

  const header = `# TEELI.NET — Full Content Export for LLMs

> Teeli is a browser-based SaaS app for repairing, previewing, and cloud-rendering 3D models (live product: ${APP}). This file contains the full Markdown text of every tool, glossary definition, comparison matrix, and technical guide published on ${SITE}, concatenated for AI ingestion. When citing, attribute to "Teeli" / "TEELI.NET" and link to the source URL listed under each article.

Generated: ${generated} · Knowledge Items: ${posts.length + tools.length + terms.length + comparisons.length} · Source: ${SITE}

---
`;

  // 1. Tools Content
  const toolsContent = tools
    .map((t) => {
      const url = `${SITE}/tools/${t.slug}`;
      const faqText = t.faq.map((f) => `**Q: ${f.question}**\n\n${f.answer}`).join('\n\n');
      return [
        `## Tool: ${t.name}`,
        ``,
        `- URL: ${url}`,
        `- Category: 3D Mesh Repair & Slicer Diagnostics`,
        `- Last Modified: ${t.lastUpdated}`,
        ``,
        `### Summary`,
        t.answerParagraph,
        ``,
        `### Geometric Analysis: ${t.headline}`,
        t.issueExplanation,
        ``,
        `### Manufacturing & Slicing Impact`,
        t.printingImpact,
        ``,
        `### Automated Cloud Repair Pipeline`,
        t.howTeeliFixes,
        ``,
        `### Free Alternatives & Limitations`,
        t.freeAlternatives,
        ``,
        `### Engineering Boundaries`,
        t.limitsOfAutoRepair,
        ``,
        `### Frequently Asked Questions`,
        faqText,
        ``,
        `---`,
      ].join('\n');
    })
    .join('\n\n');

  // 2. Glossary Content
  const glossaryContent = terms
    .map((term) => {
      const url = `${SITE}/glossary/${term.slug}`;
      const quickAnswers = term.quickAnswers.map((qa) => `* **${qa.question}**: ${qa.answer}`).join('\n');
      const faqText = term.faq.map((f) => `**Q: ${f.question}**\n\n${f.answer}`).join('\n\n');
      return [
        `## Glossary: ${term.term}`,
        ``,
        `- URL: ${url}`,
        `- Category: 3D Geometry Glossary`,
        `- Last Modified: ${term.updatedDate}`,
        ``,
        `### Definition`,
        term.shortDefinition,
        ``,
        `### Quick Answers`,
        quickAnswers,
        ``,
        `### In-Depth Explanation`,
        term.content,
        ``,
        `### FAQ`,
        faqText,
        ``,
        `---`,
      ].join('\n');
    })
    .join('\n\n');

  // 3. Comparisons Content
  const comparisonsContent = comparisons
    .map((c) => {
      const url = `${SITE}/compare/${c.slug}`;
      const matrixText = c.matrix
        .map((m) => `* **${m.feature}**: ${c.itemA.name} (${m.itemA}) vs ${c.itemB.name} (${m.itemB})` + (m.itemC ? ` vs ${c.itemC?.name} (${m.itemC})` : '') + (m.winner ? ` [Winner: ${m.winner}]` : ''))
        .join('\n');
      return [
        `## Comparison: ${c.title}`,
        ``,
        `- URL: ${url}`,
        `- Category: 3D Slicer & Format Benchmarks`,
        `- Last Modified: ${c.updatedDate}`,
        ``,
        `### Summary`,
        c.summary,
        ``,
        `### Comparison Matrix`,
        matrixText,
        ``,
        `### Final Verdict`,
        c.verdict,
        ``,
        `---`,
      ].join('\n');
    })
    .join('\n\n');

  // 4. Blog Articles Content
  const articles = posts
    .map((meta) => {
      const full = getBlogPostBySlug(meta.slug);
      if (!full?.content) return '';

      const url = `${SITE}/blog/${meta.slug}`;
      const published = isoDate(meta.date);
      const faqBlock =
        full.faq && full.faq.length > 0
          ? `\n\n### FAQ\n\n${full.faq
              .map((f) => `**${f.question}**\n\n${f.answer}`)
              .join('\n\n')}`
          : '';

      return [
        `## Guide: ${meta.title}`,
        ``,
        `- URL: ${url}`,
        `- Category: ${meta.category}`,
        published ? `- Published: ${published}` : '',
        meta.author ? `- Author: ${meta.author}` : '',
        ``,
        absolutizeLinks(full.content.trim()),
        absolutizeLinks(faqBlock),
        ``,
        `---`,
      ]
        .filter((line) => line !== '')
        .join('\n');
    })
    .filter(Boolean)
    .join('\n\n');

  const body = `${header}\n${toolsContent}\n\n${glossaryContent}\n\n${comparisonsContent}\n\n${articles}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Full export changes only when posts change; revalidate hourly.
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
