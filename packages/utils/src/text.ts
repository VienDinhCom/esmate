import title from "title";

/**
 * Formats a string to be used as a title.
 * Original: https://www.npmjs.com/package/title
 * @param str The string to format.
 * @param options The options to use.
 * @returns The formatted string.
 */
export function formatTitle(str: string, options?: { special?: string[] }): string {
  return title(str, options);
}
