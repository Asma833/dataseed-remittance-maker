import { useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
import { cn } from '@/utils/cn';

interface ShadCnPhoneProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
  placeholder: string;
  control?: any;
}

export const ShadCnPhone = ({
  name,
  label,
  className,
  disabled = false,
  required = false,
  forcedValue,
  placeholder,
  control: propControl,
}: ShadCnPhoneProps) => {
  const { control: contextControl } = useFormContext();
  const control = propControl || contextControl;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[var(--color-form-label)]">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <div>
              <ShadCnFormInput
                {...field}
                type="tel"
                value={(forcedValue ? forcedValue : value) || ''}
                className={cn(
                  'form-input shadow-none focus-visible:ring-0',
                  error && 'border-destructive focus:ring-destructive'
                )}
                onChange={(e) => {
                  // Remove all non-numeric characters and limit to 10 digits
                  const numericValue = e.target.value.replace(/\D/g, '');
                  const limitedValue = numericValue.slice(0, 10);
                  onChange(limitedValue);
                }}
                disabled={disabled}
                placeholder={placeholder}
                maxLength={10}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
