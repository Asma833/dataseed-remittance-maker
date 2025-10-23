import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
// import { getTransactionTabs } from '@/core/routes/route-maps/maker.routes';
import { getAdminTransactionTabs } from '@/core/routes/route-maps/admin.routes';
import LiveRates from './tabs/live-rates/LiveRates';
import Remittance from './tabs/remittance/remittance-table';

const TransactionPage = () => {
  const location = useLocation();

  // Determine role from URL for robustness (admin/maker/checker)
  const baseRole = location.pathname.split('/')[1] || 'admin';
  const isAdminContext = baseRole === 'admin';

  // Tabs for admin (extend similarly for other roles if needed)
  const transactionTabs = getAdminTransactionTabs();

  // Base path for the nested TransactionPage route (no wildcard in pathname)
  const basePath = `/${baseRole}/master*/`;
  const isBasePath = location.pathname === basePath || location.pathname === `${basePath}/`;

  // Default component to render on base path when no sub-route is selected
  const DefaultComponent = isAdminContext ? Remittance : LiveRates;

  return (
    <div className="w-full">
      <div className="flex justify-center items-center px-10">
        <div className="flex justify-center gap-4 flex-wrap">
          {transactionTabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={`/${baseRole}/master/${tab.path}`}
              className={({ isActive }) =>
                cn(
                  'px-4 py-2 rounded text-sm no-underline transition-colors flex justify-center items-center w-44',
                  isActive
                    ? 'bg-primary text-primary-foreground bg-linear-to-r from-primary-gradient-1 to-primary-gradient-2 shadow-sm hover:bg-primary/150'
                    : 'bg-blue-100/70 font-bold hover:bg-blue-100'
                )
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="min-h-[calc(100vh-4rem)] py-4 px-0 rounded-lg">
        {isBasePath ? <DefaultComponent /> : <Outlet />}
      </div>
    </div>
  );
};

export default TransactionPage;
