export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    FORGET_PASSWORD: '/forget-password',
    SEND_PASSWORD_RESET: '/send-password-reset-link',
    RESET_LINK_CONFIRMATION: '/reset-link-confirmation',
    RESET_PASSWORD: '/reset-password',
  },
  
  BRANCH_AGENT_MAKER: {
    CREATE_TRANSACTION: '/create-transaction',
    UPDATE_TRANSACTION: '/update-transaction',
    VIEW_TRANSACTION: '/view-transaction',
    EDIT_TRANSACTION: '/edit-transaction',
    VIEW_STATUS: '/view-status',
    TRANSACTION: {
      BASE: '/transaction',
      CREATE_TRANSACTION: '/transaction/create-transaction',
      KYC_UPLOAD: '/transaction/kyc-upload',
      PAYMENT_STATUS: '/transaction/payment-status',
      VIEW_ALL_TRANSACTIONS: '/transaction/view-all-transactions',
    },
  },
  
} as const;

// Route prefixes for different user roles
export const ROUTE_PREFIXES = {
  BRANCH_AGENT_MAKER: '/branch_agent_maker',
} as const;

// Helper function to generate navigation paths with prefixes
export const getNavPath = (role: keyof typeof ROUTE_PREFIXES, route: string): string => {
  return `${ROUTE_PREFIXES[role]}${route}`;
};

export const ROLES = {
  BRANCH_AGENT_MAKER: 'branch_agent_maker',
};
