/**
 * Detects if a string is URL-encoded and decodes it.
 * If it is not encoded, or contains malformed encoding, it returns the original string.
 *
 * @param {string} input - The string to check and decode
 * @returns {string} The decoded string, or the original string
 */
export const safeDecodeURI = (input: string): string => {
  try {
    const decoded = decodeURIComponent(input);
    return decoded;
  } catch (error) {
    if (error instanceof URIError) return input;
    throw error;
  }
};
