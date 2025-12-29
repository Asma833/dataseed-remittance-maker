import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
// Components
import Spacer from '@/components/form/wrapper/spacer';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import { Button } from '@/components/ui/button';
import { kycDocumentsConfig } from './kyc-form.config';
import { KycFormSchema } from './kyc-form.schema';
import useGetDocumentTypes from '@/hooks/useGetDocumentTypes';
import { FieldType } from '@/types/enums';
import { uploadTransactionDocument } from '@/features/maker/api/kycDocumentsApi';
import { FlattenedDocumentItem } from '../../../types/rejection-doc-summary.types';
import { ArrowLeft } from 'lucide-react';
import { DealsResponseTransaction } from '../../../types/transaction.types';

const KYCForm = ({
  transaction,
  onFormSubmit,
  onCancel,
  rejectedDocuments,
  isRejected = false,
}: {
  onFormSubmit: () => void;
  onCancel: () => void;
  transaction: DealsResponseTransaction;
  rejectedDocuments: FlattenedDocumentItem[];
  isRejected: boolean;
}) => {
  const { documentTypes = [], loading } = useGetDocumentTypes(
    transaction?.transaction_purpose_map_id
      ? { document_map_id: transaction.transaction_purpose_map_id, transaction_id: transaction.id, enable: true }
      : { enable: false }
  );

  const handleUploadOnFileChange = useCallback(
    async ({ file, documentId }: { file: File; documentId: string }) => {
      if (!transaction?.id) {
        toast.error('Missing transaction id. Please reopen the KYC upload form from the table.');
        return;
      }

      try {
        await uploadTransactionDocument({
          file,
          transaction_id: transaction.id,
          document_id: documentId,
          remarks: '',
        });
        toast.success('Document uploaded successfully');
      } catch (error: any) {
        console.error('KYC document upload failed:', error);
        toast.error(
          'Document upload failed' +
            ((error as any)?.response?.data?.message ? `: ${(error as any).response.data.message}` : '')
        );
      }
    },
    [transaction?.id]
  );

  const dynamicDocumentFields = useMemo(() => {
    return (documentTypes || []).flatMap((doc: any) => {
      const label = doc.display_name || doc.name;
      const base = {
        type: FieldType.Fileupload_View,
        required: Boolean(doc.is_mandatory),
        placeholder: 'Upload Document',
        documentId: doc.document_id,
      };

      const documentId = doc.document_id || doc.id;

      if (doc.is_back_required) {
        return [
          {
            name: `document_${doc.id}_front`,
            label: `${label} (Front)`,
            ...base,
            onFileSelected: (file: File) => handleUploadOnFileChange({ file, documentId }),
          },
          {
            name: `document_${doc.id}_back`,
            label: `${label} (Back)`,
            ...base,
            onFileSelected: (file: File) => handleUploadOnFileChange({ file, documentId }),
          },
        ];
      }

      return [
        {
          name: `document_${doc.id}`,
          label,
          ...base,
          onFileSelected: (file: File) => handleUploadOnFileChange({ file, documentId }),
        },
      ];
    });
  }, [documentTypes, handleUploadOnFileChange]);

  const methods = useForm({
    resolver: zodResolver(KycFormSchema),
    defaultValues: {
      company_reference_number: transaction?.company_ref_number || '',
      agent_reference_number: transaction?.agent_ref_number || '',
      applicant_name: transaction?.kyc_details?.applicant_name || '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const handleKycSubmit = handleSubmit(async (formdata: FieldValues) => {
    // Handle form submission logic here
    onFormSubmit();
  });

  return (
    <>
      <Button type="button" onClick={onCancel} variant="ghost" className="w-full sm:w-auto">
        <ArrowLeft /> Back
      </Button>
      <FormProvider {...methods}>
        <FormContentWrapper className="py-6 rounded-lg w-full mr-auto bg-transparent">
          <Spacer>
            <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 gap-4 px-1">
              {Object.entries(kycDocumentsConfig.fields)
                .slice(0, 3)
                .map(([name, field]) => (
                  <div key={name}>
                    <FieldWrapper>{getController({ ...field, name, control, errors })}</FieldWrapper>
                  </div>
                ))}
            </div>

            {/* Dynamic documents fetched by transactionPurposeMapId */}
            {loading ? (
              <div className="px-2">Loading documents...</div>
            ) : dynamicDocumentFields.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1">
                {dynamicDocumentFields?.map((field: any) => {
                  const hasDocumentId = rejectedDocuments && rejectedDocuments?.find((doc) => doc.document_id === field.documentId) || "";

                  if (isRejected) {
                    return (
                      hasDocumentId && (
                        <div key={field.name}>
                          <FieldWrapper
                            error={hasDocumentId ? `Rejection Reason: ${hasDocumentId.rejection_reason}` : ''}
                          >
                            {getController({ ...field, required: true, control, errors })}
                          </FieldWrapper>
                        </div>
                      )
                    );
                  }

                  return (
                    <div key={field.name}>
                      <FieldWrapper
                        error={isRejected && hasDocumentId ? `Rejection Reason: ${hasDocumentId.rejection_reason}` : ''}
                      >
                        {getController({ ...field, control, errors })}
                      </FieldWrapper>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border-dotted border-2 border-gray-300 p-5 bg-gray-100">
                No documents found for transaction id {transaction?.id}.
              </div>
            )}
          </Spacer>
        </FormContentWrapper>
      </FormProvider>

      {/*<div className="mt-16 flex flex-col items-center gap-6 px-4">
        <div className="w-full max-w-xl flex flex-col sm:flex-row sm:justify-center gap-3">
          <Button type="button" onClick={onCancel} variant="light" className="w-full sm:w-auto px-10">
            Back
          </Button>
          <Button type="button" onClick={handleKycSubmit} variant="secondary" className="w-full sm:w-auto px-10">
            Submit
          </Button>
        </div>
      </div>*/}
    </>
  );
};

export default KYCForm;
