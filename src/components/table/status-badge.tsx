import React from 'react';
import { cn } from '@/utils/cn';
import { StatusBadgeProps } from './types';

export function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === 'Active';
  
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <div
        className={cn(
          'h-2 w-2 rounded-full',
          isActive ? 'bg-green-500' : 'bg-red-500'
        )}
      />
      <span
        className={cn(
          'text-sm font-medium',
          isActive ? 'text-green-700' : 'text-red-700'
        )}
      >
        {status}
      </span>
    </div>
  );
}
