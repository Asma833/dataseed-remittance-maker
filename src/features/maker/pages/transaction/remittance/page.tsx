import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import DealBooking from '../../../components/transaction/tabs/deal-booking/DealBooking';
import CreateTransactions from '../../../components/transaction/tabs/create-transactions-tab/CreateTransactions';
import { getTransactionTabs } from '@/core/routes/route-maps/agent-maker.routes';

const TransactionPage = () => {
  const location = useLocation();

  // Determine if we're in admin or maker context
  const isAdminContext = location.pathname.startsWith('/admin');
  const baseRole = isAdminContext ? 'admin' : 'maker';

  // Get appropriate tabs based on context
  const transactionTabs = isAdminContext ? getTransactionTabs() : getTransactionTabs();

  // Check if we're on the base transaction path (show default component)
  const isBasePath =
    location.pathname === `/${baseRole}/transaction` || location.pathname === `/${baseRole}/transaction/`;

  // Default component based on role
  const DefaultComponent = isAdminContext ? CreateTransactions : DealBooking;

  return (
    <div className="w-full">
      <div className="flex justify-between gap-4 px-10">
        {' '}
        {transactionTabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={`/${baseRole}/transaction/${tab.path}`}
            className={({ isActive }) =>
              cn(
                'px-4 py-2 rounded-tl-lg rounded-tr-lg text-sm no-underline transition-colors flex flex-1 justify-center items-center',
                isActive ? 'bg-gray-500 text-white font-bold' : 'bg-primary text-white hover:bg-gray-400'
              )
            }
            end
          >
            {tab.label}
          </NavLink>
        ))}
      </div>{' '}
      <div className="bg-background min-h-[calc(100vh-4rem)] p-8 rounded-lg">
        {isBasePath ? (
          // Show default component when on base path
          <DefaultComponent />
        ) : (
          // Show nested route content
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
