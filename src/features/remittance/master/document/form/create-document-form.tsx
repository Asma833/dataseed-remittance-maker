import { useParams } from 'react-router';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { useCreateDocument } from '../hooks/useCreateDocument';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import { Button } from '@/components/ui/button';
import { TableTitle } from '@/features/auth/components/table-title';
import { FormTitle } from '@/features/auth/components/form-title';
import { DocumentSchema } from './create-document.schema';
import { DocumentFormConfig } from './create-document.config';

const CreateDocumentPage = ({ setDialogTitle }: { setDialogTitle: (title: string) => void }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = !!id;

  const methods = useForm({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      name: '',
      code: '',
      is_mandatory: [],
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

  const createDocumentMutation = useCreateDocument();

  const handleBack = () => {
    navigate(-1);
  };

  const handleCreateDocument = handleSubmit(async (formdata) => {
    // Transform form data to match API payload structure
    const payload = {
      name: formdata.name,
      code: formdata.code,
      is_mandatory:formdata.is_mandatory,
      is_active:true,
    };

    createDocumentMutation.mutate(payload, {
      onSuccess: () => {
        reset({});
        // TODO: Show success message
        console.log('Document created successfully');
      },
      onError: (error: any) => {
        // TODO: Show error message
        console.error('Failed to create document:', error);
      },
    });
  });

  useEffect(() => {
    const document = location.state?.document;
    if (document && isEditMode) {
      setValue('name', document.name || '');
      setValue('code', document.code || '');
      // For checkbox array, we need to set the selected values
      const mandatoryOptions = [];
      if (document.fields_required?.number === 'required') {
        mandatoryOptions.push('is_required');
      }
      if (document.fields_required?.dob === 'required') {
        mandatoryOptions.push('is_backrequired');
      }
      setValue('is_mandatory', mandatoryOptions);

      // Trigger form validation and re-rendering
      setTimeout(() => {
        trigger();
      }, 100);
    }
  }, [location.state, isEditMode, setValue, trigger]);

  return (
    <div className="space-y-1 w-full">
      <FormTitle
        tableName="Document Master Table"
        actionName={isEditMode ? 'Edit Document Master' : 'Add Document Master'}
      />

      <FormProvider {...methods}>
        <form onSubmit={handleCreateDocument}>
          <TableTitle title={isEditMode ? 'Update Document Master' : 'Create New Document Master'}>
            <FormFieldRow className="mb-4 mt-1" rowCols={4}>
              {Object.entries(DocumentFormConfig.fields)
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

export default CreateDocumentPage;