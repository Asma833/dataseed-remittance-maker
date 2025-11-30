import { API } from './apis';

/**
 * Configuration for specific endpoint matching rules
 */

/**
 * Type definitions
 */
export type EndpointMatchType = 'exact-only' | 'standard';

export type EndpointRule = {
  endpoint: string;
  matchType: EndpointMatchType;
  description: string;
};

export type EndpointRulesConfig = Record<string, EndpointRule>;

export const ENDPOINT_MATCHING_RULES: EndpointRulesConfig = {
  'auth-logout': {
    endpoint: API.AUTH.LOGOUT,
    matchType: 'exact-only' as const,
    description: 'Authentication logout endpoint',
  },
  login: {
    endpoint: API.AUTH.LOGIN,
    matchType: 'exact-only' as const,
    description: 'login endpoint',
  },
  'auth-refresh': {
    endpoint: API.AUTH.REFRESH_TOKEN,
    matchType: 'exact-only' as const,
    description: 'Token refresh endpoint',
  },
  'auth-forgot-password': {
    endpoint: API.AUTH.FORGOT_PASSWORD,
    matchType: 'exact-only' as const,
    description: 'Forgot password endpoint',
  },
  'upload-documents': {
    endpoint: API.DOCUMENTS.UPLOAD,
    matchType: 'exact-only' as const,
    description: 'Upload documents endpoint',
  },
  'trans-purpose-document': {
    endpoint: API.TRANSACTION_PURPOSE_MAP.CREATE,
    matchType: 'standard' as const,
    description: 'Transaction purpose document endpoint',
  },
  'merge-doc': {
    endpoint: API.DOCUMENTS.MERGE_PDF,
    matchType: 'exact-only' as const,
    description: 'Merge documents endpoint',
  },
  'create-purpose': {
    endpoint: API.PURPOSE.CREATE_PURPOSE,
    matchType: 'standard' as const,
    description: 'Create purpose endpoint',
  },
  'add-document': {
    endpoint: API.DOCUMENT_MASTER.CREATE_DOCUMENT,
    matchType: 'standard' as const,
    description: 'Add document endpoint',
  },
  'document-map': {
    endpoint: API.DOCUMENT_MASTER.DOC_PURPOSE_TRANS_MAPPING,
    matchType: 'standard' as const,
    description: 'Document mapping endpoint',
  },
  'create-super-checker': {
    endpoint: API.USER_MANAGEMENT.SUPER_CHECKER.CREATE,
    matchType: 'standard' as const,
    description: 'Create super checker endpoint',
  },
  'update-super-checker': {
    endpoint: '/rem-users/update-super-checker',
    matchType: 'standard' as const,
    description: 'Update super checker endpoint',
  },
  'get-super-checker': {
    endpoint: API.USER_MANAGEMENT.SUPER_CHECKER.LIST,
    matchType: 'standard' as const,
    description: 'Get super checker endpoint',
  },
  'create-branch-agent': {
    endpoint: API.USER_MANAGEMENT.AGENT_BRANCH_USER.CREATE,
    matchType: 'standard' as const,
    description: 'Create super checker endpoint',
  },
  'update-branch-agent': {
    endpoint: '/rem-users/update-branch-agent',
    matchType: 'standard' as const,
    description: 'Update branch agent endpoint',
  },
  'get-branch-agent': {
    endpoint: API.USER_MANAGEMENT.AGENT_BRANCH_USER.LIST,
    matchType: 'standard' as const,
    description: 'Get super checker endpoint',
  },
  'create-agent-admin': {
    endpoint: API.USER_MANAGEMENT.AGENTS.CREATE,
    matchType: 'standard' as const,
    description: 'Create Agent Admin',
  },
  'upload-agreement': {
    endpoint: API.DOCUMENTS.UPLOAD_REMITTANCE_IMAGE,
    matchType: 'standard' as const,
    description: 'Upload remittance image',
  },
  'bank-details': {
    endpoint: '/bank-accounts/findBankAccounts',
    matchType: 'standard' as const,
    description: 'Upload remittance image',
  },
  'create-bank-details': {
    endpoint: '/bank-accounts',
    matchType: 'standard' as const,
    description: 'Bank details',
  },
  'create-corporates': {
    endpoint: '/agent-corporates',
    matchType: 'standard' as const,
    description: 'Create corporates',
  },
  document: {
    endpoint: '/documents/presigned-urls',
    matchType: 'standard' as const,
    description: 'Get documents',
  },
  'inactive-superchecker': {
    endpoint: '/rem-users/active-inactive',
    matchType: 'standard' as const,
    description: 'Inactive super checker',
  },
  'update-currency': {
    endpoint: API.CURRENCY_RATE.UPDATE_TIMEWISE,
    matchType: 'standard' as const,
    description: 'Update currency value',
  },
  'holiday': {
    endpoint: API.HOLIDAYS.CREATE,
    matchType: 'standard' as const,
    description: 'Create holidays',
  },
  'transaction': {
    endpoint: API.PURPOSE.TRANSACTION_MAPPING,
    matchType: 'standard' as const,
    description: 'Create transaction',
  },
  'deal-booking':{
    endpoint: API.DEAL_BOOKING.CREATE,
    matchType: 'standard' as const,
    description: 'Deal booking',
  }
} as const;

/**
 * Extract endpoints for backward compatibility
 */
export const SKIP_ENCRYPTION_ENDPOINTS = Object.values(ENDPOINT_MATCHING_RULES).map((rule) => rule.endpoint);

/**
 * Normalize endpoint path for clean comparison
 */
export function normalizeEndpointPath(path: string): string {
  return path.replace(/^\/+/, '').replace(/\/+$/, '');
}

/**
 * Get matching rule based on actual URL
 * Prioritizes more specific rules over general ones
 */
export function getEndpointMatchingRuleByUrl(url: string): EndpointRule | undefined {
  const normalizedUrl = normalizeEndpointPath(url);

  // Convert to array and sort by specificity (longer endpoints first)
  const sortedRules = Object.values(ENDPOINT_MATCHING_RULES).sort((a, b) => {
    // First sort by endpoint length (longer = more specific)
    const lengthDiff = b.endpoint.length - a.endpoint.length;
    if (lengthDiff !== 0) return lengthDiff;

    // Then prioritize exact-only over standard
    if (a.matchType === 'exact-only' && b.matchType === 'standard') return -1;
    if (a.matchType === 'standard' && b.matchType === 'exact-only') return 1;

    return 0;
  });

  return sortedRules.find((rule) => {
    const normalizedEndpoint = normalizeEndpointPath(rule.endpoint);

    if (rule.matchType === 'exact-only') {
      return normalizedUrl === normalizedEndpoint || normalizedUrl === normalizedEndpoint + '/';
    } else {
      return (
        normalizedUrl === normalizedEndpoint ||
        normalizedUrl.startsWith(normalizedEndpoint + '/') ||
        normalizedUrl.startsWith(normalizedEndpoint + '?')
      );
    }
  });
}

/**
 * Determine if the given URL should be encrypted
 */
export function shouldEncryptEndpoint(url: string): boolean {
  const rule = getEndpointMatchingRuleByUrl(url);
  // If we find any matching rule, we should NOT encrypt (skip encryption)
  // The matchType only controls HOW the matching is done, not WHETHER to encrypt
  return !rule;
}

/**
 * Determine if a URL matches a specific endpoint, using rule logic
 */
export function matchesEndpointRule(url: string, endpoint: string): boolean {
  const normalizedUrl = normalizeEndpointPath(url);
  const normalizedEndpoint = normalizeEndpointPath(endpoint);

  const rule = getEndpointMatchingRuleByUrl(endpoint);

  if (rule?.matchType === 'exact-only') {
    return normalizedUrl === normalizedEndpoint || normalizedUrl === normalizedEndpoint + '/';
  }

  return (
    normalizedUrl === normalizedEndpoint ||
    normalizedUrl.startsWith(normalizedEndpoint + '/') ||
    normalizedUrl.startsWith(normalizedEndpoint + '?')
  );
}
