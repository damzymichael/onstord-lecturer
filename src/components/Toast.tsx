'use client';
import {AiOutlineCheckCircle, AiOutlineClose} from 'react-icons//ai';
import {AiOutlineWarning} from 'react-icons//ai';
import {MdErrorOutline} from 'react-icons/md';
import useToast, {VariantType} from '@/hooks/useToast';

export default function Toast () {
  const {defaults, display} = useToast();
  const setColor = (variant: VariantType): string => {
    return variant === 'success'
      ? 'text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200'
      : variant === 'error'
      ? 'text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200'
      : ' text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200';
  };

  return (
    <div
      className={`${display ? 'flex' : 'hidden'} toast items-center`}
      role='alert'
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${setColor(
          defaults.variants
        )}`}
      >
        {defaults.variants === 'success' ? (
          <AiOutlineCheckCircle />
        ) : defaults.variants === 'warning' ? (
          <AiOutlineWarning />
        ) : (
          <MdErrorOutline />
        )}
      </div>
      <div className='ml-3 text-sm font-normal'>{defaults.message}</div>
      <button
        type='button'
        className='ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
        data-dismiss-target='#toast-success'
        aria-label='Close'
      >
        <AiOutlineClose />
      </button>
    </div>
  );
}
