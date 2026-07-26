/**
 * Extracts the extension from a file name, including the leading dot.
 *
 * @param filename - The name of the file (e.g., "asdf.jpeg.pdf")
 * @returns The file extension (e.g., ".pdf") or an empty string if none exists.
 */
export function getExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");

  // Return an empty string if there is no dot,
  // or if the dot is the very first character (e.g., hidden files like ".env")
  if (lastDotIndex <= 0) {
    return "";
  }

  return filename.substring(lastDotIndex);
}
