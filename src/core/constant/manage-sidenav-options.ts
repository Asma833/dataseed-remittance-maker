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
      path: '/admin/user-management',
      icon: profile,
      subMenus: [
        {
          title: 'Super Checker',
          path: getNavPath('ADMIN', ROUTES.ADMIN.USER_MANAGEMENT.SUPER_CHECKER_TABLE),
           subMenus: [
            { title: 'Super Checker Creation', path: getNavPath('ADMIN', ROUTES.ADMIN.USER_MANAGEMENT.SUPER_CHECKER_CREATION) },
         ]
        },
        {
          title: 'Agent Admin',
          path: getNavPath('ADMIN', ROUTES.ADMIN.USER_MANAGEMENT.AGENT_ADMIN),
         subMenus: [
          { title: 'Agent Admin Creation', path: getNavPath('ADMIN', ROUTES.ADMIN.USER_MANAGEMENT.AGENT_ADMIN_CREATION) },
         ]
        },
        {
          title: 'Branch Agents',
          path: getNavPath('ADMIN', ROUTES.ADMIN.USER_MANAGEMENT.BRANCH_AGENTS),
         subMenus: [
          { title: 'Branch Agent Creation', path: getNavPath('ADMIN', ROUTES.ADMIN.USER_MANAGEMENT.BRANCH_AGENT_CREATION) },
         ]
        },

      ],
    },
    {
      title: 'Master Data',
      path: '/admin/master',
      icon: master,
      subMenus: [
         {
          title: 'Rate Master',
          path: '/admin/master/rate-master/rate-margin',
          subMenus: [
          { title: 'Remittance', path: "/admin/master/rate-master/remittance"},
          { title: 'Holiday List', path: "/admin/master/rate-master/holiday-list"},
          { title: 'Live Rates', path: "/admin/master/rate-master/live-rates"}
        ]
        },
        {
          title: 'Purpose Master',
          path: getNavPath('ADMIN', ROUTES.ADMIN.MASTER.PURPOSE_MASTER),
        },
        {
          title: 'Document Master',
          path: getNavPath('ADMIN', ROUTES.ADMIN.MASTER.DOCUMENT_MASTER),
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
