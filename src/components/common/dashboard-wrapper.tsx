import { cn } from '@/utils/cn';
import PageTitle from '../layout/titles/page-title';
import { DashboardContentWrapperProps } from '../types/common-components.types';
import PoweredBy from '../layout/footer/powered-by';

const DashboardContentWrapper = ({ children, className }: DashboardContentWrapperProps) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col justify-between items-center px-2 pt-3 min-h-[calc(100vh-70px)]',
        className
      )}
    >
      <div className="w-full flex flex-col items-center">{children}</div>
    </div>
  );
};

export default DashboardContentWrapper;
