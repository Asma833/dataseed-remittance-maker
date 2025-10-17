import { FieldType } from '@/types/enums';

export const remittanceEditFormConfig = (displayMode: 'inr' | 'percentage' = 'inr') => {
  return {
    fields: {
      currencyType: {
        name: 'currencyType',
        label: 'Currency Type',
        type: FieldType.Select,
        required: true,
        placeholder: 'Select Currency Type',
        options: [
          { label: 'INR', value: 'inr' },
          { label: 'Percentage', value: 'percentage' },
        ],
      },
      currency: {
        name: 'currency',
        label: 'Currency',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Currency',
      },
      'ttMargin10-12': {
        name: 'ttMargin10-12',
        label: 'TT Margin 10-12',
        type: FieldType.Text,
        required: true,
        placeholder: displayMode === 'percentage' ? 'Enter TT Margin 10-12 (%)' : 'Enter TT Margin 10-12 (INR)',
        suffix: displayMode === 'percentage' ? '%' : '₹',
      },
      'ttMargin12-02': {
        name: 'ttMargin12-02',
        label: 'TT Margin 12-02',
        type: FieldType.Text,
        required: true,
        placeholder: displayMode === 'percentage' ? 'Enter TT Margin 12-02 (%)' : 'Enter TT Margin 12-02 (INR)',
        suffix: displayMode === 'percentage' ? '%' : '₹',
      },
      'ttMargin02-3-30': {
        name: 'ttMargin02-3-30',
        label: 'TT Margin 02-3:30',
        type: FieldType.Text,
        required: true,
        placeholder: displayMode === 'percentage' ? 'Enter TT Margin 02-3:30 (%)' : 'Enter TT Margin 02-3:30 (INR)',
        suffix: displayMode === 'percentage' ? '%' : '₹',
      },
      'ttMargin03-30end': {
        name: 'ttMargin03-30end',
        label: 'TT Margin 03-30 End',
        type: FieldType.Text,
        required: true,
        placeholder: displayMode === 'percentage' ? 'Enter TT Margin 03-30 End (%)' : 'Enter TT Margin 03-30 End (INR)',
        suffix: displayMode === 'percentage' ? '%' : '₹',
      },
      ttHolidayMargin: {
        name: 'ttHolidayMargin',
        label: 'TT Holiday Margin',
        type: FieldType.Text,
        required: true,
        placeholder: displayMode === 'percentage' ? 'Enter TT Holiday Margin (%)' : 'Enter TT Holiday Margin (INR)',
        suffix: displayMode === 'percentage' ? '%' : '₹',
      },
      ttWeekendMargin: {
        name: 'ttWeekendMargin',
        label: 'TT Weekend Margin',
        type: FieldType.Text,
        required: true,
        placeholder: displayMode === 'percentage' ? 'Enter TT Weekend Margin (%)' : 'Enter TT Weekend Margin (INR)',
        suffix: displayMode === 'percentage' ? '%' : '₹',
      },
      ttUpperCircuit: {
        name: 'ttUpperCircuit',
        label: 'TT Upper Circuit',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter TT Upper Circuit',
      },
    },
  };
};