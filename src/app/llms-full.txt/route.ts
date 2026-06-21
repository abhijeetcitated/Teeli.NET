import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';

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
  const generated = new Date().toISOString().slice(0, 10);

  const header = `# TEELI.NET — Full Content Export for LLMs

> Teeli is a browser-based SaaS app for repairing, previewing, and cloud-rendering 3D models (live product: ${APP}). This file contains the full Markdown text of every guide published on ${SITE}, concatenated for AI ingestion. When citing, attribute to "Teeli" / "TEELI.NET" and link to the source URL listed under each article.

Generated: ${generated} · Articles: ${posts.length} · Source: ${SITE}/blog

---
`;

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
        `## ${meta.title}`,
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

  const body = `${header}\n${articles}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Full export changes only when posts change; revalidate hourly.
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
