import Link from 'next/link';
import type {Metadata} from 'next';
import RegisterForm from './RegisterForm';
import Image from 'next/image';
import logo_wide from '@/public/logo_long.png';
import {authConfig} from '@/lib/auth';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Sign up to Onstord'
};

const Page = async () => {
  const session = await getServerSession(authConfig);
  if (session) redirect('/');
  return (
    <section className='bg-white dark:bg-gray-900 min-h-screen'>
      <div className='flex justify-center min-h-screen'>
        <div className='hidden bg-cover lg:block lg:w-2/5 bg-register'></div>
        <div className='flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5'>
          <div className='w-full'>
            <Link href='/'>
              <Image src={logo_wide} alt='logo' width={30} height={30} />
            </Link>
            <RegisterForm />
            <p className='text-gray-200 text-sm'>
              Already have an account ?{' '}
              <Link href='/auth/login' className='underline'>
                Click here{' '}
              </Link>{' '}
              to sign in{' '}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
