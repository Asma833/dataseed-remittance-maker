import { FieldType } from "@/types/common.type";

// KYC Details configuration
const kycDetailsConfig = {
  sectionTitle: 'KYC Details',
  fields: {
    applicantName: {
      label: 'Applicant Name*',
      type: FieldType.Text,
      required: true,
      placeholder: 'Enter Applicant Name',
      validation: {
        required: 'Applicant name is required',
      },
    },
    applicantPanNumber: {
      label: 'Applicant PAN Number*',
      type: FieldType.Text,
      required: true,
      placeholder: 'Enter PAN Number',
      validation: {
        required: 'PAN number is required',
        pattern: {
          value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
          message: 'Invalid PAN number format',
        },
      },
    },
    applicantDob: {
      label: 'Applicant DOB*',
      type: FieldType.Date,
      required: true,
      placeholder: 'Select Date of Birth',
      validation: {
        required: 'Date of birth is required',
      },
    },
    applicantEmail: {
      label: 'Applicant Email',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Email Address',
      validation: {
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address format',
        },
      },
    },
    applicantMobileNumber: {
      label: 'Applicant Mobile Number',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Mobile Number',
      validation: {
        pattern: {
          value: /^[0-9]{10}$/,
          message: 'Mobile number must be 10 digits',
        },
      },
    },
    sourceOfFunds: {
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
      label: 'Payee Name As Per PAN',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Payee Name',
    },
    payeePanNumber: {
      label: 'Payee PAN Number',
      type: FieldType.Text,
      required: false,
      placeholder: 'Enter Payee PAN Number',
      validation: {
        pattern: {
          value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
          message: 'Invalid PAN number format',
        },
      },
    },
    payeeDobAsPerPan: {
      label: 'Payee DOB As Per PAN',
      type:FieldType.Date,
      required: false,
      placeholder: 'Select Payee DOB',
    },
  },
};

export default kycDetailsConfig;
