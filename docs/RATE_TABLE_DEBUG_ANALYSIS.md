# Rate Table Debug Analysis - agent_mark_up Pre-population Issue

## Problem Statement
The `agent_mark_up` fields in the rate table are not being pre-populated with the `add_margin` value from `transactionDetails`.

## Data Flow Analysis

### Step 1: User Input
User enters `add_margin` value in Transaction Details tab:
- Field: `transactionDetails.add_margin`
- Location: [`transaction-basic-details.tsx`](../src/features/maker/components/transaction/tabs/create-transactions-tab/create-transaction-form/form/form-sections/transaction-details/transaction-basic-details.tsx)

### Step 2: Watch in Currency Details
Currency Details component watches the value:
```typescript
const addMargin = useWatch({ control, name: 'transactionDetails.add_margin' });
```
- Location: [`currency-details.tsx:44`](../src/features/maker/components/transaction/tabs/create-transactions-tab/create-transaction-form/form/form-sections/currency-details/currency-details.tsx:44)

### Step 3: Set Value via useEffect
When `addMargin` changes, useEffect should set the values:
```typescript
useEffect(() => {
  if (addMargin != null && !isNaN(Number(addMargin))) {
    setValue('currencyDetails.add_margin', addMargin, { shouldValidate: false, shouldDirty: false });
    // Set agent_mark_up fields
    setValue('currencyDetails.invoiceRateTable.transaction_value.agent_mark_up', Number(addMargin), { shouldValidate: false, shouldDirty: false });
    setValue('currencyDetails.invoiceRateTable.remittance_charges.agent_mark_up', Number(addMargin), { shouldValidate: false, shouldDirty: false });
    setValue('currencyDetails.invoiceRateTable.nostro_charges.agent_mark_up', Number(addMargin), { shouldValidate: false, shouldDirty: false });
    setValue('currencyDetails.invoiceRateTable.other_charges.agent_mark_up', Number(addMargin), { shouldValidate: false, shouldDirty: false });
  }
}, [addMargin, setValue]);
```
- Location: [`currency-details.tsx:88-97`](../src/features/maker/components/transaction/tabs/create-transactions-tab/create-transaction-form/form/form-sections/currency-details/currency-details.tsx:88-97)

### Step 4: Rate Table Rendering
Rate table receives `invoiceData` prop:
```typescript
<RateTable
  id={'currencyDetails.invoiceRateTable'}
  mode={'edit'}
  totalAmount={totalInrAmount || 0}
  editableFields={['transactionValue.agent_mark_up', 'remittanceCharges.agent_mark_up', 'nostroCharges.agent_mark_up', 'otherCharges.agent_mark_up']}
  invoiceData={invoiceRateTable}
/>
```
- Location: [`currency-details.tsx:242-248`](../src/features/maker/components/transaction/tabs/create-transactions-tab/create-transaction-form/form/form-sections/currency-details/currency-details.tsx:242-248)

### Step 5: Field Rendering
Rate table columns render the fields:
```typescript
const getCellContent = (section: string, columnKey: 'companyRate' | 'agentMarkUp' | 'rate') => {
  const mappedSection = fieldMappings[section] || section;
  const mappedKey = valueMappings[columnKey] || columnKey;
  const fieldPath = `${id}.${mappedSection}.${mappedKey}`;
  const relativePath = fieldPath.replace(`${id}.`, '');
  const isEditable = editableFields.includes(relativePath);
  if (isEditable) {
    return getFormField(fieldPath);
  } else {
    const dataKey = valueMappings[columnKey] || columnKey;
    const value = invoiceData?.[section]?.[dataKey] ?? 0;
    return <span className="text-right">{value}</span>;
  }
};
```
- Location: [`rate-table-columns.tsx:59-72`](../src/features/maker/components/rate-table/rate-table-columns.tsx:59-72)

## Field Path Mapping

### For transaction_value.agent_mark_up:

1. **Section**: `transaction_value`
2. **Column Key**: `agentMarkUp`
3. **Mapped Section**: `transactionValue` (via fieldMappings)
4. **Mapped Key**: `agent_mark_up` (via valueMappings)
5. **Field Path**: `currencyDetails.invoiceRateTable.transactionValue.agent_mark_up`
6. **Relative Path**: `transactionValue.agent_mark_up`
7. **Is Editable**: YES (in editableFields array)
8. **Renders**: Form field via `getFormField()`

## Potential Issues

### Issue 1: Field Path Mismatch
The form field path constructed is:
```
currencyDetails.invoiceRateTable.transactionValue.agent_mark_up
```

But the setValue is setting:
```
currencyDetails.invoiceRateTable.transaction_value.agent_mark_up
```

**MISMATCH**: `transactionValue` vs `transaction_value`

### Issue 2: Schema Field Names
The schema uses:
```typescript
invoiceRateTable: z.object({
  transaction_value: z.object({  // ← snake_case
    agent_mark_up: z.coerce.number(),
  }),
  ...
})
```

### Issue 3: Field Mappings
The `fieldMappings` object converts:
```typescript
const fieldMappings: Record<string, string> = {
  transaction_value: 'transactionValue',  // ← Converts to camelCase
  ...
};
```

## Root Cause

The issue is that:
1. The form schema uses `transaction_value` (snake_case)
2. The setValue calls use `transaction_value` (snake_case)
3. But the rate table field rendering converts it to `transactionValue` (camelCase)
4. This creates a mismatch between where the value is set and where it's read

## Solution

We need to ensure consistency. Since the schema uses `transaction_value`, we should:

**Option 1**: Remove the field mapping conversion (use snake_case throughout)
**Option 2**: Update setValue calls to use camelCase after the mapping

**Recommended**: Option 1 - Remove the camelCase conversion to maintain consistency with the schema.

## Files to Fix

1. **rate-table-columns.tsx** - Remove or fix fieldMappings
2. **Verify** currency-details.tsx setValue calls match the actual form field paths

## Testing Checklist

After fix:
- [ ] Enter add_margin value in Transaction Details
- [ ] Navigate to Currency Details
- [ ] Verify agent_mark_up fields show the value
- [ ] Verify fields are editable
- [ ] Modify agent_mark_up and verify rate updates
- [ ] Submit form and verify data structure is correct
