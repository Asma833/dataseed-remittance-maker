import React from 'react';
import { Menu, Power, ChevronLeft } from 'lucide-react';
import LogoutWrapper from '@/features/auth/components/logout-wrapper';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { cn } from '@/utils/cn';
import SidebarToggle from '@/components/common/sidebar-toggle';
import Logo from '@/components/logo/Logo';

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (isCollapsed: boolean) => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed, className }) => {
  return (
    <nav className={cn(`bg-secondary fixed top-0 right-0 h-[70px] z-[9999]`, className)}>
      <div className="sm:px-6 lg:px-6 flex items-center h-16">
        {/* <SidebarToggle collapsed={collapsed} setCollapsed={setCollapsed} /> */}
        <Logo />

        {/* Notification and Logout Buttons (Right) */}
        <div className="flex items-center space-x-4 ml-auto">
          <ThemeToggle />
          <LogoutWrapper>
            <button className="p-2 rounded-full hover:bg-muted/20">
              <Power className="w-5 h-5 text-foreground" />
            </button>
          </LogoutWrapper>
        </div>
      </div>
    </nav>
  );
};

export default Header;
