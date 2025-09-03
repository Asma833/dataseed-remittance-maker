import { TableConfig } from './types';

// Default table configuration
export const defaultTableConfig: TableConfig = {
  paginationMode: 'static',
  pagination: {
    enabled: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
    showPageSizeSelector: true,
  },
  search: {
    enabled: true,
    placeholder: 'Search...',
    searchMode: 'static',
    debounceMs: 300,
  },
  filters: {
    enabled: true,
    filterMode: 'static',
    columnFilters: true,
    globalFilter: true,
  },
  sorting: {
    enabled: true,
    multiSort: false,
    sortMode: 'static',
  },
  rowSelection: {
    enabled: false,
    multiple: false,
  },
  loading: false,
  error: null,
  striped: false,
  hover: true,
  bordered: true,
  compact: false,
};

// Configuration presets for different use cases
export const tableConfigPresets = {
  // Basic table with pagination only
  basic: {
    ...defaultTableConfig,
    search: { ...defaultTableConfig.search, enabled: false },
    filters: { ...defaultTableConfig.filters, enabled: false },
    sorting: { ...defaultTableConfig.sorting, enabled: false },
  },
  
  // Full-featured table with all options
  advanced: {
    ...defaultTableConfig,
    sorting: { ...defaultTableConfig.sorting, multiSort: true },
    rowSelection: { ...defaultTableConfig.rowSelection, enabled: true, multiple: true },
  },
  
  // Simple list without pagination
  simple: {
    ...defaultTableConfig,
    pagination: { ...defaultTableConfig.pagination, enabled: false },
    search: { ...defaultTableConfig.search, enabled: false },
    filters: { ...defaultTableConfig.filters, enabled: false },
    bordered: false,
  },
  
  // Dynamic table with server-side operations
  dynamic: {
    ...defaultTableConfig,
    paginationMode: 'dynamic' as const,
    search: { ...defaultTableConfig.search, searchMode: 'dynamic' as const },
    filters: { ...defaultTableConfig.filters, filterMode: 'dynamic' as const },
    sorting: { ...defaultTableConfig.sorting, sortMode: 'dynamic' as const },
  },
  
  // User management table configuration (matching your design)
  userManagement: {
    ...defaultTableConfig,
    pagination: {
      ...defaultTableConfig.pagination,
      pageSize: 10,
      pageSizeOptions: [10, 25, 50, 100],
    },
    search: {
      ...defaultTableConfig.search,
      placeholder: 'Search...',
    },
    filters: {
      ...defaultTableConfig.filters,
      enabled: true,
    },
    striped: true,
    hover: true,
  },
};

// Helper function to merge configs
export function mergeTableConfig(
  baseConfig: Partial<TableConfig>, 
  overrides: Partial<TableConfig> = {}
): TableConfig {
  return {
    ...defaultTableConfig,
    ...baseConfig,
    pagination: { ...defaultTableConfig.pagination, ...baseConfig.pagination, ...overrides.pagination },
    search: { ...defaultTableConfig.search, ...baseConfig.search, ...overrides.search },
    filters: { ...defaultTableConfig.filters, ...baseConfig.filters, ...overrides.filters },
    sorting: { ...defaultTableConfig.sorting, ...baseConfig.sorting, ...overrides.sorting },
    rowSelection: { ...defaultTableConfig.rowSelection, ...baseConfig.rowSelection, ...overrides.rowSelection },
    ...overrides,
  };
}
