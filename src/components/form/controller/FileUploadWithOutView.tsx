import { ChangeEvent, useState, useEffect } from 'react';
import { Eye, X } from 'lucide-react';
import { FileUpload } from './FileUpload';
import { useFormContext } from 'react-hook-form';
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
}

const FileUploadWithOutView = ({ id, name, label, className, viewFile = true }: FileUploadProps) => {
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
    }
  };

  const renderFilePreview = () => {
    if (!selectedFile) {
      return <div>No file selected.</div>;
    }

    const fileType = selectedFile.type;
    const fileUrl = URL.createObjectURL(selectedFile);

    if (fileType.startsWith('image/')) {
      return (
        <div>
          <p className="mb-2">
            <strong>File:</strong> {selectedFile.name}
          </p>
          <img src={fileUrl} alt={selectedFile.name} className="max-w-full h-[95vh] object-contain mx-auto" />
        </div>
      );
    }

    if (fileType === 'application/pdf') {
      return (
        <div>
          <p className="mb-2">
            <strong>File:</strong> {selectedFile.name}
          </p>
          <iframe src={fileUrl} className="w-full h-[95vh]" title="PDF Preview" />
        </div>
      );
    }

    return (
      <div>
        <p className="mb-2">
          <strong>File:</strong> {selectedFile.name}
        </p>
        <p className="mb-2">
          <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
        </p>
        <p className="text-gray-600">Preview not available for this file type.</p>
      </div>
    );
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-full">
        <span className="fileupload-label text-sm mb-2">{label}</span>
        <div className="flex w-full gap-2">
          <FileUpload
            id={id || name}
            name={name}
            label={label}
            handleFileChange={handleFileChange}
            className="p-0 flex-1"
            styleType="fileUploadWithView"
          />
        </div>
      </div>
     
    </div>
  );
};

export default FileUploadWithOutView;
