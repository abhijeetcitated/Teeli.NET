import { renderTeeliOG, ogSize, ogContentType, ogAlt } from '@/lib/og';

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderTeeliOG();
}
