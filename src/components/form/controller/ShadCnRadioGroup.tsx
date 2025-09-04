import { Controller, FieldValues, Path, FieldPathValue } from 'react-hook-form';
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
  defaultValue?: FieldPathValue<T, Path<T>>;
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
  defaultValue,
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
          {...(defaultValue !== undefined ? { defaultValue } : {})}
          render={({ field }) => {
            const currentValue = forcedValue ? forcedValue : (typeof field.value === 'boolean' ? field.value.toString() : field.value);
            return (
              <RadioGroup
                value={currentValue || ''}
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
              {Object.entries(options).map(([value, option]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={value}
                    id={`${name}-${value}`}
                  />
                  <label
                    htmlFor={`${name}-${value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
            );
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};