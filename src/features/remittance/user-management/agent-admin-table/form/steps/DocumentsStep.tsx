import React, { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';
import { GenericTable }  from '../components/generic-table';
import SubTitle from '../components/sub-title';

export interface CompanyDocument {
  id: string;
  documentType: string;
  file?: File;
}

export const DocumentsStep: React.FC = () => {
  const { control, formState: { errors }, watch, setValue } = useFormContext();
  const config = agentAdminCreationConfig();


  const agreementCopy = watch('documents.agreementCopy');
  const rbiLicenseCopy = watch('documents.rbiLicenseCopy');

  const handleFileUpload = (fieldName: string, file: File) => {
    setValue(`documents.${fieldName}`, file);
  };

  const handleViewFile = (file: File | undefined) => {
    if (file) {
      // Implement file viewing logic, e.g., open in new tab or modal
      console.log('Viewing file:', file.name);
    }
  };

  return (
    <div className="space-y-6">
      {/* Agreement Details */}
      <SubTitle title="Agreement Details" />
      <div className="bg-gray-100 p-2 pt-5 mb-2 rounded-lg">
        <FormFieldRow className="mb-4" rowCols={1}>
          <FieldWrapper>
            <div className="flex items-center gap-2">
              <Label>Agreement Copy</Label>
              <Button
                type="button"
                variant="light"
                className="w-28"
                onClick={() => handleViewFile(agreementCopy)}
                // disabled={!agreementCopy}
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
              {getController({
                ...(config.fields.documents?.agreementCopy || {}),
                name: 'agreementCopy',
                control,
                errors,
                className:"gap-0"
              })}
            </div>
          </FieldWrapper>
         
          
        </FormFieldRow>
         <FormFieldRow className="mb-4">
            <FieldWrapper>
            {getController({
              ...(config.fields.documents?.agreementValid || {}),
              name: 'agreementValid',
              control,
              errors,
            })}
          </FieldWrapper>
          </FormFieldRow>
      </div>

      {/* RBI Details */}
      <SubTitle title="RBI Details" />
       <div className="bg-gray-100 p-2 pt-5 mb-2 rounded-lg">
        
        <FormFieldRow className="mb-4" rowCols={1}>
          <FieldWrapper>
            <div className="flex items-center gap-2">
              <Label>RBI License Copy</Label>
              <Button
                type="button"
                variant="light"
                className="w-28"
                onClick={() => handleViewFile(rbiLicenseCopy)}
                // disabled={!rbiLicenseCopy}
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
              {getController({
                ...(config.fields.documents?.rbiLicenseCopy || {}),
                name: 'rbiLicenseCopy',
                control,
                errors,
                className:"gap-0"
              })}
            </div>
          </FieldWrapper>
        </FormFieldRow>
        <FormFieldRow className="mb-4">
          {(['rbiLicenseCategory', 'rbiLicenseValidity', 'noOfBranches', 'extensionMonth'] as const).map((fieldName) => {
            const field = config.fields.documents?.[fieldName];
            return (
              <FieldWrapper key={fieldName}>
                {getController({
                  ...(typeof field === 'object' && field !== null ? field : {}),
                  name: fieldName,
                  control,
                  errors,
                })}
              </FieldWrapper>
            );
          })}
        </FormFieldRow>
      </div>

    </div>
  );
};