import React, { useState, useEffect } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';

interface TableLoaderProps {
  columns: number;
  minDuration?: number; // minimum duration in milliseconds
}

export const TableLoader: React.FC<TableLoaderProps> = ({
  columns,
  minDuration = 3000
}) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!showLoader) return null;

  return (
    <>
      {/* Render 5 skeleton rows */}
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={`skeleton-${index}`}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={`skeleton-cell-${index}-${colIndex}`} className="p-3">
              <div className="animate-pulse">
                <div
                  className="h-4 bg-gray-200 rounded-md"
                  style={{
                    width: colIndex === 0 ? '80%' : colIndex === columns - 1 ? '60%' : '70%',
                    animationDelay: `${index * 0.1}s`
                  }}
                ></div>
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};