import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
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
    transaction?.id || transaction?.transaction_id
  );

  const documentTypes: MappedDocument[] = mappedDocumentsResponse || [];

  const { mutateAsync: getPresignedUrlsAsync } = useGetPresignedUrls();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isPdf, setIsPdf] = useState(false);

  const [localPreviews, setLocalPreviews] = useState<Record<string, { url: string; isPdf: boolean }>>({});
  const queryClient = useQueryClient();
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

  // Extract stable values for dependencies
  const transactionId = transaction?.id || transaction?.transaction_id;
  const companyRef = transaction?.company_ref_number;
  const agentRef = transaction?.agent_ref_number;
  const applicantName = transaction?.kyc_details?.applicant_name;

  const formSchema = useMemo(() => createKycFormSchema(documentTypes), [documentTypes]);
  const formSchemaRef = useRef(formSchema);
  const prevTransactionIdRef = useRef(transactionId);
  
  useEffect(() => {
    formSchemaRef.current = formSchema;
  }, [formSchema]);

  const methods = useForm({
    resolver: (values, context, options) => zodResolver(formSchemaRef.current)(values, context, options),
    mode: 'onChange',
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
    setValue,
    trigger,
    formState: { errors, isSubmitSuccessful, isValid, touchedFields },
  } = methods;

  const handleUploadOnFileChange = useCallback(
    async ({ file, documentId, fieldKey }: { file: File; documentId: string; fieldKey?: string }) => {
      const transactionId = transaction?.id || transaction?.transaction_id;
      if (!transactionId) {
        toast.error('Missing transaction id. Please reopen the KYC upload form from the table.');
        return;
      }

      try {
        await uploadTransactionDocument({
          file,
          transaction_id: transactionId,
          document_id: documentId,
          remarks: '',
        });
        
        // Update local preview and form state to satisfy validation
        if (fieldKey) {
            const url = URL.createObjectURL(file);
            const isPdf = file.type === 'application/pdf';
            setLocalPreviews(prev => ({ ...prev, [fieldKey]: { url, isPdf } }));
            
            // Critical: Update form value so react-hook-form validation passes
            // Schema expects an array of objects
            setValue(fieldKey, [{
                file: file,
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                document_url: url
            }], { shouldValidate: true, shouldDirty: true, shouldTouch: true });
        }

      } catch (error: any) {
        console.error('KYC document upload failed:', error);
        toast.error(
          'Document upload failed' +
            ((error as any)?.response?.data?.message ? `: ${(error as any).response.data.message}` : '')
        );
      }
    },
    [transaction?.id, transaction?.transaction_id, transaction?.transaction_purpose_map_id, queryClient, setValue]
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
        const frontFieldName = `document_${documentId}_front`;
        const backFieldName = `document_${documentId}_back`;

        return [
          {
            name: frontFieldName,
            label: `${label} (Front)`,
            ...base,
            onView: (doc.document_url || localPreviews[frontFieldName]) 
                ? () => {
                   if (localPreviews[frontFieldName]) {
                      setModalImageSrc(localPreviews[frontFieldName].url);
                      setIsPdf(localPreviews[frontFieldName].isPdf);
                      setModalTitle(`${label} (Front)`);
                      setIsImageModalOpen(true);
                   } else if (doc.document_url) {
                       handleViewDocument(doc.document_url, `${label} (Front)`);
                   }
                }
                : undefined,
            onFileSelected: (file: File) => handleUploadOnFileChange({ file, documentId, fieldKey: frontFieldName }),
          },
          {
            name: backFieldName,
            label: `${label} (Back)`,
            ...base,
            onView: (doc.document_url || localPreviews[backFieldName]) 
                ? () => {
                   if (localPreviews[backFieldName]) {
                      setModalImageSrc(localPreviews[backFieldName].url);
                      setIsPdf(localPreviews[backFieldName].isPdf);
                      setModalTitle(`${label} (Back)`);
                      setIsImageModalOpen(true);
                   } else if (doc.document_url) {
                       handleViewDocument(doc.document_url, `${label} (Back)`);
                   }
                }
                : undefined,
            onFileSelected: (file: File) => handleUploadOnFileChange({ file, documentId, fieldKey: backFieldName }),
          },
        ];
      }

      const fieldName = `document_${documentId}`;
      return [
        {
          name: fieldName,
          label,
          ...base,
          onView: (doc.document_url || localPreviews[fieldName]) 
                ? () => {
                   if (localPreviews[fieldName]) {
                      setModalImageSrc(localPreviews[fieldName].url);
                      setIsPdf(localPreviews[fieldName].isPdf);
                      setModalTitle(label);
                      setIsImageModalOpen(true);
                   } else if (doc.document_url) {
                       handleViewDocument(doc.document_url, label);
                   }
                }
                : undefined,
            onFileSelected: (file: File) => handleUploadOnFileChange({ file, documentId, fieldKey: fieldName }),
        },
      ];
    });
  }, [documentTypes, handleUploadOnFileChange, handleViewDocument, localPreviews]);



  useEffect(() => {
    if (transactionId) {
      const newValues = {
        company_reference_number: companyRef || '',
        agent_reference_number: agentRef || '',
        applicant_name: applicantName || '',
        ...documentDefaultValues,
      };

      const currentValues = getValues();
      
      const isDifferent = 
          currentValues.company_reference_number !== newValues.company_reference_number ||
          currentValues.agent_reference_number !== newValues.agent_reference_number ||
          currentValues.applicant_name !== newValues.applicant_name ||
          JSON.stringify(documentDefaultValues) !== JSON.stringify(Object.fromEntries(Object.entries(currentValues).filter(([k]) => k.startsWith('document_'))));

      if (isDifferent) {
         const isSameTransaction = prevTransactionIdRef.current === transactionId;
         reset(newValues as any, { keepIsSubmitSuccessful: isSameTransaction });
         prevTransactionIdRef.current = transactionId;
      }
    }

  }, [transactionId, companyRef, agentRef, applicantName, documentDefaultValues, reset, getValues]);

  useEffect(() => {
    if (documentTypes.length > 0) {
      trigger();
    }
  }, [documentTypes, trigger]);

  const handleKycSubmit = handleSubmit(
    async (formdata: FieldValues) => {
      toast.success('KYC documents submitted successfully');
      await queryClient.invalidateQueries({
        queryKey: ['mapped-documents', transaction?.transaction_purpose_map_id, transaction?.id || transaction?.transaction_id],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    (errors) => {
      console.error('Form validation errors:', errors);
      const errorDetails = Object.values(errors)
        .map((error: any) => error?.message || 'Invalid field')
        .join('\n');
      toast.error(`Validation failed:\n${errorDetails}`);
    }
  );

  const handleCancel = () => {
    onCancel();
  };

  /* 
   * Calculate which fields correspond to rejected documents.
   * We need to ensure that for every rejected document field, a new file has been locally uploaded (proven by localPreviews).
   */
  const rejectedFieldNames = useMemo(() => {
     if (!rejectedDocuments?.length) return [];
     return dynamicDocumentFields
        .filter((field: any) => rejectedDocuments.some(d => d.document_id === field.documentId))
        .map((field: any) => field.name);
  }, [dynamicDocumentFields, rejectedDocuments]);

  const allRejectedUploaded = useMemo(() => {
    if (rejectedFieldNames.length === 0) return true;
    return rejectedFieldNames.every(name => !!localPreviews[name]);
  }, [rejectedFieldNames, localPreviews]);

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

                  const isDisabled = 
                      isSubmitSuccessful || 
                      ((isRejected && transaction?.kyc_status !== KYCStatusEnum.UPLOADED) && !hasDocumentId && !!field.documentUrl);
                  const isReUpload = !!localPreviews[field.name];
                  const shouldShowRemarks = transaction?.kyc_status === KYCStatusEnum.UPLOADING || transaction?.kyc_status === KYCStatusEnum.REJECTED;
                  const rejectionError = (shouldShowRemarks && hasDocumentId && !isReUpload) ? 
                      (hasDocumentId.remarks || hasDocumentId.rejection_reason || 'Document Rejected') : '';
                  const fieldError = (errors[field.name] as any)?.message;
                  const isTouched = touchedFields[field.name];
                  // Show error if it is a rejection error OR if the field is touched and has a validation error
                  const errorMessage = rejectionError || (isTouched && fieldError);

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
                No documents found for transaction id {transaction?.id || transaction?.transaction_id}.
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
            <Button 
                type="button" 
                onClick={handleKycSubmit} 
                variant="secondary" 
                className="w-full sm:w-auto px-10"
                disabled={loading || !isValid || isSubmitSuccessful || (isRejected && !allRejectedUploaded)}
            >
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
