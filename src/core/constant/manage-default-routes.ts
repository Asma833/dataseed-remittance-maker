import { UserRole } from '../../features/auth/types/auth.types';
import { ROUTES, getNavPath } from './route-paths';

export const DEFAULT_ROUTES: Record<UserRole, string> = {
  super_admin: getNavPath('SUPER_ADMIN', ROUTES.SUPER_ADMIN.USER_MANAGEMENT.SUPER_CHECKER_TABLE),
  checker: getNavPath('CHECKER', ROUTES.CHECKER.VIEWALL),
  maker: getNavPath('MAKER', ROUTES.MAKER.CREATE_TRANSACTION),
} as const;
