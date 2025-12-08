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
  company_reference_number: z.string().optional(),
  agent_reference_number: z.string().optional(),
  applicant_name: z.string().nonempty('Applicant Name is required'),

  applicant_pan: fileValidation,

  other_document: fileValidation,
  passport_aadhar_dl_voter_id_front: fileValidation,
  passport_aadhar_dl_voter_id_back: fileValidation,

  payer_pan: fileValidation,
  student_passport_front: fileValidation,
  student_passport_back: fileValidation,
  payer_relationship_proof: fileValidation,
  university_offer_letter: fileValidation,
  education_loan_doc: fileValidation,
  student_visa: fileValidation,
});
