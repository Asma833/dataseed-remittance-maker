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
import { ImageViewModal } from '@/components/common/image-view-modal';

export interface CompanyDocument {
  id: string;
  documentType: string;
  file?: File;
}

export const DocumentsStep: React.FC = () => {
  const { control, formState: { errors }, watch, setValue } = useFormContext();
  const config = agentAdminCreationConfig();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const agreementCopy = watch('agreementCopy');
  const rbiLicenseCopy = watch('rbiLicenseCopy');

  const handleFileUpload = (fieldName: string, file: File) => {
    setValue(fieldName, file);
  };

  const handleViewFile = (fileData: any, title: string) => {
    let file: File | undefined;
    if (Array.isArray(fileData) && fileData.length > 0 && fileData[0]?.file instanceof File) {
      file = fileData[0].file;
    } else if (fileData instanceof File) {
      file = fileData;
    }
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setModalImageSrc(objectUrl);
      setModalTitle(title);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Clean up object URL to prevent memory leaks
    if (modalImageSrc) {
      URL.revokeObjectURL(modalImageSrc);
      setModalImageSrc('');
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
                onClick={() => handleViewFile(agreementCopy, 'Agreement Copy')}
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
                onClick={() => handleViewFile(rbiLicenseCopy, 'RBI License Copy')}
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

      <ImageViewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={modalImageSrc}
        title={modalTitle}
      />
    </div>
  );
};