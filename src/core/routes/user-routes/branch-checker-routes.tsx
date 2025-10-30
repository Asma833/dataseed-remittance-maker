import { Routes, Route } from 'react-router-dom';
import { branchCheckerRoutes } from '../route-maps/branch-checker.routes';
import { ProtectedRoute } from '../protected-routes';
import SidebarLayout from '@/components/layout/sidebar-layout';
import NotFoundPage from '@/components/common/not-found-page';

export const BranchCheckerRoutes = () => {
  return (
    <Routes>
      {branchCheckerRoutes.map(({ path, element: Element, roles, permission, subRoutes }) => {
        console.log("branchCheckerRoutes",branchCheckerRoutes)
        // Make child paths relative to /branchCheckerRoutes/*
        const normalizedPath = path.replace(/^\//, '');

        // If route has subRoutes, render nested routes under the parent
        if (subRoutes && subRoutes.length > 0) {
          return (
            <Route
              key={path}
              path={normalizedPath}
              element={
                <ProtectedRoute roles={roles} {...(permission ? { permission } : {})}>
                  <SidebarLayout>
                    <Element />
                  </SidebarLayout>
                </ProtectedRoute>
              }
            >
              {subRoutes.map(({ path: subPath, element: SubElement }) => (
                <Route key={subPath} path={subPath} element={<SubElement />} />
              ))}
            </Route>
          );
        }

        // Simple route without subRoutes
        return (
          <Route
            key={path}
            path={normalizedPath}
            element={
              <ProtectedRoute roles={roles} {...(permission ? { permission } : {})}>
                <SidebarLayout>
                  <Element />
                </SidebarLayout>
              </ProtectedRoute>
            }
          />
        );
      })}
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
