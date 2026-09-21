import fs from 'fs';
import path from 'path';

export interface QuickAnswer {
  question: string;
  answer: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedTerm {
  name: string;
  slug: string;
}

export interface RelatedTool {
  name: string;
  url: string;
  description: string;
}

export interface GlossaryAuthor {
  name: string;
  role: string;
  url: string;
  sameAs: string[];
}

export interface GlossaryTerm {
  term: string;
  slug: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  updatedDate: string;
  readTime: string;
  author: GlossaryAuthor;
  shortDefinition: string;
  quickAnswers: QuickAnswer[];
  content: string;
  faq: FAQItem[];
  relatedTerms: RelatedTerm[];
  relatedTools?: RelatedTool[];
}

const GLOSSARY_DIR = path.join(process.cwd(), 'content', 'glossary');

export function getAllGlossaryTerms(): GlossaryTerm[] {
  try {
    if (!fs.existsSync(GLOSSARY_DIR)) return [];
    const files = fs.readdirSync(GLOSSARY_DIR).filter(f => f.endsWith('.json'));
    const terms: GlossaryTerm[] = [];

    for (const file of files) {
      try {
        const fullPath = path.join(GLOSSARY_DIR, file);
        let content = fs.readFileSync(fullPath, 'utf-8');
        if (content.charCodeAt(0) === 0xFEFF) {
          content = content.slice(1);
        }
        const parsed = JSON.parse(content) as GlossaryTerm;
        terms.push(parsed);
      } catch (err) {
        console.error(`Error parsing glossary file ${file}:`, err);
      }
    }

    return terms.sort((a, b) => a.term.localeCompare(b.term));
  } catch (err) {
    console.error('Error reading glossary directory:', err);
    return [];
  }
}

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | null {
  const terms = getAllGlossaryTerms();
  return terms.find(t => t.slug === slug) || null;
}
