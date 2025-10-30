// components/sidebar/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import themeConfig from '@/core/configs/theme-config';
import PoweredBy from '../footer/powered-by';
import { useActiveRouteMatch } from './hooks/useActiveRouteMatch';

export interface NavigationItem {
  title: string;
  path?: string;
  icon?: string | React.ComponentType<any>;
  disabled?: boolean;
  subMenus?: NavigationItem[];
}

interface SidebarProps {
  navItems: NavigationItem[];
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  className?: string;
  parentActiveClass?: string;
  childActiveClass?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  navItems,
  collapsed,
  setCollapsed,
  className,
  parentActiveClass = 'sidemenu-active-menu text-white',
  childActiveClass = 'active',
}) => {
  const navigate = useNavigate();
  const { location, isParentActive, isSubmenuActive } = useActiveRouteMatch(navItems);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  useEffect(() => {
    setOpenDropdowns((prev) => {
      const next = new Set(prev);
      navItems.forEach((item) => {
        const shouldOpen = isParentActive(item) || item.subMenus?.some((submenu) => isSubmenuActive(submenu));
        if (shouldOpen) next.add(item.title);
      });
      return next;
    });
  }, [location.pathname, navItems]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNavigation = (path?: string) => path && navigate(path);

  const toggleDropdown = (title: string, hasSub: boolean) => {
    if (!hasSub) return;
    setOpenDropdowns((prev) => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  };

  return (
    <aside
      className={cn(
        'bg-[--sidenav-bg] h-[calc(100vh-60px)] fixed bottom-0 left-0 flex flex-col transition-all z-30 rounded-2xl m-1',
        collapsed ? 'w-20' : 'w-50',
        themeConfig.sidebar.isGradient && 'bg-gradient-to-b sidenav-main',
        className
      )}
    >
      <nav className="px-3 mt-8">
        <ul className="space-y-1">
          {navItems.map((item, idx) => {
            const hasSub = !!item.subMenus?.length;
            const parentActive = isParentActive(item) || item.subMenus?.some((s) => isSubmenuActive(s));

            return (
              <li key={idx} className="list-none">
                <div
                  onClick={() => (hasSub ? toggleDropdown(item.title, true) : handleNavigation(item.path))}
                  className={cn(
                    'flex items-center my-1 w-full cursor-pointer transition-colors text-sm px-2',
                    parentActive ? parentActiveClass : 'hover:bg-muted/20 rounded-3xl',
                    collapsed ? 'gap-0 justify-center py-3' : 'gap-3 py-2 justify-between',
                    item.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <div className={cn('flex items-center', collapsed ? 'gap-0' : 'gap-2')}>
                    {typeof item.icon === 'string' ? (
                      <img src={item.icon} className="h-5 w-5 flex-shrink-0" />
                    ) : item.icon ? (
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                    ) : null}
                    {!collapsed && <span className="truncate text-[13px]">{item.title}</span>}
                  </div>
                  {!collapsed && hasSub && (
                    <div className="ml-auto">
                      {openDropdowns.has(item.title) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  )}
                </div>

                {!collapsed && hasSub && openDropdowns.has(item.title) && (
                  <ul className="mt-1 space-y-1">
                    {item.subMenus!.map((submenu, subIdx) => {
                      const childActive = isSubmenuActive(submenu);
                      return (
                        <li key={subIdx} className="list-none">
                          <div
                            onClick={() => handleNavigation(submenu.path)}
                            className={cn(
                              'submenu-item flex items-center gap-2 px-3 py-2 rounded-3xl text-[12px] cursor-pointer transition-colors',
                              childActive ? childActiveClass : 'hover:bg-muted/20 text-muted-foreground',
                              submenu.disabled && 'opacity-50 cursor-not-allowed'
                            )}
                          >
                            {typeof submenu.icon === 'string' ? (
                              <img src={submenu.icon} className="h-4 w-4 flex-shrink-0" />
                            ) : submenu.icon ? (
                              <submenu.icon className="h-4 w-4 flex-shrink-0" />
                            ) : null}
                            <span className="truncate">{submenu.title}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto w-full px-3 pb-4">
        <div className={cn('w-full flex items-center justify-center', 'flex-col gap-1 scale-75')}>
          <PoweredBy />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
