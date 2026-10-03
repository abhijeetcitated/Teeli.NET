import fs from 'fs';
import path from 'path';

// Narrative fields a layout section can render as its answer paragraphs (they also feed /llms-full.txt).
export type ToolNarrativeKey = 'issueExplanation' | 'printingImpact' | 'howTeeliFixes' | 'freeAlternatives' | 'limitsOfAutoRepair';

// One question-led section. A page with `layout` renders these in order instead of the default
// (non-manifold) section set; the first two sentences under each heading answer it.
export interface ToolSection {
  id: string; // anchor id
  eyebrow?: string;
  heading: string; // H2 — a question users actually ask
  text?: ToolNarrativeKey[]; // narrative fields rendered first, as paragraphs
  paragraphs?: string[];
  table?: { columns: string[]; rows: string[][] };
  note?: string; // one sentence directly under the table
  embed?: 'verificationTable' | 'comparisonMatrix';
  sources?: { title: string; href: string }[]; // external references
}

export interface ToolComparisonRow {
  tool: string;
  type: string;
  price: string;
  macLinuxSupport: string;
  preservesPainting?: string;
  status2026?: string;
  report?: string; // what the option tells you about the changes it made
}

export interface ToolPage {
  id: string;
  slug: string; // e.g. "fix-non-manifold-stl"
  name: string; // e.g. "Fix Non-Manifold STL Online Free"
  action: string; // e.g. "fix-non-manifold"
  format: string; // e.g. "stl"
  headline: string;
  metaTitle: string;
  metaDescription: string;
  answerParagraph: string; // 40-60 words AI engine summary
  trustStrip: {
    free: boolean;
    noSignup: boolean;
    purgeHours: number;
    sizeCapMB: number;
  };
  highlightIssue: string;
  issueExplanation: string;
  issueKeyPoints?: { label: string; text: string; icon: string }[];
  issueCards?: { title: string; desc: string; icon: string }[];
  defectsTable?: { defect: string; condition: string; raycast: string; physicalImpact: string; fix: string }[];
  mathExplanation?: string;
  printingImpact: string;
  printingFailures?: { title: string; desc: string; badge: string }[];
  slicerErrors?: {
    slicer: string;
    badgeText: string;
    nativeBehavior: string;
    macLinuxLimitation: string;
    teeliFix: string;
  }[];
  slicerTable?: { slicer: string; dialog: string; behavior: string; nativeTool: string; limitations: string }[];
  howTeeliFixes: string;
  repairSteps?: { step: string; name: string; desc: string; bulletPoints?: string[] }[];
  verificationTable?: { metric: string; before: string; after: string; impact: string }[];
  verificationCaption?: string; // visible caption under the verification table
  verificationColumns?: string[]; // four header labels (metric, before, after, impact); default = non-manifold page
  comparisonMatrix?: ToolComparisonRow[];
  comparisonColumns?: { key: keyof ToolComparisonRow; label: string }[]; // shown columns + labels; default = non-manifold page
  freeAlternatives: string;
  freeAlternativeGuides?: { tool: string; badge: string; steps: string[] }[];
  limitsOfAutoRepair: string;
  limitsKeyPoints?: { label: string; text: string }[];
  limitsTable?: { scenario: string; whyFails: string; manualFix: string; tool: string }[];
  faq: { question: string; answer: string; bulletPoints?: string[] }[];
  relatedPages: { title: string; href: string }[];
  layout?: ToolSection[]; // question-led sections replacing the default section set
  author?: { name: string; role?: string; url?: string };
  lastUpdated: string;
}

const TOOLS_DIR = path.join(process.cwd(), 'content', 'tools');

export function getAllTools(): ToolPage[] {
  try {
    if (!fs.existsSync(TOOLS_DIR)) return [];
    const files = fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('.json') && !f.includes('template'));
    const tools: ToolPage[] = [];

    for (const file of files) {
      try {
        const fullPath = path.join(TOOLS_DIR, file);
        let content = fs.readFileSync(fullPath, 'utf-8');
        if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
        tools.push(JSON.parse(content) as ToolPage);
      } catch (err) {
        console.error(`Error reading tool file ${file}:`, err);
      }
    }

    return tools;
  } catch (err) {
    console.error('Error in getAllTools:', err);
    return [];
  }
}

export function getToolBySlug(slug: string): ToolPage | null {
  const tools = getAllTools();
  return tools.find(t => t.slug === slug) || null;
}
