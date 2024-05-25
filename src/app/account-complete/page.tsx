import type {Metadata} from 'next';
import {redirect} from 'next/navigation';
import Image from 'next/image';
import logo_wide from '@/public/logo_long.png';
import AccountComplete from './AccountComplete';
import {getUser} from '../action';

export const metadata: Metadata = {
  title: 'Complete Account Details'
};

const Page = async () => {
  const user = await getUser();
  return (
    <div className='bg-gray-900 min-h-screen py-8 text-white'>
      <section className='max-w-[700px] px-6 mx-auto'>
        <Image
          src={logo_wide}
          alt='logo'
          className='mx-auto'
          width={200}
          height={70}
        />
        <h2 className='font-bold text-center text-xl pt-4 sm:pt-0'>
          Please complete your account information
        </h2>
        <AccountComplete user={{name: user.name as string, id: user.id}} />
      </section>
    </div>
  );
};

export default Page;
