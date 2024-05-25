import {Metadata} from 'next';
import {Book as BookModel} from '@/types/onstord';
import {baseUrl} from '@/lib/data';
import {notFound} from 'next/navigation';
import {cache} from 'react';
import axios from 'axios';
import Book from './Book';
interface BookPageProps {
  params: {
    bookId: string;
  };
}

const getBook = cache(async (id: string): Promise<BookModel> => {
  const {data} = await axios.get(baseUrl + '/files/get-file/' + id);
  if (!data) notFound();
  return data;
});

export async function generateMetadata({
  params
}: BookPageProps): Promise<Metadata> {
  const book = await getBook(params.bookId);
  return {
    title: book.title + ' - onstord',
    description: book.description,
    openGraph: {
      images: [{url: book.url.slice(0, -3) + 'jpg'}]
    }
  };
}

const Page = async ({params}: BookPageProps) => {
  const book = await getBook(params.bookId);
  return (
    <div className='mt-[4.2rem] bg-gray-300 min-h-screen p-4'>
      <Book book={book} />
    </div>
  );
};

export default Page;
