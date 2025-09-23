import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import Spacer from '@/components/form/wrapper/spacer';
import { useNavigate, useLocation } from 'react-router-dom';
import { holidayFormConfig } from './holiday-form/holiday-form-config';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { FormProvider } from '@/components/form/providers/form-provider';
import { getController } from '@/components/form/utils/get-controller';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { HolidayFormSchema } from './holiday-form/holiday-form.schema';

export const CreateHoliday = () => {
  const methods = useForm({
    resolver: zodResolver(HolidayFormSchema),
    defaultValues: {
      year: '',
      date: '',
      holidayName: '',
    },
  });

  const {
    control,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;
  const navigate = useNavigate();
  const location = useLocation();
  const holiday = location.state?.holiday;

  const handleBack = () => {
    navigate(-1);
  };

  const onSubmit = async (data: any) => {
    console.log('Form submitted with data:', data);
    // Add actual submission logic here
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  useEffect(() => {
    if (holiday) {
      // Patch values for edit mode
      reset({
        year: holiday.year || '',
        date: holiday.date || '',
        holidayName: holiday.holidayName || '',
      });
    }
  }, [holiday, reset]);

  return (
    <div className="space-y-1 w-full">
      <div className="flex items-center space-x-2">
        <h2 className="text-sm font-semibold tracking-tight">Holiday List Table / <span className="text-[var(--color-title)]">Create Holiday</span></h2>
      </div>

      <FormProvider methods={methods}>
        <FormContentWrapper className="p-4 rounded-lg mr-auto w-full shadow-top">
          <h2 className="text-xl font-bold mb-4 title-case p-2 pt-0 border-b border-gray-300">
            {holiday ? 'Update Holiday' : 'Create New Holiday'}
          </h2>
          <Spacer>
            <FormFieldRow className="mb-4" rowCols={3}>
              {Object.entries(holidayFormConfig.fields)
                .map(([name, field]) => (
                  <FieldWrapper key={name}>
                    {getController({
                      ...(typeof field === 'object' && field !== null ? field : {}),
                      name,
                      control,
                      errors,
                    })}
                  </FieldWrapper>
                ))}
            </FormFieldRow>
            <div className="flex justify-items-start space-x-2 mt-4 px-1">
              <Button variant="outline" className="w-28" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" variant="secondary" className="w-28" onClick={handleFormSubmit} disabled={isSubmitting}>
                {isSubmitting ? (holiday ? 'Updating...' : 'Creating...') : (holiday ? 'Update' : 'Create')}
              </Button>
            </div>
          </Spacer>
        </FormContentWrapper>
      </FormProvider>
    </div>
  );
};