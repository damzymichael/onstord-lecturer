import React from 'react';
import {RiMastercardFill} from 'react-icons/ri';

const FundWallet = ({onClose}: {onClose: React.DispatchWithoutAction}) => {
  return (
    <div
      onClick={onClose}
      className='w-full z-30 min-h-screen top-0 cursor-pointer left-0 fixed bg-[#00000080]'
    >
      <div
        onClick={e => e.stopPropagation()}
        className='max-w-[350px] sm:max-w-[500px] w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-default bg-white p-4 rounded-lg'
      >
        <div className='pt-2 px-4'>
          <div className='text-left'>
            <h4 className='text-xl font-medium'>Payment Details</h4>
            <p className='text-sm'>Top up your Wallet</p>
          </div>

          <form action='' className='mt-2 flex flex-col w-full'>
            <div className='py-5 text-left'>
              <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5'>
                <div className='md:col-span-5 pb-2'>
                  <label htmlFor='city'>Phone Number</label>
                  <input
                    type='text'
                    className='h-10 border mt-1 rounded px-4 w-full bg-gray-50 focus:border-[#0C1F9D] focus:outline-none focus:shadow-outline'
                    placeholder=''
                  />
                </div>

                <div className='md:col-span-1 pb-2'>
                  <label htmlFor='email' className='text-sm font-medium'>
                    Expiry
                  </label>
                  <input
                    type='text'
                    className='h-10 border mt-1 rounded px-2 w-full bg-gray-50 focus:border-[#0C1F9D] focus:outline-none focus:shadow-outline'
                    placeholder='04/02'
                  />
                </div>

                <div className='relative md:col-span-4 pb-2'>
                  <label htmlFor='address' className='text-sm font-medium'>
                    Card Number
                  </label>
                  <input
                    className='appearance-none h-12 border pl-12 border-gray-300 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:border-[#F79C00] focus:outline-none focus:shadow-outline'
                    id='username'
                    type='text'
                    placeholder='1234 1234 1234 1234'
                  />
                  <div className='absolute left-0 inset-y-0 flex items-center'>
                    <RiMastercardFill
                      size={20}
                      className='h-7 w-7 ml-3 mt-4 text-orange-500'
                    />
                  </div>
                </div>

                <div className='md:col-span-1 pb-2'>
                  <label htmlFor='address' className='text-sm font-medium'>
                    CVV
                  </label>
                  <input
                    type='text'
                    className='h-10 border mt-1 rounded px-4 w-full bg-gray-50 focus:border-[#0C1F9D] focus:outline-none focus:shadow-outline'
                    placeholder='xxx'
                  />
                </div>

                <div className='md:col-span-5 pb-2'>
                  <input
                    type='text'
                    className='h-10 border border-[#F79C00] mt-1 text-center rounded px-4 w-full bg-gray-50 focus:border-[#0C1F9D] focus:outline-none focus:shadow-outline'
                    placeholder='Amount'
                  />
                </div>
              </div>

              <button
                onClick={onClose}
                type='button'
                className='transition mt-2 duration-200 text-white bg-[#F79C00] h-12 hover:bg-white hover:text-[#0C1F9D] hover:border hover:border-[#0C1F9D] w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center flex items-center justify-center'
              >
                Top Up
              </button>
            </div>
          </form>
          <button
            onClick={onClose}
            className='transition mt-2 duration-200 text-white bg-[#0C1F9D] h-12 hover:bg-white hover:text-[#0C1F9D] hover:border hover:border-[#0C1F9D] w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center flex items-center justify-center'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;
