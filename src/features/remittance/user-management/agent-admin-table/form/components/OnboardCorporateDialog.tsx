import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericDialog } from '@/components/common/generic-dialog';
import { onboardCorporateSchema, OnboardCorporateFormData } from './onboard-corporate.schema';
import { onboardCorporateConfig } from './onboard-corporate.config';
import { useCreateAgentCorporate } from '../../../hooks/useCreateAgentCorporate';
import { useUpdateAgentCorporate } from '../../../hooks/useUpdateAgentCorporate';

interface OnboardCorporateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  agentId: string;
  editData?: Record<string, any>;
}

export const OnboardCorporateDialog: React.FC<OnboardCorporateDialogProps> = ({
  isOpen,
  onClose,
  agentId,
  editData,
}) => {
  const form = useForm<OnboardCorporateFormData>({
    resolver: zodResolver(onboardCorporateSchema),
    defaultValues: {},
    mode: 'onSubmit',
  });

  const { reset } = form;

  // Hooks for API operations
  const createCorporateMutation = useCreateAgentCorporate();
  const updateCorporateMutation = useUpdateAgentCorporate();

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        reset(editData);
      } else {
        reset({
          entityName: '',
          panNumber: '',
          dateOfIncorporation: '',
          entityType: '',
          cin: '',
          address: '',
        });
      }
    }
  }, [isOpen, editData, reset]);

  const handleFormSubmit = (data: OnboardCorporateFormData) => {
    const payload = {
      entity_name: data.entityName,
      pan_number: data.panNumber,
      date_of_incorporation: data.dateOfIncorporation,
      entity_type: data.entityType,
      owner_id: agentId,
      owner_type: 'Agent',
      ...(data.cin && { cin: data.cin }),
      ...(data.address && { address: data.address }),
    };

    if (editData?.id) {
      // Update existing corporate
      updateCorporateMutation.mutate({
        id: editData.id,
        ...payload,
      }, {
        onSuccess: () => onClose(),
      });
    } else {
      // Create new corporate
      createCorporateMutation.mutate(payload, {
        onSuccess: () => reset(),
      });
    }
  };

  return (
    <GenericDialog
      isOpen={isOpen}
      onClose={onClose}
      title={editData ? "Update Corporate" : "Create Corporate"}
      subtitle=""
      form={form}
      config={onboardCorporateConfig()}
      onSubmit={handleFormSubmit}
      submitButtonText={editData ? "Update" : "Create"}
    />
  );
};