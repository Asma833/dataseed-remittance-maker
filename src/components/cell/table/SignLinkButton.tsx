import React from 'react';
import { Delete, Download, Edit, Eye, LinkIcon, Plus, RefreshCw, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/utils/clipboard';
import { cn } from '@/utils/cn';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SignLinkButtonProps {
  id?: string;
  copyLinkUrl?: string;
  buttonText?: string;
  toastInfoText?: string;
  disabled?: boolean;
  className?: string;
  tooltipText?: string;
  buttonType?:
    | 'button'
    | 'copy_link'
    | 'refresh'
    | 'remove'
    | 'delete'
    | 'edit'
    | 'view'
    | 'add'
    | 'upload'
    | 'download';
  buttonIconType?:
    | 'button'
    | 'copy_link'
    | 'refresh'
    | 'remove'
    | 'delete'
    | 'edit'
    | 'view'
    | 'add'
    | 'upload'
    | 'download';
  onClick?: () => void;
  loading?: string | boolean;
  iconClassName?: string;
}

export const SignLinkButton: React.FC<SignLinkButtonProps> = ({
  id,
  copyLinkUrl,
  toastInfoText,
  disabled,
  className,
  tooltipText,
  buttonType,
  buttonIconType,
  onClick,
  loading,
  iconClassName,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      if (buttonType === 'copy_link' && copyLinkUrl) {
        copyToClipboard(copyLinkUrl, `${toastInfoText}`);
      }
    }
  };

  const getIcon = () => {
    switch (buttonIconType) {
      case 'copy_link':
        return <LinkIcon className={cn('cursor-pointer', iconClassName)} />;
      case 'refresh':
        return (
          <RefreshCw
            className={cn(
              'cursor-pointer text-inherit',
              loading ? 'animate-spin' : '',
              disabled ? 'text-gray-500' : '',
              iconClassName
            )}
          />
        );
      case 'remove':
        return <X className={cn('cursor-pointer', iconClassName)} />;
      case 'delete':
        return <Delete className={cn('cursor-pointer', iconClassName)} />;
      case 'edit':
        return <Edit className={cn('cursor-pointer', iconClassName)} />;
      case 'view':
        return <Eye className={cn('cursor-pointer', iconClassName)} />;
      case 'add':
        return <Plus className={cn('cursor-pointer', iconClassName)} />;
      case 'upload':
        return <Upload className={cn('cursor-pointer', iconClassName)} />;
      case 'download':
        return <Download className={cn('cursor-pointer', iconClassName)} />;
      default:
        return null;
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleClick}
          variant="outline"
          size="sm"
          disabled={disabled}
          className={cn(
            'text-foreground  bg-transparent border-none shadow-none',
            className,
            'hover:bg-primary hover:text-white  disabled:text-gray-500'
          )}
        >
          {getIcon()}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-gray-400/20 backdrop-blur-sm border-0 px-3 py-2 text-xs font-medium rounded-md shadow-xl shadow-black/20">
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
};
