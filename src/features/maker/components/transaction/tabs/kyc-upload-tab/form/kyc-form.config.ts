import { FieldType } from "@/types/enums";


export const kycDocumentsConfig = {
  sectionTitle: 'KYC Documents',
  fields: {
   company_reference_number: {
      label: 'Company Reference Number',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Company Reference Number'
    },
    agent_reference_number: {
      label: 'Agent Reference Number',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Agent Reference Number'
    },
    applicant_name: {
      label: 'Applicant Name',
      type: FieldType.Text,
      required: true,
      placeholder: 'Enter Applicant Name'
    },
    applicant_pan: {
      label: 'PAN',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Enter PAN'
    },
    other_document: {
      label: 'Other Document',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Front Side'
    },
    passport_aadhar_dl_voter_id_front: {
      label: 'Passport/Aadhar/DL/Voter ID Front',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Front Side'
    },
    passport_aadhar_dl_voter_id_back: {
      label: 'Back',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Back Side'
    },
    
    student_passport_front: {
      label: 'Valid Student Passport Front',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Front Page'
    },
    student_passport_back: {
      label: 'Back',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Back Page'
    },
    payer_pan: {
      label: 'Payer PAN',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Enter Payer PAN'
    },
    payer_relationship_proof: {
      label: 'Payer Relationship Proof',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Proof Document'
    },
    university_offer_letter: {
      label: 'Valid Student University Offer Letter / I20',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Offer Letter',
    },
    education_loan_doc: {
      label: 'Education Loan Document',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Loan Document',
    },
    student_visa: {
      label: 'Valid Student Visa',
      type: FieldType.Fileupload_View,
      required: false,
      placeholder: 'Upload Visa',
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
