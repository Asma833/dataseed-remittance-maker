import { FieldType } from '@/types/enums';

export const branchAgentCreationConfig = () => {
  return {
    sectionTitle: 'Branch Agent Creation',
    description: 'Fill in the details to create a new branch agent',
    fields: {
      agentDetails: {
        vendorName: {
          name: 'agentDetails.vendorName',
          label: 'Vendor Name',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Vendor Name',
        },
        vendorCode: {
          name: 'agentDetails.vendorCode',
          label: 'Vendor Code',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Vendor Code',
        },
        fullName: {
          name: 'agentDetails.fullName',
          label: 'Full Name',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Full Name',
        },
        emailId: {
          name: 'agentDetails.emailId',
          label: 'Email ID',
          type: FieldType.Email,
          required: true,
          placeholder: 'Enter Email ID',
        },
        mobileNo: {
          name: 'agentDetails.mobileNo',
          label: 'Mobile No',
          type: FieldType.Phone,
          required: true,
          placeholder: 'Enter Mobile Number',
        },
        state: {
          name: 'agentDetails.state',
          label: 'State',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter State',
        },
        city: {
          name: 'agentDetails.city',
          label: 'City',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter City',
        },
        branch: {
          name: 'agentDetails.branch',
          label: 'Branch',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Branch',
        },
        role: {
          name: 'agentDetails.role',
          label: 'Role',
          type: FieldType.Radio,
          required: true,
          options: {
            'maker': { label: 'Maker' },
            'checker': { label: 'Checker', checked: true }
          }
        },
        checkerList: {
          name: 'agentDetails.checkerList',
          label: 'Checker List',
          type: FieldType.Select,
          required: true,
          placeholder: 'Select Checker',
          options: [
            { value: 'checker1', label: 'Checker 1' },
            { value: 'checker2', label: 'Checker 2' },
            { value: 'checker3', label: 'Checker 3' },
          ]
        },
      },
    },
  };
};
     