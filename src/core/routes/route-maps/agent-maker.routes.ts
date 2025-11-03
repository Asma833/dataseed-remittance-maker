import { ROLES, ROUTES } from '@/core/constant/route-paths';
import type { RouteConfig } from '@/types/route.types';

const baseRole = ROLES.MAKER; 

export const superAdminRoutes: RouteConfig[] = [
  // {
  //   path: ROUTES.SUPER_ADMIN.USER_MANAGEMENT.AGENT_ADMIN,
  //   element: AdminAgentList,
  //   roles: [baseRole],
  //   permission: 'super_admin',
  // }
];
// export const getAdminTransactionTabs = () => {
//   return getTabsFromRoute('/master/*', superAdminRoutes);
// };
