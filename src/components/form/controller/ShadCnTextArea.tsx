import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
import { cn } from '@/utils/cn';

interface ShadCnTextAreaProps {
  name: string;
  label: string;
  className?: string;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
  onInputChange?: (value: string) => void;
  control?: any;
}

export const ShadCnTextArea = ({
  name,
  label,
  className,
  rows = 4,
  maxRows,
  minRows,
  placeholder,
  disabled = false,
  required = false,
  forcedValue,
  onInputChange,
  control: propControl,
}: ShadCnTextAreaProps) => {
  const { control: contextControl } = useFormContext();
  const control = propControl || contextControl;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[var(--color-form-label)]">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <div>
              <Textarea
                {...field}
                value={(forcedValue ? forcedValue : field.value) || ''}
                rows={rows}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  'form-input truncate',
                  'aria-invalid:focus-visible:ring-destructive/20 dark:aria-invalid:focus-visible:ring-destructive/40 aria-invalid:focus-visible:border-destructive'
                )}
                onChange={(e) => {
                  field.onChange(e);
                  // Call the onInputChange callback if provided
                  if (onInputChange) {
                    onInputChange(e.target.value);
                  }
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
