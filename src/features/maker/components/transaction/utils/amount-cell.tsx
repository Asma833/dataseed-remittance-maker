import { cn } from '@/utils/cn';

interface AmountCellProps {
  value: string | number;
  className?: string;
}

export const AmountCell = ({ value, className }: AmountCellProps) => {
  const formattedValue = typeof value === 'number' 
    ? value.toFixed(2) 
    : parseFloat(value || '0').toFixed(2);

  return (
    <div className={cn("text-right w-full", className)}>
      {formattedValue}
    </div>
  );
};
