import type { Configuration, Locale } from "typopo";

import title from "title";
import typopo from "typopo";

/**
 * Formats a string to be used as a title.
 * @param str The string to format.
 * @param options The options to use.
 * @returns The formatted string.
 */
export function formatTitle(str: string, options?: { special?: string[] }): string {
  return title(str, options);
}

/**
 * Fixes typos in a string using typopo.
 * @param str The string to fix.
 * @param options The options to use.
 * @returns The fixed string.
 */
export function fixTypos(str: string, options?: Configuration & { locale?: Locale }): string {
  return typopo
    .fixTypos(str, options?.locale, options)
    .replace(/\u00A0/g, " ") // Replace non-breaking spaces with regular spaces
    .trim();
}
