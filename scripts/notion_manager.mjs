import fs from 'fs';

const token = process.env.NOTION_TOKEN || process.env.NOTION_API_KEY || '';

async function listNotionPages() {
  const res = await fetch('https://api.notion.com/v1/search', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ page_size: 50 })
  });
  const data = await res.json();
  console.log('Total Notion items found:', data.results?.length || 0);
  data.results?.forEach(item => {
    let title = 'Untitled';
    if (item.properties?.title?.title?.[0]?.plain_text) {
      title = item.properties.title.title[0].plain_text;
    } else if (item.properties?.Name?.title?.[0]?.plain_text) {
      title = item.properties.Name.title[0].plain_text;
    } else if (item.title?.[0]?.plain_text) {
      title = item.title[0].plain_text;
    }
    console.log(`[${item.object}] ${title} | ID: ${item.id} | Parent:`, JSON.stringify(item.parent));
  });
  return data.results;
}

listNotionPages().catch(console.error);
