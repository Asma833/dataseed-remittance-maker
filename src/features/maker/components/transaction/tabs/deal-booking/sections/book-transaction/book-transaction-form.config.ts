import { FieldType } from "@/types/enums";

const bookTransactionConfig = {
  sectionTitle: 'Book Transaction',
  fields: {
     company_reference_number: {
      name:'company_reference_number',
      label: 'Company Reference Number',
      type: FieldType.Text,
      required: true,
      placeholder: 'Enter company reference number',
      options: {},
      isMulti: false,
    },
    purpose: {
      name:'purpose',
      label: 'Purpose',
      type: FieldType.Select,
      required: true,
      placeholder: 'Select Purpose',
      options: {
        personal: { label: 'Personal' },
        business: { label: 'Business' },
        education: { label: 'Education' },
        medical: { label: 'Medical' },
        travel: { label: 'Travel' },
      },
      isMulti: false,
    },
    fx_currency: {
      name:'fx_currency',
      label: 'Fx Currency',
      type: FieldType.Select,
      required: true,
      placeholder: 'Select Currency',
      options: {
        USD: { label: 'USD' },
        EUR: { label: 'EUR' },
        GBP: { label: 'GBP' },
        AUD: { label: 'AUD' },
        CAD: { label: 'CAD' },
      },
      isMulti: false,
    },
    fx_amount: {
      name:'fx_amount',
      label: 'Fx Amount',
      type: FieldType.Number,
      required: false,
      placeholder: 'Enter Fx Amount',
    },
    company_settlement_rate: {
      name:'company_settlement_rate',
      label: 'Company Settlement Rate',
      type: FieldType.Number,
      required: false,
      placeholder: 'Enter Settlement Rate',
    },
    add_margins: {
      name:'add_margins',
      label: 'Add Margins',
      type: FieldType.Number,
      required: false,
      placeholder: 'Enter Margins',
    },
    customer_rate: {
      name:'customer_rate',
      label: 'Customer Rate',
      type: FieldType.Number,
      required: false,
      placeholder: 'Customer Rate',
      readOnly: true,
    },
    nostro_charges: {
      name:'nostro_charges',
      label: 'Nostro Charges',
      type: FieldType.Select,
      required: false,
      placeholder: 'Select Nostro Charges',
      options: {
        BEN: { label: 'BEN' },
        OUR: { label: 'OUR' }
      }
    },
  },
};

export default bookTransactionConfig;