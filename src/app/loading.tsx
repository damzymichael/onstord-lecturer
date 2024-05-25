import {LoadingIcon} from '@/components/Loading';

export default function Loading() {
  return (
    <div className='h-screen flex items-center justify-center bg-gray-900'>
      <LoadingIcon size={50} />
    </div>
  );
}
