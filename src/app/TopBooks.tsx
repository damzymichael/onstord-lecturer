import Link from 'next/link';
import Image from 'next/image';
import {baseUrl} from '@/lib/data';
import {Book} from '@/types/onstord';
import axios from 'axios';
import {insert} from '@/lib/utils';

const getBooks = async (): Promise<Book[]> => {
  const {data} = await axios.get(baseUrl + '/files/get-files');
  return data;
};

export default async function TopBooks() {
  const books = await getBooks();

  return (
    <div>
      {/* <div>{isLoading && <Loading />}</div> */}
      <ul className='flex flex-col gap-2'>
        {books?.map(book => (
          <li
            key={book._id}
            className='bg-gray-100 flex gap-3 items-center w-full sm:w-[70%] hover:shadow-md hover:shadow-blue-500/50'
          >
            <Image
              src={insert(book.url, 4, 's').slice(0, -3) + 'jpg'}
              alt='book-image'
              width={70}
              height={100}
              className='self-stretch'
            />
            <div>
              <Link
                href={'/books/' + book._id}
                className='text-[#365899] font-medium text-lg leading-none'
              >
                {book.title}
              </Link>
              <p className='text-[#006621] font-normal text-sm'>
                {(book.size / 1000000).toFixed(2)}MB
              </p>
              <p className='text-gray-600 text-xs'>
                {book.description.slice(0, 100)}{' '}
                <span className='text-blue-600 text-xs sm:text-sm cursor-pointer'>
                  Read more...
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
