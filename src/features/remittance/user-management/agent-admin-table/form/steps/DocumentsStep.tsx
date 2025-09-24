import React, { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, Upload } from 'lucide-react';
import { GenericTable } from '../components/BankTable';

export interface CompanyDocument {
  id: string;
  documentType: string;
  file?: File;
}

export const DocumentsStep: React.FC = () => {
  const { control, formState: { errors }, watch, setValue } = useFormContext();
  const config = agentAdminCreationConfig();

  const [companyDocuments, setCompanyDocuments] = useState<CompanyDocument[]>([
    { id: '1', documentType: 'GST Certificate' },
    { id: '2', documentType: 'PAN Card' },
    { id: '3', documentType: 'Incorporation Certificate' },
  ]);

  const agreementCopyRef = useRef<HTMLInputElement>(null);
  const rbiLicenseCopyRef = useRef<HTMLInputElement>(null);

  const agreementCopy = watch('agreementCopy');
  const rbiLicenseCopy = watch('rbiLicenseCopy');

  const handleFileUpload = (fieldName: string, file: File) => {
    setValue(fieldName, file);
  };

  const handleViewFile = (file: File | undefined) => {
    if (file) {
      // Implement file viewing logic, e.g., open in new tab or modal
      console.log('Viewing file:', file.name);
    }
  };

  const handleAddDocument = () => {
    const newDoc: CompanyDocument = {
      id: Date.now().toString(),
      documentType: '',
    };
    setCompanyDocuments([...companyDocuments, newDoc]);
  };

  const handleDeleteDocument = (id: string) => {
    setCompanyDocuments(companyDocuments.filter(doc => doc.id !== id));
  };

  const documentColumns = [
    { key: 'documentType', label: 'Document Type' },
  ];

  const renderDocumentActions = (doc: CompanyDocument) => (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" onClick={() => handleViewFile(doc.file)} disabled={!doc.file}>
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Agreement Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Agreement Details</h3>
        <FormFieldRow className="mb-4">
          <FieldWrapper>
            <div className="flex items-center gap-2">
              <Label>Agreement Copy</Label>
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleViewFile(agreementCopy)}
                disabled={!agreementCopy}
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                variant="default"
                onClick={() => agreementCopyRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Replace
              </Button>
              <Input
                ref={agreementCopyRef}
                type="file"
                className="hidden"
                onChange={(e) => e.target.files && handleFileUpload('agreementCopy', e.target.files[0])}
              />
            </div>
          </FieldWrapper>
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
      <div>
        <h3 className="text-lg font-semibold mb-4">RBI Details</h3>
        <FormFieldRow className="mb-4">
          <FieldWrapper>
            <div className="flex items-center gap-2">
              <Label>RBI License Copy</Label>
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleViewFile(rbiLicenseCopy)}
                disabled={!rbiLicenseCopy}
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                variant="default"
                onClick={() => rbiLicenseCopyRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Replace
              </Button>
              <Input
                ref={rbiLicenseCopyRef}
                type="file"
                className="hidden"
                onChange={(e) => e.target.files && handleFileUpload('rbiLicenseCopy', e.target.files[0])}
              />
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

      {/* Company Documents */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Company Documents</h3>
        </div>
        <GenericTable
          data={companyDocuments}
          columns={documentColumns}
          renderActions={renderDocumentActions}
          emptyMessage="No documents added yet."
        />
      </div>
    </div>
  );
};