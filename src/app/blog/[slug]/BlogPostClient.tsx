"use client";

/**
 * ============================================
 * BlogPostClient - Main Blog Post Component
 * ============================================
 * 
 * 📋 PURPOSE:
 * Renders individual blog posts with isolated CSS,
 * theme support, and dynamic component loading.
 * 
 * 🚀 RSC ARCHITECTURE (v2):
 * - Markdown parsing now happens on the SERVER (page.tsx)
 * - This component receives a pre-parsed AST (ContentNode[])
 * - Client only handles: rendering React components from AST nodes
 * - Result: ~30-50ms TBT eliminated, raw content NOT in JS bundle
 * 
 * 🎯 CSS SEPARATION STRATEGY:
 * - Imports blog-specific.css for isolated blog styles
 * - Wraps content in .blog-post-container for CSS scoping
 * - Uses Tailwind dark: variants (no JS theme checks)
 * 
 * ⚠️ CRITICAL - DO NOT REMOVE:
 * - CSS import: import '../blog-specific.css'
 * - Wrapper div: <div className="blog-post-container">
 * 
 * ============================================
 */

import Link from 'next/link';
import { ReactNode, useMemo, useRef } from 'react';
import { BlogPost } from '@/lib/blog';
import { generateAllSchemas } from '@/lib/seo-schema';
import type { ContentNode } from '@/lib/markdown-parser';
import Breadcrumb from '@/components/blog/Breadcrumb';
import Heading from '@/components/blog-ui/Heading';
import IconListItem from '@/components/blog-ui/IconListItem';
import IconBullet from '@/components/blog-ui/IconBullet';
import TitleBox from '@/components/blog-ui/TitleBox';
import ResponsiveImage from '@/components/blog-ui/ResponsiveImage';
import LazyHeroVideo from '@/components/blog-ui/LazyHeroVideo';
import dynamic from 'next/dynamic';

// ⚠️ CRITICAL: Blog-specific CSS
import '../blog-specific.css';

// PERFORMANCE: Dynamic imports (reduces bundle size)
const ReadingProgressBar = dynamic(() => import('@/components/blog-ui/ReadingProgressBar'), { ssr: false });
const CTASection = dynamic(() => import('@/components/blog-ui/CTASection'), { ssr: false });
const ContinueReadingCards = dynamic(() => import('@/components/blog-ui/ContinueReadingCards'), { ssr: false });
const TOC = dynamic(() => import('@/components/blog-ui/TOC'), { ssr: false });
const SmartTable = dynamic(() => import('@/components/blog-ui/SmartTable'), { ssr: false });
const FAQAccordion = dynamic(() => import('@/components/blog-ui/FAQAccordion'), { ssr: false });
const Callout = dynamic(() => import('@/components/blog-ui/Callout'), { 
  ssr: false,
  loading: () => <div className="h-20 w-full animate-pulse bg-cyan-500/10 rounded-lg" />
});
const VideoPlayer = dynamic(() => import('@/components/blog-ui/VideoPlayer'), { 
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse bg-gray-900 rounded-xl" />
});
const IndustryUseCasesIllustration = dynamic(() => import('@/components/blog-ui/IndustryUseCasesIllustration'), { 
  ssr: false,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-800/20 rounded-xl my-8" />
});

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  contentAST: ContentNode[];
}

// ---- Inline Markdown Renderer (lightweight, stays client-side) ----
function renderInlineMarkdown(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let key = 0;

  const combinedRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const matchedText = match[0];

    if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
      const boldText = matchedText.slice(2, -2);
      parts.push(
        <strong key={key++} className="font-bold text-gray-900 dark:text-white">
          {boldText}
        </strong>
      );
    } else if (matchedText.startsWith('[') && matchedText.includes('](')) {
      const linkMatch = matchedText.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        parts.push(
          <Link 
            key={key++} 
            href={url}
            className="font-semibold underline decoration-2 hover:decoration-4 transition-all duration-200 text-blue-600 hover:text-blue-700 decoration-blue-400/50 hover:decoration-blue-500 dark:text-cyan-400 dark:hover:text-cyan-300 dark:decoration-cyan-500/50 dark:hover:decoration-cyan-400"
          >
            {linkText}
          </Link>
        );
      }
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}

