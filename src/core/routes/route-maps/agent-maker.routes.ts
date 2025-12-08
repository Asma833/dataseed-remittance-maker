import { lazy } from 'react';
import { RouteConfig } from '@/types/route.types';
import { getTabsFromRoute } from '@/utils/routeUtils';

export const makerComponents = {
  TransactionPage: lazy(() => import('@/features/maker/pages/transaction/remittance/page')),
  CreateTransactions: lazy(
    () => import('@/features/maker/components/transaction/tabs/create-transactions-tab/create-transactions')
  ),
  KYCUpload: lazy(() => import('@/features/maker/components/transaction/tabs/kyc-upload-tab/kyc-upload')),
  PaymentStatus: lazy(() => import('@/features/maker/components/transaction/tabs/payment-tab/payment')),
  ViewAllTransactions: lazy(
    () => import('@/features/maker/components/transaction/tabs/view-all-tab/view-all-transactions')
  ),
};

const baseRole = 'branch_agent_maker';

export const agentMakerRoutes: RouteConfig[] = [
  {
    path: '/transaction/*',
    element: makerComponents.TransactionPage,
    roles: [baseRole],
    permission: '',
    subRoutes: [
      {
        path: 'create-transactions',
        label: 'Create Transactions',
        element: makerComponents.CreateTransactions,
        permission: '',
      },
      {
        path: 'kyc',
        label: 'KYC Upload',
        element: makerComponents.KYCUpload,
        permission: '',
      },
      {
        path: 'payment',
        label: 'Payment Status',
        element: makerComponents.PaymentStatus,
        permission: '',
      },
      {
        path: 'approved-deals',
        label: 'View All Transactions',
        element: makerComponents.ViewAllTransactions,
        permission: '',
      },
    ],
  },
];

// Export the transaction tabs for use in components
export const getTransactionTabs = () => {
  return getTabsFromRoute('/transaction/*', agentMakerRoutes);
};
