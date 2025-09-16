import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import Logo from '@/components/logo/Logo';
import { NavigationItem } from '@/core/constant/manage-sidenav-options';
import themeConfig from '@/core/configs/theme-config';
import SidebarToggle from '@/components/common/sidebar-toggle';

interface SidebarProps {
  navItems: NavigationItem[];
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  useEffect(() => {
    const currentItem = navItems.find((item) => {
      // Check if current path matches main item or any submenu
      if (item.path === location.pathname) return true;
      if (item.subMenus) {
        return item.subMenus.some(submenu => submenu.path === location.pathname);
      }
      return false;
    });
    
    if (currentItem) {
      setActiveItem(currentItem.title);
      // If current path is in a submenu, keep that dropdown open
      if (currentItem.subMenus?.some(submenu => submenu.path === location.pathname)) {
        setOpenDropdowns(prev => new Set(prev).add(currentItem.title));
      }
    }
  }, [location.pathname, navItems]);

  const handleNavigation = (path: string, itemTitle: string) => {
    setActiveItem(itemTitle);
    navigate(path);
  };

  const toggleDropdown = (itemTitle: string, hasSubmenus: boolean) => {
    if (!hasSubmenus) return;
    
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle);
      } else {
        newSet.add(itemTitle);
      }
      return newSet;
    });
  };

  const isSubmenuActive = (submenu: NavigationItem) => {
    return location.pathname === submenu.path;
  };

  return (
    <aside
      className={cn(
        'bg-[--sidenav-bg] h-[calc(100vh-60px)] fixed bottom-0 left-0 flex flex-col transition-all z-30 rounded-2xl m-1',
        collapsed ? 'w-20' : 'w-50',
        { 'bg-gradient-to-b sidenav-main': themeConfig.sidebar.isGradient }
      )}
    >
      {/* Navigation List */}
      <nav className="px-3 mt-8">
        <ul className="space-y-1">
          <li className='list-none relative'>
            {' '}
            <SidebarToggle collapsed={collapsed} setCollapsed={setCollapsed} />
          </li>
          {navItems.map((item, idx) => (
            <li key={idx} className="list-none">
              {/* Main Menu Item */}
              <div
                onClick={() => {
                  if (item.subMenus && item.subMenus.length > 0) {
                    toggleDropdown(item.title, true);
                  } else if (item.path) {
                    handleNavigation(item.path, item.title);
                  }
                }}
                className={cn(
                  'flex items-center my-1 w-full cursor-pointer transition-colors text-sm px-2',
                  activeItem === item.title ? 'sidemenu-active-menu text-white' : 'hover:bg-muted/20 rounded-3xl',
                  collapsed ? 'gap-0 justify-center py-3' : 'gap-3 py-2 justify-between',
                  item.disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div className={cn('flex items-center', collapsed ? 'gap-0' : 'gap-3')}>
                  {item.icon && <img src={item.icon} className="h-5 w-5 flex-shrink-0"/>}
                  {!collapsed && <span className="truncate text-[13px]">{item.title}</span>}
                </div>
                {/* Dropdown Arrow - only show if not collapsed and has submenus */}
                {!collapsed && item.subMenus && item.subMenus.length > 0 && (
                  <div className="ml-auto">
                    {openDropdowns.has(item.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                )}
              </div>

              {/* Submenu Items */}
              {!collapsed && item.subMenus && item.subMenus.length > 0 && openDropdowns.has(item.title) && (
                <ul className="ml-4 mt-1 space-y-1 border-l border-muted/20">
                  {item.subMenus.map((submenu, subIdx) => (
                    <li key={subIdx} className="list-none">
                      <div
                        onClick={() => submenu.path && handleNavigation(submenu.path, submenu.title)}
                        className={cn(
                          'submenu-item',
                          isSubmenuActive(submenu)
                            ? 'active'
                            : 'hover:bg-muted/20 text-muted-foreground rounded-3xl',
                          submenu.disabled && 'opacity-50 cursor-not-allowed'
                        )}
                      >
                        {submenu.icon && <submenu.icon className="h-4 w-4 flex-shrink-0" />}
                        <span className="truncate text-[12px]">{submenu.title}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
