/**
 * Utility functions for formatting remittance data
 */

/**
 * Converts a numeric value to percentage string format
 * @param value - The numeric value to convert
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string or '-' if invalid
 */
export const toPercentString = (value: any, decimals: number = 2): string => {
  if (value === null || value === undefined || value === '') return '-';

  const numValue = parseFloat(value);
  if (isNaN(numValue)) return '-';

  return `${numValue.toFixed(decimals)}%`;
};

/**
 * Formats a value based on the display mode (INR or percentage)
 * @param value - The value to format
 * @param mode - Display mode: 'inr' or 'percentage'
 * @returns Formatted string
 */
export const formatRemittanceValue = (value: any, mode: 'inr' | 'percentage'): string => {
  if (value === null || value === undefined || value === '') return '-';

  if (mode === 'percentage') {
    return toPercentString(value);
  }

  return String(value);
};