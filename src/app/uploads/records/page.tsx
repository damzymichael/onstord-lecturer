import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className='p-3'>
      <div className='bg-white mx-auto'>
        <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4'>
          {['Books', 'Materials', 'Videos', 'Audios'].map((_, i) => (
            <div className='w-full md:col-span-2' key={i}>
              <Link
                href='/uploads/records/books'
                className='hover:animate-background rounded-xl block bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]'
              >
                <div className='rounded-[10px] bg-white p-4 !pt-20 sm:p-6'>
                  <div className='block text-xs text-gray-500'>
                    10th Oct 2022
                  </div>

                  <div className=''>
                    <h3 className='mt-0.5 text-3xl font-medium text-gray-900'>
                      {_}
                    </h3>
                  </div>

                  <div className='mt-4 flex flex-wrap gap-1'>
                    <span className='whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600'>
                      Details
                    </span>

                    <span className='whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600'>
                      Records
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
