import React from 'react';
import { cn } from '@/utils/cn';

interface TableTitleProps {
  title: string;
  className?: string;
  titleClassName?: string;
  children?: React.ReactNode;
}

export const TableTitle: React.FC<TableTitleProps> = ({
  title,
  className = "mr-auto w-full",
  titleClassName,
  children
}) => {
  const defaultTitleClass = "text-lg font-semibold tracking-tight text-[var(--color-title)]";

  return (
    <div className={className}>
      <h2 className={cn(defaultTitleClass, titleClassName)}>
        {title}
      </h2>
      {children}
    </div>
  );
};