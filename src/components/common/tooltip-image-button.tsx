import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface TooltipImageButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  src: string;
  alt?: string;
  tooltipText: string;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  imgClassName?: string;
}

const TooltipImageButton = ({
  onClick,
  src,
  alt = '',
  tooltipText,
  disabled = false,
  size = 'sm',
  className,
  imgClassName,
  invertOnHover = true,
}: TooltipImageButtonProps & { invertOnHover?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onClick(e);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variant="outline"
          size="sm"
          disabled={disabled}
          className={cn(
            'text-foreground bg-transparent border-none shadow-none disabled:text-gray-500 disabled:pointer-events-auto disabled:cursor-default',
            'hover:bg-primary hover:text-white',
            className
          )}
        >
          <img
            src={src}
            alt={alt}
            className={cn('w-3 h-3 transition-all duration-200', imgClassName)}
            style={{
              filter:
                isHovered && invertOnHover
                  ? 'brightness(0) saturate(100%) invert(1) contrast(1.2) drop-shadow(0 0 0.5px white)'
                  : 'brightness(0) saturate(100%) contrast(2) drop-shadow(0 0 0.3px black)',
            }}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-gray-400/20 backdrop-blur-sm border-0 px-3 py-2 text-xs font-medium rounded-md shadow-xl shadow-black/20">
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipImageButton;
