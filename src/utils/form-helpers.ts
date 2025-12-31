/**
 * Safely converts user input to a number, defaulting to 0 for invalid or empty values.
 * @param value - The value to convert (string, number, or undefined)
 * @returns A valid number
 */
export const safeNumber = (value: string | number | undefined): number => {
  if (value === undefined || value === null || value === '') return 0;
  const num = typeof value === 'string' ? Number(value) : value;
  return isNaN(num as number) ? 0 : (num as number);
};

/**
 * Safely trims a string and returns undefined if the result is empty.
 * @param value - The string to process
 * @returns The trimmed string or undefined
 */
export const safeString = (value: string | undefined): string | undefined => {
  const str = value?.trim();
  return str || undefined;
};

/**
 * Normalizes a string by trimming it, defaulting to an empty string if undefined.
 * @param value - The string to normalize
 * @returns The trimmed string or empty string
 */
export const normalizeString = (value: string | undefined): string => value?.trim() || '';

/**
 * Formats a number or string to INR format with 2 decimal places.
 * @param value - The value to format
 * @returns The formatted string or empty string if invalid
 */
export const formatINR = (value?: number | string): string => {
  if (value === null || value === undefined || value === '') return '';

  const number = typeof value === 'string' ? Number(value) : value;
  if (isNaN(number)) return '';

  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};
