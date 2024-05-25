import React from 'react';
import Link from 'next/link';
import type {Metadata} from 'next';
import GoogleButton from '@/components/GoogleButton';
import LoginForm from './LoginForm';
import {authConfig} from '@/lib/auth';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to Onstord'
};

const Page = async () => {
  const session = await getServerSession(authConfig);
  if (session) redirect('/');
  return (
    <div className='pt-4 sm:pt-6 bg-gray-800 min-h-screen'>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl'>
        <div className='hidden bg-cover lg:block lg:w-1/2 bg-login'></div>
        <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
          <div className='flex justify-center mx-auto'>
            <a href='/'>
              <img className='w-auto h-7 sm:h-8' src='/logo.png' alt='' />
            </a>
          </div>
          <p className='mt-3 text-xl text-center text-gray-600 dark:text-gray-200'>
            Welcome back!
          </p>
          <GoogleButton text='Continue with google' />
          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b dark:border-gray-600 lg:w-1/4'></span>
            <p className='text-xs text-center text-gray-500 uppercase dark:text-gray-400'>
              or login with email
            </p>
            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>
          <LoginForm />
          <div className='flex items-center justify-between my-4'>
            <span className='w-1/5 border-b dark:border-gray-600 md:w-1/4'></span>
            <p className='text-xs text-gray-500 uppercase dark:text-gray-400'>
              or
            </p>
            <span className='w-1/5 border-b dark:border-gray-600 md:w-1/4'></span>
          </div>
          <Link
            href='/auth/register'
            className='w-full block text-center px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#404EED] rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
