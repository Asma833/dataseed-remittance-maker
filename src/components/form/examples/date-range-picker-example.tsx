import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getController } from '@/components/form/utils/get-controller';
import { FieldType } from '@/types/enums';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { Button } from '@/components/ui/button';

// Schema for form validation
const dateRangeSchema = z.object({
  reportingPeriod: z.object({
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
  }).refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    {
      message: "End date must be after start date",
    }
  ),
  vacationDates: z.object({
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
  }).optional(),
});

type DateRangeFormData = z.infer<typeof dateRangeSchema>;

const DateRangePickerExample = () => {
  const form = useForm<DateRangeFormData>({
    resolver: zodResolver(dateRangeSchema),
    defaultValues: {
      reportingPeriod: {
        startDate: null,
        endDate: null,
      },
      vacationDates: {
        startDate: null,
        endDate: null,
      },
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const onSubmit = (data: DateRangeFormData) => {
    console.log('Form submitted with data:', data);
    alert('Check console for form data');
  };

  // Field configurations for date range pickers
  const reportingPeriodField = {
    name: 'reportingPeriod',
    label: 'Reporting Period',
    type: FieldType.DateRange,
    placeholder: 'Select reporting period',
    startLabel: 'Start Date',
    endLabel: 'End Date',
    required: true,
  };

  const vacationDatesField = {
    name: 'vacationDates',
    label: 'Vacation Dates',
    type: FieldType.DateRange,
    placeholder: 'Select vacation dates',
    startLabel: 'From',
    endLabel: 'To',
    required: false,
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">MUI Date Range Picker Example</h1>
        <p className="text-muted-foreground">
          This example demonstrates how to use the new MUI date range picker in forms.
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FieldWrapper>
              {getController({ 
                ...reportingPeriodField, 
                control, 
                errors 
              })}
            </FieldWrapper>

            <FieldWrapper>
              {getController({ 
                ...vacationDatesField, 
                control, 
                errors 
              })}
            </FieldWrapper>
          </div>

          <div className="flex gap-4">
            <Button type="submit">
              Submit Form
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </div>
        </form>
      </FormProvider>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Usage Instructions:</h3>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Use <code>FieldType.DateRange</code> as the field type</li>
          <li>• The component returns an object with <code>startDate</code> and <code>endDate</code> properties</li>
          <li>• Both dates are stored as ISO strings or null</li>
          <li>• Customize labels with <code>startLabel</code> and <code>endLabel</code> props</li>
          <li>• The end date picker automatically sets minimum date based on start date selection</li>
          <li>• The start date picker automatically sets maximum date based on end date selection</li>
        </ul>
      </div>
    </div>
  );
};

export default DateRangePickerExample;