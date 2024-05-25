'use client';
import React from 'react';
import Link from 'next/link';

//Todo Unknown type here
//Todo Make Link scroll down or go to landing page depending on authentication
const HomePageButton = ({user}: {user: any}) => {
  return (
    <div className='text-center my-6'>
      {/* Link would either scroll down or go to login page depending on authentication  */}
      <Link
        href={!user ? '/auth/login' : '#'}
        onClick={e => user && e.preventDefault()}
        className='text-white px-4 py-2 border rounded-md bg-[#404EED] hover:scale-110 transition-all duration-200'
      >
        {user ? 'Get Started' : 'Sign up'}
      </Link>
    </div>
  );
};

export default HomePageButton;
