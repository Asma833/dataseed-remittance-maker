import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import Logo from '@/components/logo/Logo';
import { NavigationItem } from '@/core/constant/manageSideNavOptions';
import themeConfig from '@/core/configs/theme-config';
import SidebarToggle from '@/components/common/SidebarToggle';

interface SidebarProps {
  navItems: NavigationItem[];
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const currentItem = navItems.find((item) => item.path === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.title);
    }
  }, [location.pathname, navItems]);

  const handleNavigation = (path: string, itemTitle: string) => {
    setActiveItem(itemTitle);
    navigate(path);
  };

  return (
    <aside
      className={cn(
        'bg-[--sidenav-bg] h-screen fixed top-0 left-0 flex flex-col transition-all z-30',
        collapsed ? 'w-20' : 'w-50',
        { 'bg-gradient-to-b sidenav-main': themeConfig.sidebar.isGradient }
      )}
    >
      {/* Sidebar Logo */}
      <div className={cn('mb-1 mt-4 flex items-center', collapsed ? 'justify-center' : 'pl-4')}>
        <Logo className="invert-in-dark" />
      </div>
      {/* Navigation List */}
      <nav className="px-3 mt-8">
        <ul className="space-y-1">
          <li className='list-none relative h-3'>
            {' '}
            <SidebarToggle collapsed={collapsed} setCollapsed={setCollapsed} />
          </li>
          {navItems.map((item, idx) => (
            <li key={idx} className="list-none">
              <a
                onClick={() => item.path && handleNavigation(item.path, item.title)}
                className={cn(
                  'flex items-center my-1 w-full cursor-pointer transition-colors text-sm px-2',
                  activeItem === item.title ? 'sidemenu-active-menu text-white' : 'hover:bg-muted/20',
                  collapsed ? 'gap-0 justify-center py-3' : 'gap-3 py-2',
                  item.disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                {!collapsed && <span className="truncate text-[13px]">{item.title}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
