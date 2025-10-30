import { FieldType } from '@/types/enums';

export const cardEditFormConfig = () => {
  return {
    fields: {
      currency: {
        name: 'currency',
        label: 'Currency',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Currency',
      },
      working_10_12: {
        name: 'working_10_12',
        label: 'Working 10-12',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Working 10-12',
      },
      working_12_02: {
        name: 'working_12_02',
        label: 'Working 12-02',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Working 12-02',
      },
      working_02_3_30: {
        name: 'working_02_3_30',
        label: 'Working 02-3:30',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Working 02-3:30',
      },
      workingEnd: {
        name: 'workingEnd',
        label: 'Working End',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Working End',
      },
      ttHolidayMargin: {
        name: 'ttHolidayMargin',
        label: 'TT Holiday Margin',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter TT Holiday Margin',
      },
      ttweekendMargin: {
        name: 'ttweekendMargin',
        label: 'TT Weekend Margin',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter TT Weekend Margin',
      },
      upperCircuit: {
        name: 'upperCircuit',
        label: 'Upper Circuit',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Upper Circuit',
      },
    },
  };
};