// ---- AST Node Renderer ----
function renderNode(node: ContentNode, key: number, contentRef: React.RefObject<HTMLDivElement | null>): ReactNode {
  switch (node.type) {
    case 'h1':
      return (
        <h1 key={key} className="font-heading text-[36px] sm:text-[42px] md:text-[48px] font-bold tracking-tight mb-5 sm:mb-7 mt-8 sm:mt-12 text-center md:text-left text-gray-900 dark:text-white">
          {renderInlineMarkdown(node.text)}
        </h1>
      );

    case 'toc-marker':
      return <TOC key={`toc-${key}`} contentRef={contentRef} />;

    case 'h2':
      return (
        <Heading key={key} id={node.id} level="h2">
          {renderInlineMarkdown(node.text)}
        </Heading>
      );

    case 'h3':
      return (
        <Heading key={key} id={node.id} level="h3">
          {renderInlineMarkdown(node.text)}
        </Heading>
      );

    case 'paragraph':
      return (
        <p key={key} className="mb-6 leading-relaxed text-[17px] md:text-[19px] text-neutral-800 dark:text-neutral-200">
          {renderInlineMarkdown(node.text)}
        </p>
      );

    case 'bold-paragraph':
      return (
        <IconBullet key={key}>
          {renderInlineMarkdown(node.text)}
        </IconBullet>
      );

    case 'callout':
      return (
        <Callout key={key}>
          {node.content}
        </Callout>
      );

    case 'blockquote':
      return (
        <Callout key={key}>
          {renderInlineMarkdown(node.content)}
        </Callout>
      );

    case 'ai-answer':
      return (
        <div key={key} className="ai-answer-block">
          {node.lines.map((line, idx) => (
            <p key={idx}>{renderInlineMarkdown(line)}</p>
          ))}
        </div>
      );

    case 'image':
      return (
        <div key={key} className="my-6 sm:my-8">
          <ResponsiveImage 
            src={node.src}
            alt={node.alt}
          />
        </div>
      );

    case 'video':
      return (
        <div key={key} className="my-6 sm:my-8">
          <VideoPlayer 
            src={node.src}
            poster={node.poster}
            title={node.alt}
          />
        </div>
      );

    case 'youtube':
      return (
        <div key={key} className="my-6 sm:my-8">
          <VideoPlayer 
            src={node.src}
            title=""
          />
        </div>
      );

    case 'svg-illustration':
      return <IndustryUseCasesIllustration key={key} />;

    case 'table-smart':
      return <SmartTable key={key} rows={node.rows} />;

    case 'table-fallback':
      return (
        <div key={key} className="my-6 sm:my-8 overflow-x-auto">
          <div className="rounded-lg border-2 overflow-hidden border-cyan-200 bg-white dark:border-cyan-500/30 dark:bg-gray-900/30">
            <table className="w-full border-collapse text-sm sm:text-base text-gray-800 dark:text-zinc-200">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-50 to-purple-50 border-b-2 border-cyan-600 dark:from-cyan-900/50 dark:to-purple-900/50 dark:border-cyan-500/50">
                  {node.headers.map((header, idx) => (
                    <th key={idx} className="p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-cyan-700 dark:text-cyan-300">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {node.dataRows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="transition-colors hover:bg-cyan-50/50 dark:hover:bg-cyan-900/20 border-b border-gray-200 dark:border-white/10">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="p-4 sm:p-5 text-gray-700 dark:text-zinc-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'icon-bullet':
      return (
        <IconBullet key={key} as={node.as}>
          {renderInlineMarkdown(node.content)}
        </IconBullet>
      );

    case 'icon-list-item':
      return (
        <IconListItem key={key} color={node.color} size={node.size}>
          {renderInlineMarkdown(node.content)}
        </IconListItem>
      );

    case 'icon-numbered':
      return (
        <IconListItem key={key} color={node.color} size={node.size} numbered={true} number={node.number}>
          {renderInlineMarkdown(node.content)}
        </IconListItem>
      );

    case 'link-reference':
      return (
        <p key={key} className="mb-6 leading-relaxed text-[17px] md:text-[19px] text-neutral-800 dark:text-neutral-200">
          <a href={node.href} target="_blank" rel="noopener noreferrer" 
            className="underline break-all text-blue-600 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300">
            {node.text}
          </a>
        </p>
      );

    case 'script':
      return <div key={key} dangerouslySetInnerHTML={{ __html: node.html }} />;

    default:
      return null;
  }
}

// ---- Main Content Component ----
function BlogPostContent({ post, relatedPosts, contentAST }: BlogPostClientProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // 🚀 PERF: Schema generation via useMemo (no extra re-render)
  const schemas = useMemo(() => generateAllSchemas(post), [post]);

  // 🚀 RSC PERF: Content is pre-parsed on server — just render AST nodes
  // No regex, no string splitting, no line-by-line parsing on client
  const renderedContent = useMemo(() => (
    <>
      {contentAST.map((node, idx) => renderNode(node, idx, contentRef))}
    </>
  ), [contentAST]);

  return (
    <>
      <div className="min-h-screen font-body transition-colors duration-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-none dark:bg-black">
        <ReadingProgressBar />
        
        {/* Back to Blog Button */}
        <div className="fixed bottom-4 sm:bottom-8 left-2 sm:left-4 md:left-8 z-40">
          <Link href="/blog">
            <button
              className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-1 sm:gap-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to Blog</span>
              <span className="sm:hidden">Back</span>
            </button>
          </Link>
        </div>

      <article className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 pt-32 pb-16 sm:pb-24 md:pb-32">
          {/* Breadcrumb Navigation */}
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title, current: true }
            ]}
          />

          {/* Title Box with Like Button */}
          <TitleBox
            slug={post.slug}
            category={post.category}
            title={post.title}
            excerpt={post.excerpt}
            author={post.author}
            authorRole={post.authorRole}
            date={post.date}
            readTime={post.readTime}
          />

          {/* Hero Video Section - SEO Optimized, Lazy Loaded */}
          {post.heroVideo ? (
            <div className="mb-8 sm:mb-12">
              <LazyHeroVideo
                videoSrc={post.heroVideo}
                alt={post.videoMetadata?.title || `${post.title} - Video Preview`}
              />
            </div>
          ) : post.image ? (
            <div className="mb-8 sm:mb-12">
              <ResponsiveImage
                src={post.image}
                alt={post.imageAlt || post.title}
                width={1200}
                height={900}
                priority={true}
                className="rounded-lg"
              />
            </div>
          ) : null}

          <div ref={contentRef} className="max-w-none">
            {renderedContent}
          </div>

          {post.faq && post.faq.length > 0 && (
            <FAQAccordion faq={post.faq} />
          )}

          {/* CTA Section */}
          <CTASection />

          {/* Continue Reading Section */}
          <ContinueReadingCards posts={relatedPosts} />
        </article>

        {/* Structured Data Schemas */}
        {schemas.map((schema, index) => (
          <script
            key={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </div>
    </>
  );
}

/**
 * BlogPostClient - Main Export Component
 * 
 * ⚠️ CRITICAL WRAPPER - DO NOT REMOVE:
 * The <div className="blog-post-container"> wrapper is ESSENTIAL for:
 * 1. CSS isolation (blog styles don't affect website)
 * 2. Scoping all styles in blog-specific.css
 * 3. Preventing side effects on homepage/other pages
 */
export default function BlogPostClient({ post, relatedPosts, contentAST }: BlogPostClientProps) {
  return (
    <div className="blog-post-container">
      <BlogPostContent post={post} relatedPosts={relatedPosts} contentAST={contentAST} />
    </div>
  );
}
