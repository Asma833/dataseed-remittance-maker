import { Controller, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';

interface ShadCnFileProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export const ShadCnFile = ({ name, label, className, disabled = false, required = false }: ShadCnFileProps) => {
  const { control } = useFormContext();

  return (
    <FormItem className={className}>
      <FormLabel className="text-[var(--color-form-label)]">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          defaultValue={null}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <label>
                <Button
                  variant="outline"
                  className={cn('w-full cursor-pointer form-input shadow-none', error && 'border-destructive')}
                  disabled={disabled}
                  asChild
                >
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    {value ? value.name : label}
                  </span>
                </Button>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    onChange(file);
                  }}
                />
              </label>
            </div>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
