import { Controller, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';

interface ShadCnFileUploadWithButtonProps {
  name: string;
  label: string;
  onUpload: (file: File) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export const ShadCnFileUploadWithButton = ({
  name,
  label,
  onUpload,
  className,
  disabled = false,
  required = false,
}: ShadCnFileUploadWithButtonProps) => {
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
                  className={cn('cursor-pointer form-input shadow-none', error && 'border-destructive')}
                  disabled={disabled}
                  asChild
                >
                  <span>{value ? value.name : 'Choose File'}</span>
                </Button>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    onChange(file);
                    if (file && onUpload) {
                      onUpload(file);
                    }
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
