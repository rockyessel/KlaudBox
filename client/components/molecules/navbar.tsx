import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Menu } from '../index';
import { useSelector } from 'react-redux';
import type { RootState } from '@/reduxtoolkit/app/store';
import Link from 'next/link';
import { useUserContext } from '@/context/user-context';
import Loader from '../atoms/loader';

const Navbar = (): JSX.Element => {
  const { handleMenuState, showMenu } = useUserContext();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  if (isLoading) return <Loader />;

  return (
    <header className='bg-gray-50 flex justify-between items-center py-3  px-6 lg:px-10 xl:px-20  sticky w-full top-0 border-b-[1px] border-black/30'>
      <section className='font-bold flex items-center gap-5'>
        <Link href='/'>
          <span className='font-catamaran text-xl md:text-3xl lg:text-5xl'>
            KlaudBox
          </span>
        </Link>

        <nav className='hidden lg:block'>
          <ul className='flex gap-2 justify-center items-center'>
            {/* <Link href='/'>
              <li className='px-2 py-1 font-medium'>Home</li>
            </Link> */}
            {/* <Link href='/guests/find-file'>
              <li className='px-2 py-1 font-medium'>Find File</li>
            </Link> */}
            {/* <Link href='/guests/upload-file'>
              <li className='bg-rose-700 text-white rounded-sm w-fit px-2 py-1.5 inline-flex items-center gap-1 font-medium'>
                Upload
              </li>
            </Link> */}
          </ul>
        </nav>
      </section>

      {!user ? (
        <nav className='hidden lg:block'>
          <ul className='flex items-center gap-5'>
            {/* <Link href='/accounts/login'>
              <li>
                <span className='px-2 py-1 font-medium'>Login</span>
              </li>
            </Link> */}

            <Link href='/accounts/register'>
              <li className='rounded-sm w-fit px-2 py-1.5 border-[1px] hover:bg-black hover:text-white'>
                <span className='font-medium'>Register</span>
              </li>
            </Link>
            <Link href='/guests/find-file'>
              <li className='rounded-sm w-fit px-2 py-1.5 border-[1px] hover:bg-black hover:text-white'>
                Find File
              </li>
            </Link>

            <Link href='/guests/upload-file'>
              <li className='bg-rose-700 text-white rounded-sm w-fit px-2 py-1.5 inline-flex items-center gap-1 font-medium'>
                Upload
              </li>
            </Link>
          </ul>
        </nav>
      ) : (
        <nav className='hidden lg:block'>
          <span className='flex items-center gap-5'>
            <Link href='/dashboard/'>
              <span className='bg-rose-800 text-white rounded-sm px-2 py-1 font-medium'>
                Dashboard
              </span>
            </Link>
            <span
              title='menu button'
              onClick={handleMenuState}
              className='w-10 group h-10 rounded-full bg-black flex items-center justify-center hover:ring-2 hover:ring-rose-700'
            >
              <button type='button' className='text-white'>
                RE
              </button>
              {showMenu && <Menu css='right-2' />}
            </span>
          </span>
        </nav>
      )}

      <section className='flex items-center gap-1 lg:hidden'>
        {!user ? (
          <Link href='/guests/upload-file'>
            <button
              type='button'
              title='Upload'
              className='bg-rose-700 text-white rounded-sm w-fit px-2 py-1.5 inline-flex items-center gap-1 font-medium'
            >
              Upload
            </button>
          </Link>
        ) : (
          <Link href='/dashboard/'>
            <button
              type='button'
              title='Dashboard'
              className='bg-rose-800 hidden sm:block text-white rounded-sm px-2 py-1 font-medium'
            >
              Dashboard
            </button>
          </Link>
        )}

        <div className='lg:hidden block'>
          <button
            title='menu button'
            type='button'
            onClick={handleMenuState}
            className='bg-white/20 text-lg p-3 relative rounded-sm'
          >
            {showMenu ? <FaTimes /> : <FaBars />}

            {showMenu && <Menu css='right-0' />}
          </button>
        </div>
      </section>
    </header>
  );
};

export default Navbar;
