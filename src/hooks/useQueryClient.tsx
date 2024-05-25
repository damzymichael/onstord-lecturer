'use client';

import {AxiosError} from 'axios';
import {useState} from 'react';
import {QueryClient, MutationCache} from '@tanstack/react-query';
// import useToast from './useToast';
import toast from 'react-hot-toast';

const useQueryClient = () => {
  // const {toggleToast} = useToast();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 1000 * 60 * 10
          }
        },
        // mutationCache: new MutationCache({
        //   onError: (error: AxiosError<string>) => {
        //     // toggleToast(1200, 'error', error.response.data.error);
        //     toast.error(error.response.data);
        //   }
        // })
      })
  );
  return queryClient;
};

export default useQueryClient