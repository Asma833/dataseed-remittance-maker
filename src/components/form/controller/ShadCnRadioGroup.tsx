import { Controller, FieldValues, Path } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';

interface ShadCnRadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: { [key: string]: { label: string; checked?: boolean } };
  className?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
  onChange?: (value: string) => void;
}

export const ShadCnRadioGroup = <T extends FieldValues>({
  name,
  label,
  options,
  className,
  disabled = false,
  required = false,
  forcedValue,
  onChange,
}: ShadCnRadioGroupProps<T>) => {
  return (
    <FormItem className={className}>
      <FormLabel>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
      <FormControl>
        <Controller
          name={name}
          render={({ field }) => (
            <RadioGroup
              value={(forcedValue ? forcedValue : field.value) || ''}
              onValueChange={(value) => {
                // Convert string to boolean for boolean fields
                if (value === 'true' || value === 'false') {
                  field.onChange(value === 'true');
                } else {
                  field.onChange(value);
                }
                if (onChange) {
                  onChange(value);
                }
              }}
              disabled={disabled}
              className="space-y-2"
            >
              {Object.entries(options).map(([value, option]) => {
                // For boolean comparison, convert field.value to string
                const fieldValueAsString = typeof field.value === 'boolean' ? field.value.toString() : field.value;
                return (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={value}
                      id={`${name}-${value}`}
                      checked={fieldValueAsString === value}
                    />
                    <label
                      htmlFor={`${name}-${value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </RadioGroup>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};