import React, { useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, Upload } from "lucide-react";
import { ImageViewModal } from "@/components/common/image-view-modal";
import SubTitle from "../components/sub-title";
import FieldWrapper from "@/components/form/wrapper/field-wrapper";
import FormFieldRow from "@/components/form/wrapper/form-field-row";
import { getController } from "@/components/form/utils/get-controller";
import { agentAdminCreationConfig } from "../agent-admin-creation.config";
import { uploadRemittanceImage } from "../../../api/documents";

type DocKind = "agreement" | "rbi";

export const DocumentsStep: React.FC = () => {
  const config = agentAdminCreationConfig();
  const { control, setValue, formState: { errors } } = useFormContext();

  // Watch just what we need
  const agreement = useWatch({ control, name: "agreementCopy" }) as File | string | undefined;
  const rbi       = useWatch({ control, name: "rbiLicenseCopy" }) as File | string | undefined;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isUploading, setIsUploading] = useState<DocKind | null>(null);

  const canViewAgreement = !!agreement && agreement instanceof File;
  const canViewRbi       = !!rbi && rbi instanceof File;

  const handleBrowse = (kind: DocKind) => {
    // we’ll rely on a hidden file input rendered via getController
    // The file input itself triggers setValue below via onChange
    const inputId = kind === "agreement" ? "doc__agreement_file" : "doc__rbi_file";
    const el = document.getElementById(inputId) as HTMLInputElement | null;
    el?.click();
  };

  const onFileChange = (kind: DocKind, fileList: FileList | null) => {
    const file = fileList && fileList.length > 0 ? fileList[0] : undefined;
    // write ONLY the File into the field
    setValue(kind === "agreement" ? "agreementCopy" : "rbiLicenseCopy", file, { shouldDirty: true, shouldValidate: true });
  };

  const handleUpload = async (kind: DocKind) => {
    const currentFile = kind === "agreement" ? (agreement instanceof File ? agreement : undefined) : (rbi instanceof File ? rbi : undefined);
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
        setValue(kind === "agreement" ? "agreementCopy" : "rbiLicenseCopy", res.s3_key, { shouldDirty: true, shouldValidate: true });
      }
    } catch (e) {
      console.error("Upload failed:", e);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(null);
    }
  };

  const handleView = (file: File | undefined, title: string) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setModalTitle(title);
    setModalImageSrc(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (modalImageSrc) {
      URL.revokeObjectURL(modalImageSrc);
    }
    setModalImageSrc("");
    setIsModalOpen(false);
  };

  // convenience flags for button states
  const isAgreementUploaded = typeof agreement === 'string';
  const isRbiUploaded       = typeof rbi === 'string';

  // agreement + rbi small helpers for labels
  const uploadBtnText = useMemo(
    () => (kind: DocKind) =>
      isUploading === kind
        ? "Uploading..."
        : (kind === "agreement" ? (isAgreementUploaded ? "Uploaded" : "Upload") : (isRbiUploaded ? "Uploaded" : "Upload")),
    [isUploading, isAgreementUploaded, isRbiUploaded]
  );

  return (
    <div className="space-y-6">
      {/* ================= Agreement Details ================= */}
      <SubTitle title="Agreement Details" />
      <div className="bg-gray-100 p-2 pt-5 mb-2 rounded-lg">
        {/* Hidden file input controlled by RHF (uncontrolled value) */}
        <input
          id="doc__agreement_file"
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          // do NOT give a value prop to file inputs
          onChange={(e) => onFileChange("agreement", e.target.files)}
        />

        <FormFieldRow className="mb-4" rowCols={1}>
          <FieldWrapper>
            <div className="flex flex-wrap items-center gap-3">
              <Label className="min-w-[120px]">Agreement Copy</Label>

              {/* Browse */}
              <Button type="button" variant="outline" className="w-28" onClick={() => handleBrowse("agreement")}>
                Choose
              </Button>

              {/* View (local file) */}
              <Button
                type="button"
                variant={canViewAgreement ? "default" : "ghost"}
                className="w-24"
                disabled={!canViewAgreement}
                onClick={() => handleView(agreement as File, "Agreement Copy")}
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>

              {/* Upload */}
              <Button
                type="button"
                onClick={() => handleUpload("agreement")}
                disabled={!canViewAgreement || isAgreementUploaded || isUploading === "agreement"}
                className="w-32"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploadBtnText("agreement")}
              </Button>
            </div>
          </FieldWrapper>
        </FormFieldRow>

        {/* Agreement Valid (date) – using your existing config field */}
        <FormFieldRow className="mb-4">
          <FieldWrapper>
            {getController({
              ...(config.fields.documents?.agreementValid || {}),
              name: "documents.agreementValid",
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
      </div>

      {/* ================= RBI Details ================= */}
      <SubTitle title="RBI Details" />
      <div className="bg-gray-100 p-2 pt-5 mb-2 rounded-lg">
        {/* Hidden file input for RBI */}
        <input
          id="doc__rbi_file"
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => onFileChange("rbi", e.target.files)}
        />

        <FormFieldRow className="mb-4" rowCols={1}>
          <FieldWrapper>
            <div className="flex flex-wrap items-center gap-3">
              <Label className="min-w-[120px]">RBI License Copy</Label>

              {/* Browse */}
              <Button type="button" variant="outline" className="w-28" onClick={() => handleBrowse("rbi")}>
                Choose
              </Button>

              {/* View (local file) */}
              <Button
                type="button"
                variant={canViewRbi ? "default" : "ghost"}
                className="w-24"
                disabled={!canViewRbi}
                onClick={() => handleView(rbi as File, "RBI License Copy")}
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>

              {/* Upload */}
              <Button
                type="button"
                onClick={() => handleUpload("rbi")}
                disabled={!canViewRbi || isRbiUploaded || isUploading === "rbi"}
                className="w-32"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploadBtnText("rbi")}
              </Button>
            </div>
          </FieldWrapper>
        </FormFieldRow>

        {/* RBI meta fields */}
        <FormFieldRow className="mb-4">
          {(["rbiLicenseCategory", "rbiLicenseValidity", "noOfBranches", "extensionMonth"] as const).map((fieldName) => {
            const field = config.fields.documents?.[fieldName];
            return (
              <FieldWrapper key={fieldName}>
                {getController({
                  ...(typeof field === "object" && field !== null ? field : {}),
                  name: `documents.${fieldName}`,
                  control,
                  errors,
                })}
              </FieldWrapper>
            );
          })}
        </FormFieldRow>
      </div>

      {/* Preview modal (image/pdf shown by browser) */}
      <ImageViewModal isOpen={isModalOpen} onClose={closeModal} imageSrc={modalImageSrc} title={modalTitle} />
    </div>
  );
};
