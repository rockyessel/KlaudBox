import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Menu } from '../index';
import { useSelector } from 'react-redux';
import type { RootState } from '@/reduxtoolkit/app/store';
import Link from 'next/link';

const Navbar = (): JSX.Element => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [dropdown, setDropdown] = React.useState();

  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  const handleMenuState = () => {
    setShowMenu((previous_state) => !previous_state);
  };

  if (isLoading)
    return (
      <main className='bg-rose-800 text-white font-extrabold'>Loading</main>
    );

  return (
    <header className='bg-gray-50 flex justify-between items-center py-3 px-3 sticky w-full top-0 border-b-[1px] border-black/30'>
      <section className='font-bold flex items-center gap-5'>
        <Link href='/'>
          <button className='font-catamaran text-xl md:text-3xl lg:text-5xl'>
            KlaudBox
          </button>
        </Link>

        <nav className='hidden lg:block'>
          <ul className='flex gap-2 justify-center items-center'>
            <li className='px-2 py-1 font-medium'>
              <Link href='/'>Home</Link>
            </li>
            <li className='px-2 py-1 font-medium'>
              <Link href='/contact'>Contact</Link>
            </li>
            <li className='px-2 py-1 font-medium'>
              <Link href='/pricing'>Pricing</Link>
            </li>
            <li className='px-2 py-1 font-medium'>
              <Link href='/guests/find-file'>Find File</Link>
            </li>
          </ul>
        </nav>
      </section>

      {!user ? (
        <nav className='hidden lg:block'>
          <ul className='flex items-center gap-5'>
            <li className='border group border-black/60 rounded-md px-2 py-1 font-medium relative'>
              <button>Accounts</button>

              <ul className='bg-white hidden text-[1rem] max-w-[10rem] z-[1] drop-shadow-lg absolute top-8 left-0 px-2 group-hover:flex flex-col items-center py-2 rounded-md divide-y divide-black/20'>
                <li className='px-2 py-1 font-medium'>
                  <Link href='/accounts/login'>Login</Link>
                </li>
                <li className='px-2 py-1 font-medium'>
                  <Link href='/accounts/register'>Register</Link>
                </li>
              </ul>
            </li>
            <li className='bg-white text-black rounded-md px-2 py-1 font-medium'>
              <Link href='/guests/upload-file'>Upload</Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className='hidden lg:block'>
          <ul className='flex items-center gap-5'>
            <li className='bg-rose-800 text-white rounded-md px-2 py-1 font-medium'>
              <Link href='/dashboard/'>Dashboard</Link>
            </li>
            <li
              title='menu button'
              onClick={handleMenuState}
              className='w-10 group h-10 rounded-full bg-black flex items-center justify-center hover:ring-2 hover:ring-rose-700'
            >
              <button type='button' className='text-white'>
                RE
              </button>
              {showMenu && <Menu css='right-2' />}
            </li>
          </ul>
        </nav>
      )}

      <section className='flex items-center gap-1 lg:hidden'>
        {!user ? (
          <Link href='/guests/upload-file'>
            <button className='bg-white lg:hidden block text-black rounded-md px-2 py-1 font-medium'>
              Upload
            </button>
          </Link>
        ) : (
          <button className='bg-rose-800 hidden sm:block text-white rounded-md px-2 py-1 font-medium'>
            <Link href='/dashboard/'>Dashboard</Link>
          </button>
        )}

        <div className='lg:hidden block'>
          <button
            title='menu button'
            type='button'
            onClick={handleMenuState}
            className='bg-white/20 text-lg p-3 relative rounded-md'
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
