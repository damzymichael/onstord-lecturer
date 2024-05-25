'use client';
import React from 'react';
import {SessionProvider} from 'next-auth/react';
import {ToastContextProvider} from '@/hooks/useToast';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {Worker} from '@react-pdf-viewer/core';
import useQueryClient from '@/hooks/useQueryClient';

interface ProviderProps {
  children: React.ReactNode;
}

const Providers = ({children}: ProviderProps) => {
  const myQueryClient = useQueryClient();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 1000 * 60 * 10
          }
        }
      })
  );
  return (
    <ToastContextProvider>
      <QueryClientProvider client={myQueryClient}>
        <SessionProvider>
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js'>
            {children}
          </Worker>
        </SessionProvider>
      </QueryClientProvider>
    </ToastContextProvider>
  );
};

export default Providers;
