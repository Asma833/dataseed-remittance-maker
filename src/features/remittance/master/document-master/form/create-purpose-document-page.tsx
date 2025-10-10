import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { PurposeDocumentFormSchema } from './create-purpose-document-form.shema';
import { zodResolver } from '@hookform/resolvers/zod';

import { PurposeDocumentFormConfig } from './create-purpose-document-form.config';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import Spacer from '@/components/form/wrapper/spacer';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import CheckboxWrapper from '@/components/form/wrapper/checkbox-wrapper';

const CreatePurposeDocumentPage = ({ setDialogTitle }: { setDialogTitle: (title: string) => void }) => {
  const { id } = useParams();
  const isEditMode = !!id;

  const methods = useForm({
    resolver: zodResolver(PurposeDocumentFormSchema),
    defaultValues: {
      // year: '',
      // date: '',
      // holidayName: '',
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
      // updateDocument({ id, ...data });
    } else {
      //   addDocument(data);
    }
  });
  useEffect(() => {
    const title = isEditMode ? 'Edit Document' : 'Add Document';
    setDialogTitle(title);
  }, [isEditMode, setDialogTitle]);
  return (
    <div className="flex flex-col items-center justify-center px-6">
      <FormProvider {...methods}>
        <FormContentWrapper className="p-2 rounded-lg mr-auto bg-transparent w-full">
          <Spacer>
            <FormFieldRow className="mt-1" rowCols={1}>
              {Object.entries(PurposeDocumentFormConfig.fields)
                .slice(0, 1)
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

            <FormFieldRow className="mb-4 mt-2" rowCols={1}>
              {Object.entries(PurposeDocumentFormConfig.fields)
                .slice(1, 2)
                .map(([name, field]) => (
                  <FieldWrapper key={name} className="justify-center">
                    <CheckboxWrapper className="flex space-x-4 items-center justify-center">
                      {getController({
                        ...PurposeDocumentFormConfig.fields.documentStatus,
                        name: 'documentStatus',
                        control,
                        errors,
                        isMulti: true,
                      })}
                    </CheckboxWrapper>
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
    </div>
  );
};

export default CreatePurposeDocumentPage;
