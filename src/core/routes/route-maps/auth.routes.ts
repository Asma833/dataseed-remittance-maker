import { lazy } from 'react';
import { ROUTES } from '../../constant/route-paths';

// prettier-ignore
const authComponents = {
  Login: lazy(() => import("@/features/auth/pages/login/login-page")),
  ResetPasswordPage: lazy(() => import("@/features/auth/pages/reset-password/reset-password-page")),
  SendEmail: lazy(() => import("@/features/auth/pages/send-email/send-email-page")),
  ResetConfirmation: lazy(() => import("@/features/auth/pages/send-email/reset-link-confirmation-alert")),
  ResetPassword: lazy(() => import("@/features/auth/pages/reset-password/reset-password-page"))
};

const baseRole = '*'; // Public routes are accessible to all roles

export const publicRoutes = [
  {
    path: ROUTES.AUTH.LOGIN,
    element: authComponents.Login,
    roles: [baseRole],
  },
  {
    path: ROUTES.AUTH.FORGET_PASSWORD,
    element: authComponents.ResetPasswordPage,
    roles: [baseRole],
  },
  {
    path: ROUTES.AUTH.SEND_PASSWORD_RESET,
    element: authComponents.SendEmail,
    roles: [baseRole],
  },
  {
    path: ROUTES.AUTH.RESET_LINK_CONFIRMATION,
    element: authComponents.ResetConfirmation,
    roles: [baseRole],
  },
  {
    path: ROUTES.AUTH.RESET_PASSWORD,
    element: authComponents.ResetPassword,
    roles: [baseRole],
  },
];
