import AuthLayout from '../../../../components/layout/auth-layout';
import SendEmailForm from '../../components/send-email-form';
import { AuthRedirectGuard } from '@/core/routes/auth-redirect-guard';

const SendEmailPage = () => {
  return (
    <AuthRedirectGuard>
      <AuthLayout title="Send Reset Password Email">
        <SendEmailForm />
      </AuthLayout>
    </AuthRedirectGuard>
  );
};

export default SendEmailPage;
