import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericDialog } from '@/components/common/generic-dialog';
import { remittanceEditFormSchema, RemittanceEditFormData } from './remittance-edit-form.schema';
import { remittanceEditFormConfig } from './remittance-edit-form.config';
import { useUpdateRemittanceData } from '../hooks/useRemittanceEdit';
import { toast } from 'sonner';
import { RemittanceData } from '../types';

interface RemittanceEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: RemittanceData | null;
  onEdit?: (remittanceData: RemittanceData) => void;
}

export const RemittanceEditDialog: React.FC<RemittanceEditDialogProps> = ({
  isOpen,
  onClose,
  editData,
  onEdit,
}) => {
  const form = useForm<RemittanceEditFormData>({
    resolver: zodResolver(remittanceEditFormSchema),
    defaultValues: editData || {},
    mode: 'onChange',
  });

  const { reset } = form;
  const updateRemittanceMutation = useUpdateRemittanceData();

  // Reset form when editData changes
  useEffect(() => {
    if (editData) {
      reset({
        currency: editData.currency,
        'ttMargin10-12': editData['ttMargin10-12'],
        'ttMargin12-02': editData['ttMargin12-02'],
        'ttMargin02-3-30': editData['ttMargin02-3-30'],
        'ttMargin03-30end': editData['ttMargin03-30end'],
        ttHolidayMargin: editData.ttHolidayMargin,
        ttWeekendMargin: editData.ttWeekendMargin,
        ttUpperCircuit: editData.ttUpperCircuit,
      });
    } else {
      reset({
        currency: '',
        'ttMargin10-12': 0,
        'ttMargin12-02': 0,
        'ttMargin02-3-30': 0,
        'ttMargin03-30end': 0,
        ttHolidayMargin: 0,
        ttWeekendMargin: 0,
        ttUpperCircuit: '',
      });
    }
  }, [editData, reset]);

  const handleSubmit = (data: RemittanceEditFormData) => {
    // Handle form submission
    console.log('Submitting remittance edit data:', data);
  };

  const handleEdit = (data: Record<string, any>) => {
    if (editData?.id && onEdit) {
      const updatedRemittance: RemittanceData = {
        ...editData,
        currency: data.currency,
        'ttMargin10-12': data['ttMargin10-12'],
        'ttMargin12-02': data['ttMargin12-02'],
        'ttMargin02-3-30': data['ttMargin02-3-30'],
        'ttMargin03-30end': data['ttMargin03-30end'],
        ttHolidayMargin: data.ttHolidayMargin,
        ttWeekendMargin: data.ttWeekendMargin,
        ttUpperCircuit: data.ttUpperCircuit,
      };

      // Call the API update
      updateRemittanceMutation.mutate(
        { ...data, id: editData.id } as RemittanceEditFormData & { id: string | number },
        {
          onSuccess: () => {
            onEdit(updatedRemittance);
            toast.success('Remittance updated successfully');
          },
          onError: () => {
            toast.error('Failed to update remittance');
          },
        }
      );
    }
  };

  return (
    <GenericDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Remittance"
      form={form}
      config={remittanceEditFormConfig()}
      onSubmit={handleSubmit}
      submitButtonText="Update Remittance"
      editData={editData}
      onEdit={handleEdit}
    />
  );
};