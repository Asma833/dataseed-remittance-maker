import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericDialog } from '@/components/common/generic-dialog';
import { currencyEditFormSchema, CurrencyEditFormData } from './currency-edit-form.schema';
import { currencyEditFormConfig } from './currency-edit-form.config';
import { useUpdateCurrencyData } from '../hooks/useCurrencyEdit';
import { toast } from 'sonner';
import { CurrencyData } from '../table/types';

interface CurrencyEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: CurrencyData | null;
  onEdit?: (currencyData: CurrencyData) => void;
}

export const CurrencyEditDialog: React.FC<CurrencyEditDialogProps> = ({
  isOpen,
  onClose,
  editData,
  onEdit,
}) => {
  const form = useForm<CurrencyEditFormData>({
    resolver: zodResolver(currencyEditFormSchema),
    defaultValues: editData || {},
    mode: 'onChange',
  });

  const { reset } = form;
  const updateCurrencyMutation = useUpdateCurrencyData();

  // Reset form when editData changes
  useEffect(() => {
    if (editData) {
      reset({
        currency: editData.currency,
        ttMargin10_12: editData.ttMargin10_12,
        ttMargin12_02: editData.ttMargin12_02,
        ttMargin02_3_30: editData.ttMargin02_3_30,
        ttMargin03_30end: editData.ttMargin03_30end,
        ttHolidayMargin: editData.ttHolidayMargin,
        ttWeekendMargin: editData.ttWeekendMargin,
        ttUpperCircuit: editData.ttUpperCircuit,
      });
    } else {
      reset({
        currency: '',
        ttMargin10_12: '',
        ttMargin12_02: '',
        ttMargin02_3_30: '',
        ttMargin03_30end: '',
        ttHolidayMargin: '',
        ttWeekendMargin: '',
        ttUpperCircuit: '',
      });
    }
  }, [editData, reset]);

  const handleSubmit = (data: CurrencyEditFormData) => {
    // Handle form submission
  //  console.log('Submitting currency edit data:', data);
  };

  const handleEdit = (data: Record<string, any>) => {
    if (editData?.id && onEdit) {
      const updatedCurrency: CurrencyData = {
        ...editData,
        currency: data.currency,
        ttMargin10_12: data.ttMargin10_12,
        ttMargin12_02: data.ttMargin12_02,
        ttMargin02_3_30: data.ttMargin02_3_30,
        ttMargin03_30end: data.ttMargin03_30end,
        ttHolidayMargin: data.ttHolidayMargin,
        ttWeekendMargin: data.ttWeekendMargin,
        ttUpperCircuit: data.ttUpperCircuit,
      };

      // Call the API update
      updateCurrencyMutation.mutate(
        { ...data, id: editData.id } as CurrencyEditFormData & { id: string },
        {
          onSuccess: () => {
            onEdit(updatedCurrency);
            toast.success('Currency updated successfully');
          },
          onError: () => {
            toast.error('Failed to update currency');
          },
        }
      );
    }
  };

  return (
    <GenericDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Currency"
      form={form}
      config={currencyEditFormConfig()}
      onSubmit={handleSubmit}
      submitButtonText="Update Currency"
      editData={editData}
      onEdit={handleEdit}
    />
  );
};