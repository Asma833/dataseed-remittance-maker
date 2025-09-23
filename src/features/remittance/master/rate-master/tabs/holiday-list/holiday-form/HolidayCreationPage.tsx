import { useEffect } from 'react';
import { getController } from '@/components/form/utils/getController';
import FieldWrapper from '@/components/form/wrapper/FieldWrapper';
import { FormContentWrapper } from '@/components/form/wrapper/FormContentWrapper';
import FormFieldRow from '@/components/form/wrapper/FormFieldRow';
import Spacer from '@/components/form/wrapper/Spacer';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { HolidayFormSchema } from './holiday-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { holidayFormConfig } from './holiday-form-config';

const HolidayCreationPage = ({ setDialogTitle }: { setDialogTitle: (title: string) => void }) => {
  const { id } = useParams();
  const isEditMode = !!id;

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
  //   const { mutate: updateHoliday } = useUpdateHoliday();
  //   const { mutate: addHoliday, isLoading } = useCreateHoliday({
  //     onHolidayCreateSuccess: () => {
  //       reset({});
  //     },
  //   });

  const handleFormSubmit = handleSubmit((data) => {
    if (isEditMode) {
      // updateHoliday({ id, ...data });
    } else {
      //   addHoliday(data);
    }
  });
  useEffect(() => {
    const title = isEditMode ? 'Edit Holiday' : 'Add Holiday';
    setDialogTitle(title);
  }, [isEditMode, setDialogTitle]);
  return (
    <FormProvider {...methods}>
      <FormContentWrapper className="p-2 rounded-lg mr-auto bg-transparent w-full">
        <Spacer>
          <FormFieldRow className="mb-4 mt-1" rowCols={2}>
            {Object.entries(holidayFormConfig.fields)
              .slice(0, 2)
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
          <FormFieldRow className="mb-4 mt-2" rowCols={1} wrapperClassName="flex justify-center">
            {Object.entries(holidayFormConfig.fields)
              .slice(2, 3)
              .map(([name, field]) => (
                <FieldWrapper key={name} className="max-w-[225px]">
                  {getController({
                    ...(typeof field === 'object' && field !== null ? field : {}),
                    name,
                    control,
                    errors,
                  })}
                </FieldWrapper>
              ))}
          </FormFieldRow>
        </Spacer>

        <div className="flex justify-center space-x-2 mt-4">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 mt-3 rounded-md min-w-[150px]"
            disabled={isSubmitting}
            onClick={handleFormSubmit}
          >
            {isSubmitting ? (isEditMode ? 'Updating...' : 'Submitting...') : isEditMode ? 'Update' : 'Submit'}
          </button>
        </div>
      </FormContentWrapper>
    </FormProvider>
  );
};

export default HolidayCreationPage;
