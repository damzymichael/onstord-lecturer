import {baseUrl} from '@/lib/data';
import type {Book} from '@/types/onstord';
import axios from 'axios';
import BookComponent from '@/components/Book';

const getBooks = async (): Promise<Book[]> => {
  const {data} = await axios.get(baseUrl + '/files/get-files');
  return data;
};

async function TopBooks() {
  const books = await getBooks();
  return (
    <div>
      {/* <div>{isLoading && <Loading />}</div> */}
      <ul className='flex flex-wrap gap-2'>
        {books?.map((book, i) => (
          <BookComponent book={book} key={i} />
        ))}
      </ul>
    </div>
  );
}

export default TopBooks;
