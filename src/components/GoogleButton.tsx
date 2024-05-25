'use client';
import {FcGoogle} from 'react-icons/fc';
import {signIn} from 'next-auth/react';

type GoogleButtonProps = {text: string};

const GoogleButton = ({text}: GoogleButtonProps) => {
  return (
    <button
      className='flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 mx-auto w-full'
      onClick={() => signIn('google', {callbackUrl: '/account-complete'})}
    >
      <div className='py-2'>
        <FcGoogle />
      </div>
      <span className='w-5/6 py-3 font-bold'>{text}</span>
    </button>
  );
};

export default GoogleButton;
