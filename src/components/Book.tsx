'use client';
import Image from 'next/image';
import Link from 'next/link';
import {insert} from '@/lib/utils';
import {FaStar} from 'react-icons/fa';
import {motion} from 'framer-motion';
import {Book} from '@/types/onstord';

const variants = {
  initial: {opacity: 0, y: 150},
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {delay: index * 0.1}
  })
};

const BookComponent = ({book, key}: {book: Book; key: number}) => {
  return (
    <motion.li
      className='bg-gray-100 flex gap-3 hover:shadow-md hover:shadow-blue-500/50 sm:min-w-[350px] w-11/12 sm:w-[45%] md:w-[30%]'
      key={book._id}
      variants={variants}
      initial='initial'
      whileInView='animate'
      viewport={{once: true}}
      custom={key}
    >
      <Image
        src={insert(book.url, 4, 's').slice(0, -3) + 'jpg'}
        alt='book-image'
        width={70}
        height={100}
        className='w-3/5'
      />
      {/* book details  */}
      <div className='p-1'>
        <Link
          href={'/books/' + book._id}
          className='font-semibold text-[#365899] text-lg mb-2'
        >
          {book.title}
        </Link>
        <p className='text-[#00000099] mb-3 text-sm'>By Sheila Crawford</p>
        <div className='flex gap-1 items-center mb-3'>
          <div className='flex'>
            {Array.from({length: 5}).map((_, i) => (
              <FaStar
                width={12}
                fill={i < 4 ? '#404EED' : 'white'}
                stroke='black'
                key={i}
              />
            ))}
          </div>
          <p className='text-[#0000004D] text-xs'>1,988,288 votes</p>
        </div>
        <p className='text-[#0000004D] text-xs'>
          {book.description.slice(0, 100)}{' '}
          <span className='text-blue-600 text-xs cursor-pointer'>
            Read more...
          </span>
        </p>
      </div>
    </motion.li>
  );
};

export default BookComponent
