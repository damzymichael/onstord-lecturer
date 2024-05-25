'use client';
import {LoadingButton} from '@/components/Loading';
import useSignOut from '@/hooks/useSignOut';

interface ErrorPageProps {
  error: Error & {digest: string};
  reset: () => void;
}

function Error({error, reset}: ErrorPageProps) {
  const SignOut = useSignOut();
  return (
    <div className='grid h-[90vh] px-4 bg-white place-content-center'>
      <div className='text-center'>
        <h1 className='font-black text-gray-200 text-9xl'>Error!</h1>
        <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Something went wrong
        </p>

        <div className='mx-[auto] flex gap-2 justify-center'>
          <LoadingButton
            isPending={false}
            fullWidth={false}
            text='Retry'
            onClick={reset}
          />
          <button
            className='ml-3 bg-red-600 px-3 py-2 rounded-lg text-sm text-white tracking-wide mt-2 uppercase'
            onClick={SignOut}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
