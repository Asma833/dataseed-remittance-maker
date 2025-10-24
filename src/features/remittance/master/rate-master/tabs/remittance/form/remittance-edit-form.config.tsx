import { FieldType } from '@/types/enums';

export const remittanceEditFormConfig = () => {
  return {
    fields: {
      marginType: {
        name: 'marginType',
        label: 'Margin Type',
        type: FieldType.Select,
        required: true,
        placeholder: 'Select Margin Type',
        options: [
          { label: 'Number', value: 'number' },
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
        placeholder: 'Enter TT Margin 10-12',
      },
      'ttMargin12-02': {
        name: 'ttMargin12-02',
        label: 'TT Margin 12-02',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter TT Margin 12-02',
      },
      'ttMargin02-3-30': {
        name: 'ttMargin02-3-30',
        label: 'TT Margin 02-3:30',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter TT Margin 02-3:30',
      },
      'ttMargin03-30end': {
        name: 'ttMargin03-30end',
        label: 'TT Margin 03-30 End',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter TT Margin 03-30 End',
      },
      ttHolidayMargin: {
        name: 'ttHolidayMargin',
        label: 'TT Holiday Margin',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter TT Holiday Margin',
      },
      ttWeekendMargin: {
        name: 'ttWeekendMargin',
        label: 'TT Weekend Margin',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter TT Weekend Margin',
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