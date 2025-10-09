import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericDialog } from '@/components/common/generic-dialog';
import { onboardCorporateSchema, OnboardCorporateFormData } from '../onboard-corporate.schema';
import { onboardCorporateConfig } from '../onboard-corporate.config';

interface OnboardCorporateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: OnboardCorporateFormData) => void;
  editData?: Record<string, any>;
  onEdit?: (data: Record<string, any>) => void;
}

export const OnboardCorporateDialog: React.FC<OnboardCorporateDialogProps> = ({
  isOpen,
  onClose,
  onCreate,
  editData,
  onEdit,
}) => {
  const form = useForm<OnboardCorporateFormData>({
    resolver: zodResolver(onboardCorporateSchema),
    defaultValues: editData || {},
  });

  const { reset } = form;

  // Reset form when editData changes
  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset();
    }
  }, [editData, reset]);

  return (
    <GenericDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Corporate"
      subtitle="Please fill all the required fields"
      form={form}
      config={onboardCorporateConfig()}
      onSubmit={onCreate}
      submitButtonText="Create"
      editData={editData}
      onEdit={onEdit}
    />
  );
};