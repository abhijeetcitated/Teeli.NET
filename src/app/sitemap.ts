import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import { getAllGlossaryTerms } from '@/lib/glossary';
import { getAllTools } from '@/lib/tools';
import { getAllComparisons } from '@/lib/compare';

// Google uses <lastmod> only when it is "consistently and verifiably accurate" and
// ignores <priority>/<changefreq>, so no entry carries the build time or those tags.
// https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
// - Static pages: the date their copy last changed (update it when you edit the page).
// - List pages: the newest date among the items they list.
// - Content pages: their own date field.

// Last sitewide change (header nav links, PR #3) — pages untouched since then.
const SITE_UPDATED = '2026-09-21';

// Content date → YYYY-MM-DD. "Sep 25, 2026" is read as the calendar day it names,
// so the result does not shift with the build machine's timezone.
function toDay(value?: string): string | undefined {
  if (!value) return undefined;
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  const parsed = new Date(value);
  if (isNaN(parsed.getTime())) return undefined;
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  return `${parsed.getFullYear()}-${month}-${day}`;
}

function newest(days: (string | undefined)[]): string | undefined {
  return days.filter((day): day is string => Boolean(day)).sort().pop();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getAllBlogPosts();
  const glossaryTerms = getAllGlossaryTerms();
  const tools = getAllTools();
  const comparisons = getAllComparisons();

  // Base URLs
  const baseUrl = 'https://teeli.net';

  const newestPost = newest(blogs.map((post) => toDay(post.date)));

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: '2026-10-03' }, // hero panel links the STL repair tool (S4a)
    { url: `${baseUrl}/blog`, lastModified: newestPost },
    { url: `${baseUrl}/blog/popular`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/blog/topics`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/blog/tags`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/blog/resources`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/blog/resources/guides`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/blog/resources/tools`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/blog/resources/downloads`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/blog/resources/docs`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/blog/about`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/blog/archive`, lastModified: newestPost },
    { url: `${baseUrl}/docs`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/company/about`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/contact`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/solutions/ai-rendering`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/solutions/cloud-gpu`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/solutions/sustainability`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/technology/rendering-engine`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/projects/case-studies`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/projects/showreel`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/projects/viewer`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/insights/press`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/insights/reports`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/privacy`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/terms`, lastModified: SITE_UPDATED },
    { url: `${baseUrl}/cookies`, lastModified: SITE_UPDATED },
  ];

  // Blog post URLs with image metadata (Google Image Search SEO)
  const blogPages: MetadataRoute.Sitemap = blogs.map((post) => {
    // Build images array for sitemap (helps Google discover images faster)
    const images: string[] = [];
    if (post.image) {
      images.push(`https://teeli.net${post.image}`);
    }
    if (post.thumbnail && post.thumbnail !== post.image) {
      images.push(`https://teeli.net${post.thumbnail}`);
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: toDay(post.date),
      images: images.length > 0 ? images : undefined,
    };
  });

  // Glossary Pages
  const glossaryIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/glossary`,
      lastModified: newest(glossaryTerms.map((t) => toDay(t.updatedDate))),
    },
  ];

  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((t) => ({
    url: `${baseUrl}/glossary/${t.slug}`,
    lastModified: toDay(t.updatedDate),
  }));

  // Tools Pages
  const toolsPages: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${baseUrl}/tools/${t.slug}`,
    lastModified: toDay(t.lastUpdated),
  }));

  const toolsIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tools`,
      lastModified: newest(tools.map((t) => toDay(t.lastUpdated))),
    },
  ];

  // Compare Pages
  const comparePages: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${baseUrl}/compare/${c.slug}`,
    lastModified: toDay(c.updatedDate),
  }));

  const compareIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/compare`,
      lastModified: newest(comparisons.map((c) => toDay(c.updatedDate))),
    },
  ];

  return [
    ...staticPages,
    ...glossaryIndex,
    ...glossaryPages,
    ...toolsIndex,
    ...toolsPages,
    ...compareIndex,
    ...comparePages,
    ...blogPages,
  ];
}
