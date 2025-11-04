import { ClipboardList, Eye } from 'lucide-react';
import { ROUTES, getNavPath } from './route-paths';
// Navigation item type definition
export interface NavigationItem {
  title: string;
  path: string;
  icon?: any;
  disabled?: boolean;
  subMenus?: NavigationItem[];
}

// User role navigation configurations
export const SideNavOptions = {
  BRANCH_AGENT_MAKER: [
    {
      title: 'Transaction',
      path: getNavPath('BRANCH_AGENT_MAKER', ROUTES.BRANCH_AGENT_MAKER.TRANSACTION.DEAL_BOOKING),
      icon: Eye,
    },
  ] as NavigationItem[],

};

// Helper function to get navigation items by role
export const getNavigationItemsByRole = (role: string): NavigationItem[] => {
  const normalizedRole = role.toUpperCase().replace(/_/g, '_');
  return SideNavOptions[normalizedRole as keyof typeof SideNavOptions] || [];
};
