import { UserRole } from '../../features/auth/types/auth.types';
import { ROUTES, getNavPath } from './route-paths';

export const DEFAULT_ROUTES: Record<UserRole, string> = {
  branch_agent_maker: getNavPath('BRANCH_AGENT_MAKER', ROUTES.BRANCH_AGENT_MAKER.TRANSACTION.DEAL_BOOKING),
} as const;
