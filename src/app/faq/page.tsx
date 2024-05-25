import {Metadata} from 'next';
import React from 'react';
import {BiHelpCircle} from 'react-icons/bi';

export const metadata: Metadata = {
  title: 'FAQ'
};

const Page = () => {
  return (
    <section className='bg-white pb-12 dark:bg-gray-900'>
      <div className='container px-6 pt-24 mx-auto'>
        <h1 className='text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white'>
          Frequently asked questions.
        </h1>

        <div className='grid grid-cols-1 gap-8 mt-8 lg:mt-16 md:grid-cols-2 xl:grid-cols-3'>
          <div>
            <div className='inline-block p-3 text-white bg-blue-600 rounded-lg'>
              <BiHelpCircle />
            </div>

            <div>
              <h1 className='text-xl font-semibold text-gray-700 dark:text-white'>
                What can i expect at my first consultation?
              </h1>

              <p className='mt-2 text-sm text-gray-500 dark:text-gray-300'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident placeat, consequatur eveniet veritatis quos
                dignissimos beatae dolores exercitationem laboriosam officia
                magnam atque blanditiis illum doloremque magni ex corrupti
                tempora quis.
              </p>
            </div>
          </div>

          <div>
            <div className='inline-block p-3 text-white bg-blue-600 rounded-lg'>
              <BiHelpCircle />
            </div>

            <div>
              <h1 className='text-xl font-semibold text-gray-700 dark:text-white'>
                What are your opening house?
              </h1>

              <p className='mt-2 text-sm text-gray-500 dark:text-gray-300'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident placeat, consequatur eveniet veritatis quos
                dignissimos beatae dolores exercitationem laboriosam officia
                magnam atque blanditiis illum doloremque magni ex corrupti
                tempora quis.
              </p>
            </div>
          </div>

          <div>
            <div className='inline-block p-3 text-white bg-blue-600 rounded-lg'>
              <BiHelpCircle />
            </div>

            <div>
              <h1 className='text-xl font-semibold text-gray-700 dark:text-white'>
                Do i need a referral?
              </h1>

              <p className='mt-2 text-sm text-gray-500 dark:text-gray-300'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident placeat, consequatur eveniet veritatis quos
                dignissimos beatae dolores exercitationem laboriosam officia
                magnam atque blanditiis illum doloremque magni ex corrupti
                tempora quis.
              </p>
            </div>
          </div>

          <div>
            <div className='inline-block p-3 text-white bg-blue-600 rounded-lg'>
              <BiHelpCircle />
            </div>

            <div>
              <h1 className='text-xl font-semibold text-gray-700 dark:text-white'>
                Is the cost of the appoinment covered by private health
                insurance?
              </h1>

              <p className='mt-2 text-sm text-gray-500 dark:text-gray-300'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident placeat, consequatur eveniet veritatis quos
                dignissimos beatae dolores exercitationem laboriosam officia
                magnam atque blanditiis illum doloremque magni ex corrupti
                tempora quis.
              </p>
            </div>
          </div>

          <div>
            <div className='inline-block p-3 text-white bg-blue-600 rounded-lg'>
              <BiHelpCircle />
            </div>

            <div>
              <h1 className='text-xl font-semibold text-gray-700 dark:text-white'>
                What is your cancellation policy?
              </h1>

              <p className='mt-2 text-sm text-gray-500 dark:text-gray-300'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident placeat, consequatur eveniet veritatis quos
                dignissimos beatae dolores exercitationem laboriosam officia
                magnam atque blanditiis illum doloremque magni ex corrupti
                tempora quis.
              </p>
            </div>
          </div>

          <div>
            <div className='inline-block p-3 text-white bg-blue-600 rounded-lg'>
              <BiHelpCircle />
            </div>

            <div>
              <h1 className='text-xl font-semibold text-gray-700 dark:text-white'>
                What are the parking and public transport options?
              </h1>

              <p className='mt-2 text-sm text-gray-500 dark:text-gray-300'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident placeat, consequatur eveniet veritatis quos
                dignissimos beatae dolores exercitationem laboriosam officia
                magnam atque blanditiis illum doloremque magni ex corrupti
                tempora quis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
