import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiSearchLine, RiSettings5Line, RiNotification2Line } from 'react-icons/ri';
import { TiCloudStorageOutline } from 'react-icons/ti';

const DashboardNavbar = () => {
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 sticky top-0'>
      <Link href='/'>
        <div className='w-[100px] md:w-[130px]'>
          <button className='font-catamaran text-xl md:text-3xl lg:text-5xl'>
            KlaudBox
          </button>
        </div>
      </Link>

      <div>
        <ul className='flex items-center text-xl gap-2'>
          <li className='border-[1px] border-black/20 px-4 py-1 rounded-lg flex items-center'>
            <span className='text-rose-800 inline-flex items-center'>
              <TiCloudStorageOutline /> 10/50 GB
            </span>
            <span> Storage usage</span>
          </li>
          <li>
            <input
              title='checkbox'
              type='checkbox'
              className='toggle toggle-lg'
            />
          </li>
          <li>
            <RiSearchLine />
          </li>
          <li>
            <RiSettings5Line />
          </li>
          <li>
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
    </div>
  );
};

export default DashboardNavbar;
