const sourceOfEducationConfig = {
  sectionTitle: 'Source of Education',
  fields: {
    declaredEducationLoanAmount: {
      label: 'Declared Education Loan Amount*',
      type: 'text',
      required: true,
      placeholder: 'Enter Declared Education Loan Amount',
      validation: {
        required: 'Declared Education Loan Amount is required',
        pattern: {
          value: /^[0-9]*\.?[0-9]*$/,
          message: 'Please enter a valid amount',
        },
        min: {
          value: 0,
          message: 'Amount cannot be negative',
        },
      },
    },
    niumPreviousTransactionAmount: {
      label: 'NIUM Previous Transaction Amount',
      type: 'text',
      required: false,
      placeholder: 'Enter NIUM Previous Transaction Amount',
      validation: {
        pattern: {
          value: /^[0-9]*\.?[0-9]*$/,
          message: 'Please enter a valid amount',
        },
        min: {
          value: 0,
          message: 'Amount cannot be negative',
        },
      },
    },
    doneByOtherAD: {
      label: 'Done By Other AD/AD2',
      type: 'text',
      required: false,
      placeholder: 'Enter Amount Done By Other AD/AD2',
      validation: {
        pattern: {
          value: /^[0-9]*\.?[0-9]*$/,
          message: 'Please enter a valid amount',
        },
        min: {
          value: 0,
          message: 'Amount cannot be negative',
        },
      },
    },
    totalTransactionAmountForTCS: {
      label: 'Total Transaction Amount For TCS',
      type: 'text',
      required: false,
      placeholder: 'Enter Total Transaction Amount For TCS',
      validation: {
        pattern: {
          value: /^[0-9]*\.?[0-9]*$/,
          message: 'Please enter a valid amount',
        },
        min: {
          value: 0,
          message: 'Amount cannot be negative',
        },
      },
    },
  },
};

export default sourceOfEducationConfig;
