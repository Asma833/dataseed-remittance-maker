import { NavigateFunction } from 'react-router-dom';
import { getNavPath } from '@/core/constant/route-paths';

export const navigateWithRole = (navigate: NavigateFunction, role: string | undefined, route: string, state?: any) => {
  if (!role) return;
  const path = getNavPath(role.toUpperCase() as 'BRANCH_AGENT_MAKER', route);
  navigate(path, { state });
};
