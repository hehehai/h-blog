// Post dates are calendar dates stored at UTC midnight. Keep their display
// independent of the server/browser locale and timezone during hydration.
export function formatPostDate(date: Date): string {
  return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
}
