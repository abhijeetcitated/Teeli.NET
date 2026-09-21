import fs from 'fs';
import path from 'path';

export interface MatrixRow {
  feature: string;
  itemA: string;
  itemB: string;
  itemC?: string;
  winner?: string;
}

export interface ComparePage {
  slug: string; // e.g. "stl-vs-obj-vs-3mf"
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  summary: string; // AI answer paragraph
  itemA: { name: string; badge: string; description: string };
  itemB: { name: string; badge: string; description: string };
  itemC?: { name: string; badge: string; description: string };
  matrix: MatrixRow[];
  prosConsA: { pros: string[]; cons: string[] };
  prosConsB: { pros: string[]; cons: string[] };
  prosConsC?: { pros: string[]; cons: string[] };
  verdict: string;
  faq: { question: string; answer: string }[];
  relatedSlugs: { title: string; href: string }[];
  updatedDate: string;
}

const COMPARE_DIR = path.join(process.cwd(), 'content', 'compare');

export function getAllComparisons(): ComparePage[] {
  try {
    if (!fs.existsSync(COMPARE_DIR)) return [];
    const files = fs.readdirSync(COMPARE_DIR).filter(f => f.endsWith('.json') && !f.includes('template'));
    const items: ComparePage[] = [];

    for (const file of files) {
      try {
        const fullPath = path.join(COMPARE_DIR, file);
        let content = fs.readFileSync(fullPath, 'utf-8');
        if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
        items.push(JSON.parse(content) as ComparePage);
      } catch (err) {
        console.error(`Error reading compare file ${file}:`, err);
      }
    }

    return items;
  } catch (err) {
    console.error('Error in getAllComparisons:', err);
    return [];
  }
}

export function getComparisonBySlug(slug: string): ComparePage | null {
  const items = getAllComparisons();
  return items.find(c => c.slug === slug) || null;
}
