import { cn } from '@/utils/cn';
import { ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface ShadCnFileUploadWithViewProps {
  id?: string;
  name: string;
  label: string;
  className?: string;
  maxFiles?: number;
  description?: string;
  helpText?: string;
  accept?: string;
  multiple?: boolean;
  handleFileChange?: (e: ChangeEvent<HTMLInputElement> | null) => void;
  viewFile?: (file: any) => void;
  disabled?: boolean;
  required?: boolean;
}

export const ShadCnFileUploadWithView = ({
  id,
  name = '',
  label,
  className,
  handleFileChange,
  viewFile,
  disabled = false,
  required = false,
}: ShadCnFileUploadWithViewProps) => {
  const { control } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement> | null) => {
    if (!handleFileChange) return;
    handleFileChange(e);
  };

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
          defaultValue={[]}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className={cn('w-full p-3 flex flex-col gap-2', className)}>
              <label htmlFor={id}>
                <div className="relative">
                  <input
                    id={id}
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const fileData = {
                          file,
                          name: file.name,
                          size: file.size,
                          type: file.type,
                          lastModified: file.lastModified,
                        };
                        onChange([fileData]);
                      } else {
                        onChange([]);
                      }
                      handleChange(e);
                    }}
                    className="n-filetype-hidden"
                    accept=".pdf,.jpg,.png"
                    disabled={disabled}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'w-full flex items-center justify-center gap-2 form-input shadow-none',
                      error && 'border-destructive'
                    )}
                    disabled={disabled}
                  >
                    <Upload className="h-4 w-4" />
                    <span className="whitespace-nowrap">
                      {value && value.length > 0 && value[0]?.name ? value[0].name : 'Choose File'}
                    </span>
                  </Button>
                </div>
              </label>

              {value && value.length > 0 && viewFile && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => viewFile(value[0])}
                  className="w-fit form-input shadow-none"
                >
                  View File
                </Button>
              )}
            </div>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
