'use client';
import React, {Fragment} from 'react';
import Link from 'next/link';
import {LINK} from '@/types/onstord';
import {AiOutlineAppstoreAdd} from 'react-icons/ai';
import {MdDriveFolderUpload} from 'react-icons/md';
import {TfiWrite} from 'react-icons/tfi';
import {usePathname} from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const links: Array<LINK> = [
    {path: '/uploads', text: 'Add New', icon: AiOutlineAppstoreAdd},
    {
      path: '/uploads/collection',
      text: 'My Uploads',
      icon: MdDriveFolderUpload
    },
    {path: '/uploads/records', text: 'Sales Record', icon: TfiWrite}
  ];
  return (
    <div>
      {/* Desktop Navigation for upload page */}
      <div className='lg:w-[11rem] h-screen p-4 bg-white border-r-[1px] hidden lg:flex flex-col justify-between'>
        <div className='flex flex-col items-center'>
          {links.map((link, i) => (
            <Fragment key={i}>
              <Link href={link.path}>
                <div
                  className={`${
                    pathname === link.path ||
                    (link.path === '/uploads/records' &&
                      pathname.includes('/uploads/records'))
                      ? 'bg-[#404EED] text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  } cursor-pointer my-4 p-3 rounded-lg inline-flex items-center justify-start`}
                >
                 {link.icon && <link.icon size={19} />}
                  <p className='text-sm font-semibold pl-2'>{link.text}</p>
                </div>
              </Link>
              {i === 0 && (
                <span className='border-b-[1px] border-gray-200 w-full'></span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      {/* Mobile Navigation for upload page  */}
      <div className='flex lg:hidden justify-center gap-3 pb-3 border-b-[1px]'>
        {links.map((link, i) => (
          <Link href={link.path} key={i}>
            <div
              className={`${
                pathname === link.path ||
                (link.path === '/uploads/records' &&
                  pathname.includes('/uploads/records'))
                  ? 'bg-[#404EED] text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              } cursor-pointer p-3 rounded-lg inline-flex items-center justify-start`}
            >
             {link.icon && <link.icon size={19} />}
              <p className='text-xs font-semibold pl-2'>{link.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
