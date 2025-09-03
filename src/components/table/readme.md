# TanStack Table Component

A powerful and configurable table component built with TanStack Table v8, designed for the Remittance Forex application.

## Features

- ✅ **Configurable Modes**: Static or Dynamic pagination, filtering, and sorting
- ✅ **Rich Column Types**: Support for custom cells, sorting, filtering
- ✅ **Search & Filters**: Global search and column-specific filters
- ✅ **Pagination**: Customizable page sizes and navigation
- ✅ **Status Badges**: Built-in status indicators
- ✅ **Action Buttons**: Flexible action handling
- ✅ **TypeScript**: Full type safety
- ✅ **Responsive**: Mobile-friendly design
- ✅ **Customizable**: Extensive configuration options

## Quick Start

### Basic Usage

```tsx
import { DataTable, TableColumn, TableData } from '@/components/table';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
}

const columns: TableColumn<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    sortable: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ value }) => <StatusBadge status={value} />,
  },
];

const data: TableData<User> = {
  data: users,
  totalCount: users.length,
};

function MyTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      config={{
        paginationMode: 'static',
        pagination: { enabled: true, pageSize: 10 },
        search: { enabled: true },
      }}
    />
  );
}
```

### Using Configuration Presets

```tsx
import { DataTable, tableConfigPresets } from '@/components/table';

function AdvancedTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      config={tableConfigPresets.userManagement}
    />
  );
}
```

## Configuration Options

### Table Config

```typescript
interface TableConfig {
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
  };
  
  // Sorting settings
  sorting: {
    enabled: boolean;
    multiSort: boolean;
    sortMode: 'static' | 'dynamic';
  };
  
  // Additional settings
  loading?: boolean;
  error?: string | null;
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  compact?: boolean;
}
```

### Available Presets

1. **basic**: Simple table with pagination only
2. **advanced**: Full-featured table with all options
3. **simple**: No pagination, minimal features
4. **dynamic**: Server-side operations
5. **userManagement**: Optimized for user management (matches your design)

## Static vs Dynamic Modes

### Static Mode
- All data is loaded at once
- Filtering, sorting, and pagination happen client-side
- Good for smaller datasets (< 1000 records)
- Better performance for repeated operations

```tsx
const config = {
  paginationMode: 'static',
  search: { searchMode: 'static' },
  filters: { filterMode: 'static' },
  sorting: { sortMode: 'static' },
};
```

### Dynamic Mode
- Data is loaded on-demand from server
- Operations trigger API calls
- Good for large datasets
- Requires backend API integration

```tsx
const config = {
  paginationMode: 'dynamic',
  search: { searchMode: 'dynamic' },
  filters: { filterMode: 'dynamic' },
  sorting: { sortMode: 'dynamic' },
};

const actions = {
  onPaginationChange: async (pagination) => {
    // Make API call for new page
    const response = await fetchUsers(pagination);
    setData(response);
  },
  onGlobalFilterChange: async (filter) => {
    // Make API call with search term
    const response = await searchUsers(filter);
    setData(response);
  },
  // ... other handlers
};
```

## Column Configuration

```typescript
interface TableColumn<T> {
  id: string;                          // Unique identifier
  header: string;                      // Display name
  accessorKey?: keyof T | string;      // Data key
  cell?: (props) => React.ReactNode;   // Custom cell renderer
  sortable?: boolean;                  // Enable sorting
  filterable?: boolean;                // Enable filtering
  width?: number | string;             // Fixed width
  minWidth?: number;                   // Minimum width
  maxWidth?: number;                   // Maximum width
  enableHiding?: boolean;              // Allow column hiding
  meta?: {
    headerAlign?: 'left' | 'center' | 'right';
    cellAlign?: 'left' | 'center' | 'right';
    className?: string;
  };
}
```

## Custom Cells

### Status Badge
```tsx
{
  id: 'status',
  header: 'Status',
  accessorKey: 'status',
  cell: ({ value }) => <StatusBadge status={value} />,
}
```

