import { FieldType } from "@/types/enums";


export const kycDocumentsConfig = {
  sectionTitle: 'KYC Documents',
  fields: {
    niumReferenceNumber: {
      label: 'NIUM Reference Number',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter NIUM Reference Number',
      className: '',
    },
    agentReferenceNumber: {
      label: 'Agent Reference Number',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Agent Reference Number',
      className: '',
    },
    applicantName: {
      label: 'Applicant Name',
      type: FieldType.Text,
      required: true,
      placeholder: 'Enter Applicant Name',
      className: '',
    },
    applicantPan: {
      label: 'PAN',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Enter PAN',
      className: '',
    },
    otherDocument: {
      label: 'Other Document',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Front Side',
      className: '',
    },
    Passport_Aadhar_DL_Voter_ID_Front: {
      label: 'Passport / Aadhar / DL / Voter ID',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Front Side',
      className: '' 
    },
    Passport_Aadhar_DL_Voter_ID_Back: {
      label: 'Back',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Back Side',
      className: '' 
    },
    payerPan: {
      label: 'Payer PAN',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Enter Payer PAN',
      className: 'col-span-2' 
    },
    studentPassportFront: {
      label: 'Valid Student Passport Front',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Front Page',
      className: ''
    },
    studentPassportBack: {
      label: 'Back',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Back Page',
      className: ''
    },
    payerRelationshipProof: {
      label: 'Payer Relationship Proof',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Proof Document',
      className: 'col-span-2'
    },
    universityOfferLetter: {
      label: 'Valid Student University Offer Letter / I20',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Offer Letter',
      className: '',
    },
    educationLoanDoc: {
      label: 'Education Loan Document',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Loan Document',
      className: '',
    },
    studentVisa: {
      label: 'Valid Student Visa',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Visa',
      className: '',
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
