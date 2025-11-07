import { FieldType } from "@/types/enums";

const bookTransactionConfig = {
  sectionTitle: 'Book Transaction',
  fields: {
    purpose: {
      name:'purpose',
      label: 'Purpose',
      type: FieldType.Select,
      required: true,
      placeholder: 'Select Purpose',
      options: {},
      isMulti: false,
    },
    fx_currency: {
      name:'fx_currency',
      label: 'Fx Currency',
      type: FieldType.Select,
      required: true,
      placeholder: 'Select Currency',
      options: {},
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