### Action Buttons
```tsx
{
  id: 'actions',
  header: 'Actions',
  cell: ({ row }) => (
    <ActionButtons
      row={row}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  ),
}
```

### Custom Cell
```tsx
{
  id: 'avatar',
  header: 'Avatar',
  cell: ({ row }) => (
    <div className="flex items-center gap-2">
      <img 
        src={row.avatarUrl} 
        alt={row.name}
        className="h-8 w-8 rounded-full"
      />
      <span>{row.name}</span>
    </div>
  ),
}
```

## Event Handlers

```typescript
interface TableActions<T> {
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onSortingChange?: (sorting: { id: string; desc: boolean }[]) => void;
  onGlobalFilterChange?: (filter: string) => void;
  onColumnFiltersChange?: (filters: { id: string; value: any }[]) => void;
  onRowSelectionChange?: (selectedRows: T[]) => void;
  onRowClick?: (row: T) => void;
}
```

## Examples

### User Management Table (Complete Example)

See `UserManagementTable.tsx` for a complete implementation that includes:
- Static and dynamic mode switching
- Custom status badges
- Action buttons
- Search and filtering
- Export functionality
- Add new user feature

### Simple Product List

```tsx
import { DataTable, tableConfigPresets } from '@/components/table';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

const columns: TableColumn<Product>[] = [
  { id: 'name', header: 'Product Name', accessorKey: 'name', sortable: true },
  { 
    id: 'price', 
    header: 'Price', 
    accessorKey: 'price',
    cell: ({ value }) => `$${value.toFixed(2)}`,
    sortable: true,
  },
  { id: 'category', header: 'Category', accessorKey: 'category', sortable: true },
];

function ProductList({ products }: { products: Product[] }) {
  return (
    <DataTable
      columns={columns}
      data={{ data: products }}
      config={tableConfigPresets.basic}
    />
  );
}
```

## Styling

The table uses Tailwind CSS classes and can be customized through:

1. **Config options**: `striped`, `hover`, `bordered`, `compact`
2. **Column meta**: `className`, `headerAlign`, `cellAlign`
3. **Component props**: `className` on DataTable
4. **Custom CSS**: Override default styles

## API Integration

For dynamic mode, implement the following pattern:

```typescript
// API service
async function fetchUsers(params: {
  page: number;
  pageSize: number;
  search?: string;
  sort?: { field: string; direction: 'asc' | 'desc' };
  filters?: Record<string, any>;
}) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return response.json();
}

// Component
function UserTable() {
  const [data, setData] = useState({ data: [], totalCount: 0 });
  const [loading, setLoading] = useState(false);

  const actions = {
    onPaginationChange: async (pagination) => {
      setLoading(true);
      try {
        const result = await fetchUsers({
          page: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
        });
        setData(result);
      } finally {
        setLoading(false);
      }
    },
    // ... other handlers
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      config={{ 
        ...tableConfigPresets.dynamic,
        loading,
      }}
      actions={actions}
    />
  );
}
```

## Performance Tips

1. **Use static mode** for datasets < 1000 records
2. **Implement proper debouncing** for search (300ms recommended)
3. **Memoize column definitions** with `useMemo`
4. **Optimize custom cell renderers** to avoid unnecessary re-renders
5. **Use virtual scrolling** for very large datasets (not included in this implementation)

## Troubleshooting

### Common Issues

1. **Columns not sorting**: Ensure `sortable: true` is set
2. **Search not working**: Check `search.enabled` and `filters.globalFilter`
3. **Dynamic mode not triggering**: Verify action handlers are provided
4. **Styling issues**: Check Tailwind CSS is properly configured

### TypeScript Errors

Ensure your data type matches the column `accessorKey` definitions:

```typescript
// ✅ Correct
interface User {
  name: string;
  email: string;
}

const columns: TableColumn<User>[] = [
  { id: 'name', accessorKey: 'name' }, // ✅ 'name' exists on User
];

// ❌ Incorrect
const columns: TableColumn<User>[] = [
  { id: 'username', accessorKey: 'username' }, // ❌ 'username' doesn't exist on User
];
```
