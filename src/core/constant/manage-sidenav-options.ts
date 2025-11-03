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
  maker: [
    {
      title: 'Master Data',
      path: '/maker/master',
      icon: master,
      subMenus: [
        {
          title: 'Rate Master',
          path: '/maker/master/rate-master/rate-margin',
          icon: TrendingUp,
          subMenus: [
            { title: 'Remittance', path: '/maker/master/rate-master/remittance', icon: TrendingUp },
            { title: 'Holiday List', path: '/maker/master/rate-master/holiday-list', icon: TrendingUp },
            { title: 'Live Rates', path: '/maker/master/rate-master/live-rates', icon: TrendingUp },
          ],
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
