import { formatDate } from './dateFormat';

export const formatDateWithFallback = (date?: string | null): string => {
  if (date === null || date === undefined || date === 'N/A') {
    return 'N/A';
  }
  return formatDate(date);
};

export const formatDateForCsv = (date?: string | null): string => {
  const formatted = formatDateWithFallback(date);
  if (formatted === 'N/A') return formatted;
  // Wrap in ="..." to force Excel to treat as text and preserve format
  // We also add a leading quote to ensure csv exporter quotes the whole field if needed
  // But our csv exporter only quotes if it finds [, " \n]
  // "=" is not a trigger.
  // However, Excel handles `="val"` correctly as a formula.
  return `="${formatted}"`;
};
