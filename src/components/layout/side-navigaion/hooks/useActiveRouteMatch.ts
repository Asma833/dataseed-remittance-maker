// hooks/useActiveRouteMatch.ts
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export interface NavLikeItem {
  title: string;
  path?: string;
  subMenus?: NavLikeItem[];
}

const normalize = (p?: string) => (p ?? '').replace(/\/+$/, '');

export function useActiveRouteMatch<T extends NavLikeItem>(navItems: T[] | undefined) {
  const location = useLocation();
  const current = normalize(location.pathname);

  const isParentActive = (item: T) => {
    const parent = normalize(item.path);
    if (!parent) return false;
    return current === parent || current.startsWith(parent + '/');
  };

  const isSubmenuActive = (submenu: T) => {
    const sub = normalize(submenu.path);
    if (!sub) return false;
    return current === sub || current.startsWith(sub + '/');
  };

  const currentParent = useMemo(() => {
    if (!navItems) return null;
    return (
      navItems.find((item) => {
        const parentHit = isParentActive(item);
        const subHit = item.subMenus?.some((s) => isSubmenuActive(s as T));
        return parentHit || subHit;
      }) ?? null
    );
  }, [current, navItems]); // eslint-disable-line react-hooks/exhaustive-deps

  return { location, isParentActive, isSubmenuActive, currentParent };
}
