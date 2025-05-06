import AuthLayout from '../../../../components/layout/AuthLayout';
import LoginForm from '../../components/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
