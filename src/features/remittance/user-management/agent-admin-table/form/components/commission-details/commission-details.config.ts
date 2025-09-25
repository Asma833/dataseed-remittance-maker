import { FieldType } from "@/types/enums";

export const commissionDetailsConfig = {
  title: "Commission Details",
  description: "Configuration for commission details tab",

  fields: {
    /* ===== TOP FILTERS ===== */
    commission_product_type: {
      name: "commission_details.commission_product_type",
      label: "",
      type: FieldType.Select,
      // required: true,
      placeholder: "Select Product Type",
      options: [
        { label: "Remittance", value: "Remittance" },
        { label: "Currency", value: "Currency" },
        { label: "Card", value: "Card" },
        { label: "ADI-Referral", value: "ADI-Referral" },
      ],
    },

    commission_type: {
      name: "commission_details.commission_type",
      label: "",
      type: FieldType.Checkbox,
      // required: true,
      // single-select checkbox group (radio-like)
      options: {
        FIXED: { label: "Fixed" },
        PERCENTAGE: { label: "Percentage" },
        HYBRID: { label: "Hybrid" },
      },
      isMulti: false,
      variant: "circle_check",
      size: "small",
    },

    /* ===== LEFT CARD: RATE MARGIN ===== */
    product_margin: {
      agent_fixed_margin: {
        name: "commission_details.product_margin.agent_fixed_margin",
        label: "Agent Fixed Margin",
        type: FieldType.Checkbox,
        required: true,
        // single-select (INR or Percentage)
        options: {
          INR: { label: "INR" },
          PERCENTAGE: { label: "Percentage" },
        },
        isMulti: false,
      },

      // NEW: single value that applies to all currencies when 'All Currency' checked
      all_currency_margin: {
        name: "commission_details.product_margin.all_currency_margin",
        label: "Enter Value",
        type: FieldType.Number,
        required: false,
        placeholder: "Enter Value",
        min: 0,
        step: 0.01,
      },

      all_currency_checkbox: {
        name: "commission_details.product_margin.all_currency",
        label: "All Currency",
        type: FieldType.Checkbox,
        required: false,
        options: {
          ALL_CURRENCY: { label: "All Currency" },
        },
        size: "medium",
        isMulti: false,
      },

      // Base config for each currency input + list of currencies
      currency_list: {
        name: "commission_details.product_margin.currency_list",
        label: "",
        type: FieldType.Number,              // each currency field will be numeric
        required: false,
        placeholder: "Enter Value",
        min: 0,
        step: 0.01,
        currencies: [
          { currency_code: "USD", margin: 0 },
          { currency_code: "EUR", margin: 0 },
          { currency_code: "GBP", margin: 0 },
          { currency_code: "CAD", margin: 0 },
          { currency_code: "AUD", margin: 0 },
          { currency_code: "JPY", margin: 0 },
          { currency_code: "SGD", margin: 0 },
          { currency_code: "CHF", margin: 0 },
          { currency_code: "AED", margin: 0 },
          { currency_code: "THB", margin: 0 },
          { currency_code: "NZD", margin: 0 },
          { currency_code: "SAR", margin: 0 },
          { currency_code: "ZAR", margin: 0 },
        ],
      },
    },

    /* ===== MIDDLE CARD: NOSTRO CHARGES ===== */
    nostro_charges: {
      type: {
        name: "commission_details.nostro_charges.type",
        label: "Type",
        type: FieldType.Checkbox,
        required: true,
        options: {
          FX: { label: "FX" },
          INR: { label: "INR" },
        },
        isMulti: false,
      },

      // NEW: single value that applies to all currencies when 'All Currency' checked
      all_currency_margin: {
        name: "commission_details.nostro_charges.all_currency_margin",
        label: "Enter Value",
        type: FieldType.Number,
        required: false,
        placeholder: "Enter Value",
        min: 0,
        step: 0.01,
      },

      all_currency_checkbox: {
        name: "commission_details.nostro_charges.all_currency",
        label: "All Currency",
        type: FieldType.Checkbox,
        required: false,
        options: {
          ALL_CURRENCY: { label: "All Currency" },
        },
        isMulti: false,
        size: "medium",
      },

      currency_list: {
        name: "commission_details.nostro_charges.currency_list",
        label: "",
        type: FieldType.Number,              // each currency field will be numeric
        required: false,
        placeholder: "Enter Value",
        min: 0,
        step: 0.01,
        currencies: [
          { currency_code: "USD", margin: 0 },
          { currency_code: "EUR", margin: 0 },
          { currency_code: "GBP", margin: 0 },
          { currency_code: "CAD", margin: 0 },
          { currency_code: "AUD", margin: 0 },
          { currency_code: "JPY", margin: 0 },
          { currency_code: "SGD", margin: 0 },
          { currency_code: "CHF", margin: 0 },
          { currency_code: "AED", margin: 0 },
          { currency_code: "THB", margin: 0 },
          { currency_code: "NZD", margin: 0 },
          { currency_code: "SAR", margin: 0 },
          { currency_code: "ZAR", margin: 0 },
        ],
      },
    },

    /* ===== RIGHT CARD: TT CHARGES ===== */
    tt_charges: {
      rate: {
        name: "commission_details.tt_charges.rate",
        label: "Add Rate (INR)",
        type: FieldType.Number,
        required: false,
        placeholder: "Enter Value",
        min: 0,
        step: 0.01,
      },
    },

    /* ===== RIGHT CARD: OTHER CHARGES ===== */
    other_charges: {
      rate: {
        name: "commission_details.other_charges.rate",
        label: "Add Rate (INR)",
        type: FieldType.Number,
        required: false,
        placeholder: "Enter Value",
        min: 0,
        step: 0.01,
      },
    },
  },
};
