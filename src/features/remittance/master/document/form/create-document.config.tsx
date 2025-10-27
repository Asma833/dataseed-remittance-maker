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
    is_mandatory: {
      name: 'code',
      label: '',
      type: FieldType.Checkbox,
      options:{
        is_required:{label:'Mandatory'},
        is_backrequired:{label:'Back Required'},
      },
      isMuti:true,
      required: true,
    },
    
  },
};
