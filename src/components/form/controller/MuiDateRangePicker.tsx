import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, TextField, Grid } from '@mui/material';

interface DateRangeValue {
  startDate?: string | null;
  endDate?: string | null;
}

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
  placeholder = 'Select date range',
  startLabel = 'Start Date',
  endLabel = 'End Date',
}: MuiDateRangePickerProps) => {
  const { control, clearErrors } = useFormContext();

  return (
    <FormItem className={className}>
      <FormLabel className="text-[--color-form-label]">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => {
            const handleStartDateChange = (newValue: Date | null) => {
              const currentValue = field.value || {};
              const updatedValue = {
                ...currentValue,
                startDate: newValue?.toISOString() || null,
              };
              field.onChange(updatedValue);
              clearErrors(name);
            };

            const handleEndDateChange = (newValue: Date | null) => {
              const currentValue = field.value || {};
              const updatedValue = {
                ...currentValue,
                endDate: newValue?.toISOString() || null,
              };
              field.onChange(updatedValue);
              clearErrors(name);
            };

            const startDate = field.value?.startDate
              ? (() => {
                  const date = new Date(field.value.startDate);
                  return isNaN(date.getTime()) ? null : date;
                })()
              : null;
            const endDate = field.value?.endDate
              ? (() => {
                  const date = new Date(field.value.endDate);
                  return isNaN(date.getTime()) ? null : date;
                })()
              : null;

            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ width: '100%' }}>
                  <Grid container spacing={2}>
                    {/* <Grid item xs={12} sm={6}> */}
                      <DatePicker
                        label={startLabel}
                        value={startDate}
                        onChange={handleStartDateChange}
                        disabled={disabled}
                        {...(endDate && { maxDate: endDate })}
                        slots={{
                          textField: TextField,
                        }}
                        slotProps={{
                          textField: {
                            placeholder: placeholder,
                            error: !!fieldState.error,
                            variant: 'outlined',
                            size: 'small',
                            fullWidth: true,
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
                          },
                        }}
                      />
                    {/* </Grid>
                    <Grid item xs={12} sm={6}> */}
                      <DatePicker
                        label={endLabel}
                        value={endDate}
                        onChange={handleEndDateChange}
                        disabled={disabled}
                        {...(startDate && { minDate: startDate })}
                        slots={{
                          textField: TextField,
                        }}
                        slotProps={{
                          textField: {
                            placeholder: placeholder,
                            error: !!fieldState.error,
                            variant: 'outlined',
                            size: 'small',
                            fullWidth: true,
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
                          },
                        }}
                      />
                    {/* </Grid> */}
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