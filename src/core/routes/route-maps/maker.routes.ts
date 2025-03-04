import { lazy } from "react";
import { ROUTES } from "../constants";

const makerComponents = {
    User: lazy(() => import("@/features/maker/pages/n-user/n-user-table/NUserCreationTable")),
    UserCreation : lazy(()=> import("@/features/maker/pages/n-user/user-creation-form/page"))
  }
export const makerRoutes = [
  {
    path: ROUTES.ADMINNEW.NUSER,
    element: makerComponents.User,
    roles: ["maker", "co-admin"],
    permission: "view_dashboard",
  },
  {
    path: ROUTES.ADMINNEW.CREATEUSER,
    element: makerComponents.UserCreation,
    roles: ["maker", "co-admin"],
    permission: "view_dashboard",
  }
 
]