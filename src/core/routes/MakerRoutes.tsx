import { Routes, Route } from "react-router-dom";
import { makerRoutes } from "./RoutesConfig";
import { ProtectedRoute } from "./ProtectedRoute";
import NotFoundPage from "@/components/common/NotFoundPage";
import Layout from "@/features/maker/components/Layout";

export const MakerRoutes = () => {
  return (
    
    <Routes>
    {makerRoutes.map(({ path, element: Element, roles, permission }) => (
      <Route
        key={path}
        path={path}
        element={
          <ProtectedRoute roles={roles} permission={permission}>
            <Layout>
              <Element />
            </Layout>
          </ProtectedRoute>
        }
      />
    ))}
    <Route
      path="*"
      element={
        <Layout>
          <NotFoundPage />
        </Layout>
      }
    />
  </Routes>
  );
};
