import { lazy } from 'react';
import { ROUTES } from '../../constant/routePaths';

export const makerComponents = {
  CreateTransaction: lazy(
    () => import('@/features/maker/pages/create-transaction/CreateTransaction')
  ),
  ViewStatus: lazy(
    () => import('@/features/maker/pages/view-status/VIewStatus')
  ),
};
export const makerRoutes = [
  {
    path: ROUTES.MAKER.VIEW_STATUS,
    element: makerComponents.CreateTransaction,
    roles: ['maker'],
    permission: '',
  },
  {
    path: ROUTES.MAKER.CREATE_TRANSACTION,
    element: makerComponents.ViewStatus,
    roles: ['maker'],
    permission: '',
  },
];
