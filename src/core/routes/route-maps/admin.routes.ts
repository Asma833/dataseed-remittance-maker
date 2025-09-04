import { ROLES, ROUTES } from '@/core/constant/route-paths';
import AdminAgentList from '@/features/remittance/user-management/pages/agent-admin-table/page';
// import { lazy } from 'react';

// const adminComponents = {
//   User: lazy(() => import('@/features/admin/')),
// };

const baseRole = ROLES.ADMIN; // Admin routes are accessible to admin role

export const adminRoutes = [
  {
    path: ROUTES.ADMIN.AGENT_ADMIN,
    element: AdminAgentList,
    roles: [baseRole],
  },
];
