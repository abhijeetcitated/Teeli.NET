import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import { getAllGlossaryTerms } from '@/lib/glossary';
import { getAllTools } from '@/lib/tools';
import { getAllComparisons } from '@/lib/compare';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getAllBlogPosts();
  
  // Base URLs
  const baseUrl = 'https://teeli.net';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/popular`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/topics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/resources/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/resources/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/resources/downloads`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/resources/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/archive`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/company/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions/ai-rendering`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/cloud-gpu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/sustainability`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technology/rendering-engine`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/showreel`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/viewer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/insights/press`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/insights/reports`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
  
  // Blog post URLs with image metadata (Google Image Search SEO)
  const blogPages: MetadataRoute.Sitemap = blogs.map((post) => {
    // Parse date string (e.g., "Jan 20, 2025" to Date object)
    const dateStr = post.date;
    let lastModified = new Date();
    
    try {
      // Simple date parsing for "Mon DD, YYYY" format
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        lastModified = parsed;
      }
    } catch {
      // Use current date if parsing fails
      lastModified = new Date();
    }
    
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
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: post.featured ? 0.9 : 0.8, // Featured posts get higher priority
      images: images.length > 0 ? images : undefined,
    };
  });

  // Glossary Pages
  const glossaryIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  const glossaryTerms = getAllGlossaryTerms();
  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((t) => ({
    url: `${baseUrl}/glossary/${t.slug}`,
    lastModified: new Date(t.updatedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Tools Pages
  const tools = getAllTools();
  const toolsPages: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${baseUrl}/tools/${t.slug}`,
    lastModified: new Date(t.lastUpdated),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const toolsIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
  ];

  // Compare Pages
  const comparisons = getAllComparisons();
  const comparePages: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${baseUrl}/compare/${c.slug}`,
    lastModified: new Date(c.updatedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const compareIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
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
