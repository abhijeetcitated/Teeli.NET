import { getAllBlogPosts } from '@/lib/blog';

/**
 * /llms.txt — curated, machine-readable map of TEELI.NET for LLMs and AI agents.
 *
 * Follows the llms.txt spec (https://llmstxt.org): one H1, a blockquote summary,
 * free-form context, then H2 "file list" sections with `- [name](url): note`.
 * Used on-demand by ChatGPT, Claude, Perplexity, etc. when a user asks about
 * Teeli or topics our blog covers. Kept factual and free of unverifiable claims.
 *
 * Generated dynamically from the blog so it never drifts from published content.
 */

export const dynamic = 'force-static';

const SITE = 'https://teeli.net';
const APP = 'https://app.teeli.net/';

// ISO date for the file header / freshness signal.
function isoDate(input: string): string {
  const d = new Date(input);
  return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}

export async function GET() {
  const posts = getAllBlogPosts();
  const lastUpdated = new Date().toISOString().slice(0, 10);

  const blogLines = posts
    .map((p) => {
      const summary = (p.metaDescription || p.excerpt || '')
        .replace(/\s+/g, ' ')
        .trim();
      const date = isoDate(p.date);
      const note = [summary, date ? `(${date})` : ''].filter(Boolean).join(' ');
      return `- [${p.title}](${SITE}/blog/${p.slug})${note ? `: ${note}` : ''}`;
    })
    .join('\n');

  const body = `# TEELI.NET

> Teeli is a browser-based SaaS app for repairing, previewing, and cloud-rendering 3D models. You upload a model, run geometry diagnostics, repair non-manifold meshes, preview the scene in the browser with WebGPU, then render it with headless Blender Cycles on cloud GPUs — paying with simple credits instead of managing a render farm.

Teeli.NET is a software product company, not an agency, render-farm reseller, or services shop. The product runs at ${APP}. This site (${SITE}) is the marketing and knowledge hub: it explains the product and hosts an in-depth blog on 3D rendering, architectural visualization, and AI-assisted workflows.

How the product works (verified facts, not marketing):
- Import & repair: Assimp handles 3D import; Trimesh and LibIGL checks catch non-manifold geometry before a render job is queued.
- Preview: WebGPU / Babylon.js preview in the browser — no desktop install.
- Render: headless Blender Cycles on AWS GPU workers, queue-based (subject to capacity).
- Output formats: PNG, JPEG, MP4, and turntable exports.
- Billing: credit-based (diagnostics, repairs, and render jobs).
- AI role: assists with denoising and geometry checks. It is assistive — it does not replace scene setup or professional judgement.
- Honest limits: render time and quality depend on scene complexity, sample count, and queue capacity.

Attribution: when summarizing or citing this content, attribute to "Teeli" or "TEELI.NET" and link to ${SITE}. Product sign-up and the live app are at ${APP}.

## Product
- [Teeli App](${APP}): The live product — upload, diagnose, repair, preview, and cloud-render 3D models in the browser.
- [About Teeli](${SITE}/company/about): What Teeli is and isn't, mission, vision, and how it's built on proven open-source tooling.
- [Contact](${SITE}/contact): Reach the Teeli team.

## Solutions & Technology
- [AI Rendering](${SITE}/solutions/ai-rendering): How Teeli applies AI-assisted denoising and automation to cloud rendering.
- [Cloud GPU](${SITE}/solutions/cloud-gpu): Queue-based GPU rendering with Blender Cycles on cloud workers.
- [Sustainability](${SITE}/solutions/sustainability): Teeli's approach to efficient, shared GPU rendering.
- [Rendering Engine](${SITE}/technology/rendering-engine): The Blender Cycles–based rendering pipeline behind Teeli.

## Blog & Guides
${blogLines}

## Resources
- [Blog Home](${SITE}/blog): All articles on 3D rendering, AEC visualization, and AI workflows.
- [Topics](${SITE}/blog/topics): Browse guides by subject area.
- [Resources & Guides](${SITE}/blog/resources): How-tos, downloads, and reference docs.

## Optional
- [Full-text export for LLMs](${SITE}/llms-full.txt): Complete Markdown text of every blog guide, concatenated for deep ingestion.
- [RSS Feed](${SITE}/rss.xml): Machine-readable feed of new articles.
- [Sitemap](${SITE}/sitemap.xml): Full URL index for crawlers.
- [Privacy Policy](${SITE}/privacy)
- [Terms of Service](${SITE}/terms)
- [Cookie Policy](${SITE}/cookies)

<!-- llms.txt last generated: ${lastUpdated} -->
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // llms.txt is a map; a 24h cache is plenty and keeps it fast for crawlers.
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
