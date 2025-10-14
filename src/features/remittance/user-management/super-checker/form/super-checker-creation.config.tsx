import { FieldType } from '@/types/enums';
import { Agent } from '../../api/agents';

export const superCheckerCreationConfig = (agents: Agent[] = []) => {
  // Transform agents data to select options format
  // value = agent_code (sent to backend as ID), label = agent_name (displayed in UI)
  const agentOptions = agents.map((agent) => ({
    value: agent.id, // This is the ID that will be sent to backend
    label: agent.agent_name, // This is what user sees in the dropdown
  }));

  return {
    sectionTitle: 'Super Checker Creation',
    description: 'Fill in the details to create a new super checker',
    fields: {
      checkerDetails: {
        fullName: {
          id: 'checkerDetails.fullName',
          name: 'checkerDetails.fullName',
          label: 'Full Name',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Full Name',
          autocomplete: 'name',
        },
        email: {
          id: 'checkerDetails.email',
          name: 'checkerDetails.email',
          label: 'Email Address',
          type: FieldType.Email,
          required: true,
          placeholder: 'Enter Email Address',
          autocomplete: 'email',
        },
        phoneNumber: {
          id: 'checkerDetails.phoneNumber',
          name: 'checkerDetails.phoneNumber',
          label: 'Phone Number',
          type: FieldType.Phone,
          placeholder: 'Enter Phone Number',
          autocomplete: 'tel',
        },
        productType: {
          id: 'checkerDetails.productType',
          name: 'checkerDetails.productType',
          label: 'Product Type',
          type: FieldType.Checkbox,
          required: true,
          options: {
            card: { label: 'Card' },
            currency: { label: 'Currency' },
            remittance: { label: 'Remittance' },
            referral: { label: 'Referral' },
          },
          orientation:"vertical",
          variant: 'circle_check_filled',
          isMulti: true,
        },
        status: {
          name: 'checkerDetails.status',
          label: 'Status',
          type: FieldType.Radio,
          required: true,
          options: {
            active: { label: 'Active', checked: true },
            inactive: { label: 'Inactive' },
            blocked:{ label: 'Blocked' }
          },
        },
        agents: {
          id: 'checkerDetails.agents',
          name: 'checkerDetails.agents',
          label: 'Agents',
          type: FieldType.Select,
          required: true,
          options: agentOptions,
          placeholder: agentOptions.length > 0 ? 'Select agents' : 'Loading agents...',
          isMulti: true,
        },
        password: {
          id: 'checkerDetails.password',
          name: 'checkerDetails.password',
          label: 'Password',
          type: FieldType.Password,
          required: true,
          placeholder: 'Enter Password',
          autocomplete: 'new-password',
        },
        confirmPassword: {
          id: 'checkerDetails.confirmPassword',
          name: 'checkerDetails.confirmPassword',
          label: 'Confirm Password',
          type: FieldType.Password,
          required: true,
          placeholder: 'Enter Confirm Password',
          autocomplete: 'new-password',
        },
      },
    },
  };
};
