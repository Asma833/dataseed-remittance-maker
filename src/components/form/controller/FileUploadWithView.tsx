import { ChangeEvent, useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { FileUpload } from './FileUpload';
import { useFormContext } from 'react-hook-form';
import { ImageViewModal } from '@/components/common/image-view-modal';
import '../styles/form-layout.css';

interface FileUploadProps {
  id?: string;
  name: string;
  label: string;
  className?: string;
  maxFiles?: number;
  description?: string;
  helpText?: string;
  accept?: string;
  multiple?: boolean;
  viewFile?: boolean;
  onFileSelected?: (file: File) => void;
  disabled?: boolean;
  documentUrl?: string;
  onView?: () => void;
}

const FileUploadWithView = ({
  id,
  name,
  label,
  className,
  accept,
  viewFile = true,
  onFileSelected,
  disabled,
  documentUrl,
  onView,
}: FileUploadProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { watch } = useFormContext();

  // Watch the form field to get the current file array
  const fileArray = watch(name) || [];

  useEffect(() => {
    // Update selectedFile when the form value changes
    if (fileArray.length > 0 && fileArray[0]?.file) {
      setSelectedFile(fileArray[0].file);
    } else {
      setSelectedFile(null);
    }
  }, [fileArray]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement> | null) => {
    if (e && e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (onFileSelected) {
        onFileSelected(file);
      }
    }
  };

  const getPreviewData = () => {
    if (selectedFile) {
      return {
        url: URL.createObjectURL(selectedFile),
        name: selectedFile.name,
        isPdf: selectedFile.type === 'application/pdf',
      };
    } else if (fileArray.length > 0 && fileArray[0]?.document_url) {
      const url = fileArray[0].document_url;
      const extension = url.split('.').pop()?.toLowerCase();
      return {
        url,
        name: fileArray[0].name || 'Existing Document',
        isPdf: extension === 'pdf',
      };
    } else if (documentUrl) {
      const extension = documentUrl.split('.').pop()?.toLowerCase();
      return {
        url: documentUrl,
        name: 'Existing Document',
        isPdf: extension === 'pdf',
      };
    }
    return null;
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-full min-w-0">
        <span className="fileupload-label text-sm mb-2">{label}</span>
        <div className="flex w-full gap-2">
          <FileUpload
            id={id || name}
            name={name}
            label={label}
            {...(accept && { accept })}
            handleFileChange={handleFileChange}
            className="p-0 flex-1 min-w-0"
            styleType="fileUploadWithView"
            disabled={disabled ?? false}
          />
          {viewFile && (
            <button
              type="button"
              disabled={!selectedFile && !documentUrl && (!fileArray.length || !fileArray[0]?.document_url)}
              className={`px-3 py-1 text-gray-500 disabled:text-gray-400 hover:text-gray-800 text-sm border-none bg-transparent rounded w-auto flex items-center justify-center gap-2 ${className}`}
              onClick={() => {
                if (onView) {
                  onView();
                } else {
                  setIsModalOpen(true);
                }
              }}
            >
              <Eye size={20} className="min-w-5" /> <span className="hidden md:block">View</span>
            </button>
          )}
        </div>
      </div>
      <ImageViewModal
        isOpen={isModalOpen && viewFile}
        onClose={() => setIsModalOpen(false)}
        imageSrc={getPreviewData()?.url || ''}
        title={getPreviewData()?.name || 'File Preview'}
        isPdf={getPreviewData()?.isPdf ?? false}
      />
    </div>
  );
};

export default FileUploadWithView;
