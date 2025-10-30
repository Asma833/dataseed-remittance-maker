import { FieldType } from '@/types/enums';

export const DocumentFormConfig = {
  title: 'Document Master',
  description: 'Manage documents for the application',
  fields: {
    name: {
      name: 'name',
      label: 'Document Name',
      type: FieldType.Text,
      placeholder: 'Enter document name',
      required: true,
    },

    code: {
      name: 'code',
      label: 'Document Code',
      type: FieldType.Text,
      placeholder: 'Enter document code',
      required: true,
    },
    is_required: {
      name: 'is_required',
      label: '',
      type: FieldType.Checkbox,
      options: {
        is_required: { label: 'Mandatory' },
      },
      required: false,
    },
    is_back_required: {
      name: 'is_back_required',
      label: '',
      type: FieldType.Checkbox,
      options: {
        is_back_required: { label: 'Back Required' },
      },
      required: false,
    },
  },
};
