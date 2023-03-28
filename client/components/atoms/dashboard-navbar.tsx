import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  RiSearchLine,
  RiSettings5Line,
  RiNotification2Line,
} from 'react-icons/ri';
import { TiCloudStorageOutline } from 'react-icons/ti';
import { useUserContext } from '@/context/user-context';
import Menu from './menu';

const DashboardNavbar = () => {
  const { handleChangeRouter, handleModalType, showMenu, handleMenuState } = useUserContext();

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 sticky top-0'>
      <Link href='/dashboard'>
        <div className='w-[100px] md:w-[130px]'>
          <button
            type='button'
            title='KlaudBox'
            className='font-catamaran text-xl md:text-2xl lg:text-3xl inline-flex items-center'
          >
            KlaudBox <sub className='text-sm text-rose-800'>Dashboard</sub>
          </button>
        </div>
      </Link>

      <div className='flex items-center gap-5 divide-x divide-gray-500/10'>
        <ul className='lg:flex items-center gap-2 text-sm hidden'>
          <li
            onClick={()=>handleModalType('user-modal')}
            className='bg-rose-800 text-white font-medium rounded-md shadow-md p-2'
          >
            Add file
          </li>
          {/* <li className='bg-rose-800 text-white font-medium rounded-md shadow-md p-2'>;
            Create Folder;
          </li>
          <li className='bg-rose-800 text-white font-medium rounded-md shadow-md p-2'>;
            Add Type;
          </li> */}
        </ul>
        <ul className='flex items-center text-xl gap-2 pl-5'>
          <li
            onClick={() => handleChangeRouter('storage')}
            className='border-[1px] border-black/10 px-2 py-1 hidden rounded-md cursor-pointer lg:flex items-center gap-1 text-sm'
          >
            <span className='text-rose-800 inline-flex items-center'>
              <TiCloudStorageOutline /> 10/50 GB
            </span>
            <span> Storage usage</span>
          </li>
          <li className='hidden lg:block'>
            <input title='checkbox' type='checkbox' className='toggle' />
          </li>
          <li className='hidden lg:block'>
            <RiSearchLine />
          </li>
          <li className='hidden lg:block'>
            <RiSettings5Line />
          </li>
          <li className='hidden lg:block'>
            <RiNotification2Line />
          </li>
          <li onClick={handleMenuState} className='w-12 h-12 rounded-full'>
            <Image
              src='/f.png'
              className='w-12 h-12 rounded-full'
              alt=''
              height={100}
              width={100}
            />

            {showMenu && <Menu css='right-2' />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardNavbar;
