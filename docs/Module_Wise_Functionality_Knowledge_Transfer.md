# EBIX Remittance Maker - Module Wise Functionality Knowledge Transfer

## Table of Contents

1. [Authentication & Authorization](#authentication--authorization)
2. [Transaction Management Module](#transaction-management-module)
   - [Create Transactions](#create-transactions)
   - [KYC Upload](#kyc-upload)
   - [Payment Status](#payment-status)
   - [View All Transactions](#view-all-transactions)
3. [Form Management System](#form-management-system)
4. [API Integration Layer](#api-integration-layer)
5. [UI Component Library](#ui-component-library)
6. [State Management](#state-management)
7. [File Upload & Processing](#file-upload--processing)
8. [PDF Generation & Export](#pdf-generation--export)

---

## Authentication & Authorization

### Overview

The application uses JWT-based authentication with role-based access control (RBAC) for different user types.

### Key Components

- **Login Flow**: Token-based authentication via API
- **Protected Routes**: Route guards based on user roles
- **User Context**: Redux store for user state management

### Implementation Details

```typescript
// Route protection example
<ProtectedRoute roles={['branch_agent_maker']}>
  <AgentMakerRoutes />
</ProtectedRoute>
```

### User Roles

- `branch_agent_maker`: Primary user role for transaction processing

---

## Transaction Management Module

### Module Structure

```
src/features/maker/components/transaction/
├── page.tsx                    # Main transaction page with tabs
├── tabs/
│   ├── create-transactions-tab/
│   ├── kyc-upload-tab/
│   ├── payment-tab/
│   └── view-all-tab/
```

### Create Transactions

#### Overview

Multi-step form for creating international remittance transactions with real-time calculations and validations.

#### Key Features

- **3-Step Process**: Transaction Details → Beneficiary Details → Currency Details
- **Real-time Calculations**: GST, TCS, and rate calculations
- **Conditional Fields**: Dynamic form fields based on transaction type
- **PDF Generation**: Transaction details export

#### Form Sections

##### 1. Transaction Details (`transaction-basic-details.tsx`)

**Purpose**: Capture applicant and transaction basic information

**Key Fields**:

- `purpose`: Transaction purpose (Education, Personal, etc.)
- `fx_currency`: Foreign currency selection
- `fx_amount`: Transaction amount in foreign currency
- `applicant_pan_number`: Indian PAN number (required)
- `source_of_funds`: Funding source selection
- `passport_number`: Passport details (required)
- `applicant_address`: Complete address information

**Business Logic**:

- PAN validation using regex: `/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/`
- Mobile number validation: `/^[6-9]\d{9}$/`
- Conditional fields for education loans
- Address validation with postal code regex

**Validation Schema**: `transaction-basic-details.schema.ts`

- Zod-based validation with custom error messages
- Required field enforcement
- Cross-field validation (e.g., passport expiry > issue date)

##### 2. Beneficiary Details (`beneficiary-details.tsx`)

**Purpose**: Capture recipient banking information

**Key Fields**:

- `beneficiary_name`: Recipient full name
- `beneficiary_account_number_iban_number`: Account/IBAN
- `beneficiary_swift_code`: SWIFT/BIC code
- `beneficiary_bank_name`: Bank name
- `beneficiary_bank_address`: Bank address
- `intermediaryBankDetails`: Optional intermediary bank info

**Business Logic**:

- SWIFT code validation
- Intermediary bank fields become required when "Yes" is selected
- Country-specific field requirements

##### 3. Currency Details (`currency-details.tsx`)

**Purpose**: Handle currency conversion, rates, and final calculations

**Key Components**:

- **Rate Table**: Interactive table for rate calculations
- **GST Calculator**: Automatic GST computation
- **TCS Calculator**: Tax Collected at Source calculation

**Key Fields**:

- `settlement_rate`: Company settlement rate
- `add_margin`: Agent margin percentage
- `customer_rate`: Final customer rate
- `invoiceRateTable`: Complex nested rate structure

**Business Logic**:

```typescript
// Rate calculation example
const transactionValue = fxAmount * companySettlementRate;
const finalRate = transactionValue + agentMarkup;
```

**Real-time Calculations**:

- GST: Calculated via API call with debouncing (2s delay)
- TCS: Based on purpose, PAN, and transaction amount
- Total INR: Sum of all charges + taxes

#### Form Flow & Validation

1. **Progressive Validation**: Each section validates before proceeding
2. **Cross-Section Dependencies**: Currency details depend on transaction details
3. **API Integration**: Real-time rate fetching and tax calculations
4. **Error Handling**: Comprehensive error messages and field-level feedback

#### Actions & Events

- **Save/Update**: Form submission with full validation
- **Cancel**: Confirmation dialog with data loss warning
- **Back**: Navigation with unsaved changes warning
- **PDF Export**: Transaction details download

### KYC Upload

#### Overview

Document upload and management system for Know Your Customer compliance.

#### Key Features

- **File Upload**: Multiple document types support
- **File Validation**: Size, type, and format checking
- **Preview**: Document preview before upload
- **Status Tracking**: Upload progress and verification status

#### Implementation

```typescript
// File upload with validation
const handleFileUpload = async (file: File) => {
  // Size validation (< 5MB)
  // Type validation (PDF, JPG, PNG)
  // API upload call
};
```

### Payment Status

#### Overview

Payment processing and challan upload management.

#### Key Features

- **Payment Tracking**: Real-time payment status updates
- **Challan Upload**: Payment proof document upload
- **Status Verification**: Automated status checking
- **Payment History**: Complete payment audit trail

### View All Transactions

#### Overview

Transaction dashboard with filtering, search, and export capabilities.

#### Key Features

- **Transaction List**: Paginated transaction display
- **Advanced Filtering**: Status, date, amount filters
- **Search Functionality**: Multi-field search
- **Export Options**: CSV/PDF export
- **Transaction Details**: Modal view with full information

---

## Form Management System

### Architecture

- **React Hook Form**: Core form management
- **Zod Schemas**: Type-safe validation
- **Controller Pattern**: Component integration

### Key Patterns

#### Schema Definition

```typescript
export const transactionBasicDetailsSchema = z.object({
  purpose: z.string().min(1, 'Purpose is required'),
  fx_currency: z.string().min(1, 'FX currency is required'),
  // ... more fields
});
```

#### Form Controller Usage

```typescript
<Controller
  name="purpose"
  control={control}
  render={({ field, fieldState }) => (
    <Select
      {...field}
      error={fieldState.error?.message}
    />
  )}
/>
```

#### Validation Integration

```typescript
const schema = transactionBasicDetailsSchema;
type FormData = z.infer<typeof schema>;

const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

### Conditional Rendering

- **Purpose-based Fields**: Education loan fields when purpose = 'education'
- **Country-based Fields**: Address fields based on country selection
- **Role-based Fields**: Different fields for different user roles

---

## API Integration Layer

### HTTP Client Configuration

```typescript
// Axios instance with interceptors
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for auth headers
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### React Query Integration

```typescript
// Query for currency rates
const { data: currencyRates } = useQuery({
  queryKey: ['currency-rates'],
  queryFn: fetchCurrencyRates,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Mutation for transaction creation
const createTransaction = useMutation({
  mutationFn: createTransactionAPI,
  onSuccess: () => {
    queryClient.invalidateQueries(['transactions']);
  },
});
```

### Key API Endpoints

- `GET /currency-rates`: Fetch available currencies
- `POST /transactions`: Create new transaction
- `POST /upload/kyc`: Upload KYC documents
- `POST /calculate/gst`: GST calculation
- `POST /calculate/tcs`: TCS calculation
- `GET /transactions`: Fetch transaction list

### Error Handling

- **Global Error Boundary**: Catches unhandled errors
- **API Error Handling**: Consistent error responses
- **Retry Logic**: Automatic retries for failed requests
- **User Feedback**: Toast notifications for success/error states

---

## UI Component Library

### Base Components (Shadcn/UI)

- **Button**: Variants (primary, secondary, outline, ghost)
- **Input**: Text inputs with validation states
- **Select**: Dropdown with search functionality
- **Dialog**: Modal dialogs for confirmations
- **Alert**: Status messages and notifications
- **Table**: Data tables with sorting and pagination

### Custom Components

#### ConfirmationAlert

```typescript
<ConfirmationAlert
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  onConfirm={handleConfirm}
>
  <Button>Confirm</Button>
</ConfirmationAlert>
```

#### GenericDialog

```typescript
<GenericDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Modal Title"
>
  <ModalContent />
</GenericDialog>
```

#### FormFieldRow

```typescript
<FormFieldRow rowCols={2}>
  <FieldWrapper>
    <InputField {...fieldProps} />
  </FieldWrapper>
</FormFieldRow>
```

### Component Patterns

- **Compound Components**: Related components grouped together
- **Render Props**: Flexible component APIs
- **Custom Hooks**: Reusable logic extraction
- **Higher-Order Components**: Cross-cutting concerns

---

## State Management

### Redux Store Structure

```typescript
interface RootState {
  auth: {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
  };
  ui: {
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
  };
}
```

### React Query Cache

- **Query Keys**: Hierarchical cache keys for efficient invalidation
- **Stale Time**: Cache duration configuration
- **Background Updates**: Automatic data refetching

### Local Component State

- **useState**: Simple state management
- **useReducer**: Complex state transitions
- **Custom Hooks**: Encapsulated stateful logic

---

## File Upload & Processing

### File Validation

```typescript
const validateFile = (file: File): boolean => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  return file.size <= maxSize && allowedTypes.includes(file.type);
};
```

### Upload Process

1. **Client-side Validation**: File type, size, format
2. **Progress Tracking**: Upload progress indication
3. **Error Handling**: Network errors, server validation
4. **Success Feedback**: Confirmation and status updates

### Supported Formats

- **Images**: JPG, PNG (max 5MB)
- **Documents**: PDF (max 10MB)
- **Spreadsheets**: XLSX (max 2MB)

---

## PDF Generation & Export

### jsPDF Integration

```typescript
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (data: TransactionData) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text('Transaction Details', 20, 20);

  // Add table
  doc.autoTable({
    head: [['Field', 'Value']],
    body: Object.entries(data),
    startY: 30,
  });

  // Download
  doc.save('transaction-details.pdf');
};
```

### Export Features

- **Transaction Details**: Complete transaction information
- **Rate Tables**: Currency conversion details
- **Payment Receipts**: Payment confirmation documents
- **Bulk Export**: Multiple transactions in single PDF

---

## Development Workflow

### Code Organization

1. **Feature-based Structure**: Group related code by business domain
2. **Component Hierarchy**: Atomic design principles
3. **Type Safety**: Comprehensive TypeScript usage
4. **Testing**: Unit and integration tests

### Best Practices

- **Consistent Naming**: Follow established conventions
- **Error Boundaries**: Graceful error handling
- **Performance**: Optimize renders and API calls
- **Accessibility**: WCAG compliance
- **Security**: Input validation and sanitization

### Maintenance Guidelines

- **Regular Updates**: Keep dependencies current
- **Code Reviews**: Peer review for quality
- **Documentation**: Update docs with changes
- **Monitoring**: Track performance and errors

---

## Recent Updates & Improvements (December 26, 2025)

### Confirmation Dialog Enhancements

#### Overview

Enhanced user experience with confirmation dialogs for critical actions to prevent accidental data loss and ensure user intent.

#### Implemented Changes

##### 1. Navigation Confirmation (`handleBack`)

**Location**: `currency-details.tsx`
**Purpose**: Prevent accidental navigation away from unsaved changes

**Implementation**:

```typescript
<ConfirmationAlert
  title="Go Back"
  description="Are you sure you want to go back? Any unsaved changes will be lost."
  onConfirm={handleBack}
>
  <Button type="button" variant="light">Back</Button>
</ConfirmationAlert>
```

##### 2. PDF Export Confirmation (`handleShareTransactionDetails`)

**Location**: `currency-details.tsx`
**Purpose**: Confirm before downloading transaction details PDF

**Implementation**:

```typescript
<ConfirmationAlert
  title="Share Transaction Details"
  description="Are you sure you want to download the PDF?"
  onConfirm={handleShareTransactionDetails}
>
  <Button type="button" variant="secondary">Share Transaction Details PDF</Button>
</ConfirmationAlert>
```

##### 3. Form Action Confirmations (Save/Update)

**Location**: `currency-details.tsx`
**Purpose**: Confirm before saving or updating transactions

**Implementation**:

```typescript
{viewMode ? (
  <ConfirmationAlert
    title="Update Transaction"
    description="Are you sure you want to update this transaction?"
    onConfirm={handleSave}
  >
    <Button variant="secondary" disabled={isSaving}>
      {isSaving ? 'Updating...' : 'Update'}
    </Button>
  </ConfirmationAlert>
) : (
  <ConfirmationAlert
    title="Save Transaction"
    description="Are you sure you want to save this transaction?"
    onConfirm={handleSave}
  >
    <Button variant="secondary" disabled={isSaving}>
      {isSaving ? 'Saving...' : 'Save'}
    </Button>
  </ConfirmationAlert>
)}
```

#### 4. UI Customization for Confirmation Dialogs

**Location**: `confirmation-alert.tsx`
**Changes**:

- Custom color for YES button: `#D71C57`
- Enhanced visual feedback for critical actions

**Implementation**:

```typescript
<AlertDialogAction
  onClick={onConfirm}
  disabled={isLoading}
  style={{ backgroundColor: '#D71C57' }}
>
  {isLoading ? 'Loading...' : 'YES'}
</AlertDialogAction>
```

### Form Validation Fixes

#### Source of Funds Validation Issue

**Problem**: `source_of_funds` field was marked as required but not properly validated due to conflicting Zod schema configuration.

**Root Cause**: Schema had `.or(z.literal(''))` which made the field optional despite `min(1)` validation.

**Solution**: Removed `.or(z.literal(''))` from the schema to enforce required validation.

**Location**: `transaction-basic-details.schema.ts`

**Before**:

```typescript
source_of_funds: z
  .string()
  .min(1, 'Source of funds is required')
  .or(z.literal('')), // This made it optional
```

**After**:

```typescript
source_of_funds: z
  .string()
  .min(1, 'Source of funds is required')
  .max(200, 'Description too long')
  .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Description cannot start with hyphen or space'),
```

#### Impact

- Form now properly validates `source_of_funds` as required
- Users cannot proceed without selecting a source of funds
- Consistent validation behavior across all required fields

### Testing Recommendations

#### Confirmation Dialog Testing

1. **Navigation Protection**: Verify back button shows confirmation when form has unsaved changes
2. **PDF Export**: Confirm dialog appears before PDF download
3. **Save/Update Actions**: Verify appropriate confirmation messages for create vs update modes
4. **Cancel Action**: Ensure existing cancel confirmation still works

#### Validation Testing

1. **Required Fields**: Test that `source_of_funds` cannot be empty
2. **Form Submission**: Verify validation prevents submission with missing required fields
3. **Error Messages**: Check that appropriate error messages display

#### UI Testing

1. **Custom Colors**: Verify YES button has correct color (#D71C57)
2. **Responsive Design**: Test dialogs work on different screen sizes
3. **Accessibility**: Ensure dialogs are keyboard accessible

---

**Knowledge Transfer Version**: 1.1
**Module Coverage**: Complete application breakdown + Recent Updates
**Prepared for**: Development and QA teams
**Last Updated**: December 26, 2025
