import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericDialog } from '@/components/common/generic-dialog';
import { DocumentSchema } from './create-document.schema';
import { DocumentFormConfig } from './create-document.config';
import { useCreateDocument } from '../hooks/useCreateDocument';
import { DocumentData } from '../types/document.types';

interface DocumentCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: DocumentData | null;
  onEdit?: (documentData: DocumentData) => void;
}

export const DocumentCreationDialog: React.FC<DocumentCreationDialogProps> = ({
  isOpen,
  onClose,
  editData,
  onEdit,
}) => {
  const form = useForm({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      name: '',
      code: '',
      is_mandatory: [],
    },
    mode: 'onChange',
  });

  const { reset, trigger, clearErrors } = form;
  const createDocumentMutation = useCreateDocument();

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        reset({
          name: editData.name || '',
          code: editData.code || '',
          is_mandatory: editData.is_mandatory || [],
        });
        // Clear any stale errors and trigger validation for edit mode
        clearErrors();
        setTimeout(() => trigger(), 100);
      } else {
        reset({
          name: '',
          code: '',
          is_mandatory: [],
        });
        // Clear any stale errors but don't trigger validation for create mode
        clearErrors();
      }
    }
  }, [isOpen, editData, reset, trigger, clearErrors]);

  const handleFormSubmit = (data: any) => {
    const payload = {
      name: data.name,
      code: data.code,
      is_mandatory: data.is_mandatory,
      is_active: true,
    };

    if (editData?.id) {
      // Update existing document - TODO: Implement update functionality
      console.log('Update document:', { ...data, id: editData.id });
      onClose();
    } else {
      // Create new document
      createDocumentMutation.mutate(payload, {
        onSuccess: (response) => {
          const newDocument: DocumentData = {
            id: response.id,
            name: response.name,
            code: response.code,
            is_mandatory: response.is_mandatory,
            is_active: response.is_active,
            created_at: response.created_at,
            updated_at: response.updated_at,
          };
          if (onEdit) {
            onEdit(newDocument);
          }
          reset();
          onClose();
        },
        onError: (error) => {
          console.error('Failed to create document:', error);
        },
      });
    }
  };

  return (
    <GenericDialog
      isOpen={isOpen}
      onClose={onClose}
      title={editData ? 'Edit Document' : 'Create Document'}
      form={form}
      config={DocumentFormConfig}
      onSubmit={handleFormSubmit}
      submitButtonText={editData ? 'Update' : 'Create'}
      editData={editData}
    />
  );
};