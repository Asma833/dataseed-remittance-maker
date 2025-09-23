import React from 'react';

interface FormTitleProps {
  tableName: string;
  actionName: string;
  className?: string;
}

export const FormTitle: React.FC<FormTitleProps> = ({
  tableName,
  actionName,
  className = "space-y-1 w-full"
}) => {
  return (
    <div className={className}>
      <div className="flex items-center space-x-2">
        <h2 className="text-sm font-semibold tracking-tight">
          {tableName} / <span className="text-[var(--color-title)]">{actionName}</span>
        </h2>
      </div>
    </div>
  );
};