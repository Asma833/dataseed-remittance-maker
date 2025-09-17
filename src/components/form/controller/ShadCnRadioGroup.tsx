import { Controller, FieldValues, Path, FieldPathValue } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
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
  orientation?: 'horizontal' | 'vertical';
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
  orientation,
}: ShadCnRadioGroupProps<T>) => {
  return (
    <FormItem className={className}>
      <FormLabel className={`text-[var(--color-form-label)] ${disabled ? 'text-gray-400' : ''}`}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
      <FormControl>
        <Controller
          name={name}
          {...(defaultValue !== undefined ? { defaultValue } : {})}
          render={({ field }) => {
            const currentValue = forcedValue ? forcedValue : (typeof field.value === 'boolean' ? field.value.toString() : field.value);
            const numOptions = Object.keys(options).length;
            const effectiveOrientation = orientation || (numOptions <= 3 ? 'horizontal' : 'vertical');
            const radioClassName = effectiveOrientation === 'horizontal' ? 'flex space-x-4' : 'space-y-2';
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
                className={radioClassName}
              >
              {Object.entries(options).map(([value, option]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={value}
                    id={`${name}-${value}`}
                    disabled={disabled}
                    className={disabled ? 'border-gray-300 bg-gray-100' : ''}
                  />
                  <label
                    htmlFor={`${name}-${value}`}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      disabled ? 'text-gray-400' : ''
                    }`}
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