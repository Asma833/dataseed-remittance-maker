import { DollarSign, Send } from 'lucide-react';
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
      icon: DollarSign,
      subMenus: [
        {
          title: 'Remittance',
          path: getNavPath('BRANCH_AGENT_MAKER', ROUTES.BRANCH_AGENT_MAKER.TRANSACTION.CREATE_TRANSACTION),
          icon: Send,
          subMenus: [
            {
              title: 'Create Transaction',
              path: '/branch_agent_maker/transaction/create-transactions',
            },
            {
              title: 'KYC Upload',
              path: '/branch_agent_maker/transaction/kyc',
            },
            {
              title: 'Payment Status',
              path: '/branch_agent_maker/transaction/payment',
            },
            {
              title: 'View All Transactions',
              path: '/branch_agent_maker/transaction/approved-deals',
            },
          ],
        },
      ],
    },
  ] as NavigationItem[],
};

// Helper function to get navigation items by role
export const getNavigationItemsByRole = (role: string): NavigationItem[] => {
  const normalizedRole = role.toUpperCase();
  return SideNavOptions[normalizedRole as keyof typeof SideNavOptions] || [];
};
