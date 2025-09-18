import React from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLogin } from '../hooks/useLogin';
import { loginSchema, LoginSchema } from '../schemas/login.schema';
import logo from '@/assets/images/ebix-login-logo.svg';
import mask from '@/assets/images/ebix-mask-group.svg';

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate, isLoading } = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (values: LoginSchema) => {
    mutate({
      ...values,
    });
  };
  return (
    <div className="w-full grid grid-cols-2 h-[70vh]">
      <div className="flex flex-col items-center justify-center space-y-4 bg-[white]/30 rounded-l-2xl">
        <img src={logo} alt="logo" className="max-w-[200px] h-auto" />
        <img src={mask} alt="mask" className="max-w-[200px] h-auto" />
      </div>
      <div className="flex flex-col px-20 justify-center space-y-4 bg-[white] rounded-r-2xl">
        <h1 className="text-2xl font-semibold mb-0">Login</h1>
        <p className="text-sm text-gray-400">Welcome back! Please login to your account</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter your email" autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-accent-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Eye className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* disabling for this phase */}
            {/* <div className="text-right">
          <Link
            to="/send-password-reset-link"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            Forgot Password?
          </Link>
        </div> */}

            <Button variant="secondary" type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Log in'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
