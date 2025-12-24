export const HEADER_KEYS = {
  PARTNER_ID: import.meta.env.VITE_PARTNER_ID,
  API_KEY: import.meta.env.VITE_API_KEY,
};

export const API = {
  AUTH: {
    LOGIN: `/rem-users/login`,
    //LOGIN: `/login`,
    LOGOUT: `/auth/logout`,
    REGISTER: `/auth/register`,
    FORGOT_PASSWORD: `/users/forgot-password`,
    RESET_PASSWORD: `/auth/reset-password`,
    VERIFY_EMAIL: `/auth/verify-email`,
    CHANGE_PASSWORD: `/users/reset-password`,
    REFRESH_TOKEN: `/refresh/accessToken`,
  },
  USER: {
    GET_ROLES: '/roles',
    GET_PROFILE: `/users/profile`,
    UPDATE_PROFILE: `/users/profile`,
    GET_PREFERENCES: `/users/preferences`,
    UPDATE_PREFERENCES: `/users/preferences`,
  },
  FEATURES: {
    ENABLE_GEMINI_FLASH: `/features/gemini-flash/enable`,
  },
  CONFIG: {
    GET_CONFIG: `/config`,
    GET_PURPOSE_TYPES: `/config?type=purpose_type`,
    GET_TRANSACTION_TYPES: `/config?type=transaction_type`,
    GET_DOCUMENT_TYPES: (document_map_id: string, transaction_id: string) =>
      `trans-purpose-document/${document_map_id}/documents${transaction_id ? `?transaction_id=${transaction_id}` : ''}`,
  },
  DOCUMENTS: {
    UPLOAD: `/documents/upload`,
    UPLOAD_WITH_MERGE: `/documents/upload-with-merge`,
    UPDATE: `/documents/update`,
    MERGE_PDF: `/documents/merge-pdf`,
    UPLOAD_REMITTANCE_IMAGE: `/documents/uploadRemittanceImage`,
    PRESIGNED_URLS: `/documents/presigned-urls`,
  },

  TRANSACTION: {
    GET_PAYMENT_STATUS: `/transaction-status`,
    GET_TRANSACTIONS: `/transaction_type`,
    GET_ALL_REMIT_TRANSACTIONS: `/transaction/all`,
    GET_ALL_TRANSACTIONS: `/transaction_type/all`,
    GET_ALL_TRANSACTIONS_TYPES: `/transaction_type/all`,
    GET_TRANSACTIONS_TYPES: `/transaction_type`,
    GET_MAPPED_PURPOSES: `/transaction-purpose-map`,
    GET_MAPPED_PURPOSES_BY_ID: (id: string) => `/transaction-purpose-map/purposes/${id}`,
  },
  PURPOSE: {
    GET_PURPOSES: (transactionTypeId?: string) =>
      transactionTypeId
        ? `/trans-purpose-document/with-documents?transaction_type_id=${transactionTypeId}`
        : `/trans-purpose-document/with-documents`,
    UPDATE_PURPOSE: `/transaction-purpose-map/purpose-mapping/8f4a7d12-3a4c-4c3e-bad1-9a9c83a1c55b`,
    CREATE_PURPOSE: `/transaction-purpose-map/purpose-mapping`,
    TRANSACTION_MAPPING: `/transaction-purpose-map`,
    GET_TRANSACTION_PURPOSES: `/transaction-purpose-map`,
    GET_ALL_TRANSACTIONS_TYPES: `/transaction_type/all`,
    GET_TRANSACTIONS_TYPES: `/transaction_type`,
    GET_MAPPED_PURPOSES: `/transaction-purpose-map`,
    GET_MAPPED_PURPOSES_BY_ID: (id: string) => `/transaction-purpose-map/purposes/${id}`,
  },
  TRANSACTION_PURPOSE_MAP: {
    CREATE: `/transaction-purpose-map`,
    PURPOSE_MAPPING: `/transaction-purpose-map/purpose-mapping`,
    GET_DOCUMENTS: (transactionTypeId: string) => `/trans-purpose-document/${transactionTypeId}/documents`,
  },
  CURRENCY_RATE: {
    GET_ALL: `/currency-rate?margin_type=number`,
    UPDATE_TIMEWISE: `/currency-rate/update-timewise`,
    GET_CURRENCY_RATES: (currencyCode: string) => `/currency-rate/${currencyCode}`,
  },

  REMITTANCE: {
    CREATE_TRANSACTION: `/remittance/deals/complete`,
    GET_TRANSACTION: `/remittance/deals/`,
    UPLOAD_PAYMENT_CHALLAN: (id: string) => `/remittance/transactions/documents/payment/challan/${id}`,
    TRANSACTIONS: {
      DOCUMENTS: {
        UPLOAD: `/remittance/transactions/documents/upload`,
        REJECTION: (transactionId: string) => `/remittance/transactions/documents/${transactionId}/rejection`,
      },
    },
    DEALS: `/remittance/deals`,
  },
} as const;

/**
 * Type-safe endpoint getter
 * Usage: getEndpoint('AUTH.LOGIN')
 */
export function getEndpoint(path: string): string {
  return path.split('.').reduce((obj: any, key: string) => obj[key], API);
}
