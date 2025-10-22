import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericDialog } from '@/components/common/generic-dialog';
import { holidayEditFormSchema, HolidayEditFormData } from './holiday-creation-form.schema';
import { holidayEditFormConfig } from './holiday-creation-form.config';
import { useUpdateHolidayData } from '../hooks/useHolidayEdit';
import { useCreateHoliday } from '../hooks/useCreateHoliday';
import { HolidayData, CreateHolidayPayload } from '../table/types';

interface HolidayCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: HolidayData | null;
  onEdit?: (holidayData: HolidayData) => void;
}

export const HolidayCreationDialog: React.FC<HolidayCreationDialogProps> = ({
  isOpen,
  onClose,
  editData,
  onEdit,
}) => {
  const form = useForm<HolidayEditFormData>({
    resolver: zodResolver(holidayEditFormSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  const { reset, trigger, clearErrors } = form;
  const updateHolidayMutation = useUpdateHolidayData();
  const createHolidayMutation = useCreateHoliday();

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        reset({
          date: editData.date || '',
          holidayName: editData.holiday_name || '',
        });
      } else {
        reset({
          date: '',
          holidayName: '',
        });
      }
      // Clear any stale errors and trigger validation
      clearErrors();
      setTimeout(() => trigger(), 100);
    }
  }, [isOpen, editData, reset, trigger, clearErrors]);

  const handleFormSubmit = (data: HolidayEditFormData) => {
    const payload: CreateHolidayPayload = {
      holidayName: data.holidayName,
      date: data.date,
      isActive: true, // Default to active for new holidays
    };

    if (editData?.id) {
      // Update existing holiday
      updateHolidayMutation.mutate(
        { ...data, id: editData.id },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      // Create new holiday
      createHolidayMutation.mutate(payload, {
        onSuccess: (response) => {
          const newHoliday: HolidayData = {
            id: response.id,
            sno: 0, // Will be set by the table
            holiday_name: response.holiday_name,
            date: response.date,
            year: response.year,
            is_active: response.is_active,
          };
          if (onEdit) {
            onEdit(newHoliday);
          }
          reset();
        },
      });
    }
  };


  return (
    <GenericDialog
      isOpen={isOpen}
      onClose={onClose}
      title={editData ? 'Update Holiday' : 'Create Holiday'}
      form={form}
      config={holidayEditFormConfig()}
      onSubmit={handleFormSubmit}
      submitButtonText={editData ? 'Update' : 'Create'}
      editData={editData}
    />
  );
};