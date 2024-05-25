import React from 'react';
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';
import {Services, Company, HelpfulLinks, Legal} from '@/lib/data';
import {Downloads} from '@/lib/data';
import Image from 'next/image';
import logo from '../public/logo.png';
import type {LINK} from '@/types/onstord';

interface FC {
  heading: string;
  linkArray: LINK[];
}

const FooterComponent = ({heading, linkArray}: FC) => {
  return (
    <div className='col-span-2 sm:col-span-1 hidden lg:block'>
      <p className='font-medium text-gray-900'>{heading}</p>
      <ul className='mt-6 space-y-4 text-sm'>
        {linkArray.map((link, i) => (
          <li key={i}>
            <a
              href={link.path}
              className='text-gray-700 transition hover:opacity-75'
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
const SocialIcons = [FaFacebook, FaInstagram, FaTwitter];

function Footer() {
  return (
    <footer className='bg-gray-200 pt-10'>
      <div className='mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8'>
        <div className='lg:flex lg:items-start lg:gap-8'>
          <div className='text-teal-600'>
            <Image
              src={logo}
              width={40}
              alt='logo'
              height={40}
              className='cursor-pointer object-contain mb-2'
            />
          </div>

          <div className='grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-8'>
            <div className='col-span-2'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Get the latest news!
                </h2>

                <p className='mt-4 text-gray-500'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
                  non cupiditate quae nam molestias.
                </p>
              </div>
            </div>

            <div className='col-span-2 lg:col-span-3 lg:flex lg:items-end'>
              <div className='flex rounded-md overflow-hidden w-full mx-auto'>
                <input
                  type='text'
                  className='w-full px-2 sm:px-6 rounded-md rounded-r-none'
                  placeholder='Enter your email address'
                />
                <button className='bg-indigo-600 w-[200px] text-white px-2 sm:px-6 text-sm sm:text-lg font-semibold py-4 rounded-r-md'>
                  Get Started
                </button>
              </div>
            </div>

            <FooterComponent heading='Services' linkArray={Services} />

            <FooterComponent heading='Company' linkArray={Company} />

            <FooterComponent heading='Helpful Links' linkArray={HelpfulLinks} />

            <FooterComponent heading='Legal' linkArray={Legal} />

            <FooterComponent heading='Downloads' linkArray={Downloads} />

            <ul className='col-span-2 flex justify-center gap-6 lg:col-span-5 lg:justify-end'>
              {SocialIcons.map((Icon, i) => (
                <li key={i}>
                  <a
                    href='#'
                    rel='noreferrer'
                    target='_blank'
                    className='text-gray-700 transition hover:opacity-75'
                  >
                    <Icon size={25} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-4 sm:mt-8 border-t text-center border-gray-100 pt:4 sm:pt-8'>
          <div className='sm:flex  sm:justify-between'>
            <p className='text-xs text-gray-500'>
              &copy; {new Date().getFullYear()} Onstord. All rights reserved.
            </p>

            <ul className='mt-8 flex flex-wrap justify-center md:justify-start gap-4 text-xs sm:mt-0 lg:justify-end'>
              {['Terms & Conditions', 'Privacy Policy', 'Cookies'].map(
                (link, i) => (
                  <li key={i}>
                    <a
                      href='#'
                      className='text-gray-500 transition hover:opacity-75'
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
