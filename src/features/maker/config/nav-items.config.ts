import { SideNavOptions as navOptions, getNavigationItemsByRole } from '@/core/constant/manage-sidenav-options';

// Legacy export for backward compatibility (deprecated - use navOptions.checker instead)
export const NavItems = navOptions.maker;

// Recommended approach: Use the centralized navigation management
export { navOptions, getNavigationItemsByRole };
