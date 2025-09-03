import { Routes, Route } from 'react-router-dom';
import { adminRoutes } from '../routes';
import { ProtectedRoute } from '../protected-routes';
import SidebarLayout from '@/components/layout/sidebar-layout';
import NotFoundPage from '@/components/common/not-found-page';

export const AdminRoutes = () => {
  return (
    <Routes>
      {adminRoutes.map(({ path, element: Element, roles, permission }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute roles={roles} permission={permission}>
              <SidebarLayout>
                <Element
                  setDialogTitle={() => {}}
                  rowData={null}
                  refetch={() => {}}
                  setIsModalOpen={() => {}}
                />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
      ))}
      <Route
        path="*"
        element={
          <SidebarLayout>
            <NotFoundPage />
          </SidebarLayout>
        }
      />
    </Routes>
  );
};
