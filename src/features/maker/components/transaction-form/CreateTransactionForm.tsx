import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider } from '@/components/form/providers/FormProvider';
import { getController } from '@/components/form/utils/getController';
import FormFieldRow from '@/components/form/wrapper/FormFieldRow';
import FieldWrapper from '@/components/form/wrapper/FieldWrapper';
import Spacer from '@/components/form/wrapper/Spacer';
import { FormContentWrapper } from '@/components/form/wrapper/FormContentWrapper';
import { transactionFormSchema } from './transaction-form.schema';
import { getFormControllerMeta } from './transaction-form.config';
import useGetTransactionType from '@/hooks/useGetTransactionType';
import useGetPurposes from '@/hooks/useGetPurposes';
import { CreateTransactionFormProps } from './transaction-form.types';

const CreateTransactionForm = ({ mode }: CreateTransactionFormProps) => {
  const { transactionTypes } = useGetTransactionType();
  const { purposeTypes } = useGetPurposes();
  const formatedTransactionTypes = transactionTypes.map((type) => ({
    id: parseInt(type.id) || 0,
    label: type.text,
    value: type.text,
  }));
  const formatedPurposeTypes = purposeTypes.map((type) => ({
    id: parseInt(type.id) || 0,
    label: type.text,
    value: type.text,
  }));

  // Generate dynamic form config
  const formControllerMeta = getFormControllerMeta({
    transactionTypes: formatedTransactionTypes,
    purposeTypes: formatedPurposeTypes,
  });

  const methods = useForm({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    control,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;

  return (
    <>
      <FormProvider methods={methods}>
        <FormContentWrapper className="w-full bg-transparent">
          <Spacer>
            <FormFieldRow className="mb-4" rowCols={4}>
              {Object.entries(formControllerMeta.fields.applicantDetails).map(([key, field]) => (
                <FieldWrapper key={key}>
                  {getController({
                    ...field,
                    control,
                    errors,
                  })}
                </FieldWrapper>
              ))}
            </FormFieldRow>
            <span className="border-b border-gray-500 mb-3">Upload Document</span>
            <FormFieldRow className="mb-4" wrapperClassName="justify-between" rowCols={2}>
              <FieldWrapper className="mb-4 w-full">
                {getController({
                  id: formControllerMeta.fields.uploadDocuments.pan.id,
                  label: formControllerMeta.fields.uploadDocuments.pan.label,
                  name: formControllerMeta.fields.uploadDocuments.pan.name,
                  type: formControllerMeta.fields.uploadDocuments.pan.type,
                  control,
                  errors,
                })}
              </FieldWrapper>
              <FieldWrapper className="mb-4">
                {getController({
                  id: formControllerMeta.fields.uploadDocuments.otherDocuments.id,
                  label: formControllerMeta.fields.uploadDocuments.otherDocuments.label,
                  name: formControllerMeta.fields.uploadDocuments.otherDocuments.name,
                  type: formControllerMeta.fields.uploadDocuments.otherDocuments.type,
                  control,
                  errors,
                })}
              </FieldWrapper>
              <FieldWrapper className="mb-4" flexdirection="row" label="Passport/Aadhar/Driving License/Voter ID">
                <FieldWrapper>
                  {getController({
                    id: formControllerMeta.fields.uploadDocuments.passportAadharDrivingVoter.front.id,
                    label: formControllerMeta.fields.uploadDocuments.passportAadharDrivingVoter.front.label,
                    name: formControllerMeta.fields.uploadDocuments.passportAadharDrivingVoter.front.name,
                    type: formControllerMeta.fields.uploadDocuments.passportAadharDrivingVoter.front.type,
                    control,
                    errors,
                  })}
                </FieldWrapper>
                <FieldWrapper>
                  {getController({
                    id: formControllerMeta.fields.uploadDocuments.passportAadharDrivingVoter.back.id,
                    label: formControllerMeta.fields.uploadDocuments.passportAadharDrivingVoter.back.label,
                    name: formControllerMeta.fields.uploadDocuments.passportAadharDrivingVoter.back.name,
                    type: formControllerMeta.fields.uploadDocuments.passportAadharDrivingVoter.back.type,
                    control,
                    errors,
                  })}
                </FieldWrapper>
              </FieldWrapper>
              <FieldWrapper className="mb-4 w-full">
                {getController({
                  id: formControllerMeta.fields.uploadDocuments.payerPan.id,
                  label: formControllerMeta.fields.uploadDocuments.payerPan.label,
                  name: formControllerMeta.fields.uploadDocuments.payerPan.name,
                  type: formControllerMeta.fields.uploadDocuments.payerPan.type,
                  control,
                  errors,
                })}
              </FieldWrapper>
              <FieldWrapper className="mb-4" flexdirection="row" label="Valid Student Passport">
                <FieldWrapper>
                  {getController({
                    id: formControllerMeta.fields.uploadDocuments.studentPassport.front.id,
                    label: formControllerMeta.fields.uploadDocuments.studentPassport.front.label,
                    name: formControllerMeta.fields.uploadDocuments.studentPassport.front.name,
                    type: formControllerMeta.fields.uploadDocuments.studentPassport.front.type,
                    control,
                    errors,
                  })}
                </FieldWrapper>
                <FieldWrapper>
                  {getController({
                    id: formControllerMeta.fields.uploadDocuments.studentPassport.back.id,
                    label: formControllerMeta.fields.uploadDocuments.studentPassport.back.label,
                    name: formControllerMeta.fields.uploadDocuments.studentPassport.back.name,
                    type: formControllerMeta.fields.uploadDocuments.studentPassport.back.type,
                    control,
                    errors,
                  })}
                </FieldWrapper>
              </FieldWrapper>
              <FieldWrapper className="mb-4">
                {getController({
                  id: formControllerMeta.fields.uploadDocuments.payerRelationshipProof.id,
                  label: formControllerMeta.fields.uploadDocuments.payerRelationshipProof.label,
                  name: formControllerMeta.fields.uploadDocuments.payerRelationshipProof.name,
                  type: formControllerMeta.fields.uploadDocuments.payerRelationshipProof.type,
                  control,
                  errors,
                })}
              </FieldWrapper>
              <FieldWrapper className="mb-4">
                {getController({
                  id: formControllerMeta.fields.uploadDocuments.studentUniversityOfferLetter.id,
                  label: formControllerMeta.fields.uploadDocuments.studentUniversityOfferLetter.label,
                  name: formControllerMeta.fields.uploadDocuments.studentUniversityOfferLetter.name,
                  type: formControllerMeta.fields.uploadDocuments.studentUniversityOfferLetter.type,
                  control,
                  errors,
                })}
              </FieldWrapper>
              <FieldWrapper className="mb-4">
                {getController({
                  id: formControllerMeta.fields.uploadDocuments.educationLoanDocument.id,
                  label: formControllerMeta.fields.uploadDocuments.educationLoanDocument.label,
                  name: formControllerMeta.fields.uploadDocuments.educationLoanDocument.name,
                  type: formControllerMeta.fields.uploadDocuments.educationLoanDocument.type,
                  control,
                  errors,
                })}
              </FieldWrapper>
              <FieldWrapper className="mb-4">
                {getController({
                  id: formControllerMeta.fields.uploadDocuments.studentVisa.id,
                  label: formControllerMeta.fields.uploadDocuments.studentVisa.label,
                  name: formControllerMeta.fields.uploadDocuments.studentVisa.name,
                  type: formControllerMeta.fields.uploadDocuments.studentVisa.type,
                  control,
                  errors,
                })}
              </FieldWrapper>
            </FormFieldRow>
          </Spacer>
        </FormContentWrapper>
      </FormProvider>
    </>
  );
};

export default CreateTransactionForm;
