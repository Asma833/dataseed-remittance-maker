import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { StatusConfig } from '@/components/types/filter.types';

interface GenericTableStatusFilterProps {
  status: string;
  statusConfig: StatusConfig;
  onStatusChange: (status: string) => void;
  className?: string;
}

export const GenericTableStatusFilter: React.FC<GenericTableStatusFilterProps> = ({
  status,
  statusConfig,
  onStatusChange,
  className = ""
}) => {
  const [localStatus, setLocalStatus] = useState<string>(status);

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  const handleStatusChange = (e: any) => {
    const newStatus = e.value;
    setLocalStatus(newStatus);
    onStatusChange(newStatus);
  };

  // Add "All" option if not present
  const options = [
    { label: 'All', value: 'all' },
    ...statusConfig.options
  ];

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm text-gray-600 mb-1">
        {statusConfig.label || 'Status'}
      </label>
      <Dropdown
        value={localStatus}
        options={options}
        onChange={handleStatusChange}
        placeholder={statusConfig.placeholder || `Select ${statusConfig.label || 'Status'}`}
        className="w-64 h-10"
        optionLabel="label"
        optionValue="value"
        showClear
      />
    </div>
  );
};

export default GenericTableStatusFilter;