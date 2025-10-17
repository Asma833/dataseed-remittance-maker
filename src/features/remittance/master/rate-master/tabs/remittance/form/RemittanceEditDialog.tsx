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
}

export const RemittanceEditDialog: React.FC<RemittanceEditDialogProps> = ({
  isOpen,
  onClose,
  editData,
  onEdit,
}) => {
  const [displayMode, setDisplayMode] = useState<'inr' | 'percentage'>('inr');

  const form = useForm<RemittanceEditFormData>({
    resolver: zodResolver(remittanceEditFormSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  const { reset, watch } = form;
  const updateTimewiseMarginMutation = useUpdateTimewiseMargin();

  // Watch for currency type changes
  const watchedCurrencyType = watch('currencyType');

  useEffect(() => {
    if (watchedCurrencyType) {
      setDisplayMode(watchedCurrencyType);
    }
  }, [watchedCurrencyType]);

  // Reset form when editData changes
  useEffect(() => {
    if (editData) {
      reset({
        currencyType: 'inr', // Default to INR, can be changed based on data if available
        currency: String(editData.currency),
        'ttMargin10-12': String(editData['ttMargin10-12'] ?? 0),
        'ttMargin12-02': String(editData['ttMargin12-02'] ?? 0),
        'ttMargin02-3-30': String(editData['ttMargin02-3-30'] ?? 0),
        'ttMargin03-30end': String(editData['ttMargin03-30end'] ?? 0),
        ttHolidayMargin: String(editData.ttHolidayMargin ?? 0),
        ttWeekendMargin: String(editData.ttWeekendMargin ?? 0),
        ttUpperCircuit: String(editData.ttUpperCircuit),
      });
      setDisplayMode('inr');
    } else {
      reset({
        currencyType: 'inr',
        currency: '',
        'ttMargin10-12': '0',
        'ttMargin12-02': '0',
        'ttMargin02-3-30': '0',
        'ttMargin03-30end': '0',
        ttHolidayMargin: '0',
        ttWeekendMargin: '0',
        ttUpperCircuit: '',
      });
      setDisplayMode('inr');
    }
  }, [editData, reset]);

  const handleSubmit = (data: RemittanceEditFormData) => {
    // Handle form submission
    console.log('Submitting remittance edit data:', data);
  };

  const handleEdit = (data: Record<string, any>) => {
    if (editData?.id && onEdit) {
      // Convert percentage values back to numbers if needed for API
      const processedData = { ...data };
      if (data.currencyType === 'percentage') {
        // If percentage mode, ensure values are treated as percentages
        // The API might expect the raw values, so we keep them as strings
        processedData['ttMargin10-12'] = String(data['ttMargin10-12']);
        processedData['ttMargin12-02'] = String(data['ttMargin12-02']);
        processedData['ttMargin02-3-30'] = String(data['ttMargin02-3-30']);
        processedData['ttMargin03-30end'] = String(data['ttMargin03-30end']);
        processedData.ttHolidayMargin = String(data.ttHolidayMargin);
        processedData.ttWeekendMargin = String(data.ttWeekendMargin);
      }

      const updatedRemittance: RemittanceData = {
        ...editData,
        currency: data.currency,
        'ttMargin10-12': processedData['ttMargin10-12'],
        'ttMargin12-02': processedData['ttMargin12-02'],
        'ttMargin02-3-30': processedData['ttMargin02-3-30'],
        'ttMargin03-30end': processedData['ttMargin03-30end'],
        ttHolidayMargin: processedData.ttHolidayMargin,
        ttWeekendMargin: processedData.ttWeekendMargin,
        ttUpperCircuit: data.ttUpperCircuit,
      };

      // Prepare the payload for the API
      const apiPayload = {
        currency_code: processedData.currency,
        time_wise_margin: {
          "10-12": Number(processedData['ttMargin10-12']) || 0,
          "12-02": Number(processedData['ttMargin12-02']) || 0,
          "02-3.30": Number(processedData['ttMargin02-3-30']) || 0,
          "3.30End": Number(processedData['ttMargin03-30end']) || 0,
          holiday: Number(processedData.ttHolidayMargin) || 0,
          weekend: Number(processedData.ttWeekendMargin) || 0,
          upper_circuit: Number(processedData.ttUpperCircuit) || 0,
        }
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
      config={remittanceEditFormConfig(displayMode)}
      onSubmit={handleSubmit}
      submitButtonText="Update Remittance"
      editData={editData}
      onEdit={handleEdit}
    />
  );
};