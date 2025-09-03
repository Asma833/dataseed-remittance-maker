import { BrowserRouter } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// compometns import
import { AppRoutes } from './core/routes/app-routes';
import LoadingFallback from './components/loader/LoadingFallback';
import { ThemeProvider } from './providers/theme-provider';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import ErrorBoundary from './components/error-boundary/error-boundary';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { setGlobalQueryClient } from './core/services/query/query-cache-manager';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Set the global query client for cache management
  useEffect(() => {
    setGlobalQueryClient(queryClient);
  }, []);

  return (
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={<LoadingFallback />} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <Toaster />
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback />}>
                    <TooltipProvider>
                      <AppRoutes />
                    </TooltipProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                  </Suspense>
                </ErrorBoundary>
              </BrowserRouter>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
  );
};

export default App;
