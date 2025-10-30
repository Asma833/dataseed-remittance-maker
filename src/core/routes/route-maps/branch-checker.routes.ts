import { ROLES, ROUTES } from '@/core/constant/route-paths';
import type { RouteConfig } from '@/types/route.types';

import { CreateSuperChecker } from '@/features/remittance/user-management/super-checker/form/super-checker-creation';
import SuperCheckerTablePage from '@/features/remittance/user-management/super-checker/table/page';
import BranchAgentsPage from '@/features/remittance/user-management/branch-agents/table/table.component';
import { CreateBranchAgent } from '@/features/remittance/user-management/branch-agents/form/branch-agent-creation';
import TransactionPage from '@/features/remittance/master/rate-master/Page';
import Remittance from '@/features/remittance/master/rate-master/tabs/remittance/remittance-table';
import { getTabsFromRoute } from '@/utils/routeUtils';
import LiveRates from '@/features/remittance/master/rate-master/tabs/live-rates/LiveRates';
import HolidayList from '@/features/remittance/master/rate-master/tabs/holiday-list/table/holiday-list';
import Card from '@/features/remittance/master/rate-master/tabs/card/card-page';
import Currency from '@/features/remittance/master/rate-master/tabs/currency/Currency';
import PurposeMasterTablePage from '@/features/remittance/master/purpose-master/table/purpose-master-table-page';
import CreatePurposeMasterPage from '@/features/remittance/master/purpose-master/form/create-purpose-master-page';
import DocumentMasterTablePage from '@/features/remittance/master/document/table/document-master-table-page';
import AdminAgentList from '@/features/remittance/user-management/agent-admin-table/table/page';
import AgentAdminCreation from '@/features/remittance/user-management/agent-admin-table/form/agent-admin-creation';
import DocumentMappingTable from '@/features/remittance/master/document-mapping/table/document-mapping-table';

const baseRole = ROLES.BRANCH_AGENT_CHECKER; // Admin routes are accessible to admin role

export const branchCheckerRoutes: RouteConfig[] = [
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.USER_MANAGEMENT.AGENT_ADMIN,
    element: AdminAgentList,
    roles: [baseRole],
    permission: 'branch_agent_checker',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.USER_MANAGEMENT.AGENT_ADMIN_CREATION,
    element: AgentAdminCreation,
    roles: [baseRole],
    permission: 'branch_agent_checker',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.AGENT_ADMIN_CREATION_STEPS.BASIC_INFO,
    element: AgentAdminCreation,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.AGENT_ADMIN_CREATION_STEPS.COMPANY_DETAILS,
    element: AgentAdminCreation,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.AGENT_ADMIN_CREATION_STEPS.FINANCE_DETAILS,
    element: AgentAdminCreation,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.AGENT_ADMIN_CREATION_STEPS.DOCUMENTS,
    element: AgentAdminCreation,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.AGENT_ADMIN_CREATION_STEPS.PRODUCT_PURPOSE,
    element: AgentAdminCreation,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.AGENT_ADMIN_CREATION_STEPS.COMMISSION,
    element: AgentAdminCreation,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.AGENT_ADMIN_CREATION_STEPS.CORPORATE_ONBOARDING,
    element: AgentAdminCreation,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.USER_MANAGEMENT.SUPER_CHECKER_TABLE,
    element: SuperCheckerTablePage,
    roles: [baseRole],
    permission: 'branch_agent_checker',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.USER_MANAGEMENT.SUPER_CHECKER_CREATION,
    element: CreateSuperChecker,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.USER_MANAGEMENT.BRANCH_AGENTS,
    element: BranchAgentsPage,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.USER_MANAGEMENT.BRANCH_AGENT_CREATION,
    element: CreateBranchAgent,
    roles: [baseRole],
    permission: '',
  },
  {
    path: '/master/*',
    element: TransactionPage,
    roles: [baseRole],
    permission: '',
    subRoutes: [
      // {
      //   path: ROUTES.BRANCH_AGENT_CHECKER.MASTER.RATE_MASTER.CARD,
      //   label: 'Card',
      //   element: Card,
      //   permission: '',
      // },
      // {
      //   path: ROUTES.BRANCH_AGENT_CHECKER.MASTER.RATE_MASTER.CURRENCY,
      //   label: 'Currency',
      //   element: Currency,
      //   permission: '',
      // },
      {
        path: ROUTES.BRANCH_AGENT_CHECKER.MASTER.RATE_MASTER.REMITTANCE,
        label: 'Remittance',
        element: Remittance,
        permission: '',
      },
      {
        path: ROUTES.BRANCH_AGENT_CHECKER.MASTER.RATE_MASTER.LIVE_RATES,
        label: 'Live Rates',
        element: LiveRates,
        permission: '',
      },
      {
        path: ROUTES.BRANCH_AGENT_CHECKER.MASTER.RATE_MASTER.HOLIDAY_LIST,
        label: 'Holiday List',
        element: HolidayList,
        permission: '',
      },
    ],
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.MASTER.DOCUMENT_MASTER,
    element: DocumentMasterTablePage,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.MASTER.PURPOSE_MASTER,
    element: PurposeMasterTablePage,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.MASTER.CREATE_PURPOSE_MASTER,
    element: CreatePurposeMasterPage,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.MASTER.UPDATE_PURPOSE_MASTER,
    element: CreatePurposeMasterPage,
    roles: [baseRole],
    permission: '',
  },
  {
    path: ROUTES.BRANCH_AGENT_CHECKER.MASTER.DOCUMENT_MAPPING,
    element: DocumentMappingTable,
    roles: [baseRole],
    permission: '',
  },
];
export const getAdminTransactionTabs = () => {
  return getTabsFromRoute('/master/*', branchCheckerRoutes);
};
