import React, { useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, Upload } from 'lucide-react';
import { ImageViewModal } from '@/components/common/image-view-modal';
import SubTitle from '../components/sub-title';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import { getController } from '@/components/form/utils/get-controller';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { uploadRemittanceImage } from '../../../api/documents';
import { useGetPresignedUrls } from '../../../hooks/useGetPresignedUrls';
import { format } from 'date-fns';

type DocKind = 'agreement' | 'rbi';

export const DocumentsStep: React.FC = () => {
  const config = agentAdminCreationConfig();
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Watch just what we need
  const agreement = useWatch({ control, name: 'agreementCopy' }) as File | string | undefined;
  const rbi = useWatch({ control, name: 'rbiLicenseCopy' }) as File | string | undefined;
  const rbiLicenseValidity = useWatch({ control, name: 'rbiLicenseValidity' });

  // Get today's date in YYYY-MM-DD format
  const today = format(new Date(), 'yyyy-MM-dd');
  const rbiValidity = format(rbiLicenseValidity, 'yyyy-MM-dd');
  const shouldShowExtensionMonth = rbiValidity <= today;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isUploading, setIsUploading] = useState<DocKind | null>(null);

  const { mutate: getPresignedUrls } = useGetPresignedUrls();

  const canViewAgreement = !!agreement && (agreement instanceof File || typeof agreement === 'string');
  const canViewRbi = !!rbi && (rbi instanceof File || typeof rbi === 'string');

  const handleBrowse = (kind: DocKind) => {
    // we’ll rely on a hidden file input rendered via getController
    // The file input itself triggers setValue below via onChange
    const inputId = kind === 'agreement' ? 'doc__agreement_file' : 'doc__rbi_file';
    const el = document.getElementById(inputId) as HTMLInputElement | null;
    el?.click();
  };

  const onFileChange = (kind: DocKind, fileList: FileList | null) => {
    const file = fileList && fileList.length > 0 ? fileList[0] : null;
    // write the File if selected, else empty string
    setValue(kind === 'agreement' ? 'agreementCopy' : 'rbiLicenseCopy', file || '', {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleUpload = async (kind: DocKind) => {
    const currentFile =
      kind === 'agreement'
        ? agreement instanceof File
          ? agreement
          : undefined
        : rbi instanceof File
          ? rbi
          : undefined;
    if (!currentFile) return;

    // Optional validations
    if (currentFile.size > 10 * 1024 * 1024) {
      return;
    }

    setIsUploading(kind);
    try {
      const res = await uploadRemittanceImage(currentFile); // returns { success, s3_key }
      if (res?.s3_key) {
        // store the remote key in the field
        setValue(kind === 'agreement' ? 'agreementCopy' : 'rbiLicenseCopy', res.s3_key, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    } catch (e) {
      console.error('Upload failed:', e);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(null);
    }
  };

  const handleView = (file: File | string | undefined, title: string) => {
    if (!file) return;
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setModalTitle(title);
      setModalImageSrc(url);
      setIsModalOpen(true);
    } else if (typeof file === 'string') {
      // It's an s3_key, get presigned URL
      getPresignedUrls([file], {
        onSuccess: (data) => {
          if (data.urls && data.urls.length > 0) {
            setModalTitle(title);
            setModalImageSrc(data.urls[0].presigned_url);
            setIsModalOpen(true);
          }
        },
        onError: (error) => {
          console.error('Failed to get presigned URL:', error);
        },
      });
    }
  };

  const closeModal = () => {
    if (modalImageSrc) {
      URL.revokeObjectURL(modalImageSrc);
    }
    setModalImageSrc('');
    setIsModalOpen(false);
  };

  // convenience flags for button states
  const isAgreementUploaded = typeof agreement === 'string';
  const isRbiUploaded = typeof rbi === 'string';

  // agreement + rbi small helpers for labels
  const uploadBtnText = useMemo(
    () => (kind: DocKind) =>
      isUploading === kind
        ? 'Uploading...'
        : kind === 'agreement'
          ? isAgreementUploaded
            ? 'Uploaded'
            : 'Upload'
          : isRbiUploaded
            ? 'Uploaded'
            : 'Upload',
    [isUploading, isAgreementUploaded, isRbiUploaded]
  );

  return (
    <div className="space-y-6">
      {/* Agreement Details*/}
      <SubTitle title="Agreement Details" />
      <div className="bg-gray-100 p-2 pt-5 mb-2 rounded-lg">
        <input
          id="doc__agreement_file"
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => onFileChange('agreement', e.target.files)}
        />

        <FormFieldRow className="mb-4" rowCols={1}>
          <FieldWrapper>
            <div className="flex flex-wrap items-center gap-3">
              <Label className="min-w-[120px]">Agreement Copy</Label>
              <Button type="button" variant="outline" className="w-30" onClick={() => handleBrowse('agreement')}>
                Choose
              </Button>
              <Button
                type="button"
                variant={canViewAgreement ? 'default' : 'outline'}
                className="w-30"
                disabled={!canViewAgreement}
                onClick={() => handleView(agreement, 'Agreement Copy')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button
                type="button"
                onClick={() => handleUpload('agreement')}
                disabled={!canViewAgreement || isAgreementUploaded || isUploading === 'agreement'}
                className="w-30"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploadBtnText('agreement')}
              </Button>
            </div>
          </FieldWrapper>
        </FormFieldRow>

        {/* Agreement Valid (date) – using your existing config field */}
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
        <input
          id="doc__rbi_file"
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => onFileChange('rbi', e.target.files)}
        />

        <FormFieldRow className="mb-4" rowCols={1}>
          <FieldWrapper>
            <div className="flex flex-wrap items-center gap-3">
              <Label className="min-w-[120px]">RBI License Copy</Label>
              <Button type="button" variant="outline" className="w-30" onClick={() => handleBrowse('rbi')}>
                Choose
              </Button>
              <Button
                type="button"
                variant={canViewRbi ? 'default' : 'outline'}
                className="w-30"
                disabled={!canViewRbi}
                onClick={() => handleView(rbi, 'RBI License Copy')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button
                type="button"
                onClick={() => handleUpload('rbi')}
                disabled={!canViewRbi || isRbiUploaded || isUploading === 'rbi'}
                className="w-30"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploadBtnText('rbi')}
              </Button>
            </div>
          </FieldWrapper>
        </FormFieldRow>

        {/* RBI meta fields */}
        <FormFieldRow className="mb-4">
          {(['rbiLicenseCategory', 'rbiLicenseValidity', 'noOfBranches'] as const).map(
            (fieldName) => {
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
            }
          )}
        </FormFieldRow>
        {shouldShowExtensionMonth && (
          <FormFieldRow className="mb-4">
            {(['extensionMonth'] as const).map(
              (fieldName) => {
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
              }
            )}
            <div className="flex items-center pt-6">
              <div className='justify-center bg-red-100 border border-red-500 px-3 py-1 rounded-md font-medium'>{'0/3'}</div>
            </div>
          </FormFieldRow>
        )}
      </div>
      <ImageViewModal isOpen={isModalOpen} onClose={closeModal} imageSrc={modalImageSrc} title={modalTitle} />
    </div>
  );
};
