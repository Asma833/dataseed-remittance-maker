import { ROLES, ROUTES } from '@/core/constant/route-paths';
import AdminAgentList from '@/features/remittance/user-management/pages/agent-admin-table/page';

import { CreateSuperChecker } from '@/features/remittance/user-management/pages/super-checker/form/super-checker-creation';


const baseRole = ROLES.ADMIN; // Admin routes are accessible to admin role

export const adminRoutes = [
  {
    path: ROUTES.ADMIN.AGENT_ADMIN,
    element: AdminAgentList,
    roles: [baseRole],
    permission: 'admin',
  },
  {
    path: ROUTES.ADMIN.CREATEUSER,
    element: CreateSuperChecker,
    roles: [baseRole],
    permission: 'admin',
  },
];
