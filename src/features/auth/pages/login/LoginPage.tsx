import AuthLayout from '../../../../components/layout/auth-layout';
import LoginForm from '../../components/login-form';
import { AuthRedirectGuard } from '@/core/routes/AuthRedirectGuard';

const LoginPage = () => {
  return (
    <AuthRedirectGuard>
      <AuthLayout title="Login">
        <LoginForm />
      </AuthLayout>
    </AuthRedirectGuard>
  );
};

export default LoginPage;
