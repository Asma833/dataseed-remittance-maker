import { z } from 'zod';

const acceptedFileTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/gif'];

const fileValidation = z
  .any()
  .optional()
  .refine((file) => {
    if (!file || (file instanceof FileList && file.length === 0)) {
      return true;
    }
    const selectedFile = file instanceof FileList ? file[0] : file;
    return acceptedFileTypes.includes(selectedFile.type);
  }, {
    message: 'Only PDF, JPG, JPEG, PNG, or GIF files are allowed',
  });



export const KycFormSchema = z.object({
  niumReferenceNumber: z.string().optional(),
  agentReferenceNumber: z.string().optional(),
  applicantName: z.string({ required_error: 'Applicant Name is required' }).nonempty('Applicant Name is required'),

  applicantPan: fileValidation,

  otherDocument: fileValidation,
  Passport_Aadhar_DL_Voter_ID_Front: fileValidation,
  Passport_Aadhar_DL_Voter_ID_Back: fileValidation,

  payerPan:fileValidation,
  studentPassportFront: fileValidation,
  studentPassportBack: fileValidation,
  payerRelationshipProof: fileValidation,
  universityOfferLetter: fileValidation,
  educationLoanDoc: fileValidation,
  studentVisa: fileValidation,

  kycType: z.string({ required_error: 'KYC Type is required' }).nonempty('KYC Type is required'),
  viewA2Form: fileValidation,
});
