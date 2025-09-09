import { ROLES, ROUTES } from '@/core/constant/route-paths';
import AdminAgentList from '@/features/remittance/user-management/pages/agent-admin-table/page';

import { CreateSuperChecker } from '@/features/remittance/user-management/pages/super-checker/form/super-checker-creation';
import SuperCheckerTablePage from '@/features/remittance/user-management/pages/super-checker/table/page';
import BranchAgentsPage from '@/features/remittance/user-management/pages/branch-agents/table/table.component';

const baseRole = ROLES.ADMIN; // Admin routes are accessible to admin role

export const adminRoutes = [
  {
    path: ROUTES.ADMIN.AGENT_ADMIN,
    element: AdminAgentList,
    roles: [baseRole],
    permission: 'admin',
  },
  {
    path: ROUTES.ADMIN.SUPER_CHECKER_TABLE,
    element: SuperCheckerTablePage,
    roles: [baseRole],
    permission: 'admin',
  },
  {
    path: ROUTES.ADMIN.SUPER_CHECKER_CREATION,
    element: CreateSuperChecker,
    roles: [baseRole],
    permission: 'admin',
  },
  {
    path: ROUTES.ADMIN.USER_MANAGEMENT.BRANCH_AGENTS,
    element: BranchAgentsPage,
    roles: [baseRole],
    permission: 'admin',
  }
];
