import { useState } from 'react';
import DashboardContentWrapper from '@/components/common/dashboard-wrapper';
import Header from '@/components/layout/side-navigaion/header-nav';
import SideNav from '@/components/layout/side-navigaion/sidenav';
import { ReactNode } from 'react';
import { getNavigationItemsByRole } from '@/core/constant/manage-sidenav-options';
import { useCurrentUser } from '@/utils/getUserFromRedux';

interface CheckerLayoutProps {
  children: ReactNode;
}

const SidebarLayout = ({ children }: CheckerLayoutProps) => {
  // Keep sidebar open by default, allow collapsing to icon-only
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { getUserRole } = useCurrentUser();

  // Get navigation items based on user role
  const userRole = getUserRole() || '';
  const navigationItems = getNavigationItemsByRole(userRole);

  return (
    <div className="flex min-h-screen bg-[var(--color-dashboard-bg)] ">
      <div className="fixed top-0 left-0 h-full z-50 p-2">
        <SideNav navItems={navigationItems} collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <Header collapsed={collapsed} setCollapsed={setCollapsed} className="fixed top-0 w-full bg-white" />
      <main
        className={`flex-1 h-[calc(98vh-50px)] mt-[50px] pb-[5px] overflow-y-auto transition-all ${
          collapsed ? 'ml-20' : 'ml-[210px]'
        }`}
      >
        <DashboardContentWrapper>{children}</DashboardContentWrapper>
      </main>
    </div>
  );
};

export default SidebarLayout;
