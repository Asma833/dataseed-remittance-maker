import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';

export interface GenericDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  form: UseFormReturn<any>;
  config: {
    fields: Record<string, any>;
  };
  onSubmit: (data: any) => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  maxWidth?: string;
  editData?: Record<string, any> | null | undefined;
  onEdit?: ((data: Record<string, any>) => void) | undefined;
}

export function GenericDialog({
  isOpen,
  onClose,
  title,
  subtitle,
  form,
  config,
  onSubmit,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
  maxWidth = 'sm:max-w-[600px]',
  editData,
  onEdit,
}: GenericDialogProps) {
  const { handleSubmit } = form;

  const handleFormSubmit = (data: any) => {
    if (editData?.id && onEdit) {
      onEdit({ ...data, id: editData.id });
    } else {
      onSubmit(data);
    }
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  // Group fields into rows (assuming 2-column layout)
  const fieldNames = Object.keys(config.fields);
  const fieldRows: string[][] = [];
  let currentRow: string[] = [];

  fieldNames.forEach((fieldName, index) => {
    currentRow.push(fieldName);
    if (currentRow.length === 2 || index === fieldNames.length - 1) {
      fieldRows.push(currentRow);
      currentRow = [];
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={maxWidth}>
        <DialogHeader>
          <DialogTitle style={{ color: 'var(--color-title)' }}>
            {editData ? `Edit ${title}` : title}
          </DialogTitle>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {fieldRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-2 gap-4">
              {row.map(fieldName => {
                const field = config.fields[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(typeof field === 'object' && field !== null ? field : {}),
                      name: fieldName,
                      errors: form.formState.errors,
                    })}
                  </FieldWrapper>
                );
              })}
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              {cancelButtonText}
            </Button>
            <Button type="submit">
              {editData ? 'Update' : submitButtonText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}