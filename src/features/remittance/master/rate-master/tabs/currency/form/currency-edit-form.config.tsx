import { FieldType } from '@/types/enums';

export const currencyEditFormConfig = () => {
  return {
    fields: {
      currency: {
        name: 'currency',
        label: 'Currency',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Currency',
      },
      ttMargin10_12: {
        name: 'ttMargin10_12',
        label: 'TT Margin 10-12',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter TT Margin 10-12',
      },
      ttMargin12_02: {
        name: 'ttMargin12_02',
        label: 'TT Margin 12-02',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter TT Margin 12-02',
      },
      ttMargin02_3_30: {
        name: 'ttMargin02_3_30',
        label: 'TT Margin 02-3:30',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter TT Margin 02-3:30',
      },
      ttMargin03_30end: {
        name: 'ttMargin03_30end',
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
