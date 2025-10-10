import { RouteConfig, SubRoute } from '@/types/route.types';

/**
 * Utility functions for route matching and navigation
 */
/**
 * Get all routes that have subRoutes from multiple route configurations
 */
export const getRoutesWithSubRoutes = (routeConfigs: RouteConfig[][]): RouteConfig[] => {
  const allRoutes = routeConfigs.flat();
  return allRoutes.filter((route) => route.subRoutes && route.subRoutes.length > 0);
};

/**
 * Check if a current path matches any subRoute of the given routes
 * Returns the base route if match is found
 */
export const findParentRouteForSubRoute = (
  currentPath: string,
  routesWithSubRoutes: RouteConfig[]
): RouteConfig | null => {
  for (const route of routesWithSubRoutes) {
    // Extract base path from route (e.g., '/transaction/*' -> '/transaction')
    const routePath = route.path.replace('/*', '');

    // Determine the role prefix based on current path
    const rolePrefix = currentPath.startsWith('/admin')
      ? '/admin'
      : currentPath.startsWith('/maker')
        ? '/maker'
        : currentPath.startsWith('/checker')
          ? '/checker'
          : '';

    const fullBasePath = rolePrefix + routePath;

    // Check if current path starts with the base path
    if (currentPath.startsWith(fullBasePath)) {
      return route;
    }
  }
  return null;
};

/**
 * Extract tabs/subRoutes from a route configuration
 */
export const getTabsFromRoute = (routePath: string, routes: RouteConfig[]): SubRoute[] => {
  const route = routes.find((r) => r.path === routePath);
  return route?.subRoutes ?? [];
};

/**
 * Generate navigation paths for subRoutes
 */
export const generateSubRoutePaths = (basePath: string, subRoutes: any[]) => {
  return subRoutes.map((subRoute) => ({
    ...subRoute,
    fullPath: `${basePath}/${subRoute.path}`,
  }));
};

/**
 * Check if a route has subRoutes
 */
export const hasSubRoutes = (route: RouteConfig): boolean => {
  return Boolean(route.subRoutes && route.subRoutes.length > 0);
};

/**
 * Get all possible paths for a route (including subRoutes)
 */
export const getAllRoutePaths = (route: RouteConfig, rolePrefix: string = ''): string[] => {
  const basePath = rolePrefix + route.path.replace('/*', '');
  const paths = [basePath];

  if (route.subRoutes) {
    route.subRoutes.forEach((subRoute) => {
      paths.push(`${basePath}/${subRoute.path}`);
    });
  }

  return paths;
};

/**
 * Find route configuration by path (including subRoutes)
 */
export const findRouteByPath = (
  targetPath: string,
  routes: RouteConfig[],
  rolePrefix: string = ''
): { route: RouteConfig; isSubRoute: boolean; subRoute?: any } | null => {
  for (const route of routes) {
    const basePath = rolePrefix + route.path.replace('/*', '');

    // Check if it's a direct match to the main route
    if (basePath === targetPath) {
      return { route, isSubRoute: false };
    }

    // Check if it matches any subRoute
    if (route.subRoutes) {
      for (const subRoute of route.subRoutes) {
        const subRoutePath = `${basePath}/${subRoute.path}`;
        if (subRoutePath === targetPath) {
          return { route, isSubRoute: true, subRoute };
        }
      }
    }
  }

  return null;
};
