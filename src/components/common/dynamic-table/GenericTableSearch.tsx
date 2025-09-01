import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

interface GenericTableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
  showClearButton?: boolean;
}

export const GenericTableSearch: React.FC<GenericTableSearchProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  debounceMs = 300,
  showClearButton = true
}) => {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounceMs);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className={`p-field ${className}`}>
      <div className="p-inputgroup border border-gray-300 rounded-md overflow-hidden bg-transparent h-10 flex items-center">
        <InputText
          value={localValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full border-0 focus:ring-0 focus:border-0 bg-transparent px-3 h-full flex items-center"
          style={{
            border: 'none',
            boxShadow: 'none',
            backgroundColor: 'transparent',
            paddingLeft: '12px',
            paddingRight: '12px',
            height: '100%',
            display: 'flex',
            alignItems: 'center'
          }}
        />
        {showClearButton && localValue ? (
          <span className="p-inputgroup-addon cursor-pointer hover:bg-gray-50 bg-transparent px-3 h-full flex items-center justify-center" onClick={handleClear}>
            <i className="pi pi-times text-gray-400"></i>
          </span>
        ) : (
          <span className="p-inputgroup-addon bg-transparent px-3 h-full flex items-center justify-center">
            <i className="pi pi-search text-gray-400"></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default GenericTableSearch;