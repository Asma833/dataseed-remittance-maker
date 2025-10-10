import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericDialog } from '@/components/common/generic-dialog';
import { addBankSchema, AddBankFormData } from './add-bank.schema';
import { addBankConfig } from './add-bank.config';
import { toast } from 'sonner';

interface AddBankDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (bankData: Record<string, any>) => void;
  editData?: Record<string, any> | null;
  onEdit?: (bankData: Record<string, any>) => void;
}

export const AddBankDialog: React.FC<AddBankDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
  editData,
  onEdit,
}) => {
  const form = useForm<AddBankFormData>({
    resolver: zodResolver(addBankSchema),
    defaultValues: editData || {},
    mode: 'onChange',
  });

  const { reset } = form;

  // Reset form when editData changes
  useEffect(() => {
    if (editData) {
      // Transform snake_case to camelCase
      const transformedData = {
        bankName: editData.bank_name || editData.bankName,
        branchName: editData.bank_branch || editData.branchName,
        accountHolder: editData.account_holder_name || editData.accountHolder,
        accountNumber: editData.account_number || editData.accountNumber,
        ifscCode: editData.ifsc_code || editData.ifscCode,
        id: editData.id,
      };
      reset(transformedData);
    } else {
      // Default values for add mode
      reset({
        bankName: '',
        branchName: '',
        accountHolder: '',
        accountNumber: '',
        ifscCode: '',
      });
    }
  }, [editData, reset]);

  const handleSubmit = (data: AddBankFormData) => {
    // Transform camelCase to snake_case for API
    const bankData = {
      bank_name: data.bankName,
      bank_branch: data.branchName,
      account_holder_name: data.accountHolder,
      account_number: data.accountNumber,
      ifsc_code: data.ifscCode,
    };

    if (onAdd) {
      onAdd(bankData);
      toast.success("Bank account added successfully");
    }
  };

  const handleEdit = (data: Record<string, any>) => {
    // Transform camelCase to snake_case for API
    const bankData = {
      bank_name: data.bankName,
      bank_branch: data.branchName,
      account_holder_name: data.accountHolder,
      account_number: data.accountNumber,
      ifsc_code: data.ifscCode,
    };

    if (onEdit) {
      onEdit({ ...bankData, id: data.id });
      toast.success("Bank account updated successfully");
    }
  };

  return (
    <GenericDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Bank Account"
      form={form}
      config={addBankConfig()}
      onSubmit={handleSubmit}
      submitButtonText="Add Bank"
      editData={editData}
      onEdit={handleEdit}
    />
  );
};