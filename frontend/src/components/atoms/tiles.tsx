import React from 'react';
import { BsImage } from 'react-icons/bs';

const Tiles = () => {
  return (
    <div className='flex flex-col items-center bg-gray-600/60 rounded-lg p-5'>
      <BsImage className='text-[5rem] text-gray-300' />

      <div className='text-center'>
        <p className='text-gray-300 text-[14px] hover:underline cursor-pointer'>
          Nicepage-5.4.4.exe
        </p>
        <p className='text-[0.8rem]'>Nov 30,2021</p>
      </div>
    </div>
  );
};

export default Tiles;
