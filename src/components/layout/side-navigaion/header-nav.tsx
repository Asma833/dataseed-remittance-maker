import React from 'react';
// import { ThemeToggle } from '@/components/common/theme-toggle';
import { cn } from '@/utils/cn';
import Logo from '@/components/logo/Logo';
import UserMenu from '@/components/ui/user-menu';

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (isCollapsed: boolean) => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed, className }) => {
  return (
    <nav className={cn(`fixed top-0 right-0 h-[70px]`, className)}>
      <div className="sm:px-6 lg:px-6 flex items-center h-12 pt-4">
        <Logo />
        <div className="flex items-center space-x-4 ml-auto">
          {/* <ThemeToggle /> */}
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Header;
