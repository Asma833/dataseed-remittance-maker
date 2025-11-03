export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    FORGET_PASSWORD: '/forget-password',
    SEND_PASSWORD_RESET: '/send-password-reset-link',
    RESET_LINK_CONFIRMATION: '/reset-link-confirmation',
    RESET_PASSWORD: '/reset-password',
  },
  SUPER_ADMIN: {
    DASHBOARD: '/dashboard',
    USER_MANAGEMENT: {
      SUPER_CHECKER_TABLE: '/user-management/super-checker-table',
      SUPER_CHECKER_CREATION: '/user-management/super-checker-table/super-checker-creation',
      AGENT_ADMIN: '/user-management/agent-admin',
      AGENT_ADMIN_CREATION: '/user-management/agent-admin/agent-admin-creation',
      N_USER: '/user-management/n-user',
      BRANCH_AGENTS: '/user-management/branch-agents',
      BRANCH_AGENT_CREATION: '/user-management/branch-agents/branch-agent-creation',
      AGENT_BRANCH: '/user-management/agent-branch-user-creation',
      CREATE_BRANCH_NEW_USER: '/user-management/agent-branch-user-registration',
      AGENT_PROFILE: '/user-management/agent-profile-creation',
      CREATE_AGENT: '/user-management/agent-profile-creation/create-new-agent',
    },
    MASTER: {
      RATE_MASTER: {
        RATE_MARGIN: '/master/rate-master/rate-margin',
        REMITTANCE: 'rate-master/rate-margin/remittance',
        LIVE_RATES: 'rate-master/rate-margin/live-rates',
        HOLIDAY_LIST: 'rate-master/rate-margin/holiday-list',
        CARD: 'rate-master/card',
        CURRENCY: 'rate-master/currency',
      },
      PURPOSE_MASTER: '/master/purpose-master',
      CREATE_PURPOSE_MASTER: '/master/purpose-master/add-purpose',
      UPDATE_PURPOSE_MASTER: '/master/purpose-master/update/:id',
      DOCUMENT_MASTER: '/master/document-master',
      CREATE_DOCUMENT_MASTER: '/master/document-master/add-document',
      UPDATE_DOCUMENT_MASTER: '/master/document-master/update/:id',
      DOCUMENT_MAPPING: '/master/document-mapping',
    },
  },
  CHECKER: {
    DASHBOARD: '/dashboard',
    ASSIGN: '/assign',
    VIEWALL: '/viewall',
    UPDATE_INCIDENT: '/update-incident',
    COMPLETEDTRANSACTIONS: '/completed-transactions',
  },
  MAKER: {
    CREATE_TRANSACTION: '/create-transaction',
    UPDATE_TRANSACTION: '/update-transaction',
    VIEW_TRANSACTION: '/view-transaction',
    EDIT_TRANSACTION: '/edit-transaction',
    VIEW_STATUS: '/view-status',
  },
  
} as const;

// Route prefixes for different user roles
export const ROUTE_PREFIXES = {
  SUPER_ADMIN: '/super_admin',
  CHECKER: '/checker',
  MAKER: '/maker',
} as const;

// Helper function to generate navigation paths with prefixes
export const getNavPath = (role: keyof typeof ROUTE_PREFIXES, route: string): string => {
  return `${ROUTE_PREFIXES[role]}${route}`;
};

export const ROLES = {
  BRANCH_AGENT_CHECKER: 'branch_agent_checker',
  SUPER_ADMIN: 'super_admin',
  CHECKER: 'checker',
  MAKER: 'maker',
};
