import { FieldType } from "@/types/enums";

export const currencyDetailsConfig = [
  {
    name:'fx_currency',
    label: 'FX Currency',
    type: FieldType.Select,
    placeholder: 'Select FX Currency',
    required: false,
  },
  {
    name:'fx_amount',
    label: 'FX Amount',
    type: FieldType.Number,
    placeholder: 'Enter FX Amount',
    required: false,
  },
  {
    name:'settlement_rate',
    label: 'Settlement Rate',
    type: FieldType.Number,
    placeholder: 'Enter Settlement Rate',
    required: false,
  },
  {
    name:'add_margin',
    label: 'Add Margin',
    type: FieldType.Number,
    placeholder: 'Enter Add Margin',
    required: false,
  },
  {
    name:'customer_rate',
    label: 'Customer Rate',
    type: FieldType.Number,
    placeholder: 'Enter Customer Rate',
    required: false,
  },
  {
    name:'declared_education_loan_amount',
    label: 'Declared Education Loan Amount',
    type: FieldType.Number,
    placeholder: 'Enter Declared Education Loan Amount',
    required: false,
  },
  {
    name:'previous_transaction_amount',
    label: 'Previous Transaction Amount',
    type: FieldType.Number,
    placeholder: 'Enter Previous Transaction Amount',
    required: false,
  },
  {
    name:'declared_previous_amount',
    label: 'Declared Previous Amount',
    type: FieldType.Number,
    placeholder: 'Enter Declared Previous Amount',
    required: false,
  },
  {
    name:'total_transaction_amount_tcs',
    label: 'Total Transaction Amount (TCS)',
    type: FieldType.Number,
    placeholder: 'Enter Total Transaction Amount (TCS)',
    required: false,
  }
];
