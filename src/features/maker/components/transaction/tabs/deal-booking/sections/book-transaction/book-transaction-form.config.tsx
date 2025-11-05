import { FieldType } from "@/types/enums";


export const bookTransactionConfig = {
  sectionTitle: 'Book Transaction',
  fields: {
    transactionType: {
      name:'transactionType',
      label: 'Transaction Type',
      type: FieldType.Select,
      required: true,
      placeholder: 'Select Transaction Type',
      options: {
        inward_remittance: { label: 'Inward Remittance' },
        outward_remittance: { label: 'Outward Remittance' },
      },
      isMulti: false,
    },
    purpose: {
      name:'purpose',
      label: 'Purpose',
      type: FieldType.Select,
      required: true,
      placeholder: 'Select Purpose',
      options: {
        education_fee: { label: 'Education Fee' },
        medical_treatment: { label: 'Medical Treatment' },
        family_maintenance: { label: 'Family Maintenance' },
        business_travel: { label: 'Business Travel' },
        investment: { label: 'Investment' },
      },
      isMulti: false,
    },
    fxCurrency: {
      name:'fxCurrency',
      label: 'Fx Currency',
      type: FieldType.Select,
      required: true,
      placeholder: 'Select Currency',
      options: {
        USD: { label: 'USD - United States Dollar' },
        EUR: { label: 'EUR - Euro' },
        GBP: { label: 'GBP - British Pound' },
        AUD: { label: 'AUD - Australian Dollar' },
        CAD: { label: 'CAD - Canadian Dollar' },
      },
      isMulti: false,
    },
    fxAmount: {
      name:'fxAmount',
      label: 'Fx Amount',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Fx Amount',
    },
    niumSettlementRate: {
      name:'niumSettlementRate',
      label: 'Nium Settlement Rate',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Settlement Rate',
    },
    addMargins: {
      name:'addMargins',
      label: 'Add Margins',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Margins',
      validation: {
        pattern: {
          value: /^[0-9]*\.?[0-9]*$/,
          message: 'Please enter a valid margin',
        },
        max: {
          value: 100,
          message: 'Margin cannot exceed 100%',
        },
        min: {
          value: 0,
          message: 'Margin cannot be negative',
        },
      },
    },
    customerRate: {
      name:'customerRate',
      label: 'Customer Rate',
      type: FieldType.Text,
      required: false,
      placeholder: 'Customer Rate',
      readOnly: true,
      validation: {
        pattern: {
          value: /^[0-9]*\.?[0-9]*$/,
          message: 'Please enter a valid rate',
        },
      },
    },
    nostroCharges: {
      name:'nostroCharges',
      label: 'Nostro Charges',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Nostro Charges',
      validation: {
        pattern: {
          value: /^[0-9]*\.?[0-9]*$/,
          message: 'Please enter a valid amount',
        },
        min: {
          value: 0,
          message: 'Charges cannot be negative',
        },
      },
    },
  },
};

export default bookTransactionConfig;
