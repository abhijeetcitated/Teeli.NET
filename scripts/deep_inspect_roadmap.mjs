import fs from 'fs';
import path from 'path';

const roadmapDir = 'E:\\startup\\teeli-platform\\teeliplatform roadmap';

function extractSections(filename) {
  const content = fs.readFileSync(path.join(roadmapDir, filename), 'utf8');
  // Strip tags, get clean lines
  const clean = content.replace(/<style[\s\S]*?<\/style>/gi, '')
                       .replace(/<script[\s\S]*?<\/script>/gi, '');
  return clean;
}

const contentSystem = extractSections('TEELI-Content-System-Tools-Glossary.html');
const marketResearch = extractSections('teeli-market-research-2026 (1).html');
const masterReport = extractSections('teeli-master-report-2026.html');

console.log("=== TEELI-Content-System-Tools-Glossary.html snippet ===");
console.log(contentSystem.substring(0, 3500).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));

console.log("\n=== Market Research snippet ===");
console.log(marketResearch.substring(0, 3500).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));

fs.writeFileSync('scripts/extracted_content_system.txt', contentSystem.replace(/<[^>]+>/g, ' ').replace(/[ \t]+/g, ' '), 'utf8');
fs.writeFileSync('scripts/extracted_market_research.txt', marketResearch.replace(/<[^>]+>/g, ' ').replace(/[ \t]+/g, ' '), 'utf8');
console.log("\nSaved extracted text to scripts/extracted_*.txt");
