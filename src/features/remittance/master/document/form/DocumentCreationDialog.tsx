import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericDialog } from '@/components/common/generic-dialog';
import { DocumentSchema } from './create-document.schema';
import { DocumentFormConfig } from './create-document.config';
import { useCreateDocument } from '../hooks/useCreateDocument';
import { useUpdateDocument } from '../hooks/useUpdateDocument';
import { DocumentData, CreateDocumentResponse } from '../types/document.types';

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
      is_required: '',
      is_back_required: ''
    },
    mode: 'onChange',
  });

  const { reset, trigger, clearErrors } = form;
  const createDocumentMutation = useCreateDocument();
  const updateDocumentMutation = useUpdateDocument();

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        reset({
          name: editData.name || '',
          code: editData.code || '',
          is_required: editData.is_required ? 'is_required' : '',
          is_back_required:editData.is_back_required ? 'is_back_required' : '',
        });
        // Clear any stale errors and trigger validation for edit mode
        clearErrors();
        setTimeout(() => trigger(), 100);
      } else {
        reset({
          name: '',
          code: '',
          is_required: '',
          is_back_required: ''
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
      is_required: data.is_required ? true : false,
      is_back_required: data.is_back_required ? true : false,
      is_active: true,
      display_name:'',
    };

    if (editData?.id) {
      // Update existing document
      updateDocumentMutation.mutate(
        { id: editData.id, payload },
        {
          onSuccess: (response: CreateDocumentResponse) => {
            const updatedDocument: DocumentData = {
              id: response.id,
              name: response.name,
              code: response.code,
              is_required: response.is_required,
              is_back_required: response.is_back_required,
              is_active: response.is_active,
            };
            if (onEdit) {
              onEdit(updatedDocument);
            }
            reset();
            onClose();
          },
          onError: (error) => {
            console.error('Failed to update document:', error);
          },
        }
      );
    } else {
      // Create new document
      createDocumentMutation.mutate(payload, {
        onSuccess: (response: CreateDocumentResponse) => {
          const newDocument: DocumentData = {
            id: response.id,
            name: response.name,
            code: response.code,
            is_required: response.is_required,
            is_back_required: response.is_back_required,
            is_active: response.is_active,
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