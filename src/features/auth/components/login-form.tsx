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
import { cn } from '@/utils/cn';

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
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] lg:h-[70vh]">
      <div className="hidden lg:flex flex-col items-center justify-center space-y-4 bg-[white]/30 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
        <img src={logo} alt="logo" className="max-w-[150px] xl:max-w-[200px] h-auto" />
        <img src={mask} alt="mask" className="max-w-[150px] xl:max-w-[200px] h-auto" />
      </div>
      <div className="flex flex-col px-6 sm:px-10 md:px-16 lg:px-20 py-8 lg:py-0 justify-center space-y-4 bg-[white] rounded-2xl lg:rounded-r-2xl lg:rounded-l-none">
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
              render={({ field, fieldState }) => {
                const invalid = !!fieldState.error;
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="********"
                          autoComplete="current-password"
                          aria-invalid={invalid}
                          className={cn(
                            'pr-10',
                            invalid && '!border-red-500 !focus-visible:ring-red-500 !focus-visible:border-red-500'
                          )}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 grid place-items-center text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword((s) => !s)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
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
