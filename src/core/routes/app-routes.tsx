import { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRoutes } from './routes';
import { DEFAULT_ROUTES } from '@/core/constant/manage-default-routes';
import { UserRole } from '@/features/auth/types/auth.types';
import { RootState } from '@/store';
import NotFoundPage from '@/components/common/not-found-page';
import UnauthorizedPage from '@/components/common/unauthorize-page';
// import { AdminRoutes } from './AdminRoutes';
import { ProtectedRoute } from './protected-routes';
import { AdminRoutes } from './user-routes/admin-routes';
import { BranchCheckerRoutes } from './user-routes/branch-checker-routes';

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
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRoutes />
          </ProtectedRoute> 
         
        }
      />
       <Route
        path="/branch_agent_checker/*"
        element={
          <ProtectedRoute>
            <BranchCheckerRoutes/>
          </ProtectedRoute> 
         
        }
      />
      <Route path="/" element={<Navigate to={getDefaultRoute(user?.roles[0]?.role_name as UserRole)} replace />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
