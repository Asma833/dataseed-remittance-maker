import { FieldType } from '@/types/enums';

export const holidayFormConfig = {
  sectionTitle: 'Create Holiday',
  fields: {
    year: {
      label: 'Year',
      type: FieldType.Select,
      required: true,
      placeholder: 'Enter Year',
      options: {},
    },
    date: {
      label: 'Date',
      type: FieldType.Date,
      required: true,
      placeholder: 'Select Date',
    },
    holidayName: {
      label: 'Holiday Name',
      type: FieldType.Text,
      required: true,
      placeholder: 'Enter Holiday Name',
    },
  },
};
