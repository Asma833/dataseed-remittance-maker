import { FieldType } from '@/types/enums';

const paymentsFormConfig = {
  fields: {
    paymentMethod: {
      type: FieldType.Checkbox,
      label: 'Payment Method',
      required: true,
      options: {
        bank: { label: 'Payment Via Bank Transfer / Online' },
        paymentLink: { label: 'Generate Payment Link - API for Online Payment' },
      },
      isMulti: false,
    },
    fileUpload: {
      type: FieldType.FileUploadWithOutView,
      label: 'For Bank Transfer Upload Screenshot',
      required: true,
      placeholder: 'Upload Payment Receipt',
      validation: {
        validate: (value: string) => {
          if (!value || value.length === 0) {
            return 'Payment receipt is required';
          }
          return true;
        },
      },
    },
  },
};

export default paymentsFormConfig;
