import { UserRole } from '../../features/auth/types/auth.types';

export const DEFAULT_ROUTES: Record<UserRole, string> = {
  admin: '/admin/users',
  checker: '/checker/viewall',
  maker: '/maker/create-transaction',
} as const;
