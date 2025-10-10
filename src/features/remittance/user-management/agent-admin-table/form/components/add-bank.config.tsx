import { FieldType } from '@/types/enums';

export const addBankConfig = () => {
  return {
    fields: {
      bankName: {
        name: 'bankName',
        label: 'Bank Name',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Bank Name',
      },
      branchName: {
        name: 'branchName',
        label: 'Branch Name',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Branch Name (e.g., Main Branch)',
      },
      accountHolder: {
        name: 'accountHolder',
        label: 'Account Holder Name',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Account Holder Name',
      },
      accountNumber: {
        name: 'accountNumber',
        label: 'Account Number',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter Account Number',
      },
      ifscCode: {
        name: 'ifscCode',
        label: 'IFSC Code',
        type: FieldType.Text,
        required: true,
        placeholder: 'Enter IFSC Code (e.g., SBIN0001234)',
      },
    },
  };
};