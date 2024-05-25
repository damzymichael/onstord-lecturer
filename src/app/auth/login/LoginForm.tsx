'use client';
import React, {FormEvent, useState} from 'react';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import useToast from '@/hooks/useToast';
import {Loading} from '@/components/Loading';

const LoginForm = () => {
  const {toggleToast} = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string).trim();
    const password = (formData.get('password') as string).trim();
    if (!email || !password)
      return toggleToast(2000, 'error', 'Missing credentials');
    setLoading(true);
    const signInResponse = await signIn('credentials', {
      email,
      password,
      redirect: false
    });
    if (signInResponse && !signInResponse.error) {
      toggleToast(2000, 'success', 'Login successful');
      setLoading(false);
      router.replace('/');
      return;
    }
    toggleToast(2000, 'error', 'Invalid credentials');
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='mt-4'>
        <label className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'>
          Email Address
        </label>
        <input
          type='email'
          required
          name='email'
          disabled={loading}
          className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300'
        />
      </div>
      <div className='mt-4'>
        <div className='flex justify-between'>
          <label className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'>
            Password
          </label>
          <a
            href='#'
            className='text-xs text-gray-500 dark:text-gray-300 hover:underline'
          >
            Forget Password?
          </a>
        </div>
        <input
          className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300'
          name='password'
          type='password'
          disabled={loading}
        />
      </div>

      <div className='mt-6'>
        <button
          disabled={loading}
          className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#404EED] rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
        >
          {loading ? <Loading /> : 'Sign In'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
