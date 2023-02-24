import React from 'react';
import { FaQq } from 'react-icons/fa';
import {
  MdLibraryBooks,
  MdHomeFilled,
  MdAlternateEmail,
  MdSupervisorAccount,
} from 'react-icons/md';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GiProcessor } from 'react-icons/gi';
import { BiLogInCircle } from 'react-icons/bi';
import { CiFacebook, CiTwitter, CiInstagram } from 'react-icons/ci';
import { TbSocial } from 'react-icons/tb';

const Menu = () => {
  return (
    <div className='bg-black rounded-md shadow-lg w-[280px] absolute right-0 top-14 p-5 uppercase'>
      <div className='w-full flex flex-col gap-5 divide-y divide-white/20'>
        <div className='flex flex-col gap-1 items-start'>
          <span className='inline-flex items-center uppercase text-white/40 px-0 gap-2 relative right-2'>
            <MdLibraryBooks /> General
          </span>
          <ul className='flex flex-col gap-1 items-start divide-y divide-white/10 w-full'>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <MdHomeFilled className='text-xl' />{' '}
              <span className='text-md'>Home</span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <MdAlternateEmail className='text-xl' />{' '}
              <span className='text-md'>Contact</span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <BsCurrencyDollar className='text-xl' />{' '}
              <span className='text-md'>Price</span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <FaQq className='text-xl' /> <span className='text-md'>FAQS</span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <GiProcessor className='text-xl' />{' '}
              <span className='text-md'>How it works</span>
            </li>
          </ul>
        </div>

        <div className='flex flex-col gap-1 items-start'>
          <span className='inline-flex items-center uppercase text-white/40 px-0 gap-2 relative right-2'>
            <MdSupervisorAccount /> Accounts
          </span>
          <ul className='flex flex-col gap-1 items-start  divide-y w-full divide-white/10'>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <BiLogInCircle className='text-xl' />{' '}
              <span className='text-md'>Login</span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <BiLogInCircle className='text-xl rotate-180' />{' '}
              <span className='text-md'>Register</span>
            </li>
          </ul>
        </div>

        <div className='flex flex-col gap-1 items-start'>
          <span className='inline-flex items-center uppercase text-white/40 px-0 gap-2 relative right-2'>
            <TbSocial /> Social
          </span>
          <ul className='flex flex-col gap-1 items-start  divide-y w-full divide-white/10'>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <CiFacebook className='text-xl' />
              <span className='text-md'>Facebook</span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <CiTwitter className='text-xl' />
              <span className='text-md'>Twitter</span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <CiInstagram className='text-xl' />
              <span className='text-md'>Instagram</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
