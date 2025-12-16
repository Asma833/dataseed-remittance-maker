# Required Fields for Create Transaction Form

## Beneficiary Details

- `beneficiary_name`, `beneficiary_address`, `beneficiary_city`, `beneficiary_country`, `beneficiary_account_number_iban_number`, `beneficiary_swift_code`, `beneficiary_bank_name`, `beneficiary_bank_address`, `sort_bsb_aba_transit_code`, `nostro_charges`, and `message_to_beneficiary_additional_information` are mandated by [`beneficiary-details.schema.ts`](src/features/maker/components/transaction/tabs/create-transactions-tab/create-transaction-form/form/form-sections/beneficiary-details/beneficiary-details.schema.ts:6-96).
- Intermediary bank inputs become required when the radio is toggled to “Yes”, enforced via the schema’s chained `.refine` rules; all four intermediary fields must be filled in that case.

## Transaction Details

- `passport_number` is now rendered in [`transaction-basic-details.tsx`](src/features/maker/components/transaction/tabs/create-transactions-tab/create-transaction-form/form/form-sections/transaction-details/transaction-basic-details.tsx:91-117) alongside the passport dates and place of issue, matching the validation defined in [`transaction-basic-details.schema.ts`](src/features/maker/components/transaction/tabs/create-transactions-tab/create-transaction-form/form/form-sections/transaction-details/transaction-basic-details.schema.ts:114-169).
- Other mandatory fields in this section include `applicant_address`, `applicant_city`, `applicant_state`, `applicant_country`, and `postal_code`, all of which already appear in the form and are enforced by the schema.

## Currency Details

- Every field listed in [`currency-details.config.tsx`](src/features/maker/components/transaction/tabs/create-transactions-tab/create-transaction-form/form/form-sections/currency-details/currency-details.config.tsx:3-67) is marked as required and validated by [`currency-details.schema.ts`](src/features/maker/components/transaction/tabs/create-transactions-tab/create-transaction-form/form/form-sections/currency-details/currency-details.schema.ts:5-68). That includes the `FX` fields plus the nested `invoiceRateTable` entries; these are populated either by the rate table defaults or by user input.

## Submission Flow

- Clicking **Save** in the Beneficiary section validates that panel via `trigger()` and then `requestSubmit()` is invoked on the root form (`id="create-transaction-form"` in [`create-transaction-form.tsx`](src/features/maker/components/transaction/tabs/create-transactions-tab/create-transaction-form/form/create-transaction-form.tsx:406)), so a successful save now submits through the existing API handler rather than a dummy timeout.
- Ensure all required fields across validated sections are filled before submit to allow the API call in `CreateTransactionForm.handleSubmit` to execute without Zod validation errors.
