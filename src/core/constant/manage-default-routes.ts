import { UserRole } from '../../features/auth/types/auth.types';
import { ROUTES, getNavPath } from './route-paths';

export const DEFAULT_ROUTES: Record<UserRole, string> = {
  admin: getNavPath('ADMIN', ROUTES.ADMIN.AGENT_ADMIN),
  checker: getNavPath('CHECKER', ROUTES.CHECKER.VIEWALL),
  maker: getNavPath('MAKER', ROUTES.MAKER.CREATE_TRANSACTION),
} as const;
