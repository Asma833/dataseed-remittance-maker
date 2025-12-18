import { ChangeEvent, useState, useEffect } from 'react';
import { FileUpload } from './FileUpload';
import { useFormContext } from 'react-hook-form';
import { FieldError } from 'react-hook-form';
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

const FileUploadWithOutView = ({ id, name, label, className }: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { watch, formState: { errors } } = useFormContext();

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
        {errors && errors[name] && (
          <p className="text-sm text-destructive mt-1">{(errors[name] as FieldError)?.message}</p>
        )}
      </div>

    </div>
  );
};

export default FileUploadWithOutView;
