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
    },
    // kycType: {
    //   label: 'Select KYC Type',
    //   type: FieldType.Select,
    //   required: true,
    //   placeholder: 'Choose KYC Type',
    //   options: {
    //     full_kyc: { label: 'Full KYC' },
    //     limited_kyc: { label: 'Limited KYC' },
    //     video_kyc: { label: 'Video KYC' },
    //   },
    //   isMulti: false,
    //   className: 'mt-4',
    // },
    // viewA2Form: {
    //   label: 'View A2 Form',
    //   type: FieldType.Fileupload_View,
    //   required: false,
    //   className: 'col-span-2',
    // },
  },
};
