import { FieldType } from "@/types/enums";

const paymentsFormConfig = {
  fields: {
    paymentMethod: {
      type: FieldType.Checkbox,
      label: 'Payment',
      required: true,
         options: {
            true: { label: 'Payment Via Bank Transfer / Online' },
            false: { label: 'Generate Payment Link - API for Online Payment' },
          },
          isMulti:false
    },
    fileUpload :{
        type: FieldType.FileUploadWithButton,
        label: 'Choose file',
        required: false,
        placeholder: 'Upload Payment Receipt',
        validation: {
            validate: (value:string) => {
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
