import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericDialog } from '@/components/common/generic-dialog';
import { holidayEditFormSchema, HolidayEditFormData } from './holiday-edit-form.schema';
import { holidayEditFormConfig } from './holiday-edit-form.config';
import { useUpdateHolidayData } from '../hooks/useHolidayEdit';
import { toast } from 'sonner';
import { HolidayData } from '../table/types';

interface HolidayEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: HolidayData | null;
  onEdit?: (holidayData: HolidayData) => void;
}

export const HolidayEditDialog: React.FC<HolidayEditDialogProps> = ({
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

  const { reset } = form;
  const updateHolidayMutation = useUpdateHolidayData();

  // Reset form when editData changes
  useEffect(() => {
    if (editData) {
      // Extract year from created_at date
      const year = editData.created_at ? new Date(editData.created_at).getFullYear().toString() : '';
      reset({
        year,
        date: editData.created_at || '',
        holidayName: editData.holiday_name || '',
      });
    } else {
      reset({
        year: '',
        date: '',
        holidayName: '',
      });
    }
  }, [editData, reset]);

  const handleSubmit = (data: HolidayEditFormData) => {
    // Handle form submission
    console.log('Submitting holiday edit data:', data);
  };

  const handleEdit = (data: Record<string, any>) => {
    if (editData?.id && onEdit) {
      const updatedHoliday: HolidayData = {
        ...editData,
        created_at: data.date,
        holiday_name: data.holidayName,
      };

      // Call the API update
      updateHolidayMutation.mutate(
        { ...data, id: editData.id } as HolidayEditFormData & { id: string },
        {
          onSuccess: () => {
            onEdit(updatedHoliday);
            toast.success('Holiday updated successfully');
          },
          onError: () => {
            toast.error('Failed to update holiday');
          },
        }
      );
    }
  };

  return (
    <GenericDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Holiday"
      form={form}
      config={holidayEditFormConfig()}
      onSubmit={handleSubmit}
      submitButtonText="Update Holiday"
      editData={editData}
      onEdit={handleEdit}
    />
  );
};