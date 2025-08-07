export function mergeWithPipe(...strings: string[]): string {
  // Trim leading and trailing pipes from each string and filter out any empty strings
  const trimmedStrings = strings
    .map((str) => str?.replace(/^\|+|\|+$/g, ""))
    .filter(Boolean);

  // Join the non-empty, trimmed strings with a pipe character
  return trimmedStrings.join("|");
}
