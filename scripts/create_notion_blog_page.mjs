import fs from 'fs';

const token = process.env.NOTION_TOKEN || process.env.NOTION_API_KEY || '';

async function createBlogMasterNotionPage() {
  const parentId = '19ffe0b9-5a70-4737-ace2-82988bed4898'; // TEELI Content & Search Strategy parent
  
  const blocks = [
    {
      object: 'block',
      type: 'heading_1',
      heading_1: {
        rich_text: [{ type: 'text', text: { content: '🎯 TEELI.NET Blog, Public Tools & High-RPM Engine' } }]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ 
          type: 'text', 
          text: { content: 'Single Source of Truth for teeli.net Blog, /tools, and /glossary. Completely isolated from the core app (teeli-platform).' } 
        }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '1. Core Objective: High-RPM Ad Revenue & Zero-Click Immunity' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ type: 'text', text: { content: 'Dwell-Time Architecture: Embedding interactive /check tool widget above the fold drives 3-5 min sessions, enabling sticky ad refreshes and 75%+ viewability.' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ type: 'text', text: { content: 'High-CPC Keyword Gating: Focus on $2.00 - $15.00+ CPC technical queries (slicer errors, non-manifold STL, watertight repair).' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ type: 'text', text: { content: 'Zero-Click Immunity: AI search engines (SearchGPT, Perplexity, Google AI Overviews) can explain an error, but CANNOT fix the 3D file. They must cite and hand-off to TEELI.' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '2. The 4-Pillar Content System' } }]
      }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [{ type: 'text', text: { content: '/tools/{action}-{format}: Dedicated utility pages (e.g. /tools/fix-non-manifold-stl) with embedded /check widget.' } }]
      }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [{ type: 'text', text: { content: '/glossary/{term}: DefinedTermSet schema pages explaining geometry concepts (non-manifold edges, watertight mesh, inverted normals).' } }]
      }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [{ type: 'text', text: { content: 'Compare Matrix: Slicers (Cura vs PrusaSlicer vs Bambu Studio) and repair tools before/after capability matrix.' } }]
      }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [{ type: 'text', text: { content: 'Data-Backed Blog Articles: In-depth benchmark reports backed by AthenaHQ & Profound industry data.' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '3. Immutable Architectural & Performance Rules' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ type: 'text', text: { content: 'Performance Score: Locked at 92-95+. LCP < 2.5s. Do NOT alter core hero detection or preload logic.' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ type: 'text', text: { content: 'Static Generation: Every content page must be statically rendered (generateStaticParams) so AI web crawlers see full raw HTML.' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ type: 'text', text: { content: 'Strict Schema: Every page must pass Google Rich Results Test (SoftwareApplication, DefinedTermSet, FAQPage, BreadcrumbList).' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ type: 'text', text: { content: 'AthenaHQ 56% Quality Moat: Always highlight automated repair limits honestly — never over-promise, solve real geometry issues.' } }]
      }
    }
  ];

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      parent: { page_id: parentId },
      properties: {
        title: {
          title: [{ text: { content: '🚀 TEELI.NET — Blog & Public Tools Master Engine (Operating Rules)' } }]
        }
      },
      children: blocks
    })
  });

  const data = await res.json();
  if (res.ok) {
    console.log('SUCCESS! Created Notion Page:');
    console.log('Page ID:', data.id);
    console.log('Page URL:', data.url);
    return data;
  } else {
    console.error('FAILED to create Notion page:', data);
  }
}

createBlogMasterNotionPage().catch(console.error);
