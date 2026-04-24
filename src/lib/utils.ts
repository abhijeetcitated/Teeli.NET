import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names using clsx and tailwind-merge
 * This utility helps avoid Tailwind class conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

/**
 * Delay utility for animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
