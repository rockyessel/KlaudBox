import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Menu } from '..';
import Link from 'next/link';

const Navbar = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const handleMenuState = () => {
    setShowMenu((previous_state) => !previous_state);
  };
  return (
    <header className='bg-black text-white flex  items-center py-3 px-3 md:px-6 lg:px-20 xl:px-60 fixed w-full top-0'>
      <div className='font-bold'>
        <Link href='/'>KlaudBox</Link>
      </div>

      <div className='flex justify-between items-center w-full'>
        <nav className='hidden w-full  lg:flex gap-5 justify-center items-center'>
          <ul className='flex gap-5 justify-center items-center'>
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

        <nav className='hidden lg:block'>
          <ul className='flex gap-5'>
            <li className='bg-white text-black rounded-md px-2 py-1 font-medium'>
              <Link href='/guests/upload-file'>Upload</Link>
            </li>
            <li className='border border-white/60 rounded-md px-2 py-1 font-medium'>
              <Link href='/accounts/login'>Login</Link>
            </li>
            <li className='border border-white/60 rounded-md px-2 py-1 font-medium'>
              <Link href='/accounts/register'>Register</Link>
            </li>
          </ul>
        </nav>

        <section className='flex items-center gap-5 lg:hidden'>
          <Link href='/guests/upload-file'>
            <button className='bg-white lg:hidden block text-black rounded-md px-2 py-1 font-medium'>
              Upload
            </button>
          </Link>

          <div className='lg:hidden block'>
            <button
              onClick={handleMenuState}
              className='bg-white/20 text-lg p-3 relative rounded-md'
            >
              {showMenu ? <FaTimes /> : <FaBars />}

              {showMenu && <Menu />}
            </button>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Navbar;
