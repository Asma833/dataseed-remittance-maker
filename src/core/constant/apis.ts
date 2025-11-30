export const HEADER_KEYS = {
  PARTNER_ID: import.meta.env.VITE_PARTNER_ID,
  API_KEY: import.meta.env.VITE_API_KEY,
};

export const API = {
  AUTH: {
    // LOGIN: `/rem-users/login`,
    LOGIN: `/login`,
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
  USER_MANAGEMENT: {
    AGENT_BRANCH_USER: {
      LIST: `/rem-users/getAllBranchAgents`,
      CREATE: `/rem-users/create-branch-agent`,
      UPDATE: (id: string) => `/rem-users/update-branch-agent/${id}`,
    },
    SUPER_CHECKER: {
      LIST: '/rem-users/getAllSuperCheckers',
      CREATE: '/rem-users/create-super-checker',
      UPDATE: (id: string) => `/rem-users/update-super-checker/${id}`,
    },
    ACTIVE_INACTIVE: {
      DELETE: (id: string) => `/rem-users/active-inactive/${id}`,
    },
    AGENTS: {
      LIST: `/agents`,
      CREATE: `/agents`,
      UPDATE: (id: string) => `/agents/${id}`,
    },
    BANK_ACCOUNTS: {
      LIST: (ownerId: string) => `/bank-accounts/findBankAccounts/${ownerId}`,
      CREATE: `/bank-accounts`,
      UPDATE: (id: string) => `/bank-accounts/${id}`,
      DELETE: (id: string) => `/bank-accounts/${id}`,
    },
    AGENT_CORPORATES: {
      LIST: `/agent-corporates`,
    },
  },
  CONFIG: {
    GET_CONFIG: `/config`,
    GET_PURPOSE_TYPES: `/config?type=purpose_type`,
    GET_TRANSACTION_TYPES: `/config?type=transaction_type`,
    GET_DOCUMENT_TYPES: (id: string) => `trans-purpose-document/${id}/documents`,
  },
  DOCUMENTS: {
    UPLOAD: `/documents/upload`,
    UPLOAD_WITH_MERGE: `/documents/upload-with-merge`,
    UPDATE: `/documents/update`,
    MERGE_PDF: `/documents/merge-pdf`,
    UPLOAD_REMITTANCE_IMAGE: `/documents/uploadRemittanceImage`,
    PRESIGNED_URLS: `/documents/presigned-urls`,
  },
  DOCUMENT_MASTER: {
    GET_DOCUMENTS: `/fx/documents`,
    CREATE_DOCUMENT: `/fx/document`,
    UPDATE_DOCUMENT: (id: string) => `/fx/document/${id}`,
    DELETE_DOCUMENT: (id: string) => `/fx/document/${id}`,
    DOC_PURPOSE_TRANS_MAPPING: `/trans-purpose-document/map`,
    DELETE_MAPPING_DOCUMENT: (id: string) => `/trans-purpose-document/${id}`,
    UPDATE_MAPPING_DOCUMENT: `/trans-purpose-document`,
  },
  TRANSACTION: {
    GET_TRANSACTIONS: `/transaction_type`,
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
  },
  HOLIDAYS: {
    LIST: `/holidays`,
    GET_BY_ID: (id: string) => `/holidays/${id}`,
    CREATE: `/holidays`,
    UPDATE: (id: string) => `/holidays/${id}`,
  },
  DEAL_BOOKING:{
    CREATE:`/remittance/deals/complete`,
    LIST:`/remittance/deals/`
  }
} as const;

/**
 * Type-safe endpoint getter
 * Usage: getEndpoint('AUTH.LOGIN')
 */
export function getEndpoint(path: string): string {
  return path.split('.').reduce((obj: any, key: string) => obj[key], API);
}
