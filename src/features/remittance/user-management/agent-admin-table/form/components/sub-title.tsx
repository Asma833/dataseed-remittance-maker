import React from 'react';

interface SubTitleProps {
  title: string;
  className?: string;
  titleClassName?: string;
}

const SubTitle: React.FC<SubTitleProps> = ({
  title,
  className = 'mb-2 pl-1',
  titleClassName = 'text-sm font-semibold text-[var(--color-title)]',
}) => {
  return (
    <div className={className}>
      <h3 className={titleClassName}>{title}</h3>
    </div>
  );
};

export default SubTitle;
