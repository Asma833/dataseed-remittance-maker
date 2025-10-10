# DataTable Error Handling Guide

This document explains the comprehensive error handling implemented in the DataTable component to prevent common runtime errors like "Cannot read properties of undefined (reading 'length')".

## Key Improvements

### 1. **Data Validation and Sanitization**

The DataTable now handles various invalid data scenarios:

- **Undefined/Null Data**: Automatically provides empty array instead of crashing
- **Wrong Data Structure**: Validates that `data.data` is an array
- **Missing Properties**: Provides sensible defaults for missing `totalCount`, `pageCount`, etc.
- **Legacy Array Format**: Supports both `TableData<T>` objects and direct arrays

### 2. **Flexible Input Types**

```typescript
interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: TableData<T> | T[]; // Supports both formats
  config?: Partial<TableConfig>;
  actions?: TableActions<T>;
  className?: string;
}
```

### 3. **Comprehensive Error Boundaries**

- **Individual Cell Rendering**: Each cell is wrapped in try-catch
- **Row Rendering**: Each row is wrapped in try-catch
- **Table Initialization**: The entire table creation is error-protected
- **Event Handlers**: All useEffect callbacks have error handling

### 4. **Safe Data Processing**

```typescript
// Safe data processing with fallbacks
const safeData = useMemo(() => {
  let processedData: T[] = [];

  if (Array.isArray(data)) {
    // Direct array support (legacy)
    processedData = data;
  } else if (data && typeof data === 'object') {
    if (Array.isArray(data.data)) {
      processedData = data.data;
    } else {
      // Handle invalid data.data
      processedData = [];
    }
  } else {
    // Handle invalid data types
    processedData = [];
  }

  return {
    data: processedData,
    totalCount: /* safe calculation */,
    pageCount: /* safe calculation */,
    currentPage: /* safe calculation */,
  };
}, [data]);
```

## Error Scenarios Handled

### 1. **Undefined Data**

```javascript
// This will no longer crash
<DataTable data={undefined} columns={columns} />
```

### 2. **Null Data**

```javascript
// Safe handling
<DataTable data={null} columns={columns} />
```

### 3. **Wrong Data Structure**

```javascript
// These are handled gracefully
<DataTable data={{ data: "not an array" }} columns={columns} />
<DataTable data={{ someOtherProp: [] }} columns={columns} />
```

### 4. **Missing Properties**

```javascript
// Safe with missing properties
<DataTable data={{ data: [] }} columns={columns} /> // missing totalCount, etc.
```

### 5. **Legacy Array Format**

```javascript
// Still supported
<DataTable data={[{ id: 1, name: 'John' }]} columns={columns} />
```

## Utility Functions

### `validateTableData<T>(data: any): TableData<T>`

Validates and sanitizes any input to ensure it's a valid TableData object.

### `validateTableColumns<T>(columns: any): boolean`

Validates that columns array is properly structured.

### `formatTableError(error: any): string`

Creates user-friendly error messages.

### `createEmptyTableData<T>(): TableData<T>`

Creates a safe empty state for the table.

## Usage Examples

### Basic Safe Usage

```typescript
import { DataTable, validateTableData } from '@/components/table';

function MyComponent({ apiData }: { apiData: any }) {
  // Always validate data before passing to DataTable
  const safeData = validateTableData(apiData);

  return (
    <DataTable
      data={safeData}
      columns={columns}
      config={{
        error: apiData === undefined ? "Failed to load data" : null,
        loading: isLoading,
      }}
    />
  );
}
```

### With API Error Handling

```typescript
const [data, setData] = useState(createEmptyTableData());
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  fetchData()
    .then((apiResponse) => {
      const validData = validateTableData(apiResponse);
      setData(validData);
      setError(null);
    })
    .catch((err) => {
      setError(formatTableError(err));
      setData(createEmptyTableData());
    });
}, []);
```

## Error States

The DataTable displays appropriate UI for different error conditions:

1. **Loading State**: Shows loading indicator
2. **Error State**: Shows error message with styling
3. **No Data State**: Shows "No data available" message
4. **Empty Results**: Shows "No results found" for filtered data
5. **Render Errors**: Individual cells/rows show "Error" instead of crashing

## Console Warnings

The component logs helpful warnings for developers:

- `DataTable: data.data should be an array, received: object`
- `DataTable: Received null or undefined data, using empty array`
- `Error rendering cell:` (with details)
- `Error in pagination change handler:` (with details)

## Migration Guide

### Before (Error-Prone)

```typescript
// Could crash if apiData is undefined or malformed
<DataTable data={apiData} columns={columns} />
```

### After (Error-Safe)

```typescript
// Always safe, handles any input gracefully
<DataTable data={apiData || []} columns={columns} />

// Or with validation
const safeData = validateTableData(apiData);
<DataTable data={safeData} columns={columns} />
```

## Performance Considerations

The error handling adds minimal overhead:

- Data validation is memoized
- Error boundaries only activate when errors occur
- Console warnings are only shown in development

## Testing Error Scenarios

Use the `SafeDataTableExample` component to test various error conditions:

```bash
# The example randomly returns different response types
# including undefined, null, malformed objects, etc.
```

This ensures your application remains stable even when APIs return unexpected data formats.
