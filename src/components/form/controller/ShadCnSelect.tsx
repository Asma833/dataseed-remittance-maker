import { Controller, useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';
import { toTitleCase } from '@/utils/textFormater';
import { useMemo } from 'react';

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
}

export const ShadCnSelect = ({
  name,
  label,
  options,
  className,
  placeholder = "Select an option",
  disabled = false,
  required = false,
  forcedValue,
}: ShadCnSelectProps) => {
  const { control } = useFormContext();
  const isArrayOptions = Array.isArray(options);

  // Generate stable, unique keys for array options to avoid duplicate key warnings.
  // Strategy: use provided id or value as base. If duplicates occur, append an incrementing suffix.
  const processedArrayOptions = useMemo(() => {
    if (!isArrayOptions || !options) return [];
    const counts: Record<string, number> = {};
    return (options as Array<{ id?: string; value: string; label: string; selected?: boolean; typeId?: string }>).map(
      (opt) => {
        const base = (opt.id ?? opt.value).toString();
        counts[base] = (counts[base] || 0) + 1;
        const key = counts[base] > 1 ? `${base}__${counts[base]}` : base;
        return { ...opt, _key: key } as typeof opt & { _key: string };
      }
    );
  }, [options, isArrayOptions]);

  // Get default value from options based on 'selected' property
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

  // Get display value for the selected option
  const getDisplayValue = (selected: string) => {
    if (!selected || selected === '') {
      return placeholder;
    }

    if (!options) {
      return selected;
    }

    if (isArrayOptions) {
      const selectedOption = processedArrayOptions.find(option => option.value === selected);
      return selectedOption ? selectedOption.label : selected;
    } else {
      const selectedEntry = Object.entries(options).find(([value]) => value === selected);
      return selectedEntry ? selectedEntry[1].label : selected;
    }
  };

  return (
    <FormItem className={className}>
      <FormLabel>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Select
              value={(forcedValue ? forcedValue : value) || ''}
              onValueChange={onChange}
              disabled={disabled}
            >
              <SelectTrigger className={cn(error && "border-destructive focus:ring-destructive")}>
                <SelectValue placeholder={placeholder}>
                  {getDisplayValue((forcedValue ? forcedValue : value) || '')}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="" disabled>
                  {placeholder}
                </SelectItem>
                {isArrayOptions
                  ? processedArrayOptions.map((option) => (
                      <SelectItem key={option._key} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))
                  : options ? Object.entries(options).map(([value, { label }]) => (
                      <SelectItem
                        key={value}
                        value={value}
                      >
                        {label}
                      </SelectItem>
                    )) : null}
              </SelectContent>
            </Select>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};