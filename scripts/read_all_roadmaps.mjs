import fs from 'fs';
import path from 'path';

const roadmapDir = 'E:\\startup\\teeli-platform\\teeliplatform roadmap';
const files = fs.readdirSync(roadmapDir).filter(f => f.endsWith('.html') || f.endsWith('.md'));

console.log(`Found ${files.length} roadmap files.`);

const summary = [];

for (const file of files) {
  const filePath = path.join(roadmapDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract Title or H1
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i) || content.match(/^#\s+(.*)$/m);
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : (h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : file);
  
  // Extract key headings
  const h2Matches = [...content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  
  summary.push({
    file,
    size: content.length,
    title,
    headings: h2Matches.slice(0, 8),
    snippet: content.substring(0, 300).replace(/\s+/g, ' ')
  });
}

fs.writeFileSync('scripts/roadmap_summary.json', JSON.stringify(summary, null, 2), 'utf8');
console.log('Saved roadmap_summary.json with', summary.length, 'entries.');
