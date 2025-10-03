import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface TooltipButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  tooltip: string;
  children: React.ReactNode;
}

export const TooltipButton = React.forwardRef<HTMLButtonElement, TooltipButtonProps>(
  ({ tooltip, children, ...buttonProps }, ref) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button ref={ref} {...buttonProps}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="bg-gray-400/20 backdrop-blur-sm border-0 px-3 py-2 text-xs font-medium rounded-md shadow-xl shadow-black/20 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          sideOffset={8}
        >
          <p className="leading-none drop-shadow-sm">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
);

TooltipButton.displayName = 'TooltipButton';