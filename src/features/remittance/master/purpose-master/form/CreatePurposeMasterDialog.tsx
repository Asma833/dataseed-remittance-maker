import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PurposeMasterSchema } from './create-purpose-master.schema';
import { PurposeMasterConfig } from './create-purpose-master.config';
import { useCreatePurposeMapping } from '../hooks/useCreatePurposeMapping';
import { useGetTransactionTypes } from '../hooks/useGetTransactionTypes';
import { GenericDialog } from '@/components/common/generic-dialog';
import { PurposeApiPayload } from '@/features/admin/types/purpose.types';

interface CreatePurposeMasterDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePurposeMasterDialog = ({ isOpen, onClose }: CreatePurposeMasterDialogProps) => {
  const [dialogTitle, setDialogTitle] = useState('Add Purpose Master');

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
          label: type.transaction_name,
          value: type.transaction_type_id,
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

  const { mutate: createUser } = useCreatePurposeMapping();

  const handleSubmit = (formdata: any) => {
    createUser({
      purpose_name: formdata.purpose_name,
      purpose_code: formdata.purpose_code,
      transaction_type_id: formdata.transaction_type,
    });
    methods.reset({});
    onClose();
  };

  return (
    <GenericDialog
      isOpen={isOpen}
      onClose={onClose}
      title={dialogTitle}
      form={methods}
      config={dynamicConfig}
      onSubmit={handleSubmit}
      submitButtonText="Submit"
      cancelButtonText="Cancel"
    />
  );
};

export default CreatePurposeMasterDialog;