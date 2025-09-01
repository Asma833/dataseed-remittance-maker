import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SelectConfig } from '@/components/types/filter.types';

interface GenericTableCustomSelectFilterProps {
  selectConfig: SelectConfig;
  value: string;
  onValueChange: (id: string, value: string) => void;
  className?: string;
}

export const GenericTableCustomSelectFilter: React.FC<GenericTableCustomSelectFilterProps> = ({
  selectConfig,
  value,
  onValueChange,
  className = ""
}) => {
  const [localValue, setLocalValue] = useState<string>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleValueChange = (e: any) => {
    const newValue = e.value;
    setLocalValue(newValue);
    onValueChange(selectConfig.id, newValue);
  };

  // Add "All" option if not present
  const options = [
    { label: 'All', value: 'all' },
    ...selectConfig.options
  ];

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm text-gray-600 mb-1">
        {selectConfig.label}
      </label>
      <Dropdown
        value={localValue}
        options={options}
        onChange={handleValueChange}
        placeholder={selectConfig.placeholder || `Select ${selectConfig.label}`}
        className="w-64 h-10"
        optionLabel="label"
        optionValue="value"
        showClear
      />
    </div>
  );
};

export default GenericTableCustomSelectFilter;