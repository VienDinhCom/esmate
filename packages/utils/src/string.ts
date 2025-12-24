import type { Configuration, Locale } from "typopo";

import { capitalize } from "es-toolkit/string";
import title from "title";
import typopo from "typopo";

/**
 * Formats a string to be used as a title.
 * @param str The string to format.
 * @param options The options to use.
 * @param options.style The style of the title.
 * @param options.special A list of special words to keep as-is.
 * @returns The formatted string.
 */
export function titleize(str: string, options?: { style?: "chicago"; special?: string[] }): string {
  str = str.replace(/\s+/g, " ");

  if (options?.style === "chicago") {
    return title(str, options);
  }

  const specialWordsLower = options?.special?.map((s) => s.toLocaleLowerCase());

  return str
    .split(" ")
    .map((word) => (specialWordsLower?.includes(word.toLocaleLowerCase()) ? word : capitalize(word)))
    .join(" ");
}

/**
 * Fixes typos in a string using typopo.
 * @param str The string to fix.
 * @param options The options to use, including `typopo` configuration.
 * @param options.locale The locale to use (e.g., "en-us", "ru").
 * @returns The fixed string.
 */
export function fixTypos(str: string, options?: Configuration & { locale?: Locale }): string {
  return typopo
    .fixTypos(str, options?.locale, options)
    .replace(/\u00A0/g, " ") // Replace non-breaking spaces with regular spaces
    .trim();
}
