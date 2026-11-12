/**
 * Splits off the last word of a heading so it can be colored separately —
 * e.g. "SHIP OF LEGENDS" -> ["SHIP OF", "LEGENDS"], with only "LEGENDS"
 * picking up the accent color. Works across languages since it only
 * depends on word boundaries, not specific text.
 */
export const splitLastWord = (text: string): [string, string] => {
  const words = text.trim().split(' ');
  const last = words.pop() ?? '';
  return [words.join(' '), last];
};
