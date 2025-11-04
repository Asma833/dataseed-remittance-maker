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
 maker: [
    {
      title: 'Create Transaction',
      path: getNavPath('MAKER', ROUTES.MAKER.CREATE_TRANSACTION),
      icon: ClipboardList,
    },
    {
      title: 'View Status',
      path: getNavPath('MAKER', ROUTES.MAKER.VIEW_STATUS),
      icon: Eye,
    },
    {
      title: 'Transaction',
      path: getNavPath('MAKER', ROUTES.MAKER.TRANSACTION.DEAL_BOOKING),
      icon: Eye,
    },
  ] as NavigationItem[],
  
};

// Helper function to get navigation items by role
export const getNavigationItemsByRole = (role: string): NavigationItem[] => {
  const normalizedRole = role.toLowerCase();
  return SideNavOptions[normalizedRole as keyof typeof SideNavOptions] || [];
};
