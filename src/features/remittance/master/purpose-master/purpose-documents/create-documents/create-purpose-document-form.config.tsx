import { FieldType } from '@/types/common.type';

export const PurposeDocumentFormConfig = {
  sectionTitle: 'Create Document',
  fields: {
    documentName: {
      label: 'Document Name',
      type: FieldType.Text,
      required: true,
      placeholder: 'Enter Document Name',
    },
    documentStatus: {
      label: 'Document Name',
      type: FieldType.Checkbox,
      placeholder: '',
      options: {
        card: { label: 'Mandatory', checked: true },
        remittance: { label: 'Non Mandatory', checked: false },
      },
      isMulti: false,
    },
  },
};
