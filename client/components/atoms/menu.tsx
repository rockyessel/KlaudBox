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
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/reduxtoolkit/app/store';
import { logout } from '@/utils/api-request';
import { reset } from '@/reduxtoolkit/features/files/files-slice';
import { useRouter } from 'next/router';

export interface MenuProps {
  css?: string;
}

const Menu = (props: any): JSX.Element => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/accounts/login');
    dispatch(reset());
  };

  return (
    <div
   
      className={`bg-black rounded-md shadow-lg w-[280px] absolute ${props.css} top-14 p-5`}
    >
      <div id={'menu'} className='w-full flex flex-col gap-5 divide-y divide-white/20 '>
        {user && (
          <React.Fragment>
            <div className='flex flex-col gap-1 items-start'>
              <button className='inline-flex items-center text-white/40 px-0 gap-2 relative right-2'>
                <TbSocial /> User
              </button>
              <ul className='flex flex-col gap-1 items-start  divide-y w-full divide-white/10 text-gray-300'>
                <li className='inline-flex items-center gap-2 w-full py-1'>
                  <CiFacebook className='text-xl' />
                  <button>Profile</button>
                </li>
                <li className='inline-flex items-center gap-2 w-full py-1'>
                  <CiTwitter className='text-xl' />
                  <button>Account settings</button>
                </li>
                <li className='inline-flex items-center gap-2 w-full py-1'>
                  <CiInstagram className='text-xl' />
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
            <div className='flex flex-col gap-1 items-start'>
              <button className='inline-flex items-center text-white/40 px-0 gap-2 relative right-2'>
                <TbSocial /> Actions
              </button>
              <ul className='flex flex-col gap-1 items-start  divide-y w-full divide-white/10 text-gray-300'>
                <li className='inline-flex items-center gap-2 w-full py-1'>
                  <CiFacebook className='text-xl' />
                  <button>Upload files</button>
                </li>
                <li className='inline-flex items-center gap-2 w-full py-1'>
                  <CiTwitter className='text-xl' />
                  <button>Create Folder</button>
                </li>
                <li className='inline-flex items-center gap-2 w-full py-1'>
                  <CiInstagram className='text-xl' />
                  <button onClick={handleLogout}>Create Type</button>
                </li>
              </ul>
            </div>
          </React.Fragment>
        )}
        <div className='flex flex-col gap-1 items-start lg:hidden'>
          <button className='inline-flex items-center text-white/40 px-0 gap-2 relative right-2'>
            <MdLibraryBooks /> General
          </button>
          <ul className='flex flex-col gap-1 items-start divide-y divide-white/10 w-full text-gray-300'>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <MdHomeFilled className='text-xl' />{' '}
              <button>
                <Link href='/'>Home</Link>
              </button>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <MdAlternateEmail className='text-xl' />{' '}
              <button>
                <Link href='/contact'>Contact</Link>
              </button>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <BsCurrencyDollar className='text-xl' />{' '}
              <button>
                <Link href='/pricing'>Pricing</Link>
              </button>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <FaQq className='text-xl' /> <button>FAQS</button>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <GiProcessor className='text-xl' /> <button>How it works</button>
            </li>
          </ul>
        </div>
        {!user ? (
          <div className='flex flex-col gap-1 items-start'>
            <button className='inline-flex items-center text-white/40 px-0 gap-2 relative right-2'>
              <MdSupervisorAccount /> Guest
            </button>
            <ul className='flex flex-col gap-1 items-start  divide-y w-full divide-white/10 text-gray-300'>
              <li className='inline-flex items-center gap-2 w-full py-1'>
                <BiLogInCircle className='text-xl' />{' '}
                <button>
                  <Link href='/guests/find-file'>Find file</Link>
                </button>
              </li>
              <li className='inline-flex items-center gap-2 w-full py-1'>
                <BiLogInCircle className='text-xl rotate-180' />{' '}
                <button>
                  <Link href='/guests/upload-file'>Upload a file</Link>
                </button>
              </li>
            </ul>
          </div>
        ) : null}

        {!user ? (
          <div className='flex flex-col gap-1 items-start'>
            <button className='inline-flex items-center text-white/40 px-0 gap-2 relative right-2'>
              <MdSupervisorAccount /> Accounts
            </button>
            <ul className='flex flex-col gap-1 items-start  divide-y w-full divide-white/10 text-gray-300'>
              <li className='inline-flex items-center gap-2 w-full py-1'>
                <BiLogInCircle className='text-xl' />{' '}
                <button>
                  <Link href='/accounts/login'>Login</Link>
                </button>
              </li>
              <li className='inline-flex items-center gap-2 w-full py-1'>
                <BiLogInCircle className='text-xl rotate-180' />{' '}
                <button>
                  <Link href='/accounts/register'>Register</Link>
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
