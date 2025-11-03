import { UserRole } from '../../features/auth/types/auth.types';
import { ROUTES, getNavPath } from './route-paths';

export const DEFAULT_ROUTES: Record<UserRole, string> = {
  maker: getNavPath('MAKER', ROUTES.MAKER.CREATE_TRANSACTION),
} as const;
