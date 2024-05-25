'use client';
import React from 'react';
import ReactPlayer from 'react-player';
import {motion} from 'framer-motion';
import {item, MotionContainer} from '@/components/Motion';
import {FaStar} from 'react-icons/fa';
import {useFiles} from '@/hooks/useRequests';
import {useSession} from 'next-auth/react';
import {Loading} from '@/components/Loading';
import {insert} from '@/lib/utils';

const Uploads = () => {
  const {data: session, status} = useSession();
  const {data, isLoading, error} = useFiles(session?.user.id as string);

  if (isLoading || status === 'loading') {
    return (
      <div className='block mt-32 mx-auto'>
        <Loading />
      </div>
    );
  }

  if (error) return <p className='text-center mt-20 ml-32'>Error occured</p>;

  return (
    <MotionContainer className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4 md:max-w-full'>
      {/* {data.map(file => (
        <ReactPlayer
          key={file._id}
          url={insert(file.url, 4, 's')}
          controls
          playing
        />
      ))} */}
      {Array.from({length: 4}).map((_, i) => (
        <motion.div
          className='item w-full md:col-span-2 border rounded-lg bg-white'
          key={i}
          variants={item}
        >
          <article className='flex bg-white transition hover:shadow-xl'>
            <div className='hidden sm:block sm:basis-36'>
              <img
                alt='Guitar'
                src='https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
                className='aspect-square h-full w-full object-cover'
              />
            </div>

            <div className='flex flex-1 flex-col justify-between'>
              <div className='border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6'>
                <a href='#'>
                  <h3 className='font-bold uppercase text-gray-900'>
                    Work for Money, Design for Love
                  </h3>
                </a>

                <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-700'>
                  Business & Money
                </p>

                <div className='flex items-center mt-2.5 mb-5'>
                  {Array.from({length: 5}).map((_, i) => (
                    <FaStar className='text-yellow-300' key={i} />
                  ))}

                  <span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
                    5.0
                  </span>
                </div>

                <p className='font-semibold text-lg'>22,500</p>
              </div>

              <div className='sm:flex sm:items-end sm:justify-end'>
                <a
                  href='#'
                  className='block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400'
                >
                  Read More
                </a>
              </div>
            </div>
          </article>
        </motion.div>
      ))}
    </MotionContainer>
  );
};

export default Uploads;
