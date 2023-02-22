import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Menu } from '..';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const handleMenuState = () => {
    setShowMenu((previous_state) => !previous_state);
  };
  return (
    <header className='bg-black text-white flex justify-between items-center py-3 px-3 md:px-6 lg:px-20 xl:px-60 sticky w-full top-0'>
      <div className='font-bold uppercase'>Everfile</div>

      <nav className='hidden w-full  lg:flex gap-5 justify-center items-center'>
        <ul className='flex gap-5 justify-center items-center'>
          <li className='px-2 py-1 font-medium'>Home</li>
          <li className='px-2 py-1 font-medium'>Contact</li>
          <li className='px-2 py-1 font-medium'>Pricing</li>
          <li className='px-2 py-1 font-medium'>How it works</li>
        </ul>
      </nav>

      <nav className='hidden lg:block'>
        <ul className='flex gap-5'>
          <li className='bg-white text-black rounded-md px-2 py-1 font-medium'>
            <Link to='/uploads'>Upload</Link>
          </li>
          <li className='border border-white/60 rounded-md px-2 py-1 font-medium'>
            Login
          </li>
          <li className='border border-white/60 rounded-md px-2 py-1 font-medium'>
            Register
          </li>
        </ul>
      </nav>

      <section className='flex items-center gap-5 lg:hidden'>
        <Link to='/uploads'>
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
    </header>
  );
};

export default Navbar;
