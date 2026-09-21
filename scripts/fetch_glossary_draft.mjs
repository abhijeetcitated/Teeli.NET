import fs from 'fs';

const token = process.env.NOTION_TOKEN || process.env.NOTION_API_KEY || '';
const pageId = '01736af3-f392-4975-85e3-d1e4e4fbdea3';

async function fetchAllBlocks(blockId) {
  let results = [];
  let cursor = undefined;
  while (true) {
    const url = `https://api.notion.com/v1/blocks/${blockId}/children?page_size=100` + (cursor ? `&start_cursor=${cursor}` : '');
    const res = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Notion-Version': '2022-06-28'
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));
    results.push(...data.results);
    if (!data.has_more) break;
    cursor = data.next_cursor;
  }
  return results;
}

async function run() {
  const blocks = await fetchAllBlocks(pageId);
  console.log(`Fetched ${blocks.length} blocks from Notion draft.`);

  const textLines = [];
  for (const b of blocks) {
    const type = b.type;
    const content = b[type];
    let text = '';
    if (content?.rich_text) {
      text = content.rich_text.map(t => t.plain_text).join('');
    }
    if (type.startsWith('heading_1')) textLines.push(`\n# ${text}`);
    else if (type.startsWith('heading_2')) textLines.push(`\n## ${text}`);
    else if (type.startsWith('heading_3')) textLines.push(`\n### ${text}`);
    else if (type === 'bulleted_list_item') textLines.push(`* ${text}`);
    else if (type === 'numbered_list_item') textLines.push(`1. ${text}`);
    else if (type === 'callout') textLines.push(`> [!NOTE]\n> ${text}`);
    else if (type === 'code') textLines.push(`\`\`\`${content.language || ''}\n${text}\n\`\`\``);
    else if (text) textLines.push(text);
  }

  const output = textLines.join('\n\n');
  fs.writeFileSync('scripts/glossary_1_draft.md', output, 'utf8');
  console.log('Saved draft to scripts/glossary_1_draft.md');
}

run().catch(console.error);
