/**
 * ============================================
 * Server-Side Markdown Parser
 * ============================================
 * 
 * 🚀 PERFORMANCE: This parser runs on the SERVER (in page.tsx)
 * so the client receives pre-parsed structured data instead of
 * raw markdown + heavy regex logic.
 * 
 * Benefits:
 * - Eliminates ~30-50ms TBT from client-side parsing
 * - Removes raw content string from client JS bundle
 * - All regex/string operations happen server-side
 * 
 * ============================================
 */

// ---- AST Node Types (serializable via JSON) ----

export type ContentNode =
  | { type: 'h1'; text: string }
  | { type: 'h2'; id: string; text: string; isFirst: boolean }
  | { type: 'h3'; id: string; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'callout'; content: string }
  | { type: 'ai-answer'; lines: string[] }
  | { type: 'blockquote'; content: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; alt: string; poster?: string }
  | { type: 'youtube'; src: string }
  | { type: 'svg-illustration'; name: string }
  | { type: 'table-smart'; rows: string[] }
  | { type: 'table-fallback'; headers: string[]; dataRows: string[][] }
  | { type: 'icon-bullet'; content: string; as: 'div' | 'li' }
  | { type: 'icon-list-item'; content: string; color: string; size: string }
  | { type: 'icon-numbered'; content: string; number: number; color: string; size: string }
  | { type: 'link-reference'; text: string; href: string }
  | { type: 'bold-paragraph'; text: string }
  | { type: 'script'; html: string }
  | { type: 'toc-marker' };

/**
 * Slugify heading text for ID generation
 * Must match EXACTLY the client-side logic for TOC anchor linking
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Parse raw markdown content into a serializable AST
 * 
 * @param content - Raw markdown string from blog JSON
 * @returns Array of ContentNode objects (JSON-serializable)
 */
