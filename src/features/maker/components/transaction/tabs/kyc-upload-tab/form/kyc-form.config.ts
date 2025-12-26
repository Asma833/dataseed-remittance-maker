import { FieldType } from '@/types/enums';

export const kycDocumentsConfig = {
  sectionTitle: 'KYC Documents',
  fields: {
    company_reference_number: {
      label: 'Company Reference Number',
      type: FieldType.Text,
      required: false,
      disabled: true,
      placeholder: 'Enter Company Reference Number',
    },
    agent_reference_number: {
      label: 'Agent Reference Number',
      type: FieldType.Text,
      required: false,
      disabled: true,
      placeholder: 'Enter Agent Reference Number',
    },
    applicant_name: {
      label: 'Applicant Name',
      type: FieldType.Text,
      required: true,
      disabled: true,
      placeholder: 'Enter Applicant Name',
    }
  },
};
