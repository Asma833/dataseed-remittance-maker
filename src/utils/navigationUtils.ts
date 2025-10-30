import { NavigateFunction } from 'react-router-dom';
import { getNavPath } from '@/core/constant/route-paths';

export const navigateWithRole = (navigate: NavigateFunction, role: string | undefined, route: string, state?: any) => {
  if (!role) return;
  const path = getNavPath(role.toUpperCase() as 'ADMIN' | 'BRANCH_AGENT_CHECKER', route);
  navigate(path, { state });
};
