import { FieldType } from '@/types/enums';

export const agentAdminCreationConfig = () => {
  return {
    sectionTitle: 'Agent Admin Creation',
    description: 'Fill in the details to create a new agent admin',
    steps: [
      'Basic Information',
      'Company Details',
      'Finance Details',
      'Documents',
      'Product Purpose',
      'Commission',
      'Corporate Onboarding',
    ],
    fields: {
      basicInformation: {
        agent_name: {
          name: 'agent_name',
          label: 'Agent Name',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Agent Name',
        },
        emailId: {
          name: 'emailId',
          label: 'Email Id',
          type: FieldType.Email,
          required: true,
          placeholder: 'Enter Email Id',
        },
        phoneNo: {
          name: 'phoneNo',
          label: 'Phone No',
          type: FieldType.Phone,
          placeholder: 'Enter Phone No',
        },
        agentType: {
          name: 'agentType',
          label: 'Agent Type',
          required: true,
          type: FieldType.Select,
          options: [
            { value: 'ADI', label: 'ADI' },
            { value: 'ADII', label: 'ADII' },
            { value: 'FFMC', label: 'FFMC' },
            { value: 'Referral', label: 'Referral' },
          ],
          placeholder: 'Select Agent Type',
        },
        agentBranchCity: {
          name: 'agentBranchCity',
          label: 'Agent Branch City',
          type: FieldType.Text,
          placeholder: 'Enter Agent Branch City',
        },
        agentHOBranchState: {
          name: 'agentHOBranchState',
          label: 'Agent HO Branch State',
          type: FieldType.Text,
          placeholder: 'Enter Agent HO Branch State',
        },
        rm_name: {
          name: 'rm_name',
          label: 'Ebix RM Name',
          type: FieldType.Text,
          placeholder: 'Enter Ebix RM Name',
        },
        rm_branch_name: {
          name: 'rm_branch_name',
          label: 'Ebix RM Branch Name',
          type: FieldType.Text,
          placeholder: 'Enter Ebix RM Branch Name',
        },
        systemCode: {
          name: 'systemCode',
          label: 'System Code',
          type: FieldType.Text,
          placeholder: 'Enter System Code',
        },
        entity_name: {
          name: 'entity_name',
          label: 'Entity Name',
          type: FieldType.Text,
          placeholder: 'Enter Entity Name',
        },
        pan_no: {
          name: 'pan_no',
          label: 'Pan No',
          type: FieldType.Text,
          placeholder: 'Enter Pan No',
        },
        date_of_incorporation: {
          name: 'date_of_incorporation',
          label: 'Date Of Incorporation',
          type: FieldType.Date,
          placeholder: 'Enter Date Of Incorporation',
        },
        status: {
          name: 'status',
          label: 'Status',
          type: FieldType.Radio,
          required: true,
          options: {
            Active: { label: 'Active', checked: true },
            Inactive: { label: 'Inactive' },
            Blocked: { label: 'Blocked' },
          },
        },
        agent_category: {
          name: 'agent_category',
          label: 'Agent Category',
          type: FieldType.Radio,
          required: true,
          options: {
            CNC: { label: 'CNC' },
            largeAgent: { label: 'Large Agent' },
          },
        },

        monthlyCreditLimit: {
          name: 'monthlyCreditLimit',
          label: 'Monthly Credit Limit (INR)',
          type: FieldType.Number,
          placeholder: 'Enter Monthly Credit Limit',
        },
        totalCreditDays: {
          name: 'totalCreditDays',
          label: 'Total Credit Days',
          type: FieldType.Number,
          placeholder: 'Enter Total Credit Days',
        },
        password: {
          name: 'password',
          label: 'Password',
          type: FieldType.Password,
          required: true,
          placeholder: 'Enter Password',
        },
        confirmPassword: {
          name: 'confirmPassword',
          label: 'Confirm Password',
          type: FieldType.Password,
          required: true,
          placeholder: 'Enter Password',
        },
      },
      companyDetails: {
        gstClassification: {
          name: 'gstClassification',
          label: 'GST Classification',
          type: FieldType.Select,
          required: true,
          options: [
            { value: 'regular', label: 'Regular' },
            { value: 'composition', label: 'Composition' },
            { value: 'unregistered', label: 'Unregistered' },
          ],
          placeholder: 'Select GST Classification',
        },
        gstNumber: {
          name: 'gstNumber',
          label: 'GST Number',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter GST Number',
        },
        gstPhoneNo: {
          name: 'gstPhoneNo',
          label: 'Phone No',
          type: FieldType.Phone,
          placeholder: 'Enter Phone No',
        },
        flatDoorNumber: {
          name: 'flatDoorNumber',
          label: 'Flat/Door Number',
          type: FieldType.Text,
          placeholder: 'Enter Flat/Door Number',
        },
        roadStreet: {
          name: 'roadStreet',
          label: 'Road/Street',
          type: FieldType.Text,
          placeholder: 'Enter Road/Street',
        },
        areaLocality: {
          name: 'areaLocality',
          label: 'Area/Locality',
          type: FieldType.Text,
          placeholder: 'Enter Area/Locality',
        },
        gstCity: {
          name: 'gstCity',
          label: 'City',
          type: FieldType.Text,
          placeholder: 'Enter City',
        },
        gstState: {
          name: 'gstState',
          label: 'State',
          type: FieldType.Text,
          placeholder: 'Enter State Name',
        },
        pinCode: {
          name: 'pinCode',
          label: 'PIN Code',
          type: FieldType.Text,
          placeholder: 'Enter PIN Code',
        },
        gstBranch: {
          name: 'gstBranch',
          label: 'Branch',
          type: FieldType.Text,
          placeholder: 'Enter Branch Name',
        },
      },
      financeDetails: {
        financeSpocName: {
          name: 'financeSpocName',
          label: 'Financial SPOC Name',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Financial SPOC Name',
        },
        financeSpocEmail: {
          name: 'financeSpocEmail',
          label: 'Finance SPOC Email',
          type: FieldType.Email,
          required: true,
          placeholder: 'Enter Finance SPOC Email',
        },
        financeSpocPhoneNo: {
          name: 'financeSpocPhoneNo',
          label: 'Finance SPOC Phone No',
          type: FieldType.Phone,
          required: true,
          placeholder: 'Enter Finance SPOC Phone No',
        },
      },
      documents: {
        agreementValid: {
          name: 'agreementValid',
          label: 'Valid',
          type: FieldType.Date,
          required: true,
          placeholder: 'Select Valid Date',
        },
        rbiLicenseCategory: {
          name: 'rbiLicenseCategory',
          label: 'RBI License Category',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter RBI License Category',
        },
        rbiLicenseValidity: {
          name: 'rbiLicenseValidity',
          label: 'RBI License Validity',
          type: FieldType.Date,
          required: true,
          placeholder: 'Select RBI License Validity',
        },
        noOfBranches: {
          name: 'noOfBranches',
          label: 'No. of Branches',
          type: FieldType.Number,
          required: true,
          placeholder: 'Enter No. of Branches',
        },
        extensionMonth: {
          name: 'extensionMonth',
          label: 'Extension Month',
          type: FieldType.Number,
          placeholder: 'Enter Extension Month',
          min: 0,
        },
        agreementCopy: {
          name: 'agreementCopy',
          label: '',
          type: FieldType.FileUpload,
          placeholder: 'Upload Agreement Copy',
        },
        rbiLicenseCopy: {
          name: 'rbiLicenseCopy',
          label: '',
          type: FieldType.FileUpload,
          placeholder: 'Upload RBI License Copy',
        },
      },
      productPurpose: {
        addOnForexMargin: {
          name: 'productPurpose.addOnForexMargin',
          label: 'Add on Forex Margin',
          type: FieldType.Radio,
          required: true,
          options: {
            Yes: { label: 'Yes' },
            No: { label: 'No' },
          },
        },
        addOnNostroMargin: {
          name: 'productPurpose.addOnNostroMargin',
          label: 'Add on Nostro Margin',
          type: FieldType.Radio,
          required: true,
          options: {
            Yes: { label: 'Yes' },
            No: { label: 'No' },
          },
        },
        addOnTTMargin: {
          name: 'productPurpose.addOnTTMargin',
          label: 'Add on TT Margin',
          type: FieldType.Radio,
          required: true,
          options: {
            Yes: { label: 'Yes' },
            No: { label: 'No' },
          },
        },
        addOnOtherChargersMargin: {
          name: 'productPurpose.addOnOtherChargersMargin',
          label: 'Add on Other Chargers Margin',
          type: FieldType.Radio,
          required: true,
          options: {
            Yes: { label: 'Yes' },
            No: { label: 'No' },
          },
        },

        esignDocumentDownload: {
          name: 'productPurpose.esignDocumentDownload',
          label: 'Esign Document Download',
          type: FieldType.Radio,
          required: true,
          options: {
            Yes: { label: 'Yes' },
            No: { label: 'No' },
          },
        },
        vkycDocumentDownload: {
          name: 'productPurpose.vkycDocumentDownload',
          label: 'VKYC Document Download',
          type: FieldType.Radio,
          required: true,
          options: {
            Yes: { label: 'Yes' },
            No: { label: 'No' },
          },
        },
        chooseProductType: {
          name: 'productPurpose.chooseProductType',
          label: 'Choose Product Type',
          type: FieldType.Checkbox,
          required: true,
          variant: 'circle_check_filled',
          options: {
            card: { label: 'Card' },
            currency: { label: 'Currency' },
            remittance: { label: 'Remittance' },
            referral: { label: 'Referral' },
          },
          isMulti: true,
        },

        purposeTypesForCard: {
          name: 'productPurpose.purposeTypesForCard',
          label: 'Purpose Types for Card',
          type: FieldType.Checkbox,
          options: {
            personaltravel: { label: 'Personal Travel' },
            businesstravel: { label: 'Business Travel' },
            education: { label: 'Education' },
            immigration: { label: 'Immigration' },
            employment: { label: 'Employment' },
            medical: { label: 'Medical' },
          },
          isMulti: true,
        },
        purposeTypesForCurrency: {
          name: 'productPurpose.purposeTypesForCurrency',
          label: 'Purpose Types for Currency',
          type: FieldType.Checkbox,
          options: {
            buying: { label: 'Buying' },
            selling: { label: 'Selling' },
            exchange: { label: 'Exchange' },
          },
          isMulti: true,
        },
        purposeTypesForRemittance: {
          name: 'productPurpose.purposeTypesForRemittance',
          label: 'Purpose Types for Remittance',
          type: FieldType.Checkbox,
          options: {
            familysupport: { label: 'Family Support' },
            business: { label: 'Business' },
            education: { label: 'Education' },
            medical: { label: 'Medical' },
          },
          isMulti: true,
        },
        purposeTypesForReferral: {
          name: 'productPurpose.purposeTypesForReferral',
          label: 'Purpose Types for Referral',
          type: FieldType.Checkbox,
          options: {
            agentreferral: { label: 'Agent Referral' },
            customerreferral: { label: 'Customer Referral' },
          },
          isMulti: true,
        },
      },
      rateMargin: {},
      commission: {
        commission_product_type: {
          name: 'commission_details.commission_product_type',
          label: '',
          type: FieldType.Select,
          placeholder: 'Select Product Type',
          options: [
            { label: 'Remittance', value: 'Remittance' },
            { label: 'Currency', value: 'Currency' },
            { label: 'Card', value: 'Card' },
            { label: 'ADI-Referral', value: 'ADI-Referral' },
          ],
        },

        commission_type: {
          name: 'commission_details.commission_type',
          label: '',
          type: FieldType.Radio,
          options: {
            FIXED: { label: 'Fixed' },
            PERCENTAGE: { label: 'Percentage' },
            HYBRID: { label: 'Hybrid' },
          },
          isMulti: false,
          variant: 'circle_check',
          size: 'small',
        },

        /* ===== LEFT CARD: RATE MARGIN ===== */
        product_margin: {
          agent_fixed_margin: {
            name: 'commission_details.product_margin.agent_fixed_margin',
            label: 'Agent Fixed Margin',
            type: FieldType.Radio,
            required: true,
            // single-select (INR or Percentage)
            options: {
              INR: { label: 'INR' },
              PERCENTAGE: { label: 'Percentage' },
            },
            isMulti: false,
          },

          // NEW: single value that applies to all currencies when 'All Currency' checked
          all_currency_margin: {
            name: 'commission_details.product_margin.all_currency_margin',
            label: 'Enter Value',
            type: FieldType.Number,
            required: false,
            placeholder: 'Enter Value',
            min: 0,
            step: 0.01,
          },

          all_currency: {
            name: 'commission_details.product_margin.all_currency',
            label: 'All Currency',
            type: FieldType.Checkbox,
            required: false,
            options: {
              ALL_CURRENCY: { label: 'All Currency' },
            },
            isMulti: false,
          },

          // Base config for each currency input + list of currencies
          currency_list: {
            name: 'commission_details.product_margin.currency_list',
            label: '',
            type: FieldType.Number, // each currency field will be numeric
            required: false,
            placeholder: '',
            min: 0,
            step: 0.01,
            currencies: [
              { currency_code: 'USD', margin: 0 },
              { currency_code: 'EUR', margin: 0 },
              { currency_code: 'GBP', margin: 0 },
              { currency_code: 'CAD', margin: 0 },
              { currency_code: 'AUD', margin: 0 },
              { currency_code: 'JPY', margin: 0 },
              { currency_code: 'SGD', margin: 0 },
              { currency_code: 'CHF', margin: 0 },
              { currency_code: 'AED', margin: 0 },
              { currency_code: 'THB', margin: 0 },
              { currency_code: 'NZD', margin: 0 },
              { currency_code: 'SAR', margin: 0 },
              { currency_code: 'ZAR', margin: 0 },
            ],
          },
        },

        /* ===== MIDDLE CARD: NOSTRO CHARGES ===== */
        nostro_charges: {
          type: {
            name: 'commission_details.nostro_charges.type',
            label: 'Type',
            type: FieldType.Radio,
            required: true,
            options: {
              FX: { label: 'FX' },
              INR: { label: 'INR' },
            },
            isMulti: false,
          },

          // NEW: single value that applies to all currencies when 'All Currency' checked
          all_currency_margin: {
            name: 'commission_details.nostro_charges.all_currency_margin',
            label: 'Enter Value',
            type: FieldType.Number,
            required: false,
            placeholder: 'Enter Value',
            min: 0,
            step: 0.01,
          },

          all_currency: {
            name: 'commission_details.nostro_charges.all_currency',
            label: 'All Currency',
            type: FieldType.Checkbox,
            required: false,
            options: {
              ALL_CURRENCY: { label: 'All Currency' },
            },
            isMulti: false,
          },

          currency_list: {
            name: 'commission_details.nostro_charges.currency_list',
            label: '',
            type: FieldType.Number, // each currency field will be numeric
            required: false,
            placeholder: '',
            min: 0,
            step: 0.01,
            currencies: [
              { currency_code: 'USD', margin: 0 },
              { currency_code: 'EUR', margin: 0 },
              { currency_code: 'GBP', margin: 0 },
              { currency_code: 'CAD', margin: 0 },
              { currency_code: 'AUD', margin: 0 },
              { currency_code: 'JPY', margin: 0 },
              { currency_code: 'SGD', margin: 0 },
              { currency_code: 'CHF', margin: 0 },
              { currency_code: 'AED', margin: 0 },
              { currency_code: 'THB', margin: 0 },
              { currency_code: 'NZD', margin: 0 },
              { currency_code: 'SAR', margin: 0 },
              { currency_code: 'ZAR', margin: 0 },
            ],
          },
        },

        /* ===== RIGHT CARD: TT CHARGES ===== */
        tt_charges: {
          rate: {
            name: 'commission_details.tt_charges.rate',
            label: 'Add Rate (INR)',
            type: FieldType.Number,
            required: false,
            placeholder: 'Enter Value',
            min: 0,
            step: 0.01,
          },
        },

        /* ===== RIGHT CARD: OTHER CHARGES ===== */
        other_charges: {
          rate: {
            name: 'commission_details.other_charges.rate',
            label: 'Add Rate (INR)',
            type: FieldType.Number,
            required: false,
            placeholder: 'Enter Value',
            min: 0,
            step: 0.01,
          },
        },
      },
      corporateOnboarding: {},
    },
  };
};
