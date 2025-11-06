import { FieldType } from "@/types/enums";


export const bookTransactionConfig = {
  sectionTitle: 'Book Transaction',
  fields: {
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
    companySettlementRate: {
      name:'companySettlementRate',
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
    },
    customerRate: {
      name:'customerRate',
      label: 'Customer Rate',
      type: FieldType.Text,
      required: false,
      placeholder: 'Customer Rate',
      readOnly: true,
    },
    nostroCharges: {
      name:'nostroCharges',
      label: 'Nostro Charges',
      type: FieldType.Select,
      required: false,
      placeholder: 'Select Nostro Charges',
      options: {
        BEN: { label: 'BEN' },
        OUR: { label: 'OUR' },
      }
    },
  },
};

export default bookTransactionConfig;
