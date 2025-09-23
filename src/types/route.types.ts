import { LazyExoticComponent, ComponentType, JSX } from 'react';

// Accept both lazy and non-lazy React components as route elements
export type RouteElement = ComponentType<any> | LazyExoticComponent<ComponentType<any>>;

// Sub-route configuration for nested routes
export interface SubRoute {
  path: string;
  element: RouteElement;
  permission?: string | undefined;
  roles?: string[] | undefined;
  label?: string | undefined;
}

// Main route configuration
export interface RouteConfig {
  path: string;
  element: RouteElement;
  roles: string[];
  permission?: string | undefined;
  subRoutes?: SubRoute[] | undefined;
}

// Type for the route mapping functions
export type RouteRenderer = (route: RouteConfig) => JSX.Element;
