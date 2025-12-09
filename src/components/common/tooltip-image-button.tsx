import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utils/cn';

interface TooltipImageButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  src: string;
  alt?: string;
  tooltipText: string;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const TooltipImageButton = ({
  onClick,
  src,
  alt = '',
  tooltipText,
  disabled = false,
  size = 'sm',
  className,
}: TooltipImageButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onClick(e);
          }}
          variant="light"
          size={size}
          disabled={disabled}
          className={cn(
            'text-foreground border-none bg-transparent shadow-none disabled:text-gray-500',
            className
          )}
        >
          <img src={src} alt={alt} className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-gray-300 border-none text-gray-800 shadow-lg">{tooltipText}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipImageButton;