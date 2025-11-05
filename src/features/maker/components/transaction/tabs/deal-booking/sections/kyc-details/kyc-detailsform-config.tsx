import { FieldType } from "@/types/enums";

// KYC Details configuration
const kycDetailsConfig = {
  sectionTitle: 'KYC Details',
  fields: {
    applicantName: {
      name:'applicantName',
      label: 'Applicant Name',
      type: FieldType.Text,
      required: true,
      placeholder: 'Enter Applicant Name',
    },
    applicantPanNumber: {
      name:'applicantPanNumber',
      label: 'Applicant PAN Number',
      type: FieldType.Text,
      required: true,
      placeholder: 'Enter PAN Number'
    },
    applicantDob: {
      name:'applicantDob',
      label: 'Applicant DOB',
      type: FieldType.Date,
      required: true,
      placeholder: 'Select Date of Birth',
    },
    applicantEmail: {
      name:'applicantEmail',
      label: 'Applicant Email',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Email Address',
    },
    applicantMobileNumber: {
      name:'applicantMobileNumber',
      label: 'Applicant Mobile Number',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Mobile Number',
    },
    sourceOfFunds: {
      name:'sourceOfFunds',
      label: 'Source of Funds',
      type: FieldType.Select,
      required: false,
      placeholder: 'Select Source of Funds',
      options: {
        salary: { label: 'Salary' },
        business: { label: 'Business Income' },
        investment: { label: 'Investment Returns' },
        savings: { label: 'Savings' },
        education: { label: 'Education' },
        inheritance: { label: 'Inheritance' },
        other: { label: 'Other' },
      },
    },
    paidBy: {
      name:'paidBy',
      label: 'Paid By',
      type: FieldType.Select,
      required: false,
      placeholder: 'Select Payment Method',
      options: {
        self: { label: 'Self' },
        company: { label: 'Company' },
        relative: { label: 'Relative' },
        other: { label: 'Other' },
      },
    },
    payeeNameAsPerPan: {
      name:'payeeNameAsPerPan',
      label: 'Payee Name As Per PAN',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Payee Name',
    },
    payeePanNumber: {
      name:'payeePanNumber',
      label: 'Payee PAN Number',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Payee PAN Number',
    },
    payeeDobAsPerPan: {
      name:'payeeDobAsPerPan',
      label: 'Payee DOB As Per PAN',
      type: FieldType.Date,
      required: false,
      placeholder: 'Select Payee DOB',
    },
  },
};

export default kycDetailsConfig;
