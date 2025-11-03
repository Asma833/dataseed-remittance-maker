import { ROUTES, getNavPath } from './route-paths';
import profile from '@/assets/icons/profile.svg';
import master from '@/assets/icons/master.svg';
import { UserCheck, UserCog, Users, TrendingUp, Target, FileText, Link } from 'lucide-react';
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
  super_admin: [
    {
      title: 'User Management',
      path: '/super_admin/user-management',
      icon: profile,
      subMenus: [
        {
          title: 'Super Checker',
          path: getNavPath('SUPER_ADMIN', ROUTES.SUPER_ADMIN.USER_MANAGEMENT.SUPER_CHECKER_TABLE),
          icon: UserCheck,
          subMenus: [
            {
              title: 'Super Checker Creation',
              path: getNavPath('SUPER_ADMIN', ROUTES.SUPER_ADMIN.USER_MANAGEMENT.SUPER_CHECKER_CREATION),
              icon: UserCheck,
            },
          ],
        },
        {
          title: 'Agent Admin',
          path: getNavPath('SUPER_ADMIN', ROUTES.SUPER_ADMIN.USER_MANAGEMENT.AGENT_ADMIN),
          icon: UserCog,
          subMenus: [
            {
              title: 'Agent Admin Creation',
              path: getNavPath('SUPER_ADMIN', ROUTES.SUPER_ADMIN.USER_MANAGEMENT.AGENT_ADMIN_CREATION),
              icon: UserCog,
            },
          ],
        },
        {
          title: 'Branch Agents',
          path: getNavPath('SUPER_ADMIN', ROUTES.SUPER_ADMIN.USER_MANAGEMENT.BRANCH_AGENTS),
          icon: Users,
          subMenus: [
            {
              title: 'Branch Agent Creation',
              path: getNavPath('SUPER_ADMIN', ROUTES.SUPER_ADMIN.USER_MANAGEMENT.BRANCH_AGENT_CREATION),
              icon: Users,
            },
          ],
        },
      ],
    },
    {
      title: 'Master Data',
      path: '/super_admin/master',
      icon: master,
      subMenus: [
        {
          title: 'Rate Master',
          path: '/super_admin/master/rate-master/rate-margin',
          icon: TrendingUp,
          subMenus: [
            { title: 'Remittance', path: '/super_admin/master/rate-master/remittance', icon: TrendingUp },
            { title: 'Holiday List', path: '/super_admin/master/rate-master/holiday-list', icon: TrendingUp },
            { title: 'Live Rates', path: '/super_admin/master/rate-master/live-rates', icon: TrendingUp },
          ],
        },
        {
          title: 'Purpose Master',
          path: getNavPath('SUPER_ADMIN', ROUTES.SUPER_ADMIN.MASTER.PURPOSE_MASTER),
          icon: Target,
        },
        {
          title: 'Document Master',
          path: getNavPath('SUPER_ADMIN', ROUTES.SUPER_ADMIN.MASTER.DOCUMENT_MASTER),
          icon: FileText,
        },
        {
          title: 'Document Mapping',
          path: getNavPath('SUPER_ADMIN', ROUTES.SUPER_ADMIN.MASTER.DOCUMENT_MAPPING),
          icon: Link,
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
