import { FieldType } from '@/types/enums';

export const superCheckerCreationConfig = () => {
    return {
    sectionTitle: 'Super Checker Creation',
    description: 'Fill in the details to create a new super checker',
    fields: {
      checkerDetails: {
        fullName: {
          name: 'checkerDetails.fullName',
          label: 'Full Name',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Full Name',
        },
        email: {
          name: 'checkerDetails.email',
          label: 'Email Address',
          type: FieldType.Email,
          required: true,
          placeholder: 'Enter Email Address',
        },
        phoneNumber: {
          name: 'checkerDetails.phoneNumber',
          label: 'Phone Number',
          type: FieldType.Phone,
          required: true,
          placeholder: 'Enter Phone Number',
        },
        location: {
          name: 'checkerDetails.location',
          label: 'Location',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Location',
        },
        productType:{
          name: 'checkerDetails.productType',
          label: 'Product Type',
          type: FieldType.Radio,
          required: true,
          options: {
            'cnc': { label: 'CNC' },
            'remittance': { label: 'Remittance', checked: true }
          }
        },
        transactionType:{
          name: 'checkerDetails.transactionType',
          label: 'Transaction Type',
          type: FieldType.Checkbox,
          required: true,
          options: {
            'buy': { label: 'Buy', checked: true },
            'sell': { label: 'Sell' }
          },
          variant: 'circle_check',
          isMulti: false,
          defaultSelected: { 'buy': true }
        },
        status: {
          name: 'checkerDetails.status',
          label: 'Status',
          type: FieldType.Radio,
          required: true,
          options: {
            'active': { label: 'Active', checked: true },
            'inactive': { label: 'Inactive' }
          }
        },
      },
    },
  };
}
