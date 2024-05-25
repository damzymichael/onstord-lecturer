import React from 'react';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {BiLoaderCircle} from 'react-icons/bi';

interface LoadingIconProps {
  size: number;
  className?: string;
}

export const LoadingIcon = ({size, className}: LoadingIconProps) => {
  return (
    <div className={'spinner ' + className}>
      <BiLoaderCircle size={size} color='#404EED' />
    </div>
  );
};

export const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='flex justify-center items-center space-x-1 text-sm text-gray-700'>
        <svg
          fill='none'
          className='w-6 h-6 animate-spin'
          viewBox='0 0 32 32'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clipRule='evenodd'
            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
            fill='currentColor'
            fillRule='evenodd'
          />
        </svg>
        <div>Loading ...</div>
      </div>
    </div>
  );
};

interface LoadingButtonProps {
  isPending: boolean;
  disabled?: boolean;
  text?: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

export const LoadingButton = ({
  disabled,
  isPending,
  onClick,
  fullWidth = true,
  text = 'Submit'
}: LoadingButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`${
        fullWidth ? 'w-full ' : ''
      } 'mt-2 uppercase px-3 py-2 text-sm tracking-wide text-white transition-colors duration-300 transform bg-[#404EED] rounded-lg hover:bg-blue-400 focus:outline-none`}
      onClick={onClick}
    >
      {isPending ? <Loading /> : <span>{text} </span>}
    </button>
  );
};
