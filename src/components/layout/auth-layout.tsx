import { useEffect, useState } from 'react';
import LogoHeader from '@/components/common/logo-header';
import PoweredBy from './footer/powered-by';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-start bg-gradient">
      {/* <LogoHeader /> */}
      <div className="h-full w-full flex items-center justify-between flex-1">
        <div className="max-w-[70%] mx-auto w-full">
          {children}
        </div>
      </div>
      {/* <PoweredBy /> */}
    </div>
  );
};

export default AuthLayout;
