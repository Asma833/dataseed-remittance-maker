import { useParams } from 'react-router';
import { getController } from '@/components/form/utils/getController';
import FieldWrapper from '@/components/form/wrapper/FieldWrapper';
import { FormContentWrapper } from '@/components/form/wrapper/FormContentWrapper';
import FormFieldRow from '@/components/form/wrapper/FormFieldRow';
import Spacer from '@/components/form/wrapper/Spacer';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { PurposeMasterSchema } from './create-purpose-master.schema';
import { PurposeMasterConfig } from './create-purpose-master.config';
import { PurposeDocumentsTable } from '../purpose-documents/document-table/PurposeDocumentsTable';
import { useCreatePurposeMaster } from '../../../../hooks/useCreatePurposeMaster';
import { PurposeApiPayload } from '@/features/admin/types/purpose.types';

const CreatePurposeMasterPage = ({ setDialogTitle }: { setDialogTitle: (title: string) => void }) => {
  const { id } = useParams();
  const isEditMode = !!id;
  const methods = useForm({
    resolver: zodResolver(PurposeMasterSchema),
    defaultValues: {
      purpose_name: '',
      purpose_code: ''
    },
  });
  const {
    control,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;
 
const { mutate: createUser, isLoading } = useCreatePurposeMaster(
    {
      onPurposeCreateSuccess: () => {
        reset({});
      },
    }
  );

  const handleAddPurpose = handleSubmit(async (formdata: PurposeApiPayload) => {
      // if (isEditMode) {
      //   await updateUser({ data: formdata, productOptions, id });
      // } else {
        createUser({
          ...formdata
        });
      //}
    });
  // useEffect(() => {
  //   const title = isEditMode ? 'Edit Purpose Master' : 'Add Purpose Master';
  //   setDialogTitle(title);
  // }, [isEditMode, setDialogTitle]);
  return (
    <FormProvider {...methods}>
      <FormContentWrapper className="p-2 rounded-lg mr-auto bg-transparent w-full">
        <Spacer>
          <FormFieldRow className="mb-4 mt-1" rowCols={3} wrapperClassName="justify-center">
            {Object.entries(PurposeMasterConfig.fields)
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
              <div className="flex justify-center space-x-2">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2.5  rounded-md min-w-[150px] h-fit"
                disabled={isSubmitting}
                onClick={handleAddPurpose}
              >
                {isSubmitting ? (isEditMode ? 'Updating...' : 'Submitting...') : isEditMode ? 'Update' : 'Submit'}
              </button>
        </div>
          </FormFieldRow>
        </Spacer>
        <PurposeDocumentsTable />
        {/* <div className="flex justify-center space-x-2 mt-4">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 mt-3 rounded-md min-w-[150px]"
            disabled={isSubmitting}
            // onClick={handleFormSubmit}
          >
            {isSubmitting ? (isEditMode ? 'Updating...' : 'Submitting...') : isEditMode ? 'Update' : 'Submit'}
          </button>
        </div> */}
      </FormContentWrapper>
    </FormProvider>
  );
};

export default CreatePurposeMasterPage;
