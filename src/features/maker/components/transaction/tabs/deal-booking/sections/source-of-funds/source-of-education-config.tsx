const sourceOfEducationConfig = {
  sectionTitle: 'Source of Education',
  fields: {
    declaredEducationLoanAmount: {
      label: 'Declared Education Loan Amount',
      type: 'text',
      required: true,
      placeholder: 'Enter Declared Education Loan Amount'
    },
    niumPreviousTransactionAmount: {
      label: 'NIUM Previous Transaction Amount',
      type: 'text',
      required: false,
      placeholder: 'Enter NIUM Previous Transaction Amount'
    },
    declarePreviousAmountByOtherAd: {
      label: 'Done By Other AD/AD2',
      type: 'text',
      required: false,
      placeholder: 'Enter Amount Done By Other AD/AD2',
    },
    totalTransactionAmountTcs: {
      label: 'Total Transaction Amount For TCS',
      type: 'text',
      required: false,
      placeholder: 'Enter Total Transaction Amount For TCS'
    },
  },
};

export default sourceOfEducationConfig;
