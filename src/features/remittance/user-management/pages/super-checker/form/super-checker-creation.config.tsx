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
          placeholder: 'Enter Phone Number',
        },
        productType:{
          name: 'checkerDetails.productType',
          label: 'Product Type',
          type: FieldType.Checkbox,
          required: true,
          options: {
            'card': { label: 'Card' },
            'currency': { label: 'Currency' },
            'remittance': { label: 'Remittance', checked: true },
            'referral': { label: 'Referral' },
          },
          variant: 'circle_check',
          isMulti: true,
          defaultSelected: { 'card': true }
        },
        transactionType:{
          name: 'checkerDetails.transactionType',
          label: '',
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
        agents:{
          name: 'checkerDetails.agents',
          label: 'Agents',
          type: FieldType.Select,
          required: true,
          options: [
            { value: 'agent1', label: 'Agent 1' },
            { value: 'agent2', label: 'Agent 2' },
            { value: 'agent3', label: 'Agent 3' }
          ],
          placeholder: 'Select agents',
          isMulti: true
        },
        password:{
          name: 'checkerDetails.password',
          label: 'Password',
          type: FieldType.Password,
          required:true,
          placeholder: 'Enter Password',
        },
          confirmPassword:{
          name: 'checkerDetails.confirmPassword',
          label: 'Confirm Password',
          type: FieldType.Password,
          required:true,
          placeholder: 'Enter Confirm Password',
        }
      },
    },
  };
}
