import { FieldType } from '@/types/enums';

export const holidayEditFormConfig = () => {
  return {
    fields: {
      year: {
        name: 'year',
        label: 'Year',
        type: FieldType.Select,
        required: true,
        placeholder: 'Enter Year',
        options: {},
      },
      date: {
        name: 'date',
        label: 'Date',
        type: FieldType.Date,
        required: true,
        placeholder: 'Select Date',
      },
      holidayName: {
        name: 'holidayName',
        label: 'Holiday Name',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Holiday Name',
      },
    },
  };
};