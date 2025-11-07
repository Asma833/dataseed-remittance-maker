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
    fxCurrency: {
      name:'fxCurrency',
      label: 'Fx Currency',
      type: FieldType.Select,
      required: true,
      placeholder: 'Select Currency',
      options: {},
      isMulti: false,
    },
    fxAmount: {
      name:'fxAmount',
      label: 'Fx Amount',
      type: FieldType.Number,
      required: false,
      placeholder: 'Enter Fx Amount',
    },
    companySettlementRate: {
      name:'companySettlementRate',
      label: 'Company Settlement Rate',
      type: FieldType.Number,
      required: false,
      placeholder: 'Enter Settlement Rate',
    },
    addMargins: {
      name:'addMargins',
      label: 'Add Margins',
      type: FieldType.Number,
      required: false,
      placeholder: 'Enter Margins',
    },
    customerRate: {
      name:'customerRate',
      label: 'Customer Rate',
      type: FieldType.Number,
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
        OUR: { label: 'OUR' }
      }
    },
  },
};

export default bookTransactionConfig;