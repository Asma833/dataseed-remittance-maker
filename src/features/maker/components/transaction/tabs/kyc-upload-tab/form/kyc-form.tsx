import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
// Components
import Spacer from '@/components/form/wrapper/spacer';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import { Button } from '@/components/ui/button';
import { kycDocumentsConfig } from './kyc-form.config';
import { createKycFormSchema } from './kyc-form.schema';
import { useGetMappedDocuments } from '../../../hooks/useGetMappedDocuments';
import { FieldType, KYCStatusEnum } from '@/types/enums';
import { ArrowLeft } from 'lucide-react';
import { DealsResponseTransaction } from '../../../types/transaction.types';
import { uploadTransactionDocument } from '../../../api/kycDocuments.api';
import { FlattenedDocumentItem } from '../../../types/rejection-doc-summary.types';
import { useGetPresignedUrls } from '../../../hooks/useGetPresignedUrls';
import { ImageViewModal } from '@/components/common/image-view-modal';
import { MappedDocument } from '../../../types/mapped-documents.types';

const KYCForm = ({
  transaction,
  onCancel,
  rejectedDocuments,
  isRejected = false,
  onSuccess,
}: {
  onCancel: () => void;
  transaction: DealsResponseTransaction;
  rejectedDocuments: FlattenedDocumentItem[];
  isRejected: boolean;
  onSuccess?: () => void;
}) => {
  const { data: mappedDocumentsResponse, isLoading: loading } = useGetMappedDocuments(
    transaction?.transaction_purpose_map_id,
    transaction?.id
  );

  const documentTypes: MappedDocument[] = mappedDocumentsResponse || [];

  const { mutateAsync: getPresignedUrlsAsync } = useGetPresignedUrls();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isPdf, setIsPdf] = useState(false);

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

  const handleViewDocument = async (s3Key: string, documentName: string) => {
    try {
      const response = await getPresignedUrlsAsync([s3Key]);
      if (response?.urls?.[0]?.presigned_url) {
        setModalImageSrc(response.urls[0].presigned_url);
        setModalTitle(`${documentName}`);
        setIsPdf(false);
        setIsImageModalOpen(true);
      }
    } catch (error) {
      console.error('Failed to get presigned URL:', error);
    }
  };

  const dynamicDocumentFields = useMemo(() => {
    return (documentTypes || []).flatMap((doc: MappedDocument) => {
      const label = doc.display_name || doc.name;
      const base = {
        type: FieldType.Fileupload_View,
        required: true,
        placeholder: 'Upload Document',
        documentId: doc.document_id,
        accept: '.pdf,.jpg,.jpeg,.png,.gif',
        documentUrl: doc.document_url,
        onView: doc.document_url ? () => handleViewDocument(doc.document_url, label) : undefined,
      };

      const documentId = doc.document_id || doc.id;

      if (doc.is_back_required) {
        return [
          {
            name: `document_${documentId}_front`,
            label: `${label} (Front)`,
            ...base,
            onFileSelected: (file: File) => handleUploadOnFileChange({ file, documentId }),
          },
          {
            name: `document_${documentId}_back`,
            label: `${label} (Back)`,
            ...base,
            onFileSelected: (file: File) => handleUploadOnFileChange({ file, documentId }),
          },
        ];
      }

      return [
        {
          name: `document_${documentId}`,
          label,
          ...base,
          onFileSelected: (file: File) => handleUploadOnFileChange({ file, documentId }),
        },
      ];
    });
  }, [documentTypes, handleUploadOnFileChange, handleViewDocument]);

  // Prepare default values for document fields with existing URLs
  const documentDefaultValues = useMemo(() => {
    const values: Record<string, any> = {};
    if (documentTypes) {
      documentTypes.forEach((doc: MappedDocument) => {
        if (doc.document_url) {
          const documentId = doc.document_id || doc.id;
          if (doc.is_back_required) {
            values[`document_${documentId}_front`] = [{ document_url: doc.document_url, name: doc.document_url }];
            values[`document_${documentId}_back`] = [{ document_url: doc.document_url, name: doc.document_url }];
          } else {
            values[`document_${documentId}`] = [{ document_url: doc.document_url, name: doc.document_url }];
          }
        }
      });
    }
    return values;
  }, [documentTypes]);

  const formSchema = useMemo(() => createKycFormSchema(documentTypes), [documentTypes]);
  const formSchemaRef = useRef(formSchema);

  useEffect(() => {
    formSchemaRef.current = formSchema;
  }, [formSchema]);

  const methods = useForm({
    resolver: (values, context, options) => zodResolver(formSchemaRef.current)(values, context, options),
    defaultValues: {
      company_reference_number: transaction?.company_ref_number || '',
      agent_reference_number: transaction?.agent_ref_number || '',
      applicant_name: transaction?.kyc_details?.applicant_name || '',
      ...documentDefaultValues,
    } as any, // Casting to any to avoid index signature operator incompatibility with strict types due to catchall
  });

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = methods;

  // Extract stable values for dependencies
  const transactionId = transaction?.id;
  const companyRef = transaction?.company_ref_number;
  const agentRef = transaction?.agent_ref_number;
  const applicantName = transaction?.kyc_details?.applicant_name;

  useEffect(() => {
    if (transactionId) {
      const newValues = {
        company_reference_number: companyRef || '',
        agent_reference_number: agentRef || '',
        applicant_name: applicantName || '',
        ...documentDefaultValues,
      };

      const currentValues = getValues();
      
      // Perform a check to avoid unnecessary resets (which cause infinite loops)
      // We check specific fields because getValues() might return more data or structure diffs
      const isDifferent = 
          currentValues.company_reference_number !== newValues.company_reference_number ||
          currentValues.agent_reference_number !== newValues.agent_reference_number ||
          currentValues.applicant_name !== newValues.applicant_name ||
          JSON.stringify(documentDefaultValues) !== JSON.stringify(Object.fromEntries(Object.entries(currentValues).filter(([k]) => k.startsWith('document_'))));

      // Fallback: simplified deep compare if the above specific check is too complex to maintain
      // const deepDifferent = JSON.stringify(currentValues) !== JSON.stringify({ ...currentValues, ...newValues });
      
      if (isDifferent) {
         reset(newValues as any);
      }
    }
  }, [transactionId, companyRef, agentRef, applicantName, documentDefaultValues, reset, getValues]);

  const queryClient = useQueryClient();

  const handleKycSubmit = handleSubmit(
    async (formdata: FieldValues) => {
      toast.success('KYC documents submitted successfully');
      await queryClient.invalidateQueries({
        queryKey: ['mapped-documents', transaction?.transaction_purpose_map_id, transaction?.id],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    (errors) => {
      toast.error('Please complete all required fields');
    }
  );

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <Button type="button" onClick={onCancel} variant="light" className="w-full sm:w-auto">
        <ArrowLeft /> Back
      </Button>
      <FormProvider {...methods}>
        <FormContentWrapper className="py-6 rounded-lg w-full mr-auto bg-transparent">
          <Spacer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-1">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 px-1">
                {dynamicDocumentFields.map((field: any) => {
                  const hasDocumentId = rejectedDocuments?.find((doc) => doc.document_id === field.documentId);

                  // If rejected, show error (remarks or reason)
                  // If NOT rejected but transaction is rejected, disable the field
                  // If not rejected transaction (normal flow), everything is enabled

                  const isDisabled = (isRejected && transaction?.kyc_status !== KYCStatusEnum.UPLOADED) && !hasDocumentId && !!field.documentUrl;
                  const shouldShowRemarks = transaction?.kyc_status === KYCStatusEnum.UPLOADING || transaction?.kyc_status === KYCStatusEnum.REJECTED;
                  const errorMessage = (shouldShowRemarks && hasDocumentId ?
                    (hasDocumentId.remarks || hasDocumentId.rejection_reason || 'Document Rejected') : '') || (errors[field.name] as any)?.message;

                  return (
                    <div key={field.name}>
                      <FieldWrapper
                        error={errorMessage}
                      >
                        {getController({ 
                          ...field, 
                          control, 
                          errors,
                          disabled: isDisabled 
                        })}
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

      {dynamicDocumentFields.length > 0 && (
        <div className="flex flex-col items-center gap-6 px-4">
          <div className="w-full max-w-xl flex flex-col sm:flex-row sm:justify-center gap-3">
            <Button type="button" onClick={handleCancel} variant="light" className="w-full sm:w-auto px-10">
              Cancel
            </Button>
            <Button type="button" onClick={handleKycSubmit} variant="secondary" className="w-full sm:w-auto px-10">
              Submit
            </Button>
          </div>
        </div>
      )}
      <ImageViewModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={modalImageSrc}
        title={modalTitle}
        isPdf={isPdf}
      />
    </>
  );
};

export default KYCForm;
