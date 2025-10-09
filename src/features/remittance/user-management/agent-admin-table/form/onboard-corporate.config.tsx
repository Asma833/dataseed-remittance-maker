import { FieldType } from '@/types/enums';

export const onboardCorporateConfig = () => {
  return {
    fields: {
      entityName: {
        name: 'entityName',
        label: 'Entity Name',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Entity Name (e.g., ABC Corporation)',
      },
      panNumber: {
        name: 'panNumber',
        label: 'PAN Number',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter PAN Number (e.g., ABCDE1234F)',
      },
      dateOfIncorporation: {
        name: 'dateOfIncorporation',
        label: 'Date of Incorporation',
        type: FieldType.Date,
        required: true,
        placeholder: 'Select Date of Incorporation',
      },
      entityType: {
        name: 'entityType',
        label: 'Entity Type',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Entity Type (e.g., Private Limited)',
      },
      cin: {
        name: 'cin',
        label: 'CIN',
        type: FieldType.Text,
        placeholder: 'Enter CIN (e.g., U12345MH2020PTC123456)',
      },
      address: {
        name: 'address',
        label: 'Address',
        type: FieldType.TextArea,
        placeholder: 'Enter Complete Address',
      },
    },
  };
};