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
import { useSelector } from 'react-redux';
import type { RootState } from '@/reduxtoolkit/app/store';

export interface MenuProps {
  css?: string;
}

const Menu = (props: any): JSX.Element => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div
      className={`bg-black rounded-md shadow-lg w-[280px] absolute ${props.css} top-14 p-5 z-[200] `}
    >
      <div className='w-full flex flex-col gap-5 divide-y divide-white/20'>
        <div className='flex flex-col gap-1 items-start'>
          <span className='inline-flex items-center text-white/40 px-0 gap-2 relative right-2'>
            <TbSocial /> User
          </span>
          <ul className='flex flex-col gap-1 items-start  divide-y w-full divide-white/10 text-gray-300'>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <CiFacebook className='text-xl' />
              <span>Profile</span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <CiTwitter className='text-xl' />
              <span>Account settings</span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <CiInstagram className='text-xl' />
              <span>Logout</span>
            </li>
          </ul>
        </div>

        <div className='flex flex-col gap-1 items-start lg:hidden'>
          <span className='inline-flex items-center text-white/40 px-0 gap-2 relative right-2'>
            <MdLibraryBooks /> General
          </span>
          <ul className='flex flex-col gap-1 items-start divide-y divide-white/10 w-full text-gray-300'>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <MdHomeFilled className='text-xl' />{' '}
              <span>
                <Link href='/'>Home</Link>
              </span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <MdAlternateEmail className='text-xl' />{' '}
              <span>
                <Link href='/contact'>Contact</Link>
              </span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <BsCurrencyDollar className='text-xl' />{' '}
              <span>
                <Link href='/pricing'>Pricing</Link>
              </span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <FaQq className='text-xl' /> <span>FAQS</span>
            </li>
            <li className='inline-flex items-center gap-2 w-full py-1'>
              <GiProcessor className='text-xl' /> <span>How it works</span>
            </li>
          </ul>
        </div>
        {!user ? (
          <div className='flex flex-col gap-1 items-start'>
            <span className='inline-flex items-center text-white/40 px-0 gap-2 relative right-2'>
              <MdSupervisorAccount /> Guest
            </span>
            <ul className='flex flex-col gap-1 items-start  divide-y w-full divide-white/10 text-gray-300'>
              <li className='inline-flex items-center gap-2 w-full py-1'>
                <BiLogInCircle className='text-xl' />{' '}
                <span>
                  <Link href='/guests/find-file'>Find file</Link>
                </span>
              </li>
              <li className='inline-flex items-center gap-2 w-full py-1'>
                <BiLogInCircle className='text-xl rotate-180' />{' '}
                <span>
                  <Link href='/guests/upload-file'>Upload a file</Link>
                </span>
              </li>
            </ul>
          </div>
        ) : null}

        {!user ? (
          <div className='flex flex-col gap-1 items-start'>
            <span className='inline-flex items-center text-white/40 px-0 gap-2 relative right-2'>
              <MdSupervisorAccount /> Accounts
            </span>
            <ul className='flex flex-col gap-1 items-start  divide-y w-full divide-white/10 text-gray-300'>
              <li className='inline-flex items-center gap-2 w-full py-1'>
                <BiLogInCircle className='text-xl' />{' '}
                <span>
                  <Link href='/accounts/login'>Login</Link>
                </span>
              </li>
              <li className='inline-flex items-center gap-2 w-full py-1'>
                <BiLogInCircle className='text-xl rotate-180' />{' '}
                <span>
                  <Link href='/accounts/register'>Register</Link>
                </span>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
