import React from 'react';
import { Eye, History } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utils/cn';

interface ViewButtonProps {
  onClick: () => void;
  tooltipText: string;
  orderId?: string;
  disabled?: boolean;
  buttonType: 'view_details' | 'view_history';
  buttonIconType: 'view' | 'history';
  className?: string;
}

const ViewButton: React.FC<ViewButtonProps> = ({
  onClick,
  tooltipText,
  orderId,
  disabled = false,
  buttonType,
  buttonIconType,
  className
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onClick();
    }
  };

  // Function to render the appropriate icon
  const renderIcon = () => {
    switch (buttonIconType) {
      case 'view':
        return <Eye size={16} />;
      case 'history':
        return <History size={16} />;
      default:
        return <Eye size={16} />;
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          onClick={handleClick}
          data-button-type={buttonType}
          className={cn(
            'flex items-center justify-center gap-1 px-3 py-1 rounded',
            className
          )}
        >
          {renderIcon()}
        </button>
      </TooltipTrigger>
      <TooltipContent className="bg-secondary text-foreground">
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
};

export default ViewButton;