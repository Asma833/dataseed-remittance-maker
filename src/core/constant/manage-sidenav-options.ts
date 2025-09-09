import { LayoutDashboard, ClipboardList, FileEdit, Eye, CreditCard, User, BookCopy } from 'lucide-react';
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
  admin: [
    {
      title: 'User Management',
      path: getNavPath('ADMIN', ROUTES.ADMIN.NUSER),
      icon: LayoutDashboard,
      subMenus: [
         {
          title: 'Dataseed Superchecker',
          path: getNavPath('ADMIN', ROUTES.ADMIN.SUPER_CHECKER_TABLE),
        },
        {
          title: 'Agent Admin',
          path: getNavPath('ADMIN', ROUTES.ADMIN.AGENT_ADMIN),
        },
         {
          title: 'Branch Agents',
          path: getNavPath('ADMIN', ROUTES.ADMIN.USER_MANAGEMENT.BRANCH_AGENTS),
        },
        {
          title: 'Create User',
          path: getNavPath('ADMIN', ROUTES.ADMIN.CREATEUSER),
        }
      ],
    },
    {
      title: 'Master Data',
      path: getNavPath('ADMIN', ROUTES.ADMIN.MASTER.PURPOSE_MASTER),
      icon: BookCopy,
      subMenus: [
        {
          title: 'Purpose Master',
          path: getNavPath('ADMIN', ROUTES.ADMIN.MASTER.PURPOSE_MASTER),
          icon: ClipboardList,
        },
        {
          title: 'Document Master',
          path: getNavPath('ADMIN', ROUTES.ADMIN.MASTER.DOCUMENT_MASTER),
          icon: FileEdit,
        },
      ],
    },
  ] as NavigationItem[],
};

// Helper function to get navigation items by role
export const getNavigationItemsByRole = (role: string): NavigationItem[] => {
  const normalizedRole = role.toLowerCase();
  return SideNavOptions[normalizedRole as keyof typeof SideNavOptions] || [];
};
