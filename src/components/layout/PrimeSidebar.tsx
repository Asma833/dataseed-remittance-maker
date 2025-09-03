import { useEffect, useMemo, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/components/logo/Logo';
import { getNavigationItemsByRole } from '@/core/constant/manageSideNavOptions';
import { useCurrentUser } from '@/utils/getUserFromRedux';
import { FiUser, FiUserCheck, FiBookOpen, FiEye, FiClipboard, FiEdit, FiCreditCard } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { cn } from '@/utils/cn';
import themeConfig from '@/core/configs/theme-config';
import SidebarToggle from '../common/SidebarToggle';

type PrimeSidebarProps = {
  visible: boolean;
  onHide: () => void;
  isMobile?: boolean;
};

// A PrimeReact Sidebar-powered side menu that maps existing role-based nav config to PrimeReact Menu items
export default function PrimeSidebar({ visible, onHide, isMobile = false }: PrimeSidebarProps) {
  const { getUserRole } = useCurrentUser();
  const role = getUserRole() || '';
  const nav = getNavigationItemsByRole(role);
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => setActivePath(location.pathname), [location.pathname]);

  const items = useMemo(() => nav, [nav]);
  const iconMap: Record<string, IconType> = useMemo(
    () => ({
      Checker: FiUser,
      Maker: FiUserCheck,
      Master: FiBookOpen,
      'View All Transactions': FiEye,
      Assign: FiClipboard,
      'Update Incident': FiEdit,
      'Completed Transactions': FiCreditCard,
      'Create Transaction': FiClipboard,
      'View Status': FiEye,
    }),
    []
  );

  return (
    <Sidebar
      visible={visible}
      onHide={onHide}
      position="left"
      showCloseIcon={isMobile}
      modal={isMobile}
      blockScroll={isMobile}
      className={cn('p-sidebar-sm')}
    >
      <div className="flex items-center gap-2 mb-4 pl-1">
        <Logo className="invert-in-dark" />
      </div>
      <ul className="list-none p-0 m-0">
        {items.map((n) => {
          const Icon = iconMap[n.title];
          return (
            <li key={n.path} className="my-1">
              <button
                type="button"
                disabled={n.disabled}
                className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted/30 flex items-center gap-2 ${
                  activePath === n.path ? 'bg-primary text-primary-foreground' : ''
                } ${n.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  navigate(n.path);
                  if (window.innerWidth < 1024) onHide();
                }}
              >
                {Icon ? <Icon className="text-base" /> : null}
                <span className="truncate">{n.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </Sidebar>
  );
}
