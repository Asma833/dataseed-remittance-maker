import { cn } from '@/utils/cn';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';

interface ShadCnFileUploadProps {
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
  styleType?: 'default' | 'fileUploadWithView';
  defaultValue?: File | null;
  disabled?: boolean;
  required?: boolean;
  control?: any;
}

export const ShadCnFileUpload = ({
  id,
  name = '',
  label,
  className,
  handleFileChange,
  styleType = 'default',
  defaultValue,
  disabled = false,
  required = false,
  accept,
  control: propControl,
}: ShadCnFileUploadProps) => {
  const { control: contextControl } = useFormContext();
  const control = propControl || contextControl;

  const handleChange = (e: ChangeEvent<HTMLInputElement> | null) => {
    if (!handleFileChange) return;
    handleFileChange(e);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-(--color-form-label)">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <div className={cn('w-full flex flex-col gap-2', className)}>
              <label htmlFor={id}>
                <div className="relative">
                  <input
                    id={id}
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Transform file to match schema format
                        const fileData = {
                          file,
                          name: file.name,
                          size: file.size,
                          type: file.type,
                          lastModified: file.lastModified,
                        };
                        // Set as array to match schema
                        onChange([fileData]);
                      } else {
                        onChange([]);
                      }
                      handleChange(e);
                    }}
                    className="n-filetype-hidden"
                    accept={accept || '.pdf,.jpg,.png'}
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
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
