import { Controller, useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
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
}: ShadCnTextAreaProps) => {
  const { control } = useFormContext();

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
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <Textarea
              {...field}
              value={(forcedValue ? forcedValue : field.value) || ''}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              className={cn(
                "resize-none",
                error && "border-destructive focus-visible:ring-destructive"
              )}
              onChange={(e) => {
                field.onChange(e);
                // Call the onInputChange callback if provided
                if (onInputChange) {
                  onInputChange(e.target.value);
                }
              }}
            />
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};