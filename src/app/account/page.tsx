import React from 'react';
import Image from 'next/image';
import {Metadata} from 'next';
import {getUser} from '../action';
import Courses from './Courses';
import AddData from './AddData';
import Institutions from './Institutions';
import {redirect} from 'next/navigation';
import {CgProfile} from 'react-icons/cg';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUser();
  return {
    title: user?.name?.split(' ')[1] + "'s Profile"
  };
}

const Page = async () => {
  const userDetails = await getUser();
  if (!userDetails.institutions?.values || !userDetails.phoneNumber)
    redirect('/account-complete');
  return (
    <section className='min-h-screen px-4 sm:px-8 pt-24 pb-5 bg-gray-200'>
      <h1 className='font-bold text-gray-700 text-3xl mb-2'>Your Profile</h1>
      <div className='bg-white flex items-center rounded-xl p-4 gap-3 mb-4'>
        {userDetails.image ? (
          <Image
            src={userDetails.image}
            alt='Profile Picture'
            width={100}
            height={100}
            className='rounded-2xl'
          />
        ) : (
          <CgProfile size={100} />
        )}

        <div className=''>
          <h2 className='font-semibold text-xl'>{userDetails.name}</h2>
          <h3>Lecturer / Professor </h3>
        </div>
      </div>

      <div className='flex flex-col gap-3 lg:flex-row flex-wrap justify-between items-start'>
        <div className='bg-white w-full lg:w-[32%] rounded-xl p-4 text-gray-600 shadow'>
          <h1 className='font-medium text-gray-600'>Profile Information</h1>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            sapiente labore illo, illum, minus mollitia eius perspiciatis
            officia itaque porro aut? Id architecto ducimus perferendis possimus
            deserunt dolor. Distinctio, debitis!
          </p>
          <hr className='h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent' />
          <p className='text-sm mb-2'>
            <span className='font-bold'>Full Name:</span> {userDetails.name}
          </p>
          <p className='text-sm mb-2'>
            <span className='font-bold'>Email:</span> {userDetails.email}
          </p>
          <p className='text-sm mb-2'>
            <span className='font-bold'>Phone Number:</span>{' '}
            {userDetails.phoneNumber}
          </p>
          <p className='text-sm mb-2'>
            <span className='font-bold'>Institution:</span>{' '}
            {userDetails.institutions.values[0]}
          </p>
        </div>
        <div className='bg-white w-full  lg:w-[32%] rounded-xl p-4 shadow'>
          <h1 className='font-medium text-gray-600 mb-2'>Institutions</h1>
          <div className='flex flex-wrap flex-col items-start'>
            <Institutions user={userDetails} />
            <AddData user={userDetails} />
          </div>
          <hr className='h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent' />
          <h1 className='font-medium text-gray-600 mb-2'>Materials</h1>
          <p className='text-sm mb-2'>
            <span className='font-bold'>Books:</span> 0
          </p>
          <p className='text-sm mb-2'>
            <span className='font-bold'>Audios</span> 0
          </p>
          <p className='text-sm mb-2'>
            <span className='font-bold'>Videos</span> 0
          </p>
        </div>
        <div className='bg-white w-full lg:w-[32%] rounded-xl p-4 shadow'>
          <h1 className='font-medium text-gray-600 mb-2'>Courses</h1>
          {/*  Accordion  */}
          <Courses user={userDetails} />
        </div>
      </div>
    </section>
  );
};

export default Page;
