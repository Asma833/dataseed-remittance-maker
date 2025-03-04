
const userPrefix = "/maker";

import { LayoutDashboard, ClipboardList } from "lucide-react";

export const MakerSideNavItems = [
  { title: "User", path: `${userPrefix}/users`, icon: LayoutDashboard },
  { title: "Reports", path: `${userPrefix}/reports`, icon: ClipboardList }, 
];
