'use client';
import React, {useEffect, useReducer, useRef} from 'react';
import {RiUserSharedFill, RiUserReceivedFill} from 'react-icons/ri';
import {BsArrowUpShort, BsArrowDownShort} from 'react-icons/bs';
import {FiSettings} from 'react-icons/fi';
import {GiBank} from 'react-icons/gi';
import FundWallet from './FundWallet';

const Wallet = () => {
  const [openModal, toggleOpenModal] = useReducer(state => !state, false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.style.overflow = openModal ? 'hidden' : 'auto';
    //Todo Check zoom on input in wallet page
    // if (wrapperRef.current) wrapperRef.current.style.zoom = '100%';
  }, [openModal]);
  return (
    <div className='bg-gray-200 min-h-screen' ref={wrapperRef}>
      <div className='p-4 mt-24 grid items-start md:grid-cols-3 grid-cols-1 gap-4'>
        <div className='w-full md:col-span-2 m-auto p-4 border rounded-lg bg-white'>
          <div className='flex justify-between p-2'>
            <h2 className='font-semibold text-xl'>My Balance</h2>
          </div>
          <div className='flex justify-between flex-wrap items-center w-full bg-gray-100 pl-4 pr-1.5 py-1 rounded=xl'>
            <div className='flex justify-center items-start w-{48%} pt-10 pb-4'>
              <div className='bg-orange-400 p-2 rounded-xl mx-2'>
                <RiUserReceivedFill size={30} className='text-white' />
              </div>
              <div className='mx-2'>
                <p className='text-base pb-1'>Available Balance</p>
                <div className='flex justify-between items-center pb-6'>
                  <p className='lg:text-3xl text-xl font-semibold pr-4'>
                    N3,721
                  </p>
                  <p className='italic text-sm px-8'>NGN</p>
                </div>
                <a href='' className='text-sm underline text-teal-700'>
                  View Transactions
                </a>
              </div>
              <div className='lg:mx-2'>
                <span className='rounded bg-red-100 px-1.5 py-1.5 text-center text-sm lg:text-xs font-medium text-red-900'>
                  <BsArrowDownShort size={15} className='inline' /> -4.0%
                </span>
              </div>
            </div>

            <div className='flex justify-center items-start w-{50%} pt-10 px-4 pb-4 bg-white rounded-xl'>
              <div className='bg-red-400 p-2 rounded-xl mx-2'>
                <RiUserSharedFill size={30} className='text-white' />
              </div>
              <div className='mx-2'>
                <p className='text-base pb-1'>Amount Spent</p>
                <div className='flex justify-between items-center pb-6'>
                  <p className='lg:text-3xl text-xl font-semibold pr-4'>
                    N12,721
                  </p>
                  <p className='italic text-sm pl-8 lg:pl-16 lg:pr-8'>NGN</p>
                </div>
                <a href='' className='text-sm underline text-teal-700'>
                  View Transactions
                </a>
              </div>
              <div className='lg:mx-2'>
                <span className='rounded bg-green-100 px-1.5 py-1.5 text-center text-sm lg:text-xs font-medium text-green-900'>
                  <BsArrowUpShort size={15} className='inline' /> 2.0%
                </span>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap justify-center items-center w-full p-8 mt-6 bg-gray-100 rounded-xl'>
            <div className='text-xl font-semibold pr-8'>
              <h1 className=''>
                Last <br />
                30 Days
              </h1>
            </div>

            <div className='lg:px-12 border-white border-r-2'>
              <p className='text-sm'>Transactions</p>
              <h1 className='text-2xl font-semibold'>12</h1>
            </div>

            <div className='lg:px-12 px-4 pt-4 lg:pt-0 border-white border-r-2'>
              <p className='text-sm'>Services Ordered</p>
              <h1 className='text-2xl font-semibold'>4</h1>
            </div>

            <div className='lg:px-12 px-4 pt-4 lg:pt-0'>
              <p className='text-sm'>Money Spent</p>
              <h1 className='text-2xl font-semibold'>N4,400</h1>
            </div>
          </div>
        </div>

        {/* Wallet component  */}
        <div className='w-full col-span-1 p-4 border rounded-lg bg-white'>
          <div className='flex justify-between p-2'>
            <h2 className='font-semibold text-xl'>Fund your Wallet</h2>
            <button>
              <FiSettings size={25} className='cursor-pointer' />
            </button>
          </div>

          <div className='mx-3 md:mx-1 flex items-center justify-start p-4 md:p-2 rounded-xl bg-gray-100 cursor-pointer hover:scale-105 transition duration-300'>
            <div className='p-4 md:p-2 bg-blue-600 text-white rounded-xl'>
              <GiBank size={25} className='' />
            </div>

            <div className='px-8 md:px-3'>
              <h1 className='lg:text-2xl text-lg md:text-sm font-semibold'>
                **** **** **** 4721
              </h1>
              <p className=''>First Bank</p>
            </div>
          </div>

          <div className='mx-3 md:mx-1 mt-4 flex items-center justify-start p-4 md:p-2 rounded-xl bg-gray-100 cursor-pointer hover:scale-105 transition duration-300'>
            <div className='p-4 md:p-2 bg-blue-600 text-white rounded-xl'>
              <GiBank size={25} className='' />
            </div>

            <div className='px-8 md:px-3'>
              <h1 className='lg:text-xl text-lg font-semibold'>
                johndoe@gmail.com
              </h1>
              <p className=''>PayPal</p>
            </div>
          </div>

          <div className='w-full text-center'>
            <button
              onClick={toggleOpenModal}
              className='px-9 py-3 text-base bg-blue-700 mt-8 text-white text-center rounded-xl'
            >
              Proceed to Withdraw
            </button>
          </div>
          {openModal && <FundWallet onClose={toggleOpenModal} />}

          <a href='' className='text-sm text-center w-full block pt-3'>
            *you can withdraw to your wallet easily with any <br />
            of the linked accounts
          </a>
        </div>
      </div>

      {/* Transactions  */}
      <div className='px-4 pb-4 grid md:grid-cols-3 grid-cols-1'>
        <div className='w-full md:col-span-3 m-auto p-4 border rounded-lg bg-white overflow-auto'>
          <div className='flex justify-between p-2'>
            <h2 className='font-semibold text-xl'>All Transactions</h2>
            <p className='text-sm'>Date Range</p>
          </div>

          <table className='w-full overflow-hidden'>
            <thead className=''>
              <tr className='text-sm font-thin text-center text-gray-400 bg-gray-100 capitalize border-b border-gray-600'>
                <th className='px-4 py-3 font-thin'>Type</th>
                <th className='px-4 py-3 font-thin hidden md:flex'>Date</th>
                <th className='px-4 py-3 font-thin'>Transactions ID</th>
                <th className='px-4 py-3 font-thin'>Amount</th>
                <th className='px-4 py-3 font-thin'>Status</th>
              </tr>
            </thead>
            <tbody className='bg-white text-center'>
              <tr className='text-gray-700'>
                <td className='px-4 py-3 border'>
                  <div className='flex items-center text-sm'>
                    <div className='w-8 h-8 mr-3 rounded-full md:block'>
                      <GiBank size={25} className='' />

                      <div
                        className='inset-0 rounded-full shadow-inner'
                        aria-hidden='true'
                      ></div>
                    </div>
                    <div className='text-left'>
                      <p className='font-semibold text-black'>PayPal</p>
                      <p className='text-xs text-gray-600'>Funded</p>
                    </div>
                  </div>
                </td>
                <td className='px-4 py-3 text-ms font-semibold border hidden md:flex'>
                  <p className='font-semibold text-black'>May 18, 2023</p>
                  <p className='text-xs text-gray-600'>9:32pm</p>
                </td>
                <td className='px-4 py-3 text-ms font-medium border'>
                  <p>KWEDH34F</p>
                </td>
                <td className='px-4 py-3 text-sm border'>#3,450</td>
                <td className='px-4 py-3 text-xs border'>
                  <span className='px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm'>
                    Delivered
                  </span>
                </td>
              </tr>

              <tr className='text-gray-700'>
                <td className='px-4 py-3 border'>
                  <div className='flex items-center text-sm'>
                    <div className='w-8 h-8 mr-3 rounded-full md:block'>
                      <GiBank size={25} className='' />

                      <div
                        className='inset-0 rounded-full shadow-inner'
                        aria-hidden='true'
                      ></div>
                    </div>
                    <div className='text-left'>
                      <p className='font-semibold text-black'>First Bank</p>
                      <p className='text-xs text-gray-600'>Billing</p>
                    </div>
                  </div>
                </td>
                <td className='px-4 py-3 text-ms font-semibold border hidden md:flex'>
                  <p className='font-semibold text-black'>April 23, 2023</p>
                  <p className='text-xs text-gray-600'>10:12am</p>
                </td>
                <td className='px-4 py-3 text-ms font-medium border'>
                  <p>LWDHG3G6</p>
                </td>
                <td className='px-4 py-3 text-sm border'>#5,175</td>
                <td className='px-4 py-3 text-xs border'>
                  <span className='px-2 py-1 font-semibold leading-tight text-blue-700 bg-blue-100 rounded-sm'>
                    In Progress
                  </span>
                </td>
              </tr>

              <tr className='text-gray-700'>
                <td className='px-4 py-3 border'>
                  <div className='flex items-center text-sm'>
                    <div className='w-8 h-8 mr-3 rounded-full md:block'>
                      <GiBank size={25} className='' />

                      <div
                        className='inset-0 rounded-full shadow-inner'
                        aria-hidden='true'
                      ></div>
                    </div>
                    <div className='text-left'>
                      <p className='font-semibold text-black'>PayPal</p>
                      <p className='text-xs text-gray-600'>Billing</p>
                    </div>
                  </div>
                </td>
                <td className='px-4 py-3 text-ms font-semibold border hidden md:flex'>
                  <p className='font-semibold text-black'>June 03, 2023</p>
                  <p className='text-xs text-gray-600'>4:15pm</p>
                </td>
                <td className='px-4 py-3 text-ms font-medium border'>
                  <p>SQIPO562</p>
                </td>
                <td className='px-4 py-3 text-sm border'>#1,450</td>
                <td className='px-4 py-3 text-xs border'>
                  <span className='px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm'>
                    On Hold
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
