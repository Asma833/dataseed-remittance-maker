import { useEffect, useState } from "react";
import PoweredBy from "./footer/powered-by";

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
      <div className="h-full w-full flex items-center justify-between flex-1">
        <div className="max-w-[70%] mx-auto w-full">{children}</div>
      </div>

      {/* Footer */}
      <footer className="relative w-full py-4 px-6 flex items-center justify-center">
        {/* Center text */}
        <p className="text-white text-sm text-center">
          © EbixCash. All rights reserved
        </p>

        {/* Right aligned powered by */}
        <div className="absolute right-6 bottom-4">
          <PoweredBy />
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
