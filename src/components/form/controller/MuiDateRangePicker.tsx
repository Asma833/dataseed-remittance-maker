import { Controller, useFormContext } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { cn } from '@/utils/cn';

interface MuiDateRangePickerProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  startLabel?: string;
  endLabel?: string;
}

export const MuiDateRangePicker = ({
  name,
  label,
  className,
  disabled = false,
  required = false,
  placeholder = '',
  startLabel = 'From Date',
  endLabel = 'To Date',
}: MuiDateRangePickerProps) => {
  const { control, clearErrors, watch, formState } = useFormContext();

  return (
    <FormItem className={cn(className, 'xs:w-40 sm:w-96')}>
      <FormLabel className="text-[--color-form-label]">
      </FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => {
            const handleStartDateChange = (newValue: Date | null) => {
              const updatedValue = {
                ...field.value,
                startDate: newValue?.toISOString() ?? null,
              };
              field.onChange(updatedValue);
              clearErrors(name);
            };

            const handleEndDateChange = (newValue: Date | null) => {
              const updatedValue = {
                ...field.value,
                endDate: newValue?.toISOString() ?? null,
              };
              field.onChange(updatedValue);
              clearErrors(name);
            };

            const startDate = field.value?.startDate ? new Date(field.value.startDate) : null;
            const endDate = field.value?.endDate ? new Date(field.value.endDate) : null;

            const commonTextFieldProps = {
              error: !!fieldState.error,
              variant: 'outlined' as const,
              size: 'small' as const,
              fullWidth: true,
              readOnly: true,
              placeholder: 'DD/MM/YYYY',
              sx: {
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'var(--background)',
                  '& fieldset': {
                    borderColor: fieldState.error ? 'var(--destructive)' : 'var(--border)',
                  },
                  '&:hover fieldset': {
                    borderColor: fieldState.error ? 'var(--destructive)' : 'var(--border)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: fieldState.error ? 'var(--destructive)' : 'var(--ring)',
                  },
                  borderRadius: '5px',
                        width: '',
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                          borderRadius: '20px',
                        },
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--foreground)',
                  '&.Mui-focused': {
                    color: fieldState.error ? 'var(--destructive)' : 'var(--ring)',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'var(--foreground)',
                },
              },
            };

            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ width: '100%' }}>
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 10, sm: 6, md:6, lg:6}}>
                       <FormLabel className="text-[--color-form-label] text-sm font-medium">
                         {startLabel}
                         {required && <span className="text-destructive ml-1">*</span>}
                       </FormLabel>
                       <DatePicker
                         label=""
                         value={startDate}
                         onChange={handleStartDateChange}
                         disabled={disabled}
                         format="dd/MM/yyyy"
                         {...(endDate && { maxDate: endDate })}
                         slotProps={{
                           textField: {
                             ...commonTextFieldProps,
                             error: !!(formState.errors[name] as any)?.startDate,
                             helperText: (formState.errors[name] as any)?.startDate?.message || ' ',
                           },
                         }}
                       />
                     </Grid>
                     <Grid size={{ xs: 10, sm: 6, md:6, lg:6 }}>
                       <FormLabel className="text-[--color-form-label] text-sm font-medium">
                         {endLabel}
                         {required && <span className="text-destructive ml-1">*</span>}
                       </FormLabel>
                       <DatePicker
                         label=""
                         value={endDate}
                         onChange={handleEndDateChange}
                         disabled={disabled}
                         format="dd/MM/yyyy"
                         {...(startDate && { minDate: startDate })}
                         slotProps={{
                           textField: {
                             ...commonTextFieldProps,
                             error: !!(formState.errors[name] as any)?.endDate,
                             helperText: (formState.errors[name] as any)?.endDate?.message || ' ',
                           },
                         }}
                       />
                     </Grid>
                  </Grid>
                </Box>
              </LocalizationProvider>
            );
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default MuiDateRangePicker;