export function parseMarkdownToAST(content: string): ContentNode[] {
  const lines = content.split('\n');
  const nodes: ContentNode[] = [];
  
  let isFirstH2 = true;
  let inTable = false;
  let tableRows: string[] = [];
  let inScript = false;
  let scriptContent: string[] = [];
  let inCallout = false;
  let calloutContent: string[] = [];
  let inAiAnswer = false;
  let aiAnswerContent: string[] = [];
  let currentHeadingLevel: 'h2' | 'h3' | null = null;

  const processLine = (line: string) => {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) return;

    // ---- Callout blocks ----
    if (trimmedLine === ':::callout') {
      inCallout = true;
      calloutContent = [];
      return;
    }
    if (inCallout) {
      if (trimmedLine === ':::') {
        nodes.push({ type: 'callout', content: calloutContent.join('\n') });
        inCallout = false;
        calloutContent = [];
      } else {
        calloutContent.push(trimmedLine);
      }
      return;
    }

    // ---- AI answer blocks ----
    if (trimmedLine === ':::ai-answer') {
      inAiAnswer = true;
      aiAnswerContent = [];
      return;
    }
    if (inAiAnswer) {
      if (trimmedLine === ':::') {
        nodes.push({ type: 'ai-answer', lines: aiAnswerContent });
        inAiAnswer = false;
        aiAnswerContent = [];
      } else {
        aiAnswerContent.push(trimmedLine);
      }
      return;
    }

    // ---- Script tags ----
    if (trimmedLine.startsWith('<script')) {
      inScript = true;
      scriptContent = [trimmedLine];
      return;
    }
    if (inScript) {
      scriptContent.push(trimmedLine);
      if (trimmedLine.includes('</script>')) {
        nodes.push({ type: 'script', html: scriptContent.join('\n') });
        inScript = false;
        scriptContent = [];
      }
      return;
    }

    // ---- Images: ![alt](src) ----
    const imageMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      const [, alt, src] = imageMatch;
      const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
      
      if (isVideo) {
        nodes.push({ type: 'video', src: `/blog/${src}`, alt });
      } else if (src === '3d-rendering-use-cases-infographic.svg') {
        nodes.push({ type: 'svg-illustration', name: src });
      } else {
        nodes.push({ type: 'image', src: `/blog/${src}`, alt });
      }
      return;
    }

    // ---- YouTube/Vimeo URLs ----
    if (trimmedLine.match(/^https?:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com)/)) {
      nodes.push({ type: 'youtube', src: trimmedLine });
      return;
    }

    // ---- Tables ----
    if (trimmedLine.startsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      tableRows.push(trimmedLine);
      return;
    } else if (inTable) {
      if (tableRows.length > 0) {
        nodes.push({ type: 'table-smart', rows: tableRows });
      }
      inTable = false;
      tableRows = [];
    }

    // ---- Headings ----
    if (trimmedLine.startsWith('# ')) {
      nodes.push({ type: 'h1', text: trimmedLine.slice(2) });
    } else if (trimmedLine.startsWith('## ')) {
      if (isFirstH2) {
        nodes.push({ type: 'toc-marker' });
        isFirstH2 = false;
      }
      currentHeadingLevel = 'h2';
      const text = trimmedLine.slice(3);
      nodes.push({ type: 'h2', id: slugify(text), text, isFirst: false });
    } else if (trimmedLine.startsWith('### ')) {
      currentHeadingLevel = 'h3';
      const text = trimmedLine.slice(4);
      nodes.push({ type: 'h3', id: slugify(text), text });
    }
    // ---- List items ----
    else if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ") || trimmedLine.startsWith("+ ")) {
      const listContent = trimmedLine.slice(2);
      const isBluePoint = trimmedLine.startsWith("+ ");
      const hasBoldStart = listContent.trim().startsWith('**');
      const isH3BoldPoint = currentHeadingLevel === 'h3' && hasBoldStart;

      if (isH3BoldPoint) {
        nodes.push({ type: 'icon-bullet', content: listContent, as: 'div' });
      } else {
        const iconColor = isBluePoint ? 'blue' : 'green';
        const iconSize = currentHeadingLevel === 'h2' ? 'large' : 'default';
        nodes.push({ type: 'icon-list-item', content: listContent, color: iconColor, size: iconSize });
      }
    }
    // ---- Numbered lists ----
    else if (trimmedLine.match(/^\d+\./)) {
      const match = trimmedLine.match(/^(\d+)\.\s*(.+)$/);
      if (match) {
        const iconColor = 'green';
        const iconSize = currentHeadingLevel === 'h2' ? 'large' : 'default';
        const numberValue = parseInt(match[1], 10);
        nodes.push({ type: 'icon-numbered', content: match[2], number: numberValue, color: iconColor, size: iconSize });
      }
    }
    // ---- Reference links [1] ----
    else if (trimmedLine.match(/^\[\d+\]/)) {
      const href = trimmedLine.match(/\(([^)]+)\)/)?.[1] || '';
      nodes.push({ type: 'link-reference', text: trimmedLine, href });
    }
    // ---- UTM links ----
    else if (trimmedLine.startsWith('(') && trimmedLine.includes('utm_source')) {
      const href = trimmedLine.match(/\(([^)]+)\)/)?.[1] || '';
      nodes.push({ type: 'link-reference', text: trimmedLine, href });
    }
    // ---- Blockquotes ----
    else if (trimmedLine.startsWith('>')) {
      const content = trimmedLine.slice(1).trim();
      nodes.push({ type: 'blockquote', content });
    }
    // ---- Inline images (inside text) ----
    else if (trimmedLine.startsWith('![')) {
      const imgMatch = trimmedLine.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imgMatch) {
        const [, alt, src] = imgMatch;
        let imageSrc: string;
        if (src.startsWith('http://') || src.startsWith('https://')) {
          imageSrc = src;
        } else if (src.startsWith('/')) {
          imageSrc = src;
        } else {
          imageSrc = `/blog/${src}`;
        }
        nodes.push({ type: 'image', src: imageSrc, alt });
      }
    }
    // ---- Regular paragraphs ----
    else {
      const isBoldParagraph = trimmedLine.trim().startsWith('**') && currentHeadingLevel === 'h3' && !trimmedLine.includes('The Bottom Line');
      if (isBoldParagraph) {
        nodes.push({ type: 'bold-paragraph', text: trimmedLine });
      } else {
        nodes.push({ type: 'paragraph', text: trimmedLine });
      }
    }
  };

  // Process all lines
  for (let i = 0; i < lines.length; i++) {
    processLine(lines[i]);
  }

  // Handle remaining table at EOF
  if (inTable && tableRows.length > 0) {
    // Fallback table rendering (headers + data)
    const headers = tableRows[0].split('|').map(h => h.trim()).filter(h => h);
    const dataRows = tableRows.slice(2).map(row => 
      row.split('|').map(c => c.trim()).filter(c => c)
    );
    nodes.push({ type: 'table-fallback', headers, dataRows });
  }

  return nodes;
}
