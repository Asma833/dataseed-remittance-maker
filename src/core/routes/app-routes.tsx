import { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRoutes } from './routes';
import { DEFAULT_ROUTES } from '@/core/constant/manage-default-routes';
import { UserRole } from '@/features/auth/types/auth.types';
import { RootState } from '@/store';
import NotFoundPage from '@/components/common/not-found-page';
import UnauthorizedPage from '@/components/common/unauthorize-page';
import { ProtectedRoute } from './protected-routes';
import { SuperAdminRoutes } from './user-routes/super-admin-routes';

export const AppRoutes = () => {
  const selectUser = useMemo(() => (state: RootState) => state.auth.user, []);
  const user = useSelector(selectUser);
  const getDefaultRoute = (userRole?: UserRole | null) =>
    userRole ? (DEFAULT_ROUTES[userRole] ?? '/login') : '/login';

  return (
    <Routes>
      {publicRoutes.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
      <Route
        path="/super_admin/*"
        element={
          <ProtectedRoute>
            <SuperAdminRoutes />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to={getDefaultRoute(user?.roles[0]?.role_name as UserRole)} replace />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
