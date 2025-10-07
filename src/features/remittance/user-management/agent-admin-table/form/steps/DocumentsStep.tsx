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
    {
      id: 'documentType',
      header: 'Document Type',
      accessorKey: 'documentType'
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: CompanyDocument }) => (
        <div className="flex gap-2 justify-center">
          <Button variant="secondary" size="sm" onClick={() => handleViewFile(row.file)} >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

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
                className="w-28 ml-10"
                onClick={() => handleViewFile(agreementCopy)}
                // disabled={!agreementCopy}
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
              <Button
                type="button"
                variant="default"
                className="w-28"
                onClick={() => agreementCopyRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
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
                className="w-28 ml-10"
                onClick={() => handleViewFile(rbiLicenseCopy)}
                // disabled={!rbiLicenseCopy}
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
              <Button
                type="button"
                variant="default"
                className="w-28"
                onClick={() => rbiLicenseCopyRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
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

      {/* <div>
       <div className="flex items-center justify-between">
          <SubTitle title="Company Documents" className="" />
        </div>
        <GenericTable
          data={companyDocuments}
          columns={documentColumns}
        />
      </div> */}
    </div>
  );
};