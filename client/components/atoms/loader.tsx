import Image from 'next/image';
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';

const Loader = () => {
  return (
    <div className='w-full h-full text-7xl font-extrabold bg-white/20 fixed top-0 left-0 flex justify-center items-center'>
      <span className='font-catamaran text-xl md:text-3xl lg:text-5xl animate-pulse inline-flex flex-col gap-5 items-center'>
        <span className='w-32 rounded-lg shadow-lg inline-flex items-center'>
          <Image
            src='/responsive.gif'
            className='rounded-lg'
            width={1000}
            height={1000}
            alt=''
          />
        </span>
        <span>
          <span className='inline-flex items-center'>
            KlaudB
            <RiCheckboxBlankCircleFill className='animate-bounce' />x
          </span>
          <span>
            <span className='animate-bounce'>.</span>
            <span className='animate-bounce'>.</span>
            <span className='animate-bounce'>.</span>
          </span>
        </span>
      </span>
    </div>
  );
};

export default Loader;
