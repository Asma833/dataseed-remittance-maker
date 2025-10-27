export interface TableColumn<T = any> {
  id: string;
  header: string;
  accessorKey?: keyof T | string;
  cell?: (props: { row: T; value: any }) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  enableHiding?: boolean;
  meta?: {
    headerAlign?: 'left' | 'center' | 'right';
    cellAlign?: 'left' | 'center' | 'right';
    className?: string;
  };
}

export interface TableConfig {
  // Pagination settings
  paginationMode: 'static' | 'dynamic';
  pagination: {
    enabled: boolean;
    pageSize: number;
    pageSizeOptions: number[];
    showPageSizeSelector: boolean;
  };

  // Search settings
  search: {
    enabled: boolean;
    placeholder?: string;
    searchMode: 'static' | 'dynamic';
    debounceMs?: number;
  };

  // Filter settings
  filters: {
    enabled: boolean;
    filterMode: 'static' | 'dynamic';
    columnFilters: boolean;
    globalFilter: boolean;
    filter?: {
      statusFilter?: {
        enabled: boolean;
        options: { value: string; label: string }[];
        columnId?: string;
        columnName?: string;
      };
      roleFilter?: {
        enabled: boolean;
        options: { value: string; label: string }[];
        columnId?: string;
        columnName?: string;
      };
    };
    // Legacy support - keep these for backward compatibility
    statusFilter?: {
      enabled: boolean;
      options: { value: string; label: string }[];
      columnId?: string;
      columnName?: string;
    };
    roleFilter?: {
      enabled: boolean;
      options: { value: string; label: string }[];
      columnId?: string;
      columnName?: string;
    };
    customFilters?: Array<{
      enabled: boolean;
      options: { value: string; label: string }[];
      columnId: string;
      columnName: string;
    }>;
  };

  // Sorting settings
  sorting: {
    enabled: boolean;
    multiSort: boolean;
    sortMode: 'static' | 'dynamic';
  };

  // Row selection settings
  rowSelection: {
    enabled: boolean;
    multiple: boolean;
  };

  export: {
    enabled: boolean;
    fileName?: string;
    includeHeaders?: boolean;
  };

  // Tab filter settings
  tabFilters?: {
    enabled: boolean;
    tabs: { value: string; label: string }[];
    defaultValue?: string;
    onTabChange?: (value: string) => void;
  };

  // Loading and error states
  loading?: boolean;
  error?: string | null;

  // Additional settings
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  compact?: boolean;
}

export interface TableData<T = any> {
  data: T[];
  totalCount?: number;
  pageCount?: number;
  currentPage?: number;
}

export interface TableActions<T = any> {
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onSortingChange?: (sorting: { id: string; desc: boolean }[]) => void;
  onGlobalFilterChange?: (filter: string) => void;
  onColumnFiltersChange?: (filters: { id: string; value: any }[]) => void;
  onRowSelectionChange?: (selectedRows: T[]) => void;
  onRowClick?: (row: T) => void;
}

export interface StatusBadgeProps {
  status: string | null;
}

export interface ActionButtonsProps<T = any> {
  row: T;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onView?: (row: T) => void;
  onInactivate?:(row: T) => void;
}

// Sample data interface for the user management table
export interface UserData {
  id: string;
  fullName: string;
  emailId: string;
  phoneNo: string;
  status: 'Active' | 'Inactive';
}
