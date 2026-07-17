/**
 * Formats a Date object into a string: "[day] [month-string] [year]"
 * Example output: "17 July 2026"
 *
 * @param date - The Date object to format
 * @param locale - Optional BCP 47 language tag (defaults to 'en-US' for English month names)
 */
export const dateToText = (date: Date, locale: string = "id-ID"): string => {
  const day = date.getDate();
  const month = date.toLocaleDateString(locale, { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
