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

const DashboardNavbar = () => {
  const { handleChangeRouter, handleModalState } = useUserContext();

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 sticky top-0'>
      <Link href='/dashboard'>
        <div className='w-[100px] md:w-[130px]'>
          <button className='font-catamaran text-xl md:text-2xl lg:text-3xl inline-flex items-center'>
            KlaudBox <sub className='text-sm text-rose-800'>Dashboard</sub>
          </button>
        </div>
      </Link>

      <div className='flex items-center gap-5 divide-x divide-gray-500/10'>
        <ul className='lg:flex items-center gap-2 text-sm hidden'>
          <li
            onClick={handleModalState}
            className='bg-rose-800 text-white font-medium rounded-md shadow-md p-2'
          >
            Add file
          </li>
          <li className='bg-rose-800 text-white font-medium rounded-md shadow-md p-2'>
            Create Folder
          </li>
          <li className='bg-rose-800 text-white font-medium rounded-md shadow-md p-2'>
            Add Type
          </li>
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
          <li className='w-12 h-12 rounded-full'>
            <Image
              src='/f.png'
              className='w-12 h-12 rounded-full'
              alt=''
              height={100}
              width={100}
            />
          </li>
        </ul>
      </div>
      {/* <div className='w-[30rem] h-[50rem] text-black bg-white rounded-lg shadow-lg absolute top-0'>
        <div>
          <p className='inline-flex items-center text-black/40 px-0 gap-2 relative right-2'>
            Actions
          </p>
          <ul>
            <li>Add file</li>
            <li>Create Folder</li>
            <li>Create Types</li>
          </ul>
        </div>
        <div>
          <p className='inline-flex items-center text-black/40 px-0 gap-2 relative right-2'>
            Actions
          </p>
          <ul>
            <li>Settings</li>
            <li>Notifications</li>
            <li>Mode</li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardNavbar;
