import { FieldType } from "@/types/enums";

// KYC Details configuration
const kycDetailsConfig = {
  sectionTitle: 'KYC Details',
  fields: {
    applicant_name: {
      name:'applicant_name',
      label: 'Applicant Name',
      type: FieldType.Text,
      required: true,
      placeholder: 'Enter Applicant Name',
    },
    applicant_pan_number: {
      name:'applicant_pan_number',
      label: 'Applicant PAN Number',
      type: FieldType.Text,
      required: true,
      placeholder: 'Enter PAN Number'
    },
    applicant_dob: {
      name:'applicant_dob',
      label: 'Applicant DOB',
      type: FieldType.Date,
      required: true,
      placeholder: 'Select Date of Birth'
    },
    applicant_email: {
      name:'applicant_email',
      label: 'Applicant Email',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Email Address',
    },
    applicant_mobile_number: {
      name:'applicant_mobile_number',
      label: 'Applicant Mobile Number',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Mobile Number',
    },
    source_of_funds: {
      name:'source_of_funds',
      label: 'Source of Funds',
      type: FieldType.Select,
      required: false,
      placeholder: 'Select Source of Funds',
      options: {
        self: { label: 'Self' },
        others: { label: 'Others' },
      },
    },
    paid_by: {
      name:'paid_by',
      label: 'Paid By',
      type: FieldType.Select,
      required: false,
      placeholder: 'Select Payment Method',
      options: {
        father: { label: 'Father' },
        mother: { label: 'Mother' },
        husband: { label: 'Husband' },
        wife: { label: 'Wife' },
        sister: { label: 'Sister' },
        brother: { label: 'Brother' }
      },
    },
    payee_name_as_per_pan: {
      name:'payee_name_as_per_pan',
      label: 'Payee Name As Per PAN',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Payee Name',
    },
    payee_pan_number: {
      name:'payee_pan_number',
      label: 'Payee PAN Number',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Payee PAN Number',
    },
    payee_dob_as_per_pan: {
      name:'payee_dob_as_per_pan',
      label: 'Payee DOB As Per PAN',
      type: FieldType.Date,
      required: false,
      placeholder: 'Select Payee DOB',
    },
  },
};

export default kycDetailsConfig;
