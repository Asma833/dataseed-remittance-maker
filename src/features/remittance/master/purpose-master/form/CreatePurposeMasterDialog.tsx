import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PurposeMasterSchema } from './create-purpose-master.schema';
import { PurposeMasterConfig } from './create-purpose-master.config';
import { useCreatePurposeMapping } from '../hooks/useCreatePurposeMapping';
import { useUpdatePurposeMapping } from '../hooks/useUpdatePurposeMapping';
import { useGetTransactionTypes } from '../hooks/useGetTransactionTypes';
import { GenericDialog } from '@/components/common/generic-dialog';
import { PurposeApiPayload } from '@/features/admin/types/purpose.types';
import { toast } from 'sonner';

interface CreatePurposeMasterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  purposeData?:
    | {
        id: string;
        purpose_name: string;
        purpose_code: string;
        transaction_type_id: string;
      }
    | undefined;
  isEditMode?: boolean;
}

const CreatePurposeMasterDialog = ({
  isOpen,
  onClose,
  purposeData,
  isEditMode = false,
}: CreatePurposeMasterDialogProps) => {
  const [dialogTitle, setDialogTitle] = useState(isEditMode ? 'Update Purpose Master' : 'Add Purpose Master');

  // Fetch transaction types for dynamic options
  const { data: transactionTypes = [] } = useGetTransactionTypes();

  // Create dynamic config with transaction type options
  const dynamicConfig = useMemo(
    () => ({
      ...PurposeMasterConfig,
      fields: {
        ...PurposeMasterConfig.fields,
        transaction_type: {
          ...PurposeMasterConfig.fields.transaction_type,
          options: transactionTypes.map((type) => ({
            label: type.transaction_name,
            value: type.transaction_type_id,
          })),
        },
      },
    }),
    [transactionTypes]
  );

  const methods = useForm({
    resolver: zodResolver(PurposeMasterSchema),
    defaultValues: {
      purpose_name: '',
      purpose_code: '',
      transaction_type: '',
    },
  });

  const { mutate: createUser } = useCreatePurposeMapping();
  const { mutate: updatePurposeMapping } = useUpdatePurposeMapping();

  const handleSubmit = (formdata: any) => {
    if (isEditMode && purposeData?.id) {
      updatePurposeMapping(
        {
          id: purposeData.id,
          data: {
            purpose_name: formdata.purpose_name,
            purpose_code: formdata.purpose_code,
            transaction_type_id: formdata.transaction_type,
          },
        },
        {
          onSuccess: () => {
            toast.success('Purpose updated successfully');
            methods.reset({});
          },
          onError: (error: any) => {
            toast.error(error.message || 'Failed to update purpose');
          },
        }
      );
    } else {
      createUser(
        {
          purpose_name: formdata.purpose_name,
          purpose_code: formdata.purpose_code,
          transaction_type_id: formdata.transaction_type,
        },
        {
          onSuccess: () => {
            toast.success('Purpose created successfully');
            methods.reset({});
          },
          onError: (error: any) => {
            toast.error(error.message || 'Failed to create purpose');
          },
        }
      );
    }
  };

  // Set form values when purposeData changes
  useEffect(() => {
    if (purposeData && isOpen) {
      methods.setValue('purpose_name', purposeData.purpose_name || '');
      methods.setValue('purpose_code', purposeData.purpose_code || '');
      methods.setValue('transaction_type', purposeData.transaction_type_id || '');
    }
  }, [purposeData, isOpen, methods]);

  return (
    <GenericDialog
      isOpen={isOpen}
      onClose={onClose}
      title={dialogTitle}
      form={methods}
      config={dynamicConfig}
      onSubmit={handleSubmit}
      submitButtonText={isEditMode ? 'Update' : 'Submit'}
      cancelButtonText="Cancel"
    />
  );
};

export default CreatePurposeMasterDialog;
