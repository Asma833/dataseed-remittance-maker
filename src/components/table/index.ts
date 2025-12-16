// Main components
export { DataTable } from './data-table';
export { StatusBadge } from './status-badge';
export { ActionButtons } from './action-buttons';

// Configuration and types
export * from './types';
export * from './config';

// Re-export commonly used types
export type {
  TableColumn,
  TableConfig,
  TableData,
  TableActions,
  UserData,
  StatusBadgeProps,
  ActionButtonsProps,
} from './types';
