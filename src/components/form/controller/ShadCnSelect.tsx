import { useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
import { cn } from '@/utils/cn';
import { useMemo, useState, useRef, useEffect } from 'react';
import { Option } from '@/components/ui/multiselect';
import { CheckIcon, ChevronDownIcon, CircleXIcon } from 'lucide-react';

interface ShadCnSelectProps {
  name: string;
  label: string;
  options:
    | { [key: string]: { label: string; selected?: boolean } }
    | Array<{ value: string; label: string; selected?: boolean; typeId?: string }>;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
  errors?: any;
  isMulti?: boolean;
  control?: any;
}

const MultiSelectInner = ({ 
    value, 
    onChange, 
    error, 
    options, 
    disabled, 
    placeholder 
}: { 
    value: string[]; 
    onChange: (val: string[]) => void; 
    error?: any; 
    options: Option[];
    disabled?: boolean;
    placeholder?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedValues: string[] = value || [];
    const selectedOptions = selectedValues.map((v: string) => {
        const option = options.find((opt) => opt.value === v);
        return option ? option : { value: v, label: v };
    });

    const handleSelect = (optionValue: string) => {
        const newValues = selectedValues.includes(optionValue)
            ? selectedValues.filter((v: string) => v !== optionValue)
            : [...selectedValues, optionValue];
        onChange(newValues);
    };

    const handleRemoveChip = (optionValue: string) => {
        const newValues = selectedValues.filter((v: string) => v !== optionValue);
        onChange(newValues);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="space-y-2">
            <div
                className={cn(
                    'flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:border-primary/50 transition-colors disabled:cursor-not-allowed disabled:opacity-50 form-input truncate',
                    disabled && 'cursor-not-allowed opacity-50',
                    error && 'border-destructive'
                )}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className="text-[#a3a3a3]">
                    {selectedValues.length > 0
                        ? `${selectedValues.length} item${selectedValues.length > 1 ? 's' : ''} selected`
                        : placeholder || 'Select options'}
                </span>
                <ChevronDownIcon size={16} className="ml-2 text-muted-foreground" />
            </div>

            {isOpen && (
                <div ref={dropdownRef} className="relative">
                    <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg">
                        <div className="max-h-60 overflow-y-auto">
                            {options.map((option) => {
                                const isSelected = selectedValues.includes(option.value);
                                return (
                                    <div
                                        key={option.value}
                                        className="flex items-center p-2 cursor-pointer hover:bg-primary/10 transition-colors"
                                        onClick={() => handleSelect(option.value)}
                                    >
                                        <div className="flex items-center justify-center w-5 h-5 mr-3">
                                            {isSelected && <CheckIcon size={18} className="text-primary" />}
                                        </div>
                                        <span>{option.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {selectedOptions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedOptions.map((option: Option) => (
                        <div
                            key={option.value}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-[#eeeeee] text-sm rounded-full hover:bg-[#888]/20 transition-colors"
                        >
                            <span className="font-medium">{option.label}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveChip(option.value)}
                                className="hover:[var(--color-title)]/20 rounded-full  transition-colors"
                            >
                                <CircleXIcon size={14} className="text-[--color-title] cursor-pointer" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const ShadCnSelect = ({
  name,
  label,
  options,
  className,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  forcedValue,
  errors,
  isMulti = false,
  control: propControl,
}: ShadCnSelectProps) => {
  const { control: contextControl } = useFormContext();
  const control = propControl || contextControl;
  const isArrayOptions = Array.isArray(options);

  const multiSelectOptions: Option[] = useMemo(() => {
    if (!isMulti) return [];
    if (isArrayOptions) {
      return (options as Array<{ value: string; label: string; selected?: boolean }>).map((opt) => ({
        value: opt.value,
        label: opt.label,
      }));
    } else {
      return Object.entries(options).map(([value, { label }]) => ({
        value,
        label,
      }));
    }
  }, [options, isArrayOptions, isMulti]);

  const processedArrayOptions = useMemo(() => {
    if (!isArrayOptions || !options) return [];
    const counts: Record<string, number> = {};
    return (options as Array<{ id?: string; value: string; label: string; selected?: boolean; typeId?: string }>).map(
      (opt) => {
        const base = (opt.id ?? opt.value ?? 'unknown').toString();
        counts[base] = (counts[base] || 0) + 1;
        const key = counts[base] > 1 ? `${base}__${counts[base]}` : base;
        return { ...opt, _key: key } as typeof opt & { _key: string };
      }
    );
  }, [options, isArrayOptions]);

  const getDefaultValue = () => {
    if (!options) return '';
    if (isArrayOptions) {
      const selectedOption = (options as Array<{ value: string; label: string; selected?: boolean }>).find(
        (option) => option.selected
      );
      return selectedOption ? selectedOption.value : '';
    } else {
      const entries = Object.entries(options);
      const selectedEntry = entries.find(([_, { selected }]) => selected);
      return selectedEntry ? selectedEntry[0] : '';
    }
  };

  const defaultValue = getDefaultValue();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[var(--color-form-label)]">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <div className="w-full min-w-0">
               {isMulti ? (
                    <MultiSelectInner 
                        value={value} 
                        onChange={onChange} 
                        error={error} 
                        options={multiSelectOptions}
                        disabled={disabled}
                        placeholder={placeholder}
                    />
               ) : (
                <Select value={(forcedValue ? forcedValue : value) || ''} onValueChange={onChange} disabled={disabled}>
                  <SelectTrigger
                    className={cn(
                      'form-input shadow-none focus-visible:ring-0 w-full',
                      'aria-invalid:focus-visible:ring-destructive/20 dark:aria-invalid:focus-visible:ring-destructive/40 aria-invalid:focus-visible:border-destructive'
                    )}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {isArrayOptions
                      ? processedArrayOptions.map((option) => (
                          <SelectItem key={option._key} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))
                      : options
                        ? Object.entries(options).map(([value, { label }]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))
                        : null}
                  </SelectContent>
                </Select>
               )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
