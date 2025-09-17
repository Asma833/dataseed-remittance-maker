import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * NotificationBanner - A reusable notification banner component
 *
 * @example
 * // Basic warning notification
 * <NotificationBanner message="Newly created checkers active by default" />
 *
 * @example
 * // Success notification with custom icon
 * <NotificationBanner
 *   message="Operation completed successfully"
 *   variant="success"
 *   icon={<CheckCircle className="h-5 w-5" />}
 * />
 *
 * @example
 * // Info notification without icon
 * <NotificationBanner
 *   message="Please review your information"
 *   variant="info"
 *   showIcon={false}
 * />
 *
 * @example
 * // Large error notification
 * <NotificationBanner
 *   message="An error occurred while processing your request"
 *   variant="error"
 *   size="lg"
 * />
 */
interface NotificationBannerProps {
  message: string;
  variant?: 'default' | 'warning' | 'info' | 'success' | 'error';
  showIcon?: boolean;
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const NotificationBanner = ({
  message,
  variant = 'warning',
  showIcon = true,
  icon,
  className,
  size = 'sm'
}: NotificationBannerProps) => {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    warning: 'bg-[#FFF2E3] text-amber-600',
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800'
  };

  const sizeStyles = {
    sm: 'text-sm p-2',
    md: 'text-base p-3',
    lg: 'text-lg p-4'
  };

  const defaultIcon = <AlertCircle className="h-5 w-5" />;

  return (
    <div
      className={cn(
        'w-fit rounded-md flex items-start justify-center gap-2',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {showIcon && (icon || defaultIcon)}
      {message}
    </div>
  );
};