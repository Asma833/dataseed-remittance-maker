import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericDialog } from '@/components/common/generic-dialog';
import { cardEditFormSchema, CardEditFormData } from './card-edit-form.schema';
import { cardEditFormConfig } from './card-edit-form.config';
import { useUpdateCardData } from '../../../hooks/useCardEdit';
import { toast } from 'sonner';
import { CardData } from '../type/types';

interface CardEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: CardData | null;
  onEdit?: (cardData: CardData) => void;
}

export const CardEditDialog: React.FC<CardEditDialogProps> = ({
  isOpen,
  onClose,
  editData,
  onEdit,
}) => {
  const form = useForm<CardEditFormData>({
    resolver: zodResolver(cardEditFormSchema),
    defaultValues: editData || {},
    mode: 'onChange',
  });

  const { reset } = form;
  const updateCardMutation = useUpdateCardData();

  // Reset form when editData changes
  useEffect(() => {
    if (editData) {
      reset({
        currency: editData.currency,
        working_10_12: editData.working_10_12,
        working_12_02: editData.working_12_02,
        working_02_3_30: editData.working_02_3_30,
        workingEnd: editData.workingEnd,
        ttHolidayMargin: editData.ttHolidayMargin,
        ttweekendMargin: editData.ttweekendMargin,
        upperCircuit: editData.upperCircuit,
      });
    } else {
      reset({
        currency: '',
        working_10_12: '',
        working_12_02: '',
        working_02_3_30: '',
        workingEnd: '',
        ttHolidayMargin: '',
        ttweekendMargin: '',
        upperCircuit: '',
      });
    }
  }, [editData, reset]);

  const handleSubmit = (data: CardEditFormData) => {
    // Handle form submission
    console.log('Submitting card edit data:', data);
  };

  const handleEdit = (data: Record<string, any>) => {
    if (editData?.id && onEdit) {
      const updatedCard: CardData = {
        ...editData,
        currency: data.currency,
        working_10_12: data.working_10_12,
        working_12_02: data.working_12_02,
        working_02_3_30: data.working_02_3_30,
        workingEnd: data.workingEnd,
        ttHolidayMargin: data.ttHolidayMargin,
        ttweekendMargin: data.ttweekendMargin,
        upperCircuit: data.upperCircuit,
      };

      // Call the API update
      updateCardMutation.mutate(
        { ...data, id: editData.id } as CardEditFormData & { id: string },
        {
          onSuccess: () => {
            onEdit(updatedCard);
            toast.success('Card updated successfully');
          },
          onError: () => {
            toast.error('Failed to update card');
          },
        }
      );
    }
  };

  return (
    <GenericDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Card"
      form={form}
      config={cardEditFormConfig()}
      onSubmit={handleSubmit}
      submitButtonText="Update Card"
      editData={editData}
      onEdit={handleEdit}
    />
  );
};