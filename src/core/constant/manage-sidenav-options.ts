import { LayoutDashboard, ClipboardList, FileEdit, Eye, CreditCard, User, BookCopy } from 'lucide-react';
import { ROUTES, getNavPath } from './route-paths';
import profile from '@/assets/icons/profile.svg';
import master from '@/assets/icons/master.svg';
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
      icon: profile,
      subMenus: [
         {
          title: 'Superchecker',
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
        // {
        //   title: 'Create User',
        //   path: getNavPath('ADMIN', ROUTES.ADMIN.CREATEUSER),
        // }
      ],
    },
    {
      title: 'Master Data',
      path: getNavPath('ADMIN', ROUTES.ADMIN.MASTER.PURPOSE_MASTER),
      icon: master,
      subMenus: [
         {
          title: 'Rate Master',
          path: getNavPath('ADMIN', ROUTES.ADMIN.MASTER.RATE_MASTER.RATE_MARGIN),
        },
        {
          title: 'Purpose Master',
          path: getNavPath('ADMIN', ROUTES.ADMIN.MASTER.PURPOSE_MASTER),
        },
        // {
        //   title: 'Document Master',
        //   path: getNavPath('ADMIN', ROUTES.ADMIN.MASTER.DOCUMENT_MASTER),
        // },
      ],
    },
  ] as NavigationItem[],
};

// Helper function to get navigation items by role
export const getNavigationItemsByRole = (role: string): NavigationItem[] => {
  const normalizedRole = role.toLowerCase();
  return SideNavOptions[normalizedRole as keyof typeof SideNavOptions] || [];
};
