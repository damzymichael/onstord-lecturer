'use client';
import {DispatchWithoutAction, MutableRefObject} from 'react';
import {useMutation, UseMutationResult, useQuery} from '@tanstack/react-query';
import {UseQueryResult, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import useToast from './useToast';
import {Lecturer} from '@prisma/client';
import {RequestBody} from '@/types/onstord';
import {baseUrl} from '@/lib/data';

interface OsError extends AxiosError<string> {}

type QueryResult<R> = UseQueryResult<R, AxiosError<{error: string}>>;

type MutationResult<R, V = unknown> = UseMutationResult<
  AxiosResponse<R, any>,
  OsError,
  V
>;

export const useProfileQuery = (user: Lecturer): QueryResult<Lecturer> => {
  return useQuery({
    queryKey: ['profile-details'],
    queryFn: async () => {
      const {data} = await axios.get(`/api/profile?id=${user.id}`);
      return data;
    },
    placeholderData: user
  });
};

interface Course {
  _id: string;
  code: string;
  title: string;
  institution: string;
}

export const useCourses = (id: string): QueryResult<Course[]> => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const {data} = await axios.get(`${baseUrl}/courses/get-courses?id=${id}`);
      return data;
    },
    refetchOnWindowFocus: process.env.NODE_ENV === 'development' ? false : true
  });
};

export const useRegister = (): MutationResult<string, RequestBody> => {
  const {toggleToast} = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: formDetails =>axios.post('/api/register', formDetails),
    onSuccess: response => {
      toggleToast(2000, 'success', response.data);
      router.replace('/auth/login');
    },
    onError: error => toggleToast(2000, 'error', error?.response?.data as string)
  });
};

//Todo ANY Type here
export const useCompleteAccount = (id: string): MutationResult<string, any> => {
  const {toggleToast} = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: formDetails => axios.patch(`/api/register?id=${id}`, formDetails),
    onSuccess: response => {
      toggleToast(2000, 'success', response.data);
      router.replace('/');
    },
    onError: error => toggleToast(2000, 'error', error?.response?.data as string)
  });
};

export const useAddInstitution = (
  id: string,
  toggleDisplay: DispatchWithoutAction
): MutationResult<string> => {
  const {toggleToast} = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: institution =>
      axios.patch(`/api/profile?id=${id}`, {institution}),
    onSuccess: response => {
      queryClient.invalidateQueries({queryKey: ['profile-details']});
      toggleToast(2000, 'success', response.data);
      toggleDisplay();
    }
    // onError: error => toggleToast(2000, 'error', error.response.data)
  });
};

export const useAddCourse = (
  id: string,
  toggleDisplay?: DispatchWithoutAction
): MutationResult<string> => {
  const {toggleToast} = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseDeatils =>
      axios.post(`${baseUrl}/courses/add-course?id=${id}`, courseDeatils),
    onSuccess: response => {
      queryClient.invalidateQueries({queryKey: ['courses']});
      toggleToast(2000, 'success', response.data);
      toggleDisplay && toggleDisplay();
    }
    // onError: error => toggleToast(2000, 'error', error.response.data)
  });
};

export const useUploadMaterial = (id: string): MutationResult<string, FormData> => {
  const {toggleToast} = useToast();
  return useMutation({
    mutationFn: (formData) => axios.post(`${baseUrl}/files/add-file/?id=${id}`, formData),
    onSuccess: data => toggleToast(2000, 'success', data.data),
    onError: error =>toggleToast(2000, 'error', error?.response?.data as string)
  });
};

interface OsFile {
  categories: string[];
  courses: Array<string | Course>;
  description: string;
  fileType: 'Book' | 'Audio' | 'Video';
  format: string;
  sale: boolean;
  size: number;
  title: string;
  url: string;
  _id: string;
}

export const useFiles = (id: string): QueryResult<OsFile[]> => {
  return useQuery({
    queryKey: ['files'],
    queryFn: async () => {
      const {data} = await axios.get(
        `${baseUrl}/files/user/get-files?id=${id}`
      );
      return data;
    },
    enabled: !!id
  });
};
