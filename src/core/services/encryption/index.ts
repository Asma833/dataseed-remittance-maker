// Core encryption service
export { encryptionService } from './encryption.service';
export type { EncryptionResult, DecryptionParams, ApiEncryptionPayload } from './encryption.service';

// Axios interceptors
export { encryptRequestInterceptor, decryptResponseInterceptor, EncryptedApiClient } from './encryption-Interceptor';

// React hook
export { useEncryption } from '@/hooks/useEncryption';

// Re-export the default export
export { encryptionService as default } from './encryption.service';
