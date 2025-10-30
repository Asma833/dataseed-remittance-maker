import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericDialog } from '@/components/common/generic-dialog';
import { remittanceEditFormSchema, RemittanceEditFormData } from './remittance-edit-form.schema';
import { remittanceEditFormConfig } from './remittance-edit-form.config';
import { useUpdateTimewiseMargin } from '../../../hooks/useUpdateTimewiseMargin';
import { toast } from 'sonner';
import { RemittanceData } from '../types';

interface RemittanceEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: RemittanceData | null;
  onEdit?: (remittanceData: RemittanceData) => void;
  unit?: 'inr' | 'percentage';
}

export const RemittanceEditDialog: React.FC<RemittanceEditDialogProps> = ({
  isOpen,
  onClose,
  editData,
  onEdit,
  unit = 'inr',
}) => {
  const form = useForm<RemittanceEditFormData>({
    resolver: zodResolver(remittanceEditFormSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  const { reset } = form;
  const updateTimewiseMarginMutation = useUpdateTimewiseMargin();

  // Reset form when editData or unit changes
  useEffect(() => {
    const marginType = unit === 'inr' ? 'number' : 'percentage';
    if (editData) {
      reset({
        marginType,
        currency: String(editData.currency),
        'ttMargin10-12': String(editData['ttMargin10-12'] ?? 0),
        'ttMargin12-02': String(editData['ttMargin12-02'] ?? 0),
        'ttMargin02-3-30': String(editData['ttMargin02-3-30'] ?? 0),
        'ttMargin03-30end': String(editData['ttMargin03-30end'] ?? 0),
        ttHolidayMargin: String(editData.ttHolidayMargin ?? 0),
        ttWeekendMargin: String(editData.ttWeekendMargin ?? 0),
        ttUpperCircuit: String(editData.ttUpperCircuit),
      });
    } else {
      reset({
        marginType,
        currency: '',
        'ttMargin10-12': '0',
        'ttMargin12-02': '0',
        'ttMargin02-3-30': '0',
        'ttMargin03-30end': '0',
        ttHolidayMargin: '0',
        ttWeekendMargin: '0',
        ttUpperCircuit: '',
      });
    }
  }, [editData, reset, unit]);

  const handleSubmit = (data: RemittanceEditFormData) => {
    // Handle form submission
    //console.log('Submitting remittance edit data:', data);
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
        margin_type: data.marginType,
      };

      // Prepare the payload for the API
      const apiPayload = {
        currency_code: data.currency,
        time_wise_margin: {
          '10-12': Number(data['ttMargin10-12']) || 0,
          '12-02': Number(data['ttMargin12-02']) || 0,
          '02-3.30': Number(data['ttMargin02-3-30']) || 0,
          '3.30End': Number(data['ttMargin03-30end']) || 0,
          holiday: Number(data.ttHolidayMargin) || 0,
          weekend: Number(data.ttWeekendMargin) || 0,
          margin_type: data.marginType,
          upper_circuit: Number(data.ttUpperCircuit) || 0,
        },
      };

      // Call the API update
      updateTimewiseMarginMutation.mutate(apiPayload, {
        onSuccess: () => {
          onEdit(updatedRemittance);
          toast.success('Remittance updated successfully');
        },
        onError: () => {
          toast.error('Failed to update remittance');
        },
      });
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
