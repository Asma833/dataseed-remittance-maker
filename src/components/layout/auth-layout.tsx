import { useEffect, useState } from 'react';
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
    <div className="min-h-screen w-full flex flex-col justify-between bg-gradient">
      {/* Main content */}
      <div className="h-full w-full flex items-center justify-between flex-1 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[65%] mx-auto">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative w-full py-4 px-4 sm:px-6 flex items-center justify-center">
        {/* Center text */}
        <p className="text-white text-xs sm:text-sm text-center">© EbixCash. All rights reserved</p>

        {/* Right aligned powered by */}
        <div className="absolute right-4 sm:right-6 bottom-4 hidden sm:block">
          <PoweredBy />
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
