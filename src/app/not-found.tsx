import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='grid h-screen px-4 bg-gray-900 place-content-center'>
      <div className='text-center'>
        <h1 className='font-black text-gray-200 text-7xl'>Error 404!</h1>
        <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Uh-oh!
        </p>
        <p className='mt-4 text-white'>We can&apos;t find that page.</p>
        <Link
          href='/'
          className='inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-[#404EED] rounded-md hover:scale-110'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
