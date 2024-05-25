'use client';
import {useEffect, useReducer, useState} from 'react';
import type {LINK} from '@/types/onstord';
import Link from 'next/link';
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillBell
} from 'react-icons/ai';
import {BsDiscord} from 'react-icons/bs';
import {BiLoaderCircle} from 'react-icons/bi';
import {usePathname} from 'next/navigation';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import useSignOut from '@/hooks/useSignOut';
import logo from '../public/logo.png';

const Nav = () => {
  const session = useSession();
  const pathname = usePathname();
  const [nav, handleNav] = useReducer(state => !state, false);
  const [isScrolled, setIsScrolled] = useState(false);
  const SignOut = useSignOut();

  const links: LINK[] = [
    {path: '/', text: 'Home'},
    {path: '/uploads', text: 'Uploads'},
    {path: '/wallet', text: 'Wallet'},
    {path: '/faq', text: 'Faq'},
    {path: '/contact', text: 'Contact Us'},
    {path: '/auth/login', text: 'Sign in'},
    {path: '/auth/register', text: 'Sign up'}
  ];

  useEffect(() => {
    document.body.style.overflow = nav ? 'hidden' : 'auto';

    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [session.data, nav]);

  const excludedPaths = ['/auth/login', '/auth/register', '/account-complete'];
  if (excludedPaths.includes(pathname)) return null;

  return (
    <div className='z-20'>
      <header
        className={`${
          isScrolled && 'bg-gray-400'
        } z-10 border-b border-b-black text-black bg-white`}
      >
        <div className='items-center space-x-2 md:space-x-10 hidden md:flex'>
          <Image
            src={logo}
            width={30}
            height={30}
            priority
            alt='onstord logo'
            className='cursor-pointer object-contain w-auto h-auto'
          />
          <ul className='text-white space-x-3 flex'>
            {links.slice(0, -2).map((link, i) => (
              <li
                key={i}
                className={`${
                  pathname === link.path && 'text-[#404EED]'
                } headerLink`}
              >
                <Link href={link.path}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='items-center space-x-4 text-base font-semibold hidden md:flex'>
          {session.status === 'unauthenticated' &&
            links.slice(5, -1).map((link, i) => (
              <Link
                href={link.path}
                className={`${
                  pathname === link.path && 'text-[#404EED]'
                } headerLink`}
                key={i}
              >
                {link.text}
              </Link>
            ))}
          {session.status === 'authenticated' && (
            <>
              <Link href='#'>
                <div onClick={SignOut}>Sign out</div>
              </Link>
              <AiFillBell className='h-6 w-6' />
              <Link rel='stylesheet' href='/account'>
                <img
                  src='https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1696661744~exp=1696662344~hmac=2f884ba52e99c9c02245385a462e98fed21d2790d05ed5cbc3bab2f15f076ca6'
                  width={30}
                  alt=''
                  className='cursor-pointer rounded-full'
                />
              </Link>
            </>
          )}
        </div>

        <div className='w-full flex items-center justify-between md:hidden cursor-pointer'>
          <Link href='/'>
            <Image
              src={logo}
              width={30}
              height={30}
              alt='onstord logo'
              className='cursor-pointer object-contain'
            />
          </Link>

          <div onClick={handleNav} className='block md:hidden'>
            {session.status === 'loading' ? (
              <div className='spinner inline-block'>
                <BiLoaderCircle size='2rem' className='text-[#404EED]' />
              </div>
            ) : (
              <AiOutlineMenu size={25} className='text-[#404EED]' />
            )}
          </div>
        </div>
      </header>

      {/* Mobile Nav-Bar */}
      <div
        className={
          nav
            ? 'md:hidden fixed left-0 top-0 w-full min-h-screen bg-black/70'
            : ''
        }
        onClick={handleNav}
      ></div>
      <div
        className={
          nav
            ? 'fixed z-10 left-0 top-0 w-[75%] sm:w-[60%] md:w-[75%] min-h-screen bg-[#ecf0f3] p-10 ease-in duration-300'
            : 'fixed z-10 left-[-100%] top-0 p-10 ease-in min-h-screen duration-300 bg-[#ecf0f3]'
        }
      >
        <div className='z-40'>
          <div className='flex items-center justify-between w-full'>
            <Image
              src={logo}
              alt='onstord logo'
              width={30}
              height={30}
              className='cursor-pointer object-contain'
            />
            <div
              onClick={handleNav}
              className='rounded-full shadow-lg shadow-gray-400 p-2 cursor-pointer'
            >
              <AiOutlineClose />
            </div>
          </div>
          <div className='border-b border-gray-300 my-4'>
            <p className='w-[85]% md:w-[90%] py-4'>
              Connecting students and tutors
            </p>
          </div>
        </div>
        <div className='py-2 flex flex-col'>
          <ul className='flex flex-col uppercase'>
            <Link className='text-sm py-3' onClick={handleNav} href='/'>
              Home
            </Link>

            <Link className='text-sm py-3' onClick={handleNav} href='/uploads'>
              Uploads
            </Link>

            <Link className='text-sm py-3' onClick={handleNav} href='/wallet'>
              Wallet
            </Link>

            {session.status === 'authenticated' && (
              <Link
                className='text-sm py-3'
                onClick={handleNav}
                href='/account'
              >
                Profile
              </Link>
            )}

            <Link className='text-sm py-3' onClick={handleNav} href='/faq'>
              Faq
            </Link>

            <Link className='text-sm py-3' onClick={handleNav} href='/contact'>
              Contact Us
            </Link>

            {session.status === 'authenticated' && (
              <Link
                className='text-sm py-3'
                onClick={e => {
                  e.preventDefault();
                  handleNav();
                  SignOut();
                }}
                href='#'
              >
                Logout
              </Link>
            )}

            {session.status === 'unauthenticated' && (
              <>
                <Link
                  className='text-sm py-3'
                  onClick={handleNav}
                  href='/auth/register'
                >
                  Register
                </Link>
                <Link
                  className='text-sm py-3'
                  onClick={handleNav}
                  href='/auth/login'
                >
                  Login
                </Link>
              </>
            )}
          </ul>

          <div className='pt-4'>
            <p className='uppercase text-[#ca3919]'>Connect with Us</p>
            <div className='flex items-center justify-between my-4 w-[80%] sm:w-[80%]'>
              <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
                <BsDiscord />
              </div>
              <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
                <AiFillInstagram />
              </div>
              <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
                <AiOutlineTwitter />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End Mobile Nav-Bar */}
    </div>
  );
};

export default Nav;
