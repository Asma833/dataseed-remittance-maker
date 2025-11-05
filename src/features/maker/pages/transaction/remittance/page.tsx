import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import DealBooking from '../../../components/transaction/tabs/deal-booking/DealBooking';
import CreateTransactions from '../../../components/transaction/tabs/create-transactions-tab/CreateTransactions';
import { getTransactionTabs } from '@/core/routes/route-maps/agent-maker.routes';

const TransactionPage = () => {
  const location = useLocation();

  // Determine if we're in admin or maker context
  const isAdminContext = location.pathname.startsWith('/branch_agent_maker');
  const baseRole = "branch_agent_maker";

  // Get appropriate tabs based on context
  const transactionTabs = isAdminContext ? getTransactionTabs() : getTransactionTabs();

  // Check if we're on the base transaction path (show default component)
  const isBasePath =
    location.pathname === `/${baseRole}/transaction` || location.pathname === `/${baseRole}/transaction/`;

  // Default component based on role
  const DefaultComponent = isAdminContext ? CreateTransactions : DealBooking;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between gap-2 px-4 md:px-6 text-center">
        {' '}
        {transactionTabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={`/${baseRole}/transaction/${tab.path}`}
            className={({ isActive }) =>
              cn(
                'px-2 py-2 rounded-tl-md rounded-tr-md text-sm no-underline transition-colors flex flex-1 justify-center items-center hover:opacity-80',
                isActive ? 'text-white font-bold' : 'bg-gray-500 text-white hover:bg-gray-500/80'
              )
            }
            style={({ isActive }) => ({
              background: isActive ? 'linear-gradient(90deg, #85308E 0%, #D62058 100%)' : undefined,
            })}
            end
          >
            {tab.label}
          </NavLink>
        ))}
      </div>{' '}
      <div className="bg-background min-h-[calc(100vh-4rem)] p-4 rounded-lg w-full">
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
