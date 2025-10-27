import { useParams } from 'react-router';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { PurposeMasterSchema } from './create-purpose-master.schema';
import { PurposeMasterConfig } from './create-purpose-master.config';
import { useCreatePurposeMaster } from '../../../hooks/useCreatePurposeMaster';
import { useGetTransactionTypes } from '../hooks/useGetTransactionTypes';
import { PurposeApiPayload } from '@/features/admin/types/purpose.types';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import { Button } from '@/components/ui/button';
import { TableTitle } from '@/features/auth/components/table-title';
import { FormTitle } from '@/features/auth/components/form-title';

const CreatePurposeMasterPage = ({ setDialogTitle }: { setDialogTitle: (title: string) => void }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = !!id;

  // Fetch transaction types for dynamic options
  const { data: transactionTypes = [] } = useGetTransactionTypes();

  // Create dynamic config with transaction type options
  const dynamicConfig = useMemo(() => ({
    ...PurposeMasterConfig,
    fields: {
      ...PurposeMasterConfig.fields,
      transaction_type: {
        ...PurposeMasterConfig.fields.transaction_type,
        options: transactionTypes.map(type => ({
          label: type.name,
          value: type.id,
        })),
      },
    },
  }), [transactionTypes]);

  const methods = useForm({
    resolver: zodResolver(PurposeMasterSchema),
    defaultValues: {
      purpose_name: '',
      purpose_code: '',
      transaction_type: '',
    },
  });
  const {
    control,
    reset,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;

  const { mutate: createUser, isLoading } = useCreatePurposeMaster({
    onPurposeCreateSuccess: () => {
      reset({});
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddPurpose = handleSubmit(async (formdata: PurposeApiPayload) => {
    // if (isEditMode) {
    //   await updateUser({ data: formdata, productOptions, id });
    // } else {
    createUser({
      ...formdata,
    });
    //}
  });

  useEffect(() => {
    const purpose = location.state?.purpose;
    if (purpose && isEditMode) {
      setValue('purpose_name', purpose.purpose_name || '');
      setValue('purpose_code', purpose.purpose_code || '');
      setValue('transaction_type', purpose.transaction_type_id || '');

      // Trigger form validation and re-rendering
      setTimeout(() => {
        trigger();
      }, 100);
    }
  }, [location.state, isEditMode, setValue, trigger]);

  // useEffect(() => {
  //   const title = isEditMode ? 'Edit Purpose Master' : 'Add Purpose Master';
  //   setDialogTitle(title);
  // }, [isEditMode, setDialogTitle]);
  return (
    <div className="space-y-1 w-full">
      <FormTitle
        tableName="Purpose Master Table"
        actionName={isEditMode ? 'Edit Purpose Master' : 'Add Purpose Master'}
      />

      <FormProvider {...methods}>
        <form onSubmit={handleAddPurpose}>
          <TableTitle title={isEditMode ? 'Update Purpose Master' : 'Create New Purpose Master'}>
            <FormFieldRow className="mb-4 mt-1" rowCols={4}>
              {Object.entries(dynamicConfig.fields)
                .slice(0, 4)
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
            <div className="flex justify-items-start space-x-2 mt-2 px-1">
              <Button variant="outline" className="w-28" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" variant="secondary" className="w-28" disabled={isSubmitting}>
                {isSubmitting ? (isEditMode ? 'Updating...' : 'Submitting...') : isEditMode ? 'Update' : 'Submit'}
              </Button>
            </div>
          </TableTitle>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePurposeMasterPage;
