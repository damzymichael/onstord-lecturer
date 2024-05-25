'use client';
import {useState, useReducer} from 'react';
import Image from 'next/image';
import {Book as BookModel} from '@/types/onstord';
import {FaPlus} from 'react-icons/fa';
import BookPreview from '@/components/BookPreview';
import Link from 'next/link';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function Book({book}: {book: BookModel}) {
  const [numPages, setNumPages] = useState<number>(0);
  const [openPreview, togglePreview] = useReducer(state => !state, false);

  return (
    <section className='w-full md:w-[70%] lg:w-[60%] mx-auto'>
      <div className='bg-gray-100 p-4 flex flex-col sm:flex-row gap-4 items-center relative mb-4 mx-auto'>
        <Image
          src={book.url.slice(0, -3) + 'jpg'}
          alt={'Front page of ' + book.title}
          width={150}
          height={600}
        />
        <div className='self-start flex flex-col gap-2 '>
          <h1 className='text-3xl'>{book.title}</h1>
          <p className='text-[#006621]'>
            <span>{!numPages ? 'loading' : numPages + ' pages'}</span>
            {' · '}
            <span>{(book.size / 1000000).toFixed(2)}MB</span>
            {' · '}
            <span>English</span>
          </p>
          <div className='text-[#007bff] flex gap-3'>
            {book.categories.map((category, i) => (
              <span className='flex items-center gap-1' key={i}>
                <FaPlus />
                <Link href='#' className='mr-3 hover:underline'>
                  {category}
                </Link>
              </span>
            ))}
          </div>
          <p>{book.description}</p>
          <div className='absolute right-2 bottom-2'>
            <button
              disabled={!numPages}
              onClick={togglePreview}
              className='px-4 py-2 mt-3 text-sm tracking-wide text-white transition-colors duration-300 transform bg-[#404EED] rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
            >
              {!numPages ? 'Please wait...' : 'Read'}
            </button>
          </div>
        </div>
      </div>

      {/* Add button to close pdf  */}
      {/* <div className={openPreview ? '' : 'hidden'}> */}
      <div className={'h-[750px] pdf-container'}>
        <BookPreview
          setNumPages={setNumPages}
          book={book}
          onClose={togglePreview}
        />
      </div>
      {/* </div> */}
    </section>
  );
}

export default Book